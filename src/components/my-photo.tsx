"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

interface Props {
  className?: string;
}

const MyPhoto: React.FC<Props> = ({ className }) => {
  return (
    <motion.div
      layout
      layoutId="benjamin-looi"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={cn(
        "border border-white/10 transition duration-300 ease-out overflow-hidden rounded-3xl lg:w-96 aspect-square",
        className
      )}
    >
      <Image
        src="/images/benjamin-looi.jpg"
        alt="Benjamin Looi"
        height={2190}
        width={2190}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
        priority
        quality={85}
        className="object-cover object-top h-full w-full"
      />
    </motion.div>
  );
};
export default MyPhoto;
