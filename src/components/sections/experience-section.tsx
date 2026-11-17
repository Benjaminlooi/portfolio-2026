import AnimationContainer from "../animated/animated-container";

const experience = [
	{
		company: "TalentCloud AI",
		role: "Senior Full Stack Developer · 3 years",
		description:
			"Led a frontend migration to a Nuxt.js monorepo, built Excel-like shift management workflows, and mentored junior developers on an enterprise HR platform.",
		focus: "Frontend architecture · Complex workflows · Mentoring",
	},
	{
		company: "Platinum Code",
		role: "Sole frontend developer",
		description:
			"Architected a point-of-sale frontend from scratch for the food and beverage industry, owning the application’s frontend structure and implementation.",
		focus: "Product ownership · POS systems · Frontend development",
	},
];

export default function ExperienceSection() {
	return (
		<AnimationContainer className="w-full py-12 lg:py-16">
			<h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
				Professional experience
			</h2>
			<div className="divide-y divide-white/10 border-y border-white/10">
				{experience.map((item) => (
					<div
						key={item.company}
						className="grid gap-4 py-7 md:grid-cols-[1fr_2fr] md:gap-10"
					>
						<div>
							<h3 className="text-lg font-semibold text-white">
								{item.company}
							</h3>
							<p className="mt-2 text-sm text-neutral-400">{item.role}</p>
						</div>
						<div>
							<p className="text-base leading-7 text-neutral-200">
								{item.description}
							</p>
							<p className="mt-3 text-sm leading-6 text-neutral-400">
								{item.focus}
							</p>
						</div>
					</div>
				))}
			</div>
		</AnimationContainer>
	);
}
