
import { Big5Trait } from '../types';

export const big5Data: { [key: string]: Big5Trait } = {
    "Openness": {
        description: "This trait features characteristics such as imagination and insight. People who are high in this trait also tend to have a broad range of interests.",
        positive_correlations: ["Creative", "Curious", "Artistic", "Imaginative", "Wide interests"],
        negative_correlations: ["Conventional", "Down-to-earth", "Practical", "Prefers routine", "Uncreative"],
        comparison_points: {
            'Core Idea': 'Appreciation for art, emotion, adventure, unusual ideas, curiosity, and variety of experience.',
            'High Scorers': 'Tend to be intellectually curious, open to emotion, sensitive to beauty and willing to try new things.',
            'Low Scorers': 'Tend to be conventional, prefer familiarity over novelty, and have more traditional interests.'
        }
    },
    "Conscientiousness": {
        description: "Standard features of this dimension include high levels of thoughtfulness, good impulse control, and goal-directed behaviors.",
        positive_correlations: ["Organized", "Dependable", "Hardworking", "Disciplined", "Punctual"],
        negative_correlations: ["Disorganized", "Careless", "Impulsive", "Lazy", "Spontaneous"],
         comparison_points: {
            'Core Idea': 'A tendency to be organized and dependable, show self-discipline, act dutifully, aim for achievement.',
            'High Scorers': 'Prefer planned rather than spontaneous behavior. They are often seen as hardworking and reliable.',
            'Low Scorers': 'Tend to be more flexible and spontaneous; but can be perceived as sloppy and unreliable.'
        }
    },
    "Extraversion": {
        description: "This trait includes characteristics such as excitability, sociability, talkativeness, assertiveness, and high amounts of emotional expressiveness.",
        positive_correlations: ["Sociable", "Fun-loving", "Affectionate", "Talkative", "Energetic"],
        negative_correlations: ["Reserved", "Sober", "Loner", "Quiet", "Passive"],
        comparison_points: {
            'Core Idea': 'Energy, positive emotions, surgency, assertiveness, sociability and the tendency to seek stimulation in the company of others.',
            'High Scorers': 'Are often described as being full of life, energy, and positivity. In groups, they are talkative and assertive.',
            'Low Scorers': '(Introverts) have lower social engagement and energy levels. They tend to seem quiet, low-key, and less involved in the social world.'
        }
    },
    "Agreeableness": {
        description: "This personality dimension includes attributes such as trust, altruism, kindness, affection, and other prosocial behaviors.",
        positive_correlations: ["Trusting", "Helpful", "Forgiving", "Soft-hearted", "Good-natured"],
        negative_correlations: ["Suspicious", "Uncooperative", "Ruthless", "Irritable", "Critical"],
         comparison_points: {
            'Core Idea': 'A tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others.',
            'High Scorers': 'Are generally considerate, friendly, generous, helpful, and willing to compromise their interests with others.',
            'Low Scorers': 'Place self-interest above getting along with others. They are often unconcerned with others’ well-being.'
        }
    },
    "Neuroticism": {
        description: "Individuals high in this trait tend to experience emotional instability, anxiety, moodiness, irritability, and sadness.",
        positive_correlations: ["Anxious", "Insecure", "Self-pitying", "Moody", "Worried"],
        negative_correlations: ["Calm", "Secure", "Self-satisfied", "Emotionally stable", "Relaxed"],
         comparison_points: {
            'Core Idea': 'The tendency to experience negative emotions, such as anger, anxiety, or depression. Sometimes called emotional instability.',
            'High Scorers': 'Are more likely to interpret ordinary situations as threatening. They may have trouble thinking clearly and coping with stress.',
            'Low Scorers': 'Are less easily upset and are less emotionally reactive. They tend to be calm, emotionally stable, and free from persistent negative feelings.'
        }
    }
};
