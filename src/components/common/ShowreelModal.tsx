import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Compass, 
  ShieldCheck, 
  Building2, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AURELIA_LOGO } from '../../constants/assets';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateProjects: () => void;
}

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  runtime: string;
  category: string;
  videoUrl: string;
  poster: string;
  metrics: { label: string; val: string }[];
}

const REEL_CHAPTERS: Chapter[] = [
  {
    id: 'ch-1',
    title: 'Skyline Megastructures & Super-Talls',
    subtitle: 'Ultra-dense core seismic dampening and aerodynamic diagrid super-columns.',
    location: 'Central Financial Corridor, London & Kharian Directorate',
    runtime: '00:45',
    category: 'Commercial Megatall',
    // High-quality public construction & architectural clips
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=85&w=1600&auto=format&fit=crop',
    metrics: [
      { label: 'Height', val: '430m' },
      { label: 'Cranes Deployed', val: '6 Heavy Luffing' },
      { label: 'Carbon Reduction', val: '-38%' }
    ]
  },
  {
    id: 'ch-2',
    title: 'Heavy Civil & Suspension Arteries',
    subtitle: 'Deep caisson foundation boring, cable-stay anchorages, and high-speed rail viaducts.',
    location: 'Punjab Northern Motorway Corridors & Maritime Links',
    runtime: '00:52',
    category: 'Civil Infrastructure',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=1600&auto=format&fit=crop',
    metrics: [
      { label: 'Clear Span', val: '1,850m' },
      { label: 'Deck Load Rating', val: '120 Tonnes' },
      { label: 'Design Life', val: '120 Years' }
    ]
  },
  {
    id: 'ch-3',
    title: 'Precision Mass-Timber & Net-Zero Innovations',
    subtitle: 'Robotic precision joinery, cross-laminated timber hybrid cores, and carbon-negative envelopes.',
    location: 'Nordic Eco-Park & Alpine Logistics Directorate',
    runtime: '00:38',
    category: 'Sustainable Architecture',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=85&w=1600&auto=format&fit=crop',
    metrics: [
      { label: 'Embodied Carbon', val: '-54%' },
      { label: 'PEFC Timber', val: '100% Certified' },
      { label: 'Energy Rating', val: 'LEED Platinum' }
    ]
  },
  {
    id: 'ch-4',
    title: 'Sub-Sea Corridors & Hydro-Engineering',
    subtitle: 'Automated Tunnel Boring Machines (TBM) and reinforced undersea transit tunnels.',
    location: 'Baltic Strait & Arabian Gulf Interconnects',
    runtime: '00:40',
    category: 'Marine Engineering',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=1600&auto=format&fit=crop',
    metrics: [
      { label: 'Depth Below Bed', val: '45m' },
      { label: 'TBM Diameter', val: '14.8m' },
      { label: 'Hydrostatic Seal', val: '12 Bar' }
    ]
  }
];

