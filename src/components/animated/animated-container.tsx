"use client";

import { motion, useReducedMotion } from "motion/react";

interface AnimationContainerProps {
	children: React.ReactNode;
	className?: string;
	customDelay?: number;
	invert?: boolean;
}

const AnimationContainer = ({
	children,
	className,
	customDelay = 0.3,
	invert = false,
}: AnimationContainerProps) => {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reduceMotion ? false : { opacity: 0, y: invert ? -20 : 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				delay: reduceMotion ? 0 : customDelay,
				duration: reduceMotion ? 0 : 0.2,
				ease: "easeInOut",
				type: "spring",
				stiffness: 260,
				damping: 20,
			}}
		>
			{children}
		</motion.div>
	);
};

export default AnimationContainer;
