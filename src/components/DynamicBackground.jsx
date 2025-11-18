import { useState, useEffect } from "react";
import { Image as ImageIcon, RefreshCcw, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// A curated list of high-quality tech/abstract wallpapers
const WALLPAPERS = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Tech Earth
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", // Chips
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop", // Gradient
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Cyberpunk
  "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop", // Code
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Abstract Blue
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop", // AI Neural Network
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", // Matrix/Hacker Code
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", // Retro Tech / Arcade
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2089&auto=format&fit=crop", // Dark Circuitry
  "https://images.unsplash.com/photo-1531297424006-db5118fe5b96?q=80&w=2070&auto=format&fit=crop", // Gaming Nebula
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop", // Electric Lightning
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop", // Synthwave Sun
];

export const DynamicBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Configuration
  // const CHANGE_INTERVAL = 10000; // Change every 10 seconds

  // Auto-rotate effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextWallpaper();
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]); // Re-run when index changes to reset timer

  const nextWallpaper = () => {
    setCurrentIndex((prev) => (prev + 1) % WALLPAPERS.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  return (
    <>
      {/* BACKGROUND LAYER (z-0) - Sit on top of body, but behind content */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        {WALLPAPERS.map((src, index) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </div>

      {/* CONTROLS (z-50) - Always clickable */}
      <div className="fixed bottom-6 left-6 z-50 flex gap-3">
        {/* Change Wallpaper Button */}
        <button
          onClick={nextWallpaper}
          className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white 
                     hover:bg-primary/80 transition-all duration-300 shadow-xl active:scale-95 group"
          title="Next Wallpaper"
        >
          <ImageIcon
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
        </button>

        {/* AutoPlay Toggle */}
        <button
          onClick={toggleAutoPlay}
          className={cn(
            "p-3 rounded-full backdrop-blur-md border border-white/20 text-white transition-all duration-300 shadow-xl active:scale-95",
            isAutoPlaying
              ? "bg-green-500/20 hover:bg-green-500/40"
              : "bg-red-500/20 hover:bg-red-500/40"
          )}
          title={isAutoPlaying ? "Pause Slideshow" : "Play Slideshow"}
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
    </>
  );
};
