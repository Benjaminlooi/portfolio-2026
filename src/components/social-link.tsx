"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import {
	type ProfilePlatform,
	trackProfileLinkClick,
	trackResumeDownload,
} from "@/lib/posthog-analytics";

interface SocialLinkProps {
	href: string;
	icon: ElementType;
	label: string;
	index: number;
	newTab?: boolean;
	location?: string;
	platform?: ProfilePlatform;
	isResume?: boolean;
}

export function SocialLink({
	href,
	icon: Icon,
	label,
	index,
	newTab,
	location = "links_page",
	platform,
	isResume,
}: SocialLinkProps) {
	const handleClick = () => {
		if (isResume) {
			trackResumeDownload({ location, url: href });
			return;
		}

		if (platform) {
			trackProfileLinkClick({ platform, url: href, location });
		}
	};

	return (
		<motion.a
			href={href}
			target={newTab ? "_blank" : "_self"}
			rel="noopener noreferrer"
			onClick={handleClick}
			className="w-full px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4 hover:bg-gray-50"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<Icon className="w-6 h-6 text-gray-700" />
			<span className="text-gray-800 font-medium">{label}</span>
		</motion.a>
	);
}
