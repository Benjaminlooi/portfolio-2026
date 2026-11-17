import Link from "next/link";
import AnimationContainer from "../animated/animated-container";

const AboutMe = () => {
	return (
		<AnimationContainer className="w-full py-12 lg:py-16">
			<h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
				A little about me
			</h2>
			<div className="max-w-3xl space-y-4 text-base leading-7 text-neutral-200">
				<p>
					I’m from Malaysia and moved to Cambodia in 2025. Building
					independently here has brought me closer to the people using my
					software — from restaurant staff handling mixed-currency payments to
					neighbours caring for a colony of stray cats.
				</p>
				<p>
					My day-to-day stack is TypeScript, React, and Next.js, with a
					professional background in Vue, Nuxt, Node.js, and Laravel.
				</p>
				<Link
					href="/about"
					className="inline-flex rounded font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
				>
					More about my background{" "}
					<span className="ml-2" aria-hidden="true">
						→
					</span>
				</Link>
			</div>
		</AnimationContainer>
	);
};
export default AboutMe;
