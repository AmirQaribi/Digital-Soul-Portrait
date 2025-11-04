import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { ProfileData, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    username: {
      type: Type.STRING,
      description: "The user's username.",
    },
    soul_description: {
      type: Type.STRING,
      description: "A gentle dreamer who hides melancholy behind code and coffee.",
    },
    visual_prompt: {
      type: Type.STRING,
      description: "A soft white ghost wearing headphones and holding a laptop glowing neon blue, floating over a midnight screen with gentle light reflections.",
    },
  },
  required: ["username", "soul_description", "visual_prompt"],
};

export const analyzeProfile = async (profileData: ProfileData): Promise<AnalysisResult> => {
    const prompt = `
    You are an AI creative artist and personality analyst.
    Your task is to analyze a social media profile and generate a poetic "digital soul" description,
    then design a concept for an illustrated ghost character that visually represents that user's online essence.

    ### Input Profile Data:
    - Username: ${profileData.username}
    - Bio: ${profileData.bio}
    - Latest Post: ${profileData.latestPost}
    - Mood Words: ${profileData.moodWords}
    - Emojis: ${profileData.emojis}

    ### Step 1 — Personality & Mood Analysis:
    Analyze the tone, writing style, emojis, and topics.
    Summarize the personality in one short poetic paragraph (max 2 sentences).
    Include emotional energy (calm, chaotic, dreamy, ironic, etc.) and social vibe (introverted, expressive, mysterious, etc.).

    ### Step 2 — Visual Concept Description:
    Imagine a small friendly ghost (white sheet style 👻) that embodies this user's "digital aura".
    Describe:
    - Ghost’s appearance (accessories, color palette, texture of the sheet)
    - Facial expression and posture
    - Background mood (like a small scene or abstract glow)
    - Optional props inspired by user’s interests or last post
    Keep it vivid but minimalist — it should be simple enough for a meme-style image.

    ### Step 3 — Output Format:
    Return your result in JSON format matching the provided schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: analysisSchema,
            },
        });
        
        const text = response.text.trim();
        const result: AnalysisResult = JSON.parse(text);
        return result;

    } catch (error) {
        console.error("Error analyzing profile:", error);
        throw new Error("Failed to analyze profile. The AI may be feeling spectral today.");
    }
};

export const generateGhostImage = async (visualPrompt: string): Promise<string> => {
    const fullPrompt = `${visualPrompt}. The image should be a 2D anime-style sticker with a distinct stroke border and a subtle textured paper detail.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("No image data found in the response.");
        
    } catch (error) {
        console.error("Error generating ghost image:", error);
        throw new Error("Failed to generate the ghost image. The ether seems to be unstable.");
    }
};

type FieldName = 'bio' | 'latestPost' | 'moodWords' | 'emojis';

export const generateFieldSuggestion = async (field: FieldName): Promise<string> => {
    let prompt = '';
    switch (field) {
        case 'bio':
            prompt = 'Generate a short, creative, and slightly mysterious social media bio (around 10-15 words). Example: "Navigating digital streams and starlight. Probably drinking coffee." without Introduction';
            break;
        case 'latestPost':
            prompt = 'Generate a short, reflective social media post, like a tweet (around 20-25 words). Example: "Finished a big project today. The quiet hum of the city at night feels like a reward.|ithout Introduction"';
            break;
        case 'moodWords':
            prompt = 'Generate 3-4 descriptive mood words, separated by commas. Example: "ethereal, focused, nostalgic, calm" single line';
            break;
        case 'emojis':
            prompt = 'Generate a sequence of 4-5 emojis that tell a small story or convey a specific vibe. Example: "😂🍌😎😴" single line without Introduction or any other texts';
            break;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                stopSequences: ['\n'],
            },
        });

        const text = response.text.trim();
        return text.replace(/^"|"$/g, '');

    } catch (error) {
        console.error(`Error generating suggestion for ${field}:`, error);
        throw new Error(`The AI couldn't conjure a suggestion for ${field}.`);
    }
};
