'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Activity {
	name: string;
	description: string;
	image: string;
}

const activities: Activity[] = [
	{
		name: 'Activityies Name',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.',
		image: '/speakers/interactiveActivities.svg',
	},
];

const InteractiveActivities = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFading, setIsFading] = useState(false);
	const activity = activities[currentIndex];

	const navigate = (direction: 'prev' | 'next') => {
		if (isFading) return;
		setIsFading(true);
		setTimeout(() => {
			setCurrentIndex((prev) => {
				if (direction === 'prev') return (prev - 1 + activities.length) % activities.length;
				return (prev + 1) % activities.length;
			});
			setIsFading(false);
		}, 400);
	};

	return (
		<section className="relative min-h-screen w-full overflow-hidden bg-black">
			<Image
				key={activity.image}
				src={activity.image}
				alt={activity.name}
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/60" />
			<div
				className={`absolute inset-0 z-10 bg-black transition-opacity duration-400 ${
					isFading ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
			/>

			<div className="relative z-20 flex min-h-screen w-full flex-col justify-between px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<h2 className="text-center font-westmeath text-2xl uppercase tracking-wide text-white sm:text-3xl md:text-4xl lg:text-5xl">
					Interactive Activities
				</h2>

				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl mb-6 sm:mb-10 sm:ml-8 md:mb-14 md:ml-16 lg:ml-24">
						<h3 className="font-westmeath text-2xl text-white sm:text-3xl md:text-4xl">
							{activity.name}
						</h3>
						<p className="mt-3 font-raleway text-base leading-7 text-white/80 sm:text-lg md:text-xl">
							{activity.description}
						</p>
					</div>

					<div className="flex shrink-0 items-center gap-4 self-end">
						<button
							onClick={() => navigate('prev')}
							aria-label="Previous activity"
							className="text-white transition-transform duration-300 hover:-translate-x-1"
						>
							<ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7" />
						</button>
						<button
							onClick={() => navigate('next')}
							aria-label="Next activity"
							className="text-white transition-transform duration-300 hover:translate-x-1"
						>
							<ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InteractiveActivities;
