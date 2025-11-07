
import { Flashcard } from '../types';

export const initialFlashcards: { [deckName: string]: Omit<Flashcard, 'imageUrl'>[] } = {
    // ========== DSM-5 DISORDERS ==========
    "Schizophrenia": [
        {
            id: "schizophrenia-symptoms-1",
            deck: "Schizophrenia",
            front: "What are the required symptoms for a schizophrenia diagnosis?",
            back: "Two (or more) of the following must be present for a significant portion of time during a 1-month period: (1) Delusions, (2) Hallucinations, (3) Disorganized speech, (4) Grossly disorganized or catatonic behavior, (5) Negative symptoms. At least one must be delusions, hallucinations, or disorganized speech.",
            imagePrompt: "A brain with multiple thought bubbles showing different symptoms like voices, confused thoughts, and emotional flatness"
        },
        {
            id: "schizophrenia-duration-1",
            deck: "Schizophrenia",
            front: "What is the minimum duration required for continuous signs of schizophrenia to persist?",
            back: "Continuous signs of the disturbance must persist for at least 6 months. This includes at least 1 month of active-phase symptoms (delusions, hallucinations, disorganized speech, grossly disorganized behavior, or negative symptoms).",
            imagePrompt: "A calendar showing six months with brain activity patterns changing over time"
        }
    ],
    "Schizoaffective Disorder": [
        {
            id: "schizoaffective-def-1",
            deck: "Schizoaffective Disorder",
            front: "What distinguishes Schizoaffective Disorder from Schizophrenia?",
            back: "Schizoaffective Disorder requires both symptoms of schizophrenia AND symptoms of a mood disorder (mania or depression) occurring concurrently. Additionally, delusions or hallucinations must occur for 2+ weeks in the absence of a major mood episode during the illness.",
            imagePrompt: "A split brain showing both psychotic symptoms and mood symptoms overlapping"
        },
        {
            id: "schizoaffective-mood-1",
            deck: "Schizoaffective Disorder",
            front: "What is the relationship between mood symptoms and psychotic symptoms in Schizoaffective Disorder?",
            back: "Symptoms that meet criteria for a major mood episode must be present for the majority of the total duration of the illness. The mood and psychotic symptoms occur together, but psychotic symptoms can also occur independently for at least 2 weeks.",
            imagePrompt: "A timeline showing mood episodes and psychotic episodes overlapping and separate"
        }
    ],
    "Bipolar I Disorder": [
        {
            id: "bipolar-manic-1",
            deck: "Bipolar I Disorder",
            front: "What defines a manic episode in Bipolar I Disorder?",
            back: "A manic episode is a distinct period of abnormally and persistently elevated, expansive, or irritable mood and increased goal-directed activity or energy, lasting at least 1 week (or requiring hospitalization). The mood disturbance must be severe enough to cause marked impairment.",
            imagePrompt: "A person with high energy, racing thoughts, and elevated mood with upward arrows and bright colors"
        },
        {
            id: "bipolar-diagnosis-1",
            deck: "Bipolar I Disorder",
            front: "What is required for a Bipolar I Disorder diagnosis?",
            back: "Criteria must be met for at least one manic episode. The manic episode may be preceded or followed by hypomanic or major depressive episodes. Psychotic symptoms, if present, occur exclusively during a major mood episode.",
            imagePrompt: "A mood chart showing extreme highs (mania) and lows (depression) over time"
        }
    ],
    "Major Depressive Disorder (MDD)": [
        {
            id: "mdd-symptoms-1",
            deck: "Major Depressive Disorder (MDD)",
            front: "How many symptoms are required for a Major Depressive Episode diagnosis?",
            back: "Five (or more) symptoms must be present during the same 2-week period. At least one of the symptoms must be either (1) depressed mood or (2) loss of interest or pleasure. Other symptoms include weight changes, sleep disturbances, fatigue, feelings of worthlessness, and difficulty concentrating.",
            imagePrompt: "A person with a dark cloud overhead showing five different symptoms like sadness, sleep problems, and loss of energy"
        },
        {
            id: "mdd-duration-1",
            deck: "Major Depressive Disorder (MDD)",
            front: "What is the minimum duration for symptoms in Major Depressive Disorder?",
            back: "Symptoms must be present during the same 2-week period and represent a change from previous functioning. The symptoms must cause clinically significant distress or impairment in social, occupational, or other important areas of functioning.",
            imagePrompt: "A calendar showing two weeks with a downward trending emotional graph"
        }
    ],
    "Persistent Depressive Disorder (Dysthymia)": [
        {
            id: "dysthymia-duration-1",
            deck: "Persistent Depressive Disorder (Dysthymia)",
            front: "What is the duration requirement for Persistent Depressive Disorder?",
            back: "Depressed mood for most of the day, for more days than not, for at least 2 years. During this 2-year period, the individual has never been without symptoms for more than 2 months at a time.",
            imagePrompt: "A long timeline showing two years of persistent low mood with brief breaks"
        },
        {
            id: "dysthymia-symptoms-1",
            deck: "Persistent Depressive Disorder (Dysthymia)",
            front: "What symptoms are required for Persistent Depressive Disorder?",
            back: "While depressed, two (or more) of the following must be present: poor appetite or overeating, insomnia or hypersomnia, low energy, low self-esteem, poor concentration, feelings of hopelessness. The symptoms cause clinically significant distress or impairment.",
            imagePrompt: "A person showing chronic low energy, poor concentration, and feelings of hopelessness over time"
        }
    ],
    "Generalized Anxiety Disorder": [
        {
            id: "gad-duration-1",
            deck: "Generalized Anxiety Disorder",
            front: "What is the duration requirement for Generalized Anxiety Disorder?",
            back: "Excessive anxiety and worry must occur more days than not for at least 6 months. The worry must be about a number of events or activities (not just one specific thing), and the individual must find it difficult to control the worry.",
            imagePrompt: "A calendar showing six months with worry symbols and anxious thoughts throughout"
        },
        {
            id: "gad-symptoms-1",
            deck: "Generalized Anxiety Disorder",
            front: "What physical symptoms are associated with Generalized Anxiety Disorder?",
            back: "The anxiety must be associated with three (or more) of the following six symptoms: (1) restlessness or feeling keyed up, (2) being easily fatigued, (3) difficulty concentrating or mind going blank, (4) irritability, (5) muscle tension, (6) sleep disturbance.",
            imagePrompt: "A person showing multiple physical symptoms: tense muscles, tiredness, restlessness, and difficulty sleeping"
        }
    ],
    "Social Anxiety Disorder (SAD)": [
        {
            id: "sad-fear-1",
            deck: "Social Anxiety Disorder (SAD)",
            front: "What is the core fear in Social Anxiety Disorder?",
            back: "Marked fear or anxiety about one or more social situations in which the individual is exposed to possible scrutiny by others. The individual fears that they will act in a way or show anxiety symptoms that will be negatively evaluated.",
            imagePrompt: "A person feeling anxious in a social gathering with eyes watching them, feeling judged"
        },
        {
            id: "sad-duration-1",
            deck: "Social Anxiety Disorder (SAD)",
            front: "What is the duration requirement for Social Anxiety Disorder?",
            back: "The fear, anxiety, or avoidance is persistent, typically lasting for 6 months or more. The fear or anxiety causes clinically significant distress or impairment in social, occupational, or other important areas of functioning.",
            imagePrompt: "A timeline showing persistent social avoidance and anxiety over six months"
        }
    ],
    "Panic Disorder": [
        {
            id: "panic-attacks-1",
            deck: "Panic Disorder",
            front: "What defines a panic attack in Panic Disorder?",
            back: "Recurrent unexpected panic attacks. An abrupt surge of intense fear or discomfort that reaches a peak within minutes. The attacks are unexpected and not triggered by a specific situation.",
            imagePrompt: "A person experiencing sudden intense fear with physical symptoms like rapid heartbeat and shortness of breath"
        },
        {
            id: "panic-behavior-1",
            deck: "Panic Disorder",
            front: "What behavior changes are required after panic attacks for Panic Disorder diagnosis?",
            back: "At least one of the attacks has been followed by 1 month (or more) of: (1) Persistent concern about additional panic attacks, or (2) A significant maladaptive change in behavior related to the attacks (such as avoidance of situations).",
            imagePrompt: "A person avoiding situations and worrying about future panic attacks"
        }
    ],
    "Obsessive-Compulsive Disorder (OCD)": [
        {
            id: "ocd-symptoms-1",
            deck: "Obsessive-Compulsive Disorder (OCD)",
            front: "What are the core features of Obsessive-Compulsive Disorder?",
            back: "Presence of obsessions (intrusive, unwanted thoughts), compulsions (repetitive behaviors), or both. The individual attempts to ignore or suppress obsessions, or to neutralize them with compulsions. Symptoms are recognized as excessive or unreasonable (ego-dystonic).",
            imagePrompt: "A person trapped in a cycle of obsessive thoughts and compulsive behaviors, feeling distressed"
        },
        {
            id: "ocd-impairment-1",
            deck: "Obsessive-Compulsive Disorder (OCD)",
            front: "What level of impairment is required for OCD diagnosis?",
            back: "The obsessions or compulsions are time-consuming (e.g., taking more than 1 hour per day) or cause clinically significant distress or impairment in social, occupational, or other important areas of functioning.",
            imagePrompt: "A clock showing hours consumed by repetitive behaviors and thoughts"
        }
    ],
    "Obsessive-Compulsive Personality Disorder (OCPD)": [
        {
            id: "ocpd-traits-1",
            deck: "Obsessive-Compulsive Personality Disorder (OCPD)",
            front: "What distinguishes OCPD from OCD?",
            back: "OCPD involves a pervasive pattern of preoccupation with orderliness, perfectionism, and control beginning by early adulthood. The individual views their rigid ways as normal and correct (ego-syntonic), unlike OCD where symptoms are ego-dystonic. OCPD does not involve true obsessions or compulsions.",
            imagePrompt: "A person with perfectly organized workspace who sees their behavior as correct and normal"
        },
        {
            id: "ocpd-pattern-1",
            deck: "Obsessive-Compulsive Personality Disorder (OCPD)",
            front: "What pattern of traits indicates OCPD?",
            back: "The pattern is indicated by four or more traits, such as perfectionism that interferes with task completion, preoccupation with details, excessive devotion to work, overconscientiousness, inability to discard objects, and rigidity.",
            imagePrompt: "A person showing multiple traits: perfectionism, excessive work, rigidity, and inability to discard items"
        }
    ],
    "Borderline Personality Disorder": [
        {
            id: "bpd-instability-1",
            deck: "Borderline Personality Disorder",
            front: "What are the core features of Borderline Personality Disorder?",
            back: "A pervasive pattern of instability of interpersonal relationships, self-image, and affects, along with marked impulsivity. This includes frantic efforts to avoid abandonment, unstable relationships, identity disturbance, and affective instability.",
            imagePrompt: "A person with unstable emotions, relationships, and self-image, showing rapid mood changes"
        },
        {
            id: "bpd-symptoms-1",
            deck: "Borderline Personality Disorder",
            front: "What specific symptoms characterize Borderline Personality Disorder?",
            back: "Key symptoms include: frantic efforts to avoid real or imagined abandonment, affective instability with marked reactivity of mood (lasting a few hours), chronic feelings of emptiness, inappropriate intense anger, and impulsivity in areas that are self-damaging.",
            imagePrompt: "A person showing fear of abandonment, intense anger, emotional instability, and impulsive behaviors"
        }
    ],
    "Post-traumatic Stress Disorder (PTSD)": [
        {
            id: "ptsd-exposure-1",
            deck: "Post-traumatic Stress Disorder (PTSD)",
            front: "What type of exposure is required for PTSD diagnosis?",
            back: "Exposure to actual or threatened death, serious injury, or sexual violence. This can occur through direct experience, witnessing the event, learning about it happening to a close family member or friend, or repeated exposure to aversive details.",
            imagePrompt: "A traumatic event scene showing exposure to threat, with a person witnessing or experiencing it"
        },
        {
            id: "ptsd-symptoms-1",
            deck: "Post-traumatic Stress Disorder (PTSD)",
            front: "What symptom clusters are required for PTSD?",
            back: "Presence of intrusion symptoms (recurrent memories, nightmares, flashbacks), persistent avoidance of trauma-related stimuli, negative alterations in cognition and mood, and marked alterations in arousal and reactivity. Duration must be more than 1 month.",
            imagePrompt: "A person experiencing flashbacks, avoiding triggers, negative thoughts, and hypervigilance"
        }
    ],

    // ========== BIG-5 TRAITS ==========
    "Openness": [
        {
            id: "openness-def-1",
            deck: "Openness",
            front: "What is the core idea of the Openness personality trait?",
            back: "Openness involves appreciation for art, emotion, adventure, unusual ideas, curiosity, and variety of experience. High scorers tend to be intellectually curious, open to emotion, sensitive to beauty, and willing to try new things. Low scorers tend to be conventional, prefer familiarity over novelty, and have more traditional interests.",
            imagePrompt: "An open door with colorful abstract art, books, and musical notes flowing through it representing curiosity and creativity"
        },
        {
            id: "openness-high-low-1",
            deck: "Openness",
            front: "What are the key characteristics of high vs. low scorers on Openness?",
            back: "High scorers: Creative, curious, artistic, imaginative, with wide interests. Low scorers: Conventional, down-to-earth, practical, prefer routine, uncreative. High scorers are intellectually curious and open to new experiences, while low scorers prefer familiarity and traditional approaches.",
            imagePrompt: "A split image showing a creative artist on one side and a person following a routine schedule on the other"
        }
    ],
    "Conscientiousness": [
        {
            id: "conscientiousness-def-1",
            deck: "Conscientiousness",
            front: "What does the Conscientiousness trait measure?",
            back: "Conscientiousness is the tendency to be organized and dependable, show self-discipline, act dutifully, and aim for achievement. High scorers prefer planned rather than spontaneous behavior and are often seen as hardworking and reliable. Low scorers tend to be more flexible and spontaneous but can be perceived as sloppy and unreliable.",
            imagePrompt: "A well-organized desk with a calendar, checklist, and clock showing punctuality and order"
        },
        {
            id: "conscientiousness-traits-1",
            deck: "Conscientiousness",
            front: "What are the positive and negative correlations of Conscientiousness?",
            back: "Positive correlations: Organized, dependable, hardworking, disciplined, punctual. Negative correlations: Disorganized, careless, impulsive, lazy, spontaneous. This trait reflects a person's level of self-control, organization, and goal-directed behavior.",
            imagePrompt: "A scale balancing organized structure with clocks and checklists on one side, and chaos with scattered items on the other"
        }
    ],
    "Extraversion": [
        {
            id: "extraversion-def-1",
            deck: "Extraversion",
            front: "What is the core idea of Extraversion?",
            back: "Extraversion involves energy, positive emotions, surgency, assertiveness, sociability, and the tendency to seek stimulation in the company of others. High scorers are often described as full of life, energy, and positivity, and are talkative and assertive in groups. Low scorers (introverts) have lower social engagement and energy levels.",
            imagePrompt: "A vibrant social gathering with people talking, laughing, and connecting with energy radiating outward"
        },
        {
            id: "extraversion-introversion-1",
            deck: "Extraversion",
            front: "How do extraverts differ from introverts?",
            back: "Extraverts (high scorers) are sociable, fun-loving, affectionate, talkative, and energetic. They seek stimulation and enjoy being around others. Introverts (low scorers) are reserved, sober, loners, quiet, and passive. They prefer less social engagement and lower energy environments.",
            imagePrompt: "A split scene showing a party with many people on one side and a quiet reading nook on the other"
        }
    ],
    "Agreeableness": [
        {
            id: "agreeableness-def-1",
            deck: "Agreeableness",
            front: "What does Agreeableness measure in personality?",
            back: "Agreeableness is the tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others. High scorers are generally considerate, friendly, generous, helpful, and willing to compromise. Low scorers place self-interest above getting along with others and are often unconcerned with others' well-being.",
            imagePrompt: "Hands reaching out to help others with a heart symbol in the center representing compassion and cooperation"
        },
        {
            id: "agreeableness-traits-1",
            deck: "Agreeableness",
            front: "What are the key characteristics of high and low Agreeableness?",
            back: "High scorers: Trusting, helpful, forgiving, soft-hearted, good-natured. Low scorers: Suspicious, uncooperative, ruthless, irritable, critical. This trait reflects how people interact with others and their level of empathy and cooperation.",
            imagePrompt: "A warm, friendly person helping others versus a distant, critical person standing alone"
        }
    ],
    "Neuroticism": [
        {
            id: "neuroticism-def-1",
            deck: "Neuroticism",
            front: "What is Neuroticism and what does it measure?",
            back: "Neuroticism is the tendency to experience negative emotions such as anger, anxiety, or depression. It's sometimes called emotional instability. High scorers are more likely to interpret ordinary situations as threatening and may have trouble thinking clearly and coping with stress. Low scorers are less easily upset and tend to be calm and emotionally stable.",
            imagePrompt: "A person with a storm cloud above their head on one side, and a calm person with clear skies on the other"
        },
        {
            id: "neuroticism-stability-1",
            deck: "Neuroticism",
            front: "How do high and low Neuroticism scorers differ in emotional responses?",
            back: "High scorers: Anxious, insecure, self-pitying, moody, worried. They experience more negative emotions and react more strongly to stress. Low scorers: Calm, secure, self-satisfied, emotionally stable, relaxed. They are less reactive to stress and maintain emotional equilibrium more easily.",
            imagePrompt: "An emotional roller coaster representing high neuroticism versus a steady, calm line representing low neuroticism"
        }
    ],

    // ========== BODY LANGUAGE CONCEPTS ==========
    "Facial Expressions": [
        {
            id: "facial-microexpressions-1",
            deck: "Facial Expressions",
            front: "What are microexpressions and what do they reveal?",
            back: "Microexpressions are brief, involuntary facial expressions that occur in a fraction of a second (1/25th to 1/5th of a second), revealing true emotions. They often reveal concealed emotions or deception and are difficult to fake or suppress. They occur before a person can consciously control their facial muscles.",
            imagePrompt: "A face showing a brief flash of emotion that quickly changes, representing a microexpression"
        },
        {
            id: "facial-smile-1",
            deck: "Facial Expressions",
            front: "How can you tell the difference between a genuine smile and a fake smile?",
            back: "A genuine smile (Duchenne smile) involves both the mouth and eyes - the eyes crinkle and crow's feet appear. A fake smile only involves the mouth muscles, with no eye involvement. Genuine smiles indicate true happiness, while fake smiles may indicate politeness or concealed emotions.",
            imagePrompt: "Two faces side by side: one with a genuine smile showing crinkled eyes, and one with only a mouth smile"
        }
    ],
    "Posture and Power": [
        {
            id: "posture-open-closed-1",
            deck: "Posture and Power",
            front: "What is the difference between open and closed posture?",
            back: "Open posture involves uncrossed arms and legs, facing others directly, indicating receptiveness, confidence, and engagement. Closed posture involves crossed limbs and turned-away body, suggesting defensiveness, discomfort, or disagreement. Open posture invites interaction, while closed posture creates barriers.",
            imagePrompt: "Two people: one with open arms and forward-facing stance, another with crossed arms and turned away"
        },
        {
            id: "posture-power-posing-1",
            deck: "Posture and Power",
            front: "What is power posing and what are its effects?",
            back: "Power posing involves expansive, open body positions that take up space (like hands on hips or arms spread). Research shows it can increase confidence and testosterone while decreasing cortisol. It indicates dominance and self-assurance, and can actually influence hormone levels and behavior.",
            imagePrompt: "A person in a power pose with hands on hips, chest out, taking up space confidently"
        }
    ],
    "Gestures and Hand Movements": [
        {
            id: "gestures-steepling-1",
            deck: "Gestures and Hand Movements",
            front: "What does steepling (bringing fingertips together) indicate?",
            back: "Steepling indicates confidence, authority, and knowledge. It's a gesture commonly seen in leadership positions and when people feel self-assured about their expertise. It shows the person feels confident in their position and is often used when making authoritative statements.",
            imagePrompt: "Hands with fingertips touching to form a steeple shape, representing confidence and authority"
        },
        {
            id: "gestures-palm-position-1",
            deck: "Gestures and Hand Movements",
            front: "What do different palm positions communicate?",
            back: "Open palm up: submission, openness, asking, non-threatening. Palm down: authority, dominance, commanding, controlling. Vertical palm: equality, partnership (as in a handshake). Palm position is a powerful indicator of power dynamics and intent in communication.",
            imagePrompt: "Three hand gestures: palm up showing openness, palm down showing authority, and vertical palm in a handshake"
        }
    ],
    "Personal Space (Proxemics)": [
        {
            id: "proxemics-distances-1",
            deck: "Personal Space (Proxemics)",
            front: "What are the different personal space distances and when are they appropriate?",
            back: "Intimate distance (0-18 inches): close relationships only, for hugging, whispering. Personal distance (18 inches-4 feet): standard for social interactions with friends. Social distance (4-12 feet): appropriate for business and formal settings. Public distance (12+ feet): for public speaking and presentations.",
            imagePrompt: "A diagram showing different distance zones with people at various distances from each other"
        },
        {
            id: "proxemics-invasion-1",
            deck: "Personal Space (Proxemics)",
            front: "What does it mean when someone invades personal space?",
            back: "Invading personal space without permission can indicate aggression, intimidation, or inappropriate behavior. It can also be a cultural misunderstanding. When someone steps back, they're creating distance due to discomfort with the proximity. Respecting personal space shows respect and appropriate boundaries.",
            imagePrompt: "One person standing too close to another, with the second person stepping back uncomfortably"
        }
    ],
    "Deception Detection": [
        {
            id: "deception-baseline-1",
            deck: "Deception Detection",
            front: "What is baseline deviation and why is it important in deception detection?",
            back: "Baseline deviation refers to changes from a person's normal body language patterns when discussing specific topics. Significant deviations can indicate stress, discomfort, or potential deception related to those topics. It's crucial to establish a baseline first by observing normal behavior, then noting changes.",
            imagePrompt: "A graph showing normal behavior baseline with a spike representing deviation when a specific topic is mentioned"
        },
        {
            id: "deception-inconsistency-1",
            deck: "Deception Detection",
            front: "What does inconsistency between verbal and non-verbal channels indicate?",
            back: "When words say one thing but body language says another, the body language is often more truthful. This channel inconsistency can indicate potential deception or internal conflict. Examples include saying 'yes' while shaking head 'no', or confident words with closed, defensive posture.",
            imagePrompt: "A person with conflicting signals: mouth saying one thing while body language shows another"
        }
    ]
};
