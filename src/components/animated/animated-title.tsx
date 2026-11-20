"use client";

import { motion } from "motion/react";

interface Props {
	title: string;
	as?: "h1" | "h2";
}

const variants = {
	hidden: { opacity: 0, y: -20 },
	visible: { opacity: 1, y: 0 },
};

const AnimatedTitle = ({ title, as: Heading = "h2" }: Props) => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={variants}
			transition={{
				type: "spring",
				bounce: 0.25,
				duration: 0.5,
			}}
			className="w-full mb-8"
		>
			<Heading className="mb-8 text-4xl tracking-wide text-white !leading-[1.5] font-semibold capitalize">
				{title}
			</Heading>
		</motion.div>
	);
};

export default AnimatedTitle;
