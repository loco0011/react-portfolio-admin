import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timelineItems = [
  {
    year: "2023",
    title: "Software Development Engineer",
    company: "Current Company",
    description: "Working on fintech solutions and web applications"
  },
  {
    year: "2022",
    title: "Associate Software Engineer",
    company: "Previous Company",
    description: "Developed full-stack applications using modern technologies"
  }
];

export default function About() {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="about">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          About Me
        </h2>

        <motion.div
          initial={{ rotateX: 45 }}
          whileInView={{ rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <Card className="mb-12 backdrop-blur-sm bg-background/50 border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg text-foreground/80">
                I'm a passionate Software Development Engineer specializing in building scalable web applications
                and fintech solutions. With expertise in modern technologies and a keen eye for detail,
                I strive to create impactful digital experiences.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex gap-4 perspective-1000"
            >
              <div className="w-24 flex-shrink-0 text-primary font-bold">
                {item.year}
              </div>
              <Card className="flex-grow backdrop-blur-sm bg-background/50 border-primary/20 
                             hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-bold text-xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                    <p className="text-foreground/80">{item.description}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}