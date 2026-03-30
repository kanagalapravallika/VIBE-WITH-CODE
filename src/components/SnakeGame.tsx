import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_FOOD = { x: 5, y: 5 };
const SPEED = 150;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused]);

  const generateFood = (currentSnake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused((p) => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-black/60 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl">
      <div className="flex justify-between w-full items-center mb-2 font-pixel">
        <div className="text-neon-blue text-[10px] tracking-tight flex items-center gap-2">
          SCORE: <span className="text-neon-pink border border-neon-pink/50 px-2 py-1 bg-neon-pink/5">[ {score.toString().padStart(4, '0')} ]</span>
        </div>
        <div className="text-[8px] text-white/20 uppercase tracking-widest">
          [SPACE] TO START
        </div>
      </div>

      <div 
        className="relative bg-[#050505] border-2 border-neon-blue/20 rounded-sm overflow-hidden"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
        }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }} 
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${i}`}
            className="absolute bg-neon-green"
            style={{
              width: 20,
              height: 20,
              left: segment.x * 20,
              top: segment.y * 20,
              zIndex: snake.length - i,
              boxShadow: i === 0 ? '0 0 15px #39ff14' : 'none',
              border: '1px solid #000'
            }}
            initial={false}
            animate={{ x: 0, y: 0 }}
          />
        ))}

        {/* Food */}
        <motion.div
          className="absolute rounded-full bg-neon-pink shadow-[0_0_15px_#ff00ff]"
          style={{
            width: 12,
            height: 12,
            left: food.x * 20 + 4,
            top: food.y * 20 + 4,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity
          }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 backdrop-blur-sm font-pixel">
            <h2 className="text-neon-pink text-xl mb-6 glitch-text" data-text="GAME OVER">GAME OVER</h2>
            <button 
              onClick={resetGame}
              className="px-4 py-2 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 text-[10px]"
            >
              RESTART
            </button>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center z-40 font-pixel">
            <div className="relative">
              <div className="text-neon-blue text-2xl tracking-[0.2em] glitch-text" data-text="PAUSED">PAUSED</div>
              <div className="absolute top-0 left-0 text-neon-pink text-2xl tracking-[0.2em] opacity-50 translate-x-[2px] translate-y-[1px] pointer-events-none">PAUSED</div>
              <div className="absolute top-0 left-0 text-neon-blue text-2xl tracking-[0.2em] opacity-50 -translate-x-[2px] -translate-y-[1px] pointer-events-none">PAUSED</div>
            </div>
            <div className="mt-8 w-6 h-6 bg-neon-green/40 rounded-full blur-md animate-pulse" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-[150px]">
        <div />
        <button 
          onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}
          className="p-2 border border-white/10 rounded hover:bg-white/5 text-white/50 flex justify-center text-xs"
        >
          W
        </button>
        <div />
        <button 
          onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}
          className="p-2 border border-white/10 rounded hover:bg-white/5 text-white/50 flex justify-center text-xs"
        >
          A
        </button>
        <button 
          onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}
          className="p-2 border border-white/10 rounded hover:bg-white/5 text-white/50 flex justify-center text-xs"
        >
          S
        </button>
        <button 
          onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}
          className="p-2 border border-white/10 rounded hover:bg-white/5 text-white/50 flex justify-center text-xs"
        >
          D
        </button>
      </div>
    </div>
  );
};
