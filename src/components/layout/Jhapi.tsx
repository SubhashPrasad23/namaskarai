"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Jhapi() {
  const { scrollY } = useScroll();

  const rotate = useTransform(scrollY, [0, 5000], [0, 360]);

  return (
    <div
      className="fixed top-1/2 right-[-320px] -z-0 pointer-events-none hidden xl:block"
      style={{
        transform: "translateY(-50%)",
      }}
    >
      <motion.div
        style={{
          rotate,
          width: 650,
          height: 650,
        }}
        className="flex items-center justify-center"
      >
        <Image
          src="/images/full.png"
          alt="Assamese Jhapi"
          width={500}
          height={605}
          priority
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </div>
  );
}
