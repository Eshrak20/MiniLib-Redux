import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code } from "lucide-react";

const techStack = [
  {
    name: "React",
    description:
      "The core of our application, providing a fast, reusable, and interactive user interface.",
  },
  {
    name: "Redux Toolkit",
    description:
      "Manages application state and handles API calls in a predictable, scalable way.",
  },
  {
    name: "Framer Motion",
    description:
      "Adds smooth, interactive animations to make the experience lively and modern.",
  },
  {
    name: "React Toastify",
    description:
      "Provides elegant toast notifications to improve user feedback and alert messages.",
  },
  {
    name: "@formkit/auto-animate",
    description:
      "Automatically animates DOM changes, creating a seamless user-friendly flow when items are added or removed.",
  },
  {
    name: "Lucide React",
    description:
      "Offers beautifully designed icons to enrich our interface with clear and consistent visuals.",
  },
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 text-center"
    >
      <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-blue-700 flex items-center justify-center gap-2">
        <BookOpen size={32} /> About Our Library App
      </h1>
      <p className="text-gray-700 dark:text-gray-100 mb-6 text-lg leading-relaxed">
        Welcome to our modern library management app, built to simplify book
        borrowing and tracking for everyone. This project is developed with a
        powerful technology stack:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              {tech.name}
            </h2>
            <p className="text-gray-800">{tech.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-gray-700 dark:text-gray-200 flex justify-center items-center gap-2">
        <Code size={20} />
        <span>
          Built with ❤️ by passionate developers to support reading and learning.
        </span>
      </div>
    </motion.div>
  );
};

export default About;
