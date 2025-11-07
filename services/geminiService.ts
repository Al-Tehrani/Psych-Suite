
import { GoogleGenAI, Type, Modality } from '@google/genai';
import { Big5GeminiFeedback, Big5Trait, Disorder, GeminiFeedback, Flashcard } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const dsmResponseSchema = {
    type: Type.OBJECT,
    properties: {
        score: {
            type: Type.NUMBER,
            description: "An overall accuracy score from 0 to 100 based on how many key criteria the student correctly recalled."
        },
        summary: {
            type: Type.STRING,
            description: "A brief, one-sentence, encouraging summary of the student's performance."
        },
        correctlyRecalled: {
            type: Type.ARRAY,
            description: "A list of official criteria that the student correctly recalled, even if paraphrased.",
            items: {
                type: Type.OBJECT,
                properties: {
                    userText: {
                        type: Type.STRING,
                        description: "The specific part of the student's answer that correctly matches a criterion."
                    },
                    officialCriterion: {
                        type: Type.STRING,
                        description: "The official DSM-5 criterion that the student's text corresponds to."
                    }
                },
                required: ["userText", "officialCriterion"]
            }
        },
        missedCriteria: {
            type: Type.ARRAY,
            description: "A list of the official criteria that the student missed entirely.",
            items: {
                type: Type.STRING
            }
        },
        incorrectPoints: {
            type: Type.ARRAY,
            description: "A list of any statements made by the student that are factually incorrect or irrelevant to the specified disorder.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["score", "summary", "correctlyRecalled", "missedCriteria", "incorrectPoints"]
};


export const evaluateRetrievalPractice = async (
    disorderName: string,
    disorderData: Disorder,
    userInput: string
): Promise<GeminiFeedback> => {
    
    const systemInstruction = `You are an expert psychology professor evaluating a student's knowledge of the DSM-5. 
    Your task is to compare the student's recalled criteria for a specific disorder against the official criteria.
    Analyze the student's answer for accuracy, omissions, and errors.
    The student's answer may be paraphrased, so you must assess the meaning, not just exact wording.
    Provide structured feedback in JSON format according to the provided schema. Be concise and direct in your feedback.`;

    const prompt = `
        Disorder: ${disorderName}

        Official Criteria:
        ${JSON.stringify(disorderData.criteria.map(c => c.text), null, 2)}

        Student's Answer:
        "${userInput}"

        Please evaluate the student's answer and provide feedback.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: dsmResponseSchema,
                temperature: 0.2,
            }
        });

        const jsonText = response.text.trim();
        const feedback = JSON.parse(jsonText) as GeminiFeedback;

        return {
            score: feedback.score ?? 0,
            summary: feedback.summary ?? "No summary provided.",
            correctlyRecalled: feedback.correctlyRecalled ?? [],
            missedCriteria: feedback.missedCriteria ?? [],
            incorrectPoints: feedback.incorrectPoints ?? []
        };
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get feedback from Gemini API.");
    }
};

const big5ResponseSchema = {
    type: Type.OBJECT,
    properties: {
        score: {
            type: Type.NUMBER,
            description: "An overall accuracy score from 0 to 100 based on how many key concepts the student correctly recalled (e.g., description, high/low scorer traits)."
        },
        summary: {
            type: Type.STRING,
            description: "A brief, one-sentence, encouraging summary of the student's performance on the Big-5 trait."
        },
        correctlyRecalled: {
            type: Type.ARRAY,
            description: "A list of official concepts about the trait that the student correctly recalled, even if paraphrased.",
            items: {
                type: Type.OBJECT,
                properties: {
                    userText: {
                        type: Type.STRING,
                        description: "The specific part of the student's answer that correctly matches a concept."
                    },
                    officialConcept: {
                        type: Type.STRING,
                        description: "The official concept or characteristic that the student's text corresponds to (e.g., 'High scorers are imaginative')."
                    }
                },
                required: ["userText", "officialConcept"]
            }
        },
        missedConcepts: {
            type: Type.ARRAY,
            description: "A list of the official concepts or characteristics that the student missed entirely.",
            items: {
                type: Type.STRING
            }
        },
        incorrectPoints: {
            type: Type.ARRAY,
            description: "A list of any statements made by the student that are factually incorrect or irrelevant to the specified trait.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["score", "summary", "correctlyRecalled", "missedConcepts", "incorrectPoints"]
};

export const evaluateBig5RetrievalPractice = async (
    traitName: string,
    traitData: Big5Trait,
    userInput: string
): Promise<Big5GeminiFeedback> => {
    
    const systemInstruction = `You are an expert psychology professor evaluating a student's knowledge of the Big Five personality model. 
    Your task is to compare the student's recalled information about a specific trait against the official description.
    Analyze the student's answer for accuracy, omissions, and errors regarding the trait's core concept, description, and characteristics of high and low scorers.
    The student's answer may be paraphrased, so you must assess the meaning, not just exact wording.
    Provide structured feedback in JSON format according to the provided schema. Be concise and direct in your feedback.`;

    const prompt = `
        Personality Trait: ${traitName}

        Official Information:
        ${JSON.stringify({
            description: traitData.description,
            highScorers: traitData.positive_correlations,
            lowScorers: traitData.negative_correlations,
        }, null, 2)}

        Student's Answer:
        "${userInput}"

        Please evaluate the student's answer and provide feedback.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: big5ResponseSchema,
                temperature: 0.2,
            }
        });

        const jsonText = response.text.trim();
        const feedback = JSON.parse(jsonText) as Big5GeminiFeedback;

        return {
            score: feedback.score ?? 0,
            summary: feedback.summary ?? "No summary provided.",
            correctlyRecalled: feedback.correctlyRecalled ?? [],
            missedConcepts: feedback.missedConcepts ?? [],
            incorrectPoints: feedback.incorrectPoints ?? []
        };
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get feedback from Gemini API.");
    }
};


const flashcardSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: "A unique identifier for the card, e.g., 'schizophrenia-def-1'." },
            front: { type: Type.STRING, description: "The question or prompt for the front of the card." },
            back: { type: Type.STRING, description: "The answer for the back of the card." },
            imagePrompt: { type: Type.STRING, description: "A simple, abstract, SFW prompt for an image generator, e.g., 'gears turning in a human silhouette'." }
        },
        required: ["id", "front", "back", "imagePrompt"]
    }
};

export const generateFlashcardsForTopic = async (topic: string, existingCardIds: string[]): Promise<Omit<Flashcard, 'deck' | 'imageUrl'>[]> => {
    const systemInstruction = `You are an AI assistant creating educational flashcards for psychology students. Generate a diverse set of 5 flashcards for the given topic. The front of the card must always be a question or a prompt, and the back must be the answer.`;

    const prompt = `
        Topic: ${topic}
        Existing Card IDs on this topic: ${JSON.stringify(existingCardIds)}

        Please generate 5 new, unique flashcards for this topic. For each card, provide a unique ID, a front, a back, and a simple, abstract image prompt.

        The cards should be varied. Create cards for the following types:
        1. A definitional question (e.g., "What is the core feature of...?").
        2. A key criterion or symptom as a fill-in-the-blank or question.
        3. A short, hypothetical patient behavior or statement, asking for the relevant concept or disorder.
        4. A "What is the difference between X and Y?" question if applicable.
        5. A question about duration or number of symptoms required for diagnosis.

        Do not use any of the provided existing card IDs. Ensure the 'back' of the card is the concise answer to the 'front'.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: flashcardSchema,
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error(`Error generating flashcards for ${topic}:`, error);
        throw new Error("Failed to generate flashcards.");
    }
};

export const generateImageForFlashcard = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData) {
            return part.inlineData.data;
        }
        throw new Error("No image data returned from API.");
    } catch (error) {
        console.error(`Error generating image for prompt "${prompt}":`, error);
        return ""; // Return empty string to not block UI
    }
};
