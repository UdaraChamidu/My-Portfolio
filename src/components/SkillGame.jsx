import { useState, useEffect, useRef } from "react";
import { 
  Bug, 
  Atom, 
  Database, 
  FileCode, 
  Cpu, 
  Globe, 
  Brain, 
  Play, 
  RotateCcw,
  Trophy 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const SkillGame = () => {
  const [gameState, setGameState] = useState("start"); 
  const gameStateRef = useRef("start"); 
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerX, setPlayerX] = useState(50); 
  const [items, setItems] = useState([]); 
  
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  const lastSpawnTime = useRef(0);
  const scoreRef = useRef(0); 

  // Game Configuration
  const SPAWN_RATE = 1000; 
  const FALL_SPEED_BASE = 0.4; 
  const MAX_SPEED = 2.5; // Cap the speed so it doesn't break physics

  // Skill Icons
  const skillIcons = [
    { icon: Atom, color: "text-blue-400", id: "react" },
    { icon: FileCode, color: "text-yellow-400", id: "code" },
    { icon: Database, color: "text-green-400", id: "db" },
    { icon: Cpu, color: "text-purple-400", id: "ai" },
    { icon: Globe, color: "text-cyan-400", id: "web" },
  ];

  const handleMove = (e) => {
    if (gameStateRef.current !== "playing" || !gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    
    let newX = ((clientX - rect.left) / rect.width) * 100;
    newX = Math.max(5, Math.min(95, newX));
    setPlayerX(newX);
  };

  const startGame = () => {
    setGameState("playing");
    gameStateRef.current = "playing"; 
    setScore(0);
    scoreRef.current = 0;
    setItems([]);
    lastSpawnTime.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const gameOver = () => {
    setGameState("gameover");
    gameStateRef.current = "gameover";
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
    }
    cancelAnimationFrame(requestRef.current);
  };

  const gameLoop = (time) => {
    if (gameStateRef.current !== "playing") return;

    setItems((prevItems) => {
      // 1. Calculate Score Multiplier (Speed)
      const speedMultiplier = 1 + Math.min(scoreRef.current * 0.05, 5); // Cap multiplier at 5x
      
      // 2. Move Items
      let nextItems = prevItems.map((item) => ({
        ...item,
        y: item.y + Math.min(item.speed * speedMultiplier, MAX_SPEED), 
      }));

      // 3. Check Collisions (Fixed Logic)
      const keptItems = [];
      
      nextItems.forEach((item) => {
        // HITBOX LOGIC
        // We check if the item has entered the "Player Zone" (Y > 80)
        // We use a wide X range (12%) to be forgiving/fun
        const isColliding = 
            item.y > 80 && // Item is low enough
            item.y < 98 && // Item hasn't fully passed yet
            Math.abs(item.x - playerX) < 10; // Horizontal overlap (Increased from 8 to 10)

        if (isColliding) {
            if (item.type === "bug") {
                gameOver();
                return; // Remove from array
            } else {
                scoreRef.current += 10;
                setScore(scoreRef.current);
                return; // Remove from array (Caught)
            }
        }

        // If it hasn't hit the player but is off screen, remove it
        if (item.y > 100) {
            return; 
        }

        // Otherwise, keep falling
        keptItems.push(item);
      });

      return keptItems;
    });

    // 4. Spawn New Items
    // Spawn rate gets faster as score increases, but capped at 300ms
    const currentSpawnRate = Math.max(300, SPAWN_RATE - scoreRef.current * 5);
    
    if (time - lastSpawnTime.current > currentSpawnRate) {
      spawnItem();
      lastSpawnTime.current = time;
    }

    if (gameStateRef.current === "playing") {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };

  const spawnItem = () => {
    const isBug = Math.random() > 0.7; 
    const type = isBug ? "bug" : "skill";
    const skillData = !isBug 
        ? skillIcons[Math.floor(Math.random() * skillIcons.length)]
        : null;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: Math.random() * 90 + 5,
        y: -15, // Spawn slightly higher to avoid popping in
        type,
        skill: skillData,
        speed: FALL_SPEED_BASE,
      },
    ]);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <section id="game" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Catch the <span className="text-primary">Skills</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          Move the brain to collect tech stacks. Avoid the bugs!
        </p>

        <div 
          ref={gameAreaRef}
          className="relative w-full h-[400px] bg-card/50 border-2 border-primary/20 rounded-xl overflow-hidden cursor-crosshair touch-none select-none shadow-2xl"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Score Board */}
          <div className="absolute top-4 right-4 flex flex-col items-end z-10 pointer-events-none">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-xs text-muted-foreground">High Score: {highScore}</div>
          </div>

          {/* Start Screen */}
          {gameState === "start" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs z-20">
              <Brain className="w-16 h-16 text-primary mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Ready to Code?</h3>
              <button 
                onClick={startGame}
                className="cosmic-button flex items-center gap-2 mt-4"
              >
                <Play size={18} /> Start Game
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-20">
              <Bug className="w-16 h-16 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold mb-1">System Crash!</h3>
              <p className="text-muted-foreground mb-4">You caught a bug!</p>
              <div className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} /> Score: {score}
              </div>
              <button 
                onClick={startGame}
                className="cosmic-button flex items-center gap-2"
              >
                <RotateCcw size={18} /> Try Again
              </button>
            </div>
          )}

          {/* Player */}
          <div 
            className="absolute bottom-4 transform -translate-x-1/2 transition-transform duration-75 ease-out will-change-transform"
            style={{ left: `${playerX}%` }}
          >
            <div className="p-3 bg-primary rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="w-12 h-2 bg-primary/30 rounded-full mx-auto mt-1 blur-sm" /> 
          </div>

          {/* Falling Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{ 
                left: `${item.x}%`, 
                top: `${item.y}%` 
              }}
            >
              {item.type === "bug" ? (
                <div className="p-2 rounded-full bg-red-500/20 border border-red-500/50">
                    <Bug className="w-6 h-6 text-red-500" />
                </div>
              ) : (
                <div className={cn(
                    "p-2 rounded-full bg-card border shadow-sm",
                    "border-border"
                )}>
                    <item.skill.icon className={cn("w-6 h-6", item.skill.color)} />
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};