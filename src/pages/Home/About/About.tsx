import { motion } from "framer-motion";
import { Code, Cpu, Database, GitBranch, Layers, Package, Terminal } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const techStack = [
  {
    name: "React",
    icon: <Cpu size={24} className="text-blue-500" />,
    description: "The core library for building interactive user interfaces with components.",
  },
  {
    name: "Redux Toolkit",
    icon: <Database size={24} className="text-purple-500" />,
    description: "State management solution with simplified Redux setup and RTK Query for API handling.",
  },
  {
    name: "Framer Motion",
    icon: <GitBranch size={24} className="text-pink-500" />,
    description: "Production-ready animations library for fluid, interactive user experiences.",
  },
  {
    name: "React Toastify",
    icon: <Terminal size={24} className="text-yellow-500" />,
    description: "Elegant toast notifications system for user feedback and alerts.",
  },
  {
    name: "Auto Animate",
    icon: <Layers size={24} className="text-green-500" />,
    description: "Zero-config animations for list changes, modals, and layout shifts.",
  },
  {
    name: "Lucide React",
    icon: <Package size={24} className="text-red-500" />,
    description: "Beautiful, consistent icons for modern web applications.",
  },
];

const About = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Animated background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/Pics/Banner2.jpg"
          alt="Tech Background"
          className="w-full h-full object-cover blur-md brightness-75"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 max-w-6xl mx-auto p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - animated tech illustration */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 1,
              ease: "backOut"
            }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-500/10 rounded-xl blur-xl"></div>
            <img
              src="/Pics/Banner2.jpg"
              alt="Tech Stack Illustration"
              className="relative rounded-xl shadow-lg w-full h-auto object-cover md:max-h-[400px] border-2 border-white/20"
            />
          </motion.div>

          {/* Right side - animated text */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center md:text-left space-y-4 backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10"
          >
            <motion.h1 
              className="text-3xl lg:text-4xl font-bold flex items-center justify-center md:justify-start gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <Code size={36} className="text-blue-400" /> 
              <span>Our Tech Stack</span>
            </motion.h1>

            <TypeAnimation
              sequence={[
                "Modern web technologies...",
                1500,
                "Optimized for performance...",
                1500,
                "Engineered for excellence.",
                1500,
              ]}
              wrapper="p"
              speed={50}
              className="text-lg leading-relaxed text-blue-100"
              repeat={Infinity}
            />

            <motion.p 
              className="text-base mt-2 text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Carefully selected tools and libraries powering this application:
            </motion.p>
          </motion.div>
        </div>

        {/* Tech Stack Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5,
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="p-5 bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-900 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="p-2 bg-white rounded-lg shadow-sm"
                >
                  {tech.icon}
                </motion.div>
                <h2 className="text-xl font-bold text-gray-800">{tech.name}</h2>
              </div>
              <p className="text-gray-700">{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-12 flex justify-center items-center gap-3 py-4 backdrop-blur-sm bg-black/30 rounded-xl border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Code size={20} className="text-blue-400" />
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="text-white/90"
          >
            Crafted with passion by developers who love building exceptional experiences
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;