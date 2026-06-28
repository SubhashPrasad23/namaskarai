"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Jhapi() {
  const { scrollY } = useScroll();

  const rotate = useTransform(scrollY, [0, 5000], [0, 360]);

  return (
    <div
      className=" fixed md:top-1/2 top-2/5 -z-0 pointer-events-none right-[-150px] sm:right-[-180px] md:right-[-220px] lg:right-[-280px] xl:right-[-320px]"
      style={{
        transform: "translateY(-50%)",
      }}
    >
      <motion.div
        style={{
          rotate,
        }}
        className="flex items-center justify-center w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px]"
      >
        <Image
          src="/images/full.png"
          alt="Assamese Jhapi"
          width={500}
          height={605}
          priority
          draggable={false}
          className="select-none opacity-40 sm:opacity-50 md:opacity-60 lg:opacity-80 xl:opacity-100"
        />
      </motion.div>
    </div>
  );
}
