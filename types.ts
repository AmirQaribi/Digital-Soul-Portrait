export interface ProfileData {
  username: string;
  bio: string;
  latestPost: string;
  moodWords: string;
  emojis: string;
}

export interface AnalysisResult {
  username: string;
  soul_description: string;
  visual_prompt: string;
}

export interface StoredImage {
  id?: number;
  url: string;
  timestamp: number;
}
