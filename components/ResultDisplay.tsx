import React from 'react';
import type { AnalysisResult } from '../types';
import Loader from './Loader';
import { GhoulIcon } from './Icons';

interface ResultDisplayProps {
  analysisResult: AnalysisResult | null;
  ghostImageUrl: string | null;
  loadingState: 'idle' | 'analyzing' | 'creating';
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysisResult, ghostImageUrl, loadingState, error }) => {
  
  const renderContent = () => {
    // FIX: The original code showed a full-page loader for both 'analyzing' and 'creating' states,
    // which prevented the analysis results from being displayed while the image was being created.
    // This also caused a TypeScript error because the check for `loadingState === 'creating'` later on was unreachable.
    // By only showing the full loader during the 'analyzing' phase, we fix the UI logic and the TypeScript error.
    if (loadingState === 'analyzing') {
      return <Loader loadingState={loadingState} />;
    }

    if (error) {
      return (
        <div className="text-center text-red-400">
          <p className="font-bold">A spectral error occurred:</p>
          <p>{error}</p>
        </div>
      );
    }
    
    if (!analysisResult) {
        return (
             <div className="text-center text-slate-400 flex flex-col items-center justify-center h-full gap-4">
                <GhoulIcon className="w-24 h-24 text-slate-700"/>
                <p className="text-lg">Your ghost awaits its form...</p>
                <p>Fill out the profile on the left to reveal its essence.</p>
            </div>
        );
    }

    return (
      <>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">Soul Description</h3>
          <blockquote className="border-l-4 border-purple-400 pl-4 italic text-slate-300">
            {analysisResult.soul_description}
          </blockquote>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">Visual Prompt</h3>
          <p className="text-sm text-slate-400 bg-slate-900/50 p-3 rounded-md">
            {analysisResult.visual_prompt}
          </p>
        </div>

        <div className="aspect-square w-full bg-slate-900/50 rounded-lg flex items-center justify-center overflow-hidden">
            {loadingState === 'creating' ? (
                 <Loader loadingState={loadingState} />
            ) : ghostImageUrl ? (
                <img src={ghostImageUrl} alt={`${analysisResult.username}'s digital ghost`} className="w-full h-full object-cover" />
            ) : (
                <div className="text-slate-500">Image will appear here</div>
            )}
        </div>
      </>
    );
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col min-h-[500px] lg:min-h-0">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Your Spectral Self</h2>
        <div className="flex-grow flex flex-col justify-center">
            {renderContent()}
        </div>
    </div>
  );
};

export default ResultDisplay;
