
export interface BodyLanguageSignal {
    name: string;
    description: string;
    meaning: string;
    context: string[];
    examples: string[];
}

export interface BodyLanguageCategory {
    category: string;
    description: string;
    signals: BodyLanguageSignal[];
}

export const bodyLanguageData: BodyLanguageCategory[] = [
    {
        category: "Facial Expressions",
        description: "Facial expressions are one of the most universal forms of body language, conveying emotions and intentions across cultures.",
        signals: [
            {
                name: "Microexpressions",
                description: "Brief, involuntary facial expressions that occur in a fraction of a second, revealing true emotions.",
                meaning: "Often reveal concealed emotions or deception. Last 1/25th to 1/5th of a second.",
                context: ["Deception detection", "Emotional assessment", "High-stakes situations"],
                examples: ["Flash of anger during a smile", "Brief fear expression when surprised", "Micro-disgust when lying"]
            },
            {
                name: "Eye Contact",
                description: "The duration and quality of eye contact can indicate confidence, interest, deception, or discomfort.",
                meaning: "Sustained eye contact (60-70% of conversation) shows confidence and engagement. Too much can be aggressive; too little suggests discomfort or deception.",
                context: ["Job interviews", "Negotiations", "Social interactions"],
                examples: ["Confident: steady, warm eye contact", "Deceptive: avoiding eye contact or excessive blinking", "Aggressive: unbroken, intense stare"]
            },
            {
                name: "Fake vs. Genuine Smile",
                description: "A genuine smile (Duchenne smile) involves both the mouth and eyes, while a fake smile only involves the mouth.",
                meaning: "Genuine smiles indicate true happiness and positive emotions. Fake smiles may indicate politeness, discomfort, or deception.",
                context: ["Social interactions", "Customer service", "Emotional assessment"],
                examples: ["Genuine: eyes crinkle, crow's feet appear", "Fake: only mouth moves, no eye involvement"]
            }
        ]
    },
    {
        category: "Posture and Stance",
        description: "How people position their bodies communicates confidence, status, openness, and emotional state.",
        signals: [
            {
                name: "Open vs. Closed Posture",
                description: "Open posture involves uncrossed arms and legs, facing others directly. Closed posture involves crossed limbs and turned-away body.",
                meaning: "Open posture indicates receptiveness, confidence, and engagement. Closed posture suggests defensiveness, discomfort, or disagreement.",
                context: ["Meetings", "Negotiations", "Social gatherings"],
                examples: ["Open: arms at sides, facing forward", "Closed: crossed arms, legs crossed away from speaker"]
            },
            {
                name: "Power Posing",
                description: "Expansive, open body positions that take up space, such as standing with hands on hips or arms spread.",
                meaning: "Can increase confidence and testosterone while decreasing cortisol. Indicates dominance and self-assurance.",
                context: ["Before important events", "Leadership situations", "Confidence building"],
                examples: ["Superman pose: hands on hips, chest out", "Victory pose: arms raised in V-shape", "Sitting with arms behind head"]
            },
            {
                name: "Mirroring",
                description: "Unconsciously copying another person's body language, gestures, or speech patterns.",
                meaning: "Indicates rapport, connection, and positive engagement. Often occurs naturally in comfortable conversations.",
                context: ["Building rapport", "Sales situations", "Social bonding"],
                examples: ["Both crossing legs in same direction", "Matching hand gestures", "Synchronized breathing patterns"]
            }
        ]
    },
    {
        category: "Gestures",
        description: "Hand and arm movements that emphasize, illustrate, or replace verbal communication.",
        signals: [
            {
                name: "Hand-to-Face Gestures",
                description: "Touching the face, covering the mouth, or touching the nose during conversation.",
                meaning: "Often indicates deception, anxiety, or discomfort. Can also signal thinking or evaluation.",
                context: ["Deception detection", "Stress assessment", "Cognitive processing"],
                examples: ["Covering mouth when lying", "Touching nose when uncomfortable", "Rubbing chin when thinking"]
            },
            {
                name: "Steepling",
                description: "Bringing fingertips together to form a steeple shape, often while listening or speaking.",
                meaning: "Indicates confidence, authority, and knowledge. Common in leadership and expert positions.",
                context: ["Business meetings", "Presentations", "Authority situations"],
                examples: ["Fingertips touching while explaining", "Steeple while listening attentively", "Raised steeple when making point"]
            },
            {
                name: "Palm Position",
                description: "The orientation of the palm when gesturing or shaking hands - up, down, or vertical.",
                meaning: "Open palm up: submission, openness. Palm down: authority, dominance. Vertical: equality, handshake.",
                context: ["Handshakes", "Gestures during speech", "Power dynamics"],
                examples: ["Palm up: asking or showing openness", "Palm down: commanding or controlling", "Vertical: equal partnership"]
            }
        ]
    },
    {
        category: "Proxemics (Personal Space)",
        description: "The study of how people use and perceive space in communication.",
        signals: [
            {
                name: "Intimate Distance",
                description: "0-18 inches - reserved for close relationships, intimate conversations, or physical contact.",
                meaning: "Invading this space without permission indicates aggression or inappropriate behavior. Appropriate only with close friends, family, or romantic partners.",
                context: ["Personal relationships", "Comfort zones", "Cultural differences"],
                examples: ["Hugging a close friend", "Whispering to a partner", "Comforting someone in distress"]
            },
            {
                name: "Personal Distance",
                description: "18 inches to 4 feet - comfortable distance for conversations with friends and acquaintances.",
                meaning: "Standard distance for most social interactions. Too close can feel invasive; too far can seem distant or disengaged.",
                context: ["Social conversations", "Casual meetings", "Friendly interactions"],
                examples: ["Talking with a colleague", "Standing in line", "Casual social gathering"]
            },
            {
                name: "Social Distance",
                description: "4 to 12 feet - appropriate for formal business interactions and public speaking.",
                meaning: "Maintains professional boundaries. Used in business settings, presentations, and formal situations.",
                context: ["Business meetings", "Presentations", "Formal interactions"],
                examples: ["Giving a presentation", "Business negotiation", "Formal interview"]
            }
        ]
    },
    {
        category: "Deception Indicators",
        description: "Specific body language cues that may indicate deception, though they should be interpreted in context.",
        signals: [
            {
                name: "Baseline Deviation",
                description: "Changes from a person's normal body language patterns when discussing specific topics.",
                meaning: "Significant deviations from baseline behavior can indicate stress, discomfort, or potential deception related to that topic.",
                context: ["Interviews", "Investigations", "Relationship discussions"],
                examples: ["Sudden change in posture when topic changes", "Increased fidgeting on specific questions", "Unusual gestures not seen before"]
            },
            {
                name: "Self-Touching",
                description: "Excessive touching of face, neck, or body, especially when answering questions.",
                meaning: "Can indicate anxiety, stress, or discomfort. Often increases when someone is being deceptive or uncomfortable.",
                context: ["Stress situations", "Deception detection", "Anxiety assessment"],
                examples: ["Rubbing neck repeatedly", "Touching face during answers", "Scratching arms or hands"]
            },
            {
                name: "Inconsistency Between Channels",
                description: "Mismatch between verbal message and body language, or between different body language signals.",
                meaning: "When words say one thing but body language says another, the body language is often more truthful. Indicates potential deception or internal conflict.",
                context: ["Deception detection", "Emotional assessment", "Communication analysis"],
                examples: ["Saying 'yes' while shaking head 'no'", "Smiling while eyes show sadness", "Confident words with closed posture"]
            }
        ]
    }
];

export const bodyLanguageConcepts: { [key: string]: { description: string; keyPoints: string[]; examples: string[] } } = {
    "Facial Expressions": {
        description: "Facial expressions are universal indicators of emotion and can reveal true feelings even when words try to conceal them.",
        keyPoints: [
            "Microexpressions last 1/25th to 1/5th of a second and reveal concealed emotions",
            "Genuine smiles (Duchenne smiles) involve both mouth and eyes",
            "Eye contact should be maintained 60-70% of conversation for confidence",
            "Facial expressions are more reliable indicators of emotion than words"
        ],
        examples: [
            "A flash of anger during a polite conversation",
            "Genuine smile with crinkled eyes vs. fake smile with only mouth movement",
            "Avoiding eye contact when discussing uncomfortable topics"
        ]
    },
    "Posture and Power": {
        description: "Body posture communicates confidence, status, and emotional state. Power poses can actually influence confidence and hormone levels.",
        keyPoints: [
            "Open posture (uncrossed arms/legs) indicates receptiveness and confidence",
            "Closed posture (crossed limbs) suggests defensiveness or disagreement",
            "Power poses increase testosterone and decrease cortisol",
            "Mirroring indicates rapport and positive engagement"
        ],
        examples: [
            "Standing with hands on hips before an important presentation",
            "Crossing arms during a disagreement",
            "Unconsciously matching someone's sitting position"
        ]
    },
    "Gestures and Hand Movements": {
        description: "Hand gestures emphasize communication and can reveal thinking patterns, confidence levels, and potential deception.",
        keyPoints: [
            "Hand-to-face gestures often indicate deception or anxiety",
            "Steepling (fingertips together) shows confidence and authority",
            "Palm position communicates dominance (down), submission (up), or equality (vertical)",
            "Excessive self-touching can indicate stress or discomfort"
        ],
        examples: [
            "Touching nose while answering a difficult question",
            "Steepling fingers while explaining expertise",
            "Open palm gesture when asking for something"
        ]
    },
    "Personal Space (Proxemics)": {
        description: "The distance people maintain during interactions communicates relationship level, comfort, and cultural norms.",
        keyPoints: [
            "Intimate distance (0-18 inches) is for close relationships only",
            "Personal distance (18 inches-4 feet) is standard for social interactions",
            "Social distance (4-12 feet) is appropriate for business and formal settings",
            "Invading personal space can indicate aggression or cultural misunderstanding"
        ],
        examples: [
            "Standing very close to intimidate in a confrontation",
            "Maintaining comfortable distance during a business meeting",
            "Cultural differences in acceptable conversation distance"
        ]
    },
    "Deception Detection": {
        description: "While no single cue definitively indicates deception, clusters of behaviors can suggest when someone may not be telling the truth.",
        keyPoints: [
            "Baseline deviation - changes from normal behavior patterns",
            "Inconsistency between verbal and non-verbal channels",
            "Increased self-touching and fidgeting",
            "Microexpressions revealing concealed emotions",
            "Context is crucial - these behaviors can also indicate stress or anxiety"
        ],
        examples: [
            "Sudden change in posture when a specific topic is mentioned",
            "Saying 'yes' while shaking head 'no'",
            "Increased blinking and face-touching when answering difficult questions"
        ]
    }
};

