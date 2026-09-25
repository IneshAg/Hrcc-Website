"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DrAnnie from "@/assets/Dr.R.-Annie-Uthra.jpg";
import Udendharan from "@/assets/udendharan.jpeg";
import ProfRevathi from "@/assets/Prof.-Revathi-Venkataraman.jpg";

export default function CentreOfExcellence() {
  return (
    <section
      className="relative z-10 py-20 px-4 md:px-8 overflow-hidden pointer-events-none"
      style={{ background: "transparent" }}
    >
      <div className="max-w-275 w-full mx-auto pointer-events-none">
        {/* Title */}
        <motion.div
          className="text-center mb-10 w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-white font-black tracking-tight leading-tight z-100"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
              lineHeight: 0.9,
            }}
          >
            GUIDED BY
            <br />
            <span style={{ color: "#05C770" }}>CENTRE OF EXCELLENCE</span>
          </h2>
        </motion.div>

        {/* Faculty Photos in Circles */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left: Dr. Annie Uthra */}
          <motion.div
            className="flex flex-col items-center gap-4 pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-xl">
              <Image
                src={DrAnnie}
                alt="Dr. Annie Uthra"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="text-white text-center font-semibold text-sm md:text-base lg:text-lg">
              Dr.R. Annie Uthra
            </h3>
          </motion.div>

          {/* Centre: Udendharan */}
          <motion.div
            className="flex flex-col items-center gap-4 pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-xl">
              <Image
                src={Udendharan}
                alt="Udendharan"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="text-white text-center font-semibold text-sm md:text-base lg:text-lg">
              Dr R. Udendhran Mudaliyar
            </h3>
          </motion.div>

          {/* Right: Prof. Revathi Venkataraman */}
          <motion.div
            className="flex flex-col items-center gap-4 pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-xl">
              <Image
                src={ProfRevathi}
                alt="Prof. Revathi Venkataraman"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="text-white text-center font-semibold text-sm md:text-base lg:text-lg">
              Dr. Revathi Venkataraman
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
