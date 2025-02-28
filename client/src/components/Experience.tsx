import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Loader2 } from "lucide-react";

interface Experience {
  id: string;
  duration: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const {
    data: experiences,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: api.getExperiences,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 px-4 md:px-8 relative overflow-hidden min-h-screen" id="experience">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent heading-gradient">
            Journey So Far
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-primary to-transparent" />

            {[0, 1].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="mb-20"
              >
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-20"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer animate-pulse">
                      <div className="w-4 h-4 rounded-full bg-background/50" />
                    </div>
                  </motion.div>

                  <motion.div className="md:col-span-2 perspective-1000">
                    <Card className="glass-effect overflow-hidden exp-bg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            {/* Title Skeleton */}
                            <div className="h-8 bg-primary/10 rounded-full w-3/4" />
                            {/* Company & Duration Skeleton */}
                            <div className="h-5 bg-primary/10 rounded w-1/2" />
                            {/* Location Skeleton */}
                            <div className="h-4 bg-primary/10 rounded w-1/3" />
                            {/* Description Skeleton */}
                            <div className="space-y-2">
                              <div className="h-4 bg-primary/10 rounded w-full" />
                              <div className="h-4 bg-primary/10 rounded w-5/6" />
                              <div className="h-4 bg-primary/10 rounded w-3/4" />
                            </div>
                            {/* Tech Stack Skeleton */}
                            <div className="flex flex-wrap gap-2">
                              {[0, 1, 2].map((i) => (
                                <div key={i} className="h-6 bg-primary/10 rounded-full w-16" />
                              ))}
                            </div>
                          </div>

                          {/* Achievements Skeleton */}
                          <div className="space-y-4">
                            <div className="h-6 bg-primary/10 rounded w-1/3" />
                            {[0, 1, 2].map((i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary/10" />
                                <div className="h-4 bg-primary/10 rounded w-3/4" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated Spinner overlay */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent" />
          </motion.div>
        </div>
      </section>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load experience data. Please try again later.
      </div>
    );
  }

  // Handle empty state
  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        No experience data found.
      </div>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden min-h-screen" id="experience">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent heading-gradient">
          Journey So Far
        </h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-primary to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-20"
            >
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-20"
                  whileHover={{ scale: 1.2 }}
                >
                  <div
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                  >
                    <div className="w-4 h-4 rounded-full bg-background" />
                  </div>
                </motion.div>

                <motion.div
                  className="md:col-span-2 perspective-1000"
                  animate={{
                    rotateX: activeIndex === index ? 0 : 15,
                    scale: activeIndex === index ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Card className="glass-effect overflow-hidden exp-bg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <motion.h3 className="text-2xl font-bold mb-2 bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                            {exp.title}
                          </motion.h3>
                          <p className="text-lg text-gray-800 dark:text-white/90">
                            {exp.company}{" "}
                            <span className="text-sm dark:text-white/70">({exp.duration})</span>
                          </p>
                          <p className="text-lg mb-4 text-gray-800 dark:text-white/80">
                            <span className="text-sm">{exp.location}</span>
                          </p>
                          <p className="text-gray-600 dark:text-white/60 mb-6">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {exp.tech?.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full text-sm bg-primary/20 text-gray-800 dark:text-white/90"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: activeIndex === index ? 1 : 0.7,
                            x: 0,
                          }}
                          className="space-y-4"
                        >
                          <h4 className="font-bold text-lg mb-4 text-foreground/90 dark:text-white/90">
                            Key Achievements
                          </h4>
                          {exp.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-foreground/90" />
                              <p className="text-foreground/90 dark:text-white/70">
                                {achievement}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}