"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/posthog-analytics";
import { cn } from "@/lib/utils";
import AnimationContainer from "../animated/animated-container";
import { buttonVariants } from "../ui/button";

export default function ContactSection() {
	return (
		<AnimationContainer className="w-full py-12 lg:py-16">
			<section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-10">
				<h2 className="text-2xl font-bold tracking-tight text-white">
					Let’s build something useful.
				</h2>
				<p className="mt-4 max-w-2xl text-base leading-7 text-neutral-200">
					I’m looking for a remote product engineering role where I can own
					features end-to-end and work closely with users. Based in Cambodia
					(UTC+7), comfortable with async collaboration.
				</p>
				<Link
					href="/contact"
					className={cn(buttonVariants(), "mt-6 rounded-full")}
					onClick={() => trackCTAClick("contact_me", "homepage_contact")}
				>
					Get in touch
				</Link>
			</section>
		</AnimationContainer>
	);
}
