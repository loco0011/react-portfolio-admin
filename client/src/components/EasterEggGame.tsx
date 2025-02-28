import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
}

export default function EasterEggGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game state
  const gameStateRef = useRef({
    player: { x: 0, y: 0, width: 30, height: 30 },
    obstacles: [] as GameObject[],
    animationFrameId: 0,
    keysPressed: new Set<string>(),
    lastObstacleTime: 0,
    baseSpeed: 3,
  });

  // Initialize game state when game starts
  useEffect(() => {
    if (isActive && canvasRef.current) {
      const canvas = canvasRef.current;
      const gameState = gameStateRef.current;
      gameState.player = {
        x: canvas.width / 2 - 15,
        y: canvas.height - 50,
        width: 30,
        height: 30,
      };
      gameState.obstacles = [];
      gameState.lastObstacleTime = 0;
      gameState.baseSpeed = 3;
      setScore(0);
    }
  }, [isActive]);

  useEffect(() => {
    let buffer = '';
    const secretCode = 'GAME';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive && e.key) {
        const key = typeof e.key === 'string' ? e.key.toUpperCase() : '';
        if (key) {
          buffer += key;
          if (buffer.length > secretCode.length) {
            buffer = buffer.substring(1);
          }
          if (buffer === secretCode) {
            setIsActive(true);
            setGameOver(false);
            setScore(0);
          }
        }
      } else if (isActive && e.key) {
        gameStateRef.current.keysPressed.add(e.key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isActive && e.key) {
        gameStateRef.current.keysPressed.delete(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const gameState = gameStateRef.current;

    const updateGame = () => {
      ctx.fillStyle = '#000033';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update player position
      if (gameState.keysPressed.has('ArrowLeft')) {
        gameState.player.x = Math.max(0, gameState.player.x - 5);
      }
      if (gameState.keysPressed.has('ArrowRight')) {
        gameState.player.x = Math.min(canvas.width - gameState.player.width, gameState.player.x + 5);
      }

      // Generate new obstacles
      const now = Date.now();
      if (now - gameState.lastObstacleTime > 1000) {
        const speed = gameState.baseSpeed + Math.floor(score / 5);
        gameState.obstacles.push({
          x: Math.random() * (canvas.width - 20),
          y: -20,
          width: 20,
          height: 20,
          speed: speed,
        });
        gameState.lastObstacleTime = now;
      }

      // Update and draw obstacles
      gameState.obstacles = gameState.obstacles.filter(obstacle => {
        obstacle.y += obstacle.speed || 3;

        // Check collision
        if (
          gameState.player.x < obstacle.x + obstacle.width &&
          gameState.player.x + gameState.player.width > obstacle.x &&
          gameState.player.y < obstacle.y + obstacle.height &&
          gameState.player.y + gameState.player.height > obstacle.y
        ) {
          setGameOver(true);
          return false;
        }

        // Draw bomb icon
        ctx.font = '20px Arial';
        ctx.fillStyle = '#FF0000';
        ctx.fillText('💣', obstacle.x, obstacle.y + obstacle.height);

        // Remove if out of screen
        if (obstacle.y > canvas.height) {
          setScore(prev => prev + 1);
          return false;
        }
        return true;
      });

      // Draw human icon
      ctx.font = '24px Arial';
      ctx.fillStyle = '#00FF00';
      ctx.fillText('🧑', gameState.player.x, gameState.player.y + gameState.player.height);

      // Draw score
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);

      if (!gameOver) {
        gameState.animationFrameId = requestAnimationFrame(updateGame);
      }
    };

    gameState.animationFrameId = requestAnimationFrame(updateGame);

    return () => {
      cancelAnimationFrame(gameState.animationFrameId);
    };
  }, [isActive, gameOver, score]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      >
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={600}
            className="border-2 border-primary rounded-lg"
          />
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
              <p className="text-xl text-white mb-6">Score: {score}</p>
              <button
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    gameStateRef.current.player = {
                      x: canvas.width / 2 - 15,
                      y: canvas.height - 50,
                      width: 30,
                      height: 30,
                    };
                    gameStateRef.current.obstacles = [];
                    gameStateRef.current.lastObstacleTime = 0;
                    gameStateRef.current.baseSpeed = 3;
                  }
                  setGameOver(false);
                  setScore(0);
                }}
                className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/80 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => setIsActive(false)}
                className="mt-2 px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}