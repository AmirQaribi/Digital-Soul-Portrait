import React, { useState, useEffect } from 'react';
import { analyzeProfile, generateGhostImage } from './services/geminiService';
import { addImage, getAllImages } from './services/dbService';
import type { ProfileData, AnalysisResult, StoredImage } from './types';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import Gallery from './components/Gallery';
import { GhoulIcon, LightbulbIcon, LinkIcon, CosmicCubeIcon } from './components/Icons';

const App: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    bio: '',
    latestPost: '',
    moodWords: '',
    emojis: '',
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [ghostImageUrl, setGhostImageUrl] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<'idle' | 'analyzing' | 'creating'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<StoredImage[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  useEffect(() => {
    // Load images from IndexedDB on initial component mount
    const loadImages = async () => {
      setIsGalleryLoading(true);
      const images = await getAllImages();
      setGalleryImages(images);
      setIsGalleryLoading(false);
    };
    loadImages();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loadingState !== 'idle') return;

    setError(null);
    setAnalysisResult(null);
    setGhostImageUrl(null);
    setLoadingState('analyzing');

    try {
      const result = await analyzeProfile(profileData);
      setAnalysisResult(result);
      setLoadingState('creating');
      
      const imageUrl = await generateGhostImage(result.visual_prompt);
      setGhostImageUrl(imageUrl);
      
      // Save to DB and update state
      const newImage = await addImage(imageUrl);
      setGalleryImages(prev => [newImage, ...prev]);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setLoadingState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
             <GhoulIcon className="w-12 h-12 text-cyan-400"/>
             <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Digital Soul Portrait
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Unveil your online essence as a spectral illustration.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputForm
            profileData={profileData}
            setProfileData={setProfileData}
            onSubmit={handleSubmit}
            isLoading={loadingState !== 'idle'}
          />
          <ResultDisplay
            analysisResult={analysisResult}
            ghostImageUrl={ghostImageUrl}
            loadingState={loadingState}
            error={error}
          />
        </main>

        <Gallery images={galleryImages} isLoading={isGalleryLoading} />
        
        <footer className="text-center mt-24 text-slate-400" style={{ perspective: '1000px' }}>
           <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  About This Project
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1: The Spark */}
                  <div className="group bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 transform-style-preserve-3d hover:shadow-[0_0_25px_theme(colors.cyan.500/0.4)]">
                     <div className="transition-transform duration-500 group-hover:-translate-y-2 group-hover:[transform:rotateX(10deg)] flex flex-col items-center">
                        <LightbulbIcon className="w-10 h-10 mb-4 text-cyan-300"/>
                        <h3 className="text-xl font-bold text-cyan-300 mb-3">The Spark</h3>
                        <p className="text-sm text-slate-300">
                            This app is a conceptual MVP from an idea by <a href="https://github.com/AmirQaribi" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">AmirQaribi</a>, exploring how our digital footprint can be visualized as a unique piece of art.
                        </p>
                     </div>
                  </div>
                  {/* Card 2: The Vision */}
                   <div className="group bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-purple-400/50 transition-all duration-300 transform-style-preserve-3d hover:shadow-[0_0_25px_theme(colors.purple.500/0.4)]">
                     <div className="transition-transform duration-500 group-hover:-translate-y-2 group-hover:[transform:rotateX(10deg)] flex flex-col items-center">
                        <LinkIcon className="w-10 h-10 mb-4 text-purple-300"/>
                        <h3 className="text-xl font-bold text-purple-300 mb-3">The Vision</h3>
                        <p className="text-sm text-slate-300">
                            The ultimate vision is for this tool to connect to your X (formerly Twitter) account to automatically analyze your bio, tweets, and profile picture for a truly personalized 'soul portrait'.
                        </p>
                      </div>
                  </div>
                  {/* Card 3: The Invitation */}
                   <div className="group bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 transform-style-preserve-3d hover:shadow-[0_0_25px_theme(colors.cyan.500/0.4)]">
                      <div className="transition-transform duration-500 group-hover:-translate-y-2 group-hover:[transform:rotateX(10deg)] flex flex-col items-center">
                        <CosmicCubeIcon className="w-10 h-10 mb-4 text-cyan-300"/>
                        <h3 className="text-xl font-bold text-cyan-300 mb-3">The Invitation</h3>
                        <p className="text-sm text-slate-300">
                           This is just the beginning. We encourage developers, artists, and dreamers to take this idea and build upon it. How would you visualize a digital soul?
                        </p>
                      </div>
                  </div>
                </div>
                 <p className="mt-12 text-xs text-slate-500">Powered by AI. Your digital aura, visualized.</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;