import React, { useState } from 'react';
import type { ProfileData } from '../types';
import { GeminiStarIcon } from './Icons';
import { generateFieldSuggestion } from '../services/geminiService';

type FieldName = 'bio' | 'latestPost' | 'moodWords' | 'emojis';

interface InputFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ profileData, setProfileData, onSubmit, isLoading }) => {
  const [generatingField, setGeneratingField] = useState<FieldName | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (field: FieldName) => {
    if (generatingField) return;
    setGeneratingField(field);
    try {
      const suggestion = await generateFieldSuggestion(field);
      setProfileData(prev => ({ ...prev, [field]: suggestion }));
    } catch (error) {
      console.error(`Failed to generate suggestion for ${field}:`, error);
    } finally {
      setGeneratingField(null);
    }
  };
  
  const isGenerating = !!generatingField;

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Summon Your Digital Ghost</h2>
      <p className="text-slate-400 mb-6">Fill in the details below to analyze your digital soul.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">X account Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            disabled
            placeholder="e.g., @spectral_user"
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-60"
          />
        </div>
        
        <div className="relative">
          <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            rows={2}
            placeholder="e.g., Coder, dreamer, coffee enthusiast."
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition resize-none pr-10"
            required
          />
           <button
            type="button"
            onClick={() => handleGenerate('bio')}
            disabled={isGenerating}
            className="absolute bottom-2.5 right-2.5 p-1 text-slate-400 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Generate Bio suggestion"
          >
            <GeminiStarIcon className={`w-5 h-5 ${generatingField === 'bio' ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="relative">
          <label htmlFor="latestPost" className="block text-sm font-medium text-slate-300 mb-1">Latest Post or Tweet</label>
          <textarea
            id="latestPost"
            name="latestPost"
            value={profileData.latestPost}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., 'Just shipped a new feature, now time for some lo-fi beats.'"
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition resize-none pr-10"
            required
          />
          <button
            type="button"
            onClick={() => handleGenerate('latestPost')}
            disabled={isGenerating}
            className="absolute bottom-2.5 right-2.5 p-1 text-slate-400 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Generate Latest Post suggestion"
          >
            <GeminiStarIcon className={`w-5 h-5 ${generatingField === 'latestPost' ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="relative">
          <label htmlFor="moodWords" className="block text-sm font-medium text-slate-300 mb-1">Mood Words</label>
          <input
            type="text"
            id="moodWords"
            name="moodWords"
            value={profileData.moodWords}
            onChange={handleChange}
            placeholder="e.g., chill, focused, creative, melancholic"
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition pr-10"
          />
          <button
            type="button"
            onClick={() => handleGenerate('moodWords')}
            disabled={isGenerating}
            className="absolute top-8 right-2.5 p-1 text-slate-400 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Generate Mood Words suggestion"
          >
            <GeminiStarIcon className={`w-5 h-5 ${generatingField === 'moodWords' ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="relative">
          <label htmlFor="emojis" className="block text-sm font-medium text-slate-300 mb-1">Favorite Emojis</label>
          <input
            type="text"
            id="emojis"
            name="emojis"
            value={profileData.emojis}
            onChange={handleChange}
            placeholder="e.g., 💻☕️✨🌙"
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition pr-10"
          />
           <button
            type="button"
            onClick={() => handleGenerate('emojis')}
            disabled={isGenerating}
            className="absolute top-8 right-2.5 p-1 text-slate-400 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Generate Emojis suggestion"
          >
            <GeminiStarIcon className={`w-5 h-5 ${generatingField === 'emojis' ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          <GeminiStarIcon className="w-5 h-5" />
          {isLoading ? 'Conjuring...' : 'Analyze & Create Ghost'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;