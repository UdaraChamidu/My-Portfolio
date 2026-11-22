import { useState, useEffect, useRef, useCallback } from "react";
import { Image as ImageIcon, Pause, Play } from "lucide-react";
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
  const [previousIndex, setPreviousIndex] = useState(null);
  const currentRef = useRef(0);
  const pendingRef = useRef(false);
  const mountedRef = useRef(false);
  const cacheRef = useRef(new Map());
  const [imageWidth] = useState(() => window.innerWidth < 640 ? 960 : window.innerWidth < 1200 ? 1600 : 2080);
  const [isAutoPlaying, setIsAutoPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const wallpaperUrl = useCallback((index) => {
    const url = new URL(WALLPAPERS[index]);
    url.searchParams.set("w", String(imageWidth));
    return url.href;
  }, [imageWidth]);

  const preload = useCallback((index) => {
    const src = wallpaperUrl(index);
    if (!cacheRef.current.has(src)) {
      const promise = new Promise((resolve) => {
        const image = new window.Image();
        image.onload = () => resolve(true);
        image.onerror = () => { cacheRef.current.delete(src); resolve(false); };
        image.src = src;
      });
      cacheRef.current.set(src, promise);
    }
    return cacheRef.current.get(src);
  }, [wallpaperUrl]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const nextWallpaper = useCallback(async () => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    const next = (currentRef.current + 1) % WALLPAPERS.length;
    const ready = await preload(next);
    if (ready && mountedRef.current) {
      setPreviousIndex(currentRef.current);
      currentRef.current = next;
      setCurrentIndex(next);
    }
    pendingRef.current = false;
  }, [preload]);

  useEffect(() => {
    preload((currentIndex + 1) % WALLPAPERS.length);
    const cleanup = setTimeout(() => setPreviousIndex(null), 1100);
    return () => clearTimeout(cleanup);
  }, [currentIndex, preload]);

  // Auto-rotate effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextWallpaper();
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, nextWallpaper]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  return (
    <>
      {/* BACKGROUND LAYER (z-0) - Sit on top of body, but behind content */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        {previousIndex !== null && <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${wallpaperUrl(previousIndex)})` }} />}
        <div key={currentIndex} data-wallpaper={currentIndex} aria-hidden="true" className={cn("absolute inset-0 bg-cover bg-center bg-no-repeat", previousIndex !== null && "wallpaper-arrive")} style={{ backgroundImage: `url(${wallpaperUrl(currentIndex)})` }} />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </div>

      {/* CONTROLS (z-50) - Always clickable */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2 sm:bottom-6 sm:left-6">
        {/* Change Wallpaper Button */}
        <button
          onClick={nextWallpaper}
          type="button"
          className="icon-button group border-white/20 bg-black/45 text-white hover:bg-primary hover:text-white"
          title="Next Wallpaper"
          aria-label="Show next background wallpaper"
        >
          <ImageIcon
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
        </button>

        {/* AutoPlay Toggle */}
        <button
          onClick={toggleAutoPlay}
          type="button"
          className={cn(
            "icon-button border-white/20 text-white",
            isAutoPlaying
              ? "bg-emerald-950/70 hover:bg-emerald-800"
              : "bg-black/45 hover:bg-primary"
          )}
          title={isAutoPlaying ? "Pause Slideshow" : "Play Slideshow"}
          aria-label={isAutoPlaying ? "Pause background slideshow" : "Play background slideshow"}
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
    </>
  );
};
