import { DSMPracticeQuestion } from '../types';

export interface BodyLanguagePracticeQuestion {
    id: number;
    scenario: string;
    cues: string[];
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export const bodyLanguagePrewrittenGameData: BodyLanguagePracticeQuestion[] = [
    {
        id: 1,
        scenario: "During a job interview, the candidate maintains steady eye contact about 65% of the time, sits with an open posture (uncrossed arms and legs), and occasionally uses hand gestures that match their speech. When asked about a challenging project, they briefly touch their nose before answering.",
        cues: ["steady eye contact about 65%", "open posture", "briefly touch their nose"],
        options: [
            "Confident and engaged, with minor stress on the challenging question",
            "Deceptive and trying to hide something",
            "Disinterested and bored",
            "Aggressive and confrontational"
        ],
        correctAnswer: "Confident and engaged, with minor stress on the challenging question",
        explanation: "The candidate shows strong positive signals: appropriate eye contact (60-70% is ideal), open posture indicating receptiveness, and matching gestures. The brief nose touch on the challenging question is a minor stress indicator, which is normal when discussing difficult topics."
    },
    {
        id: 2,
        scenario: "In a negotiation, one person sits with their arms crossed, legs crossed away from the other person, and maintains minimal eye contact. When the other person makes an offer, they lean back in their chair and look away.",
        cues: ["arms crossed", "legs crossed away", "minimal eye contact", "leans back and looks away"],
        options: [
            "Open and receptive to the offer",
            "Defensive and likely disagreeing with the proposal",
            "Confident and in control",
            "Bored and uninterested"
        ],
        correctAnswer: "Defensive and likely disagreeing with the proposal",
        explanation: "This is a classic closed posture - crossed arms and legs create a physical barrier. The body turned away, minimal eye contact, and leaning back all indicate defensiveness and likely disagreement with the proposal."
    },
    {
        id: 3,
        scenario: "A speaker is giving a presentation. They stand with their hands on their hips, chest slightly out, and make expansive gestures. Their voice is clear and they maintain eye contact with the audience while speaking.",
        cues: ["hands on their hips", "chest slightly out", "expansive gestures", "clear voice", "maintains eye contact"],
        options: [
            "Nervous and uncertain",
            "Using power posing to project confidence and authority",
            "Aggressive and confrontational",
            "Disengaged and uninterested"
        ],
        correctAnswer: "Using power posing to project confidence and authority",
        explanation: "This is a power pose - the 'superman' stance with hands on hips and expanded chest. Combined with expansive gestures, clear voice, and eye contact, this indicates confidence and authority. Power poses can actually increase confidence and reduce stress hormones."
    },
    {
        id: 4,
        scenario: "Two people are having a conversation. Person A crosses their legs to the right. A few moments later, Person B unconsciously crosses their legs to the right as well. They also begin matching each other's hand gestures during the conversation.",
        cues: ["Person A crosses legs to the right", "Person B crosses legs to the right", "matching hand gestures"],
        options: [
            "They are in conflict and competing",
            "They have built rapport and are mirroring each other",
            "They are both uncomfortable",
            "They are trying to deceive each other"
        ],
        correctAnswer: "They have built rapport and are mirroring each other",
        explanation: "This is mirroring - unconsciously copying another person's body language. Mirroring indicates rapport, connection, and positive engagement. It happens naturally when people feel comfortable with each other and is a sign of good communication."
    },
    {
        id: 5,
        scenario: "Someone is telling a story with a big smile, but their eyes don't crinkle and there are no crow's feet. Their smile appears only on their mouth, and their eyes remain neutral.",
        cues: ["big smile", "eyes don't crinkle", "no crow's feet", "smile only on mouth", "eyes remain neutral"],
        options: [
            "Genuine happiness and joy (Duchenne smile)",
            "Fake or polite smile without true emotion",
            "Nervous smile indicating anxiety",
            "Aggressive smile showing dominance"
        ],
        correctAnswer: "Fake or polite smile without true emotion",
        explanation: "A genuine smile (Duchenne smile) involves both the mouth and eyes - the eyes crinkle and crow's feet appear. A fake smile only involves the mouth muscles. This indicates politeness, social convention, or possibly concealing true emotions, but not genuine happiness."
    },
    {
        id: 6,
        scenario: "During a conversation, someone maintains eye contact about 90% of the time with an intense, unbroken stare. They rarely blink and lean slightly forward. The other person appears uncomfortable and looks away frequently.",
        cues: ["eye contact about 90%", "intense, unbroken stare", "rarely blinks", "leans slightly forward", "other person uncomfortable"],
        options: [
            "Friendly and engaging",
            "Aggressive or intimidating behavior",
            "Deceptive and trying to hide something",
            "Confident and professional"
        ],
        correctAnswer: "Aggressive or intimidating behavior",
        explanation: "While 60-70% eye contact is ideal for confidence, 90% with an intense, unbroken stare is excessive and can be perceived as aggressive or intimidating. The lack of blinking and forward lean, combined with the other person's discomfort, indicates this is threatening behavior rather than friendly engagement."
    },
    {
        id: 7,
        scenario: "A person is answering questions. They say 'Yes, I'm completely sure about that' while simultaneously shaking their head from side to side. Their arms are crossed, and they're avoiding direct eye contact.",
        cues: ["says 'Yes'", "shaking head from side to side", "arms crossed", "avoiding direct eye contact"],
        options: [
            "Confident and certain",
            "Inconsistency between verbal and non-verbal channels indicating potential deception",
            "Agreeable and open",
            "Professional and authoritative"
        ],
        correctAnswer: "Inconsistency between verbal and non-verbal channels indicating potential deception",
        explanation: "This is a clear example of channel inconsistency - the words say one thing (yes) while the body language says another (head shake means no). Combined with closed posture (crossed arms) and avoiding eye contact, this suggests the person may not be telling the truth or is uncertain about their answer."
    },
    {
        id: 8,
        scenario: "Someone is sitting in a meeting with their fingertips touching to form a steeple shape. They maintain this position while listening and occasionally raise the steeple when making a point. Their posture is upright and open.",
        cues: ["fingertips touching to form steeple", "maintains while listening", "raises when making point", "upright and open posture"],
        options: [
            "Nervous and uncertain",
            "Confident and authoritative, indicating knowledge and expertise",
            "Bored and disengaged",
            "Aggressive and confrontational"
        ],
        correctAnswer: "Confident and authoritative, indicating knowledge and expertise",
        explanation: "Steepling (bringing fingertips together) is a classic confidence gesture. It indicates authority, knowledge, and self-assurance. When maintained while listening and raised when speaking, it shows the person feels confident in their position and expertise."
    },
    {
        id: 9,
        scenario: "During a conversation, one person stands about 2 feet away from the other, which is comfortable for both. However, when discussing a sensitive topic, the other person takes a step back, increasing the distance to about 4 feet.",
        cues: ["2 feet away initially", "comfortable for both", "sensitive topic", "takes step back to 4 feet"],
        options: [
            "They are building closer rapport",
            "They are creating more personal space due to discomfort with the topic",
            "They are being aggressive",
            "They are showing increased engagement"
        ],
        correctAnswer: "They are creating more personal space due to discomfort with the topic",
        explanation: "Personal distance (18 inches to 4 feet) is standard for social interactions. When someone increases distance in response to a topic change, it's a baseline deviation indicating discomfort. They're creating a physical barrier to match their emotional need for more space on the sensitive topic."
    },
    {
        id: 10,
        scenario: "A person is speaking and frequently touches their face, rubs their neck, and scratches their arms. These behaviors increase significantly when asked about specific topics, but decrease when discussing comfortable subjects.",
        cues: ["frequently touches face", "rubs neck", "scratches arms", "increases on specific topics", "decreases on comfortable subjects"],
        options: [
            "Confident and relaxed",
            "Baseline deviation - increased self-touching indicates stress or potential deception on those topics",
            "Showing engagement and interest",
            "Professional and authoritative"
        ],
        correctAnswer: "Baseline deviation - increased self-touching indicates stress or potential deception on those topics",
        explanation: "Excessive self-touching can indicate anxiety or stress. When these behaviors increase specifically on certain topics (baseline deviation) but decrease on comfortable subjects, it suggests those topics cause discomfort, stress, or potentially indicate areas where the person may not be fully truthful."
    }
];