export const ShowreelModal: React.FC<ShowreelModalProps> = ({
  isOpen,
  onClose,
  onNavigateProjects
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentChapter = REEL_CHAPTERS[activeChapterIndex];

  // Auto-play when chapter changes or modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setVideoError(false);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((_e) => {
        // Autoplay policies might require muting
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => setIsPlaying(false));
        }
      });
    }
  }, [isOpen, activeChapterIndex]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setCurrentTime(cur);
      setDuration(dur);
      setProgress((cur / dur) * 100);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07080A]/95 backdrop-blur-xl overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="relative w-full max-w-5xl bg-[#0F1115] border border-[#262D3B] shadow-2xl overflow-hidden my-auto text-white"
          >
            {/* Header Strip */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#13171F] border-b border-[#262D3B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shrink-0">
                  <img
                    src={AURELIA_LOGO}
                    alt="Aurelia Construct"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-white font-display">
                      AURELIA CONSTRUCT GROUP
                    </span>
                    <span className="text-[10px] bg-[#DC2626]/20 text-[#EF4444] border border-[#DC2626]/40 px-1.5 font-mono uppercase font-bold">
                      CINEMATIC 4K REEL
                    </span>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] font-mono">
                    Global Civil & Megastructure Engineering Showreel • Kharian HQ & International Sites
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 bg-[#1C2230] hover:bg-[#DC2626] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
                title="Close Reel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-black overflow-hidden group">
              <video
                ref={videoRef}
                src={currentChapter.videoUrl}
                poster={currentChapter.poster}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onError={() => setVideoError(true)}
              />

              {/* Video Fallback Poster if stream is buffering or offline */}
              {videoError && (
                <div className="absolute inset-0 bg-black">
                  <img
                    src={currentChapter.poster}
                    alt={currentChapter.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                </div>
              )}

              {/* Gradient Scrims for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

              {/* Top Overlay: Live Telemetry Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping" />
                  <span>CHAPTER {activeChapterIndex + 1} OF {REEL_CHAPTERS.length}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#F59E0B]">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentChapter.category}</span>
                </span>
              </div>

              {/* Floating Center Play/Pause Indicator (on hover or pause) */}
              {(!isPlaying || videoError) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    onClick={togglePlay}
                    className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#DC2626]/90 hover:bg-[#DC2626] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
              )}

              {/* Bottom Video HUD Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex flex-col gap-2">
                  {/* Current Chapter Description */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-1">
                    <div>
                      <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-wider block font-bold">
                        {currentChapter.location}
                      </span>
                      <h4 className="text-lg sm:text-2xl font-black font-display text-white tracking-tight">
                        {currentChapter.title}
                      </h4>
                      <p className="text-xs text-[#D1D5DB] max-w-xl line-clamp-1 sm:line-clamp-2 mt-0.5">
                        {currentChapter.subtitle}
                      </p>
                    </div>

                    {/* Chapter Metrics Pill Box */}
                    <div className="hidden md:flex items-center gap-2 bg-[#13171F]/80 backdrop-blur-md border border-[#262D3B] p-2">
                      {currentChapter.metrics.map((m, idx) => (
                        <div key={idx} className="px-2.5 border-r border-[#262D3B] last:border-none text-center">
                          <span className="text-[9px] text-[#9CA3AF] uppercase font-mono block">{m.label}</span>
                          <span className="text-xs font-bold text-[#F4F1EA] font-mono block">{m.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scrubber Progress Bar */}
                  <div 
                    onClick={handleSeek}
                    className="relative w-full h-2 bg-white/20 hover:h-3 transition-all cursor-pointer rounded-full overflow-hidden"
                  >
                    <div 
                      className="absolute top-0 left-0 bottom-0 bg-[#DC2626] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Transport Controls Bar */}
                  <div className="flex items-center justify-between text-xs text-[#D1D5DB] pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-[#DC2626] transition-colors cursor-pointer"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-[#DC2626] transition-colors cursor-pointer"
                        title={isMuted ? 'Unmute Audio' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-[#EF4444]" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="font-mono text-[11px] text-[#9CA3AF]">
                        {formatTime(currentTime)} / {formatTime(duration || 60)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-[10px] font-mono uppercase text-[#9CA3AF]">
                        HDR 10-BIT • 60 FPS MASTER
                      </span>
                      <button
                        onClick={() => {
                          if (videoRef.current?.requestFullscreen) {
                            videoRef.current.requestFullscreen();
                          }
                        }}
                        className="text-white hover:text-[#DC2626] transition-colors cursor-pointer"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Selection Strip */}
            <div className="p-4 sm:p-5 bg-[#13171F] border-t border-[#262D3B]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#9CA3AF] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Select Construction Showcase Reel</span>
                </span>
                <span className="text-[10px] font-mono text-[#6B7280]">
                  HD Drone Telemetry & Site Execution
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {REEL_CHAPTERS.map((ch, idx) => {
                  const isSelected = idx === activeChapterIndex;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`text-left p-2.5 border transition-all relative overflow-hidden group cursor-pointer ${
                        isSelected 
                          ? 'bg-[#1C2230] border-[#DC2626] ring-1 ring-[#DC2626]' 
                          : 'bg-[#0E1015] border-[#262D3B] hover:border-[#4B5563]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-mono font-bold uppercase ${isSelected ? 'text-[#DC2626]' : 'text-[#6B7280]'}`}>
                          0{idx + 1} // {ch.category}
                        </span>
                        <span className="text-[9px] font-mono text-[#9CA3AF]">{ch.runtime}</span>
                      </div>
                      <h5 className="text-xs font-bold text-white group-hover:text-[#DC2626] transition-colors line-clamp-1">
                        {ch.title}
                      </h5>
                      <p className="text-[10px] text-[#9CA3AF] line-clamp-1 mt-0.5">
                        {ch.location}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Action Footer */}
              <div className="mt-4 pt-4 border-t border-[#262D3B] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                  <span>All footage represents active EPC engineering works & structural commissions.</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateProjects();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 glow-red cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>View Project Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
