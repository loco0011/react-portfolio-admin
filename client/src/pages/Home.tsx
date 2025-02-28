import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loadingMessages = [
    "Executing fetchPortfolio()... Almost done!",
    "Booting up the portfolio engine...",
    "Optimizing portfolio for best performance...",
    "Loading assets... this won’t take long!",
    "$ loading portfolio --progress 87%",
    "Compiling portfolio... Stand by!",
  ];

  // Select a random loading message
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    setLoadingMessage(
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
    );
  }, []);

  // Fetch logo data
  const {
    data: logoData,
    isLoading: isLogoLoading,
    isError: isLogoError,
  } = useQuery({
    queryKey: ["logo"],
    queryFn: api.getLogo,
  });

  // Fetch profile data
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: api.getProfile,
  });

  // Check if all critical data is loaded
  useEffect(() => {
    if (!isLogoLoading && !isProfileLoading) {
      setIsInitialLoad(false);
    }
  }, [isLogoLoading, isProfileLoading]);

  // Show loading state
  if (isInitialLoad) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-150" />
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-300" />
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-500" />
          </div>
          <p className="text-primary animate-pulse">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isLogoError || isProfileError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-800 w-85 m-3 text-center text-2xl font-bold animate-pulse">
            🚨 Oooopsieee! Somethin' ain't right! 😵‍💫
            <br />
            We're on it, patching things up! 🛠️💨
            <br />
            Meanwhile... wanna have some fun? 🎮 Just type{" "}
            <span className="text-yellow-500">"game"</span> on your keyboard &
            see the magic! ✨
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation logoData={logoData} />
      <ThemeToggle />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero profileData={profileData} />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </motion.div>
    </div>
  );
}
