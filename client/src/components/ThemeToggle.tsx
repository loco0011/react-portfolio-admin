import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full bg-background/10 backdrop-blur-sm border-white/20"
      >
        <motion.div
          initial={{ scale: 0.5, rotate: 0 }}
          animate={{ 
            scale: 1,
            rotate: theme === "light" ? 0 : 180
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        >
          {theme === "light" ? 
            <Sun className="h-5 w-5 text-yellow-500" /> : 
            <Moon className="h-5 w-5 text-blue-400" />
          }
        </motion.div>
      </Button>
    </motion.div>
  );
}