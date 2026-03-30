import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "Sanchari",
    artist: "AI SYNTI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#ff00ff"
  },
  {
    id: 2,
    title: "Neon Pulse",
    artist: "NEURAL GRID",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#00ffff"
  },
  {
    id: 3,
    title: "Cyber Drift",
    artist: "VAPOR AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#39ff14"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Audio play error:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 shadow-2xl overflow-hidden relative">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex items-center gap-6 mb-12">
        <motion.div 
          key={currentTrack.id}
          className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden bg-white/[0.03] border border-white/10"
        >
          <Music size={32} className="text-white/10" />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-neon-pink/5">
              <div className="w-12 h-12 rounded-full border border-neon-pink/20 animate-ping" />
            </div>
          )}
        </motion.div>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-3xl font-bold text-white truncate tracking-tighter">
                {currentTrack.title.substring(0, 2)}..
              </h3>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
                {currentTrack.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-neon-pink shadow-[0_0_10px_#ff00ff]"
            style={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 text-[9px] font-mono text-white/10 uppercase tracking-widest">
          <span>{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{(Math.floor((audioRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}</span>
          <span>{Math.floor((audioRef.current?.duration || 0) / 60)}:{(Math.floor((audioRef.current?.duration || 0) % 60)).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4 text-white/30">
          <Volume2 size={18} />
          <div className="flex items-center gap-4">
            <button onClick={skipBackward} className="hover:text-white transition-colors">
              <SkipBack size={20} fill="currentColor" />
            </button>
          </div>
        </div>
        
        <button 
          onClick={togglePlay}
          className="w-12 h-20 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 bg-neon-pink shadow-[0_0_30px_rgba(255,0,255,0.6)] relative group"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          {isPlaying ? (
            <Pause size={24} fill="black" className="text-black relative z-10" />
          ) : (
            <Play size={24} fill="black" className="text-black ml-1 relative z-10" />
          )}
        </button>
        
        <button 
          onClick={skipForward}
          className="text-white/30 hover:text-white transition-all"
        >
          <SkipForward size={20} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};
