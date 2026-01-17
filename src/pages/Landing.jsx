import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(2,6,23,0.8),transparent_60%),radial-gradient(1200px_600px_at_100%_100%,rgba(8,47,73,0.4),transparent_60%)] bg-fixed">
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-5">
          <img
            src="/wc_logo.png"
            alt="we.code"
            className="w-30 h-15 drop-shadow-xl drop-shadow-gray-100"
          />
          <span className="text-4xl font-bold bg-gradient-to-r from-green-300 via-green-400 to-sky-400 bg-clip-text text-transparent">
            we.code
          </span>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signin")}
            className="px-6 py-2 text-white/80 hover:text-white transition-colors"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="px-6 py-2 text-white bg-gradient-to-r from-green-700 to-green-600 hover:from-green-500 hover:to-green-400 rounded-lg shadow-lg shadow-green-500/20 ring-1 ring-green-400/40"
          >
            Get Started
          </motion.button>
        </div>
      </motion.nav>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-16"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 px-4 py-2 rounded-full bg-white/10 border border-cyan-400/30 backdrop-blur-sm"
        >
          <span className="text-sm text-cyan-300 font-medium">
            ✨ Real-time Collaborative Code Editor
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-center max-w-4xl text-white mb-6 leading-tight"
        >
          Code{" "}
          <span className="bg-gradient-to-r from-green-300 via-green-400 to-cyan-300 bg-clip-text text-transparent">
            Together
          </span>
          , <br />
          <span className="text-4xl md:text-6xl">Real-time</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/70 text-center max-w-2xl mb-8"
        >
          Collaborate with your team instantly. Write code together, see changes
          in real-time, and build without boundaries.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="px-8 py-4 text-white bg-gradient-to-r from-green-700 to-green-600 hover:from-green-500 hover:to-green-400 rounded-lg shadow-lg shadow-green-500/20 ring-1 ring-green-400/40 transition-all duration-300"
          >
            Start Collaborating Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 border-2 border-cyan-400/50 text-white font-semibold rounded-lg hover:border-cyan-300 hover:bg-white/5 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-4xl h-80 rounded-2xl p-[1px] bg-gradient-to-br from-white/25 via-cyan-300/20 to-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <div className="w-full h-full rounded-2xl bg-[rgba(6,8,12,0.7)] backdrop-blur-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-sky-400/5" />

            <div className="relative w-full h-full p-6 font-mono text-sm text-white/60">
              <div className="space-y-3">
                <div className="text-cyan-400">
                  <span className="text-pink-400">function</span>{" "}
                  <span className="text-white">collaborate</span>() {"{"}
                </div>
                <div className="ml-4 text-white/40">
                  // Your team is coding with you
                </div>
                <div className="ml-4">
                  <span className="text-cyan-400">console</span>
                  <span>.log(</span>
                  <span className="text-green-400">"Real-time sync"</span>
                  <span>)</span>
                </div>
                <div className="text-white">{"}"}</div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-300"
              >
                ● Live: 5 collaborators
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 py-20 px-4 md:px-12 bg-gradient-to-b from-transparent via-white/5 to-transparent"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Powerful Features for Teams
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Cards */}
            {[
              {
                title: "Real-time Sync",
                description:
                  "See your team's code changes instantly with WebSocket-powered synchronization.",
                icon: "⚡",
              },
              {
                title: "Multiple Languages",
                description:
                  "Support for JavaScript, Python, C++, and more with syntax highlighting.",
                icon: "🔤",
              },
              {
                title: "Instant Rooms",
                description:
                  "Create or join a collaborative room with just a few clicks.",
                icon: "🚀",
              },
              {
                title: "User Avatars",
                description:
                  "See who's editing with beautiful avatars and presence indicators.",
                icon: "👥",
              },
              {
                title: "Secure Auth",
                description:
                  "JWT-based authentication with GitHub OAuth integration for security.",
                icon: "🔐",
              },
              {
                title: "Code Execution",
                description:
                  "Run your code and see output in real-time with our built-in executor.",
                icon: "▶️",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 backdrop-blur-sm transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 py-20 px-4 md:px-12"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-br from-white/10 via-cyan-300/10 to-white/5 border border-cyan-400/20 backdrop-blur-sm"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-white mb-4"
          >
            Ready to Code Together?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/70 mb-8 text-lg"
          >
            Join thousands of developers collaborating in real-time. Start your
            journey today.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="px-8 py-4 text-white bg-gradient-to-r from-green-700 to-green-600 hover:from-green-500 hover:to-green-400 rounded-lg shadow-lg shadow-green-500/20 ring-1 ring-green-400/40 transition-all duration-300"
            >
              Create Free Account
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signin")}
              className="px-8 py-4 border-2 border-cyan-400/50 text-white font-semibold rounded-lg hover:border-cyan-300 hover:bg-white/5 transition-all duration-300"
            >
              Sign In
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 border-t border-white/10 py-8 px-4 md:px-12 text-center text-white/50"
      >
        <p>
          © 2026 we.code. Built for developers, by developers. All rights
          reserved.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-cyan-300 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-cyan-300 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-cyan-300 transition-colors">
            GitHub
          </a>
        </div>
      </motion.footer>
    </div>
  );
};

export default Landing;
