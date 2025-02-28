import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "../lib/api"; // Import the API functions
import { useQuery } from "@tanstack/react-query"; // For fetching data
import { Loader2 } from "lucide-react"; // For loading state

export default function Skills() {
  // Fetch skills data from Supabase
  const {
    data: skills,
    isLoading: isLoadingSkills,
    isError: isErrorSkills,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: api.getSkills,
  });

  // Fetch frameworks data from Supabase (assuming frameworks are stored in the same table)
  const {
    data: frameworks,
    isLoading: isLoadingFrameworks,
    isError: isErrorFrameworks,
  } = useQuery({
    queryKey: ["frameworks"],
    queryFn: api.getSkills, // Use the same function if frameworks are stored in the same table
  });

  // Show loading state
  if (isLoadingSkills || isLoadingFrameworks) {
    return (
      <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="skills">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent heading-gradient">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Languages Card Skeleton */}
            <motion.div
              initial={{ rotateY: 30, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full backdrop-blur-sm bg-background/50 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-l from-black to-primary">
                    Languages
                  </h3>
                  <div className="space-y-8">
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between mb-2">
                          <div className="h-4 bg-primary/10 rounded w-1/3" />
                          <div className="h-4 bg-primary/10 rounded w-10" />
                        </div>
                        <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "50%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-700 to-foreground/60 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Frameworks & Tools Card Skeleton */}
            <motion.div
              initial={{ rotateY: -30, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full backdrop-blur-sm bg-background/50 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-l from-black to-primary">
                    Frameworks & Tools
                  </h3>
                  <div className="space-y-8">
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between mb-2">
                          <div className="h-4 bg-primary/10 rounded w-1/3" />
                          <div className="h-4 bg-primary/10 rounded w-10" />
                        </div>
                        <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "50%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-700 to-foreground/60 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
  if (isErrorSkills || isErrorFrameworks) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load skills data. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="skills">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent heading-gradient">
          Technical Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Languages Card */}
          <motion.div
            initial={{ rotateY: 30, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full backdrop-blur-sm bg-background/50 border-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-l from-black to-primary">
                  Languages
                </h3>
                <div className="space-y-8">
                  {skills
                    ?.filter((skill) => skill.category === "language") // Filter for languages
                    .map((skill, index) => (
                      <motion.div
                        key={skill.id} // Use skill.id as the key
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-purple/30">{skill.level}%</span>
                        </div>
                        <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-700 to-foreground/60 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Frameworks & Tools Card */}
          <motion.div
            initial={{ rotateY: -30, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full backdrop-blur-sm bg-background/50 border-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-l from-black to-primary">
                  Frameworks & Tools
                </h3>
                <div className="space-y-8">
                  {frameworks
                    ?.filter((skill) => skill.category === "framework") // Filter for frameworks
                    .map((framework, index) => (
                      <motion.div
                        key={framework.id} // Use framework.id as the key
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{framework.name}</span>
                          <span className="text-purple/30">
                            {framework.level}%
                          </span>
                        </div>
                        <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${framework.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-700 to-foreground/60 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}