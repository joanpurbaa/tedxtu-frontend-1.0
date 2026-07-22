'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Speaker {
	name: string;
	description: string;
	image: string;
}

const speakers: Speaker[] = Array.from({ length: 4 }).map(() => ({
	name: "Speaker's Name",
	description:
		'Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.',
	image: '/speakers/keonho_uniform-removebg-preview 1.png',
}));

const baseThumbnails = ['/speakers/keonho1.svg', '/speakers/keonho2.svg', '/speakers/keonho3.svg'];

const thumbnailSets = Array.from({ length: 4 }).map((_, i) =>
	baseThumbnails.map((_, slot) => baseThumbnails[(slot + i) % baseThumbnails.length])
);

const Speakers = () => {
	const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
	const speaker = speakers[index];
	const thumbnails = thumbnailSets[index];
	const progress = ((index + 1) / speakers.length) * 100;

	const navigate = (dir: 'prev' | 'next') => {
		setIndex(([prev]) => {
			const nextIndex =
				dir === 'next'
					? (prev + 1) % speakers.length
					: (prev - 1 + speakers.length) % speakers.length;
			return [nextIndex, dir === 'next' ? 1 : -1];
		});
	};

	return (
		<section className="relative overflow-hidden bg-black py-16">
			<div className="pointer-events-none absolute right-0 top-1/2 z-0 h-[78rem] w-[78rem] -translate-y-1/2 translate-x-1/2 sm:h-[100rem] sm:w-[100rem]">
				<Image src="/about/red-ellipse.webp" alt="" fill sizes="100rem" className="object-contain" />
				<div
					className="absolute inset-0"
					style={{
						maskImage: "url('/about/red-ellipse.webp')",
						WebkitMaskImage: "url('/about/red-ellipse.webp')",
						maskSize: 'contain',
						WebkitMaskSize: 'contain',
						maskRepeat: 'no-repeat',
						WebkitMaskRepeat: 'no-repeat',
						maskPosition: 'center',
						WebkitMaskPosition: 'center',
					}}
				>
					<Image
						src="/speakers/backgroundTexture.svg"
						alt=""
						fill
						sizes="100rem"
						className="object-cover opacity-20 mix-blend-overlay"
					/>
				</div>
				<div className="absolute left-1/2 top-1/2 h-[25%] w-[18%] -translate-x-[85%] -translate-y-1/2 opacity-50">
					<Image src="/speakers/goldenMusicNote2.svg" alt="" fill sizes="180px" className="object-contain" />
				</div>
			</div>

			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black via-black/70 to-transparent sm:h-36 md:h-44" />

			<div className="pointer-events-none absolute -left-10 -top-4 z-20 h-56 w-40 sm:-left-14 sm:h-72 sm:w-52 md:-left-20 md:h-96 md:w-72">
				<Image src="/speakers/goldenMusicNote3.svg" alt="" fill sizes="288px" className="object-contain" />
			</div>

			<div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<h2 className="mb-10 text-center font-westmeath text-3xl uppercase tracking-wide text-white sm:mb-14 sm:text-4xl lg:text-5xl">
					Our Speakers
				</h2>

				<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
					<div className="relative mx-auto -mt-8 w-full max-w-md sm:-mt-10">
						<AnimatePresence mode="wait" custom={direction}>
							<motion.div
								key={index}
								custom={direction}
								initial={{ x: direction >= 0 ? 80 : -80, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: direction >= 0 ? -80 : 80, opacity: 0 }}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
								className="relative"
							>
								<div
									className="relative z-10 mx-auto w-3/4"
									style={{
										maskImage: 'linear-gradient(to bottom, black 72%, transparent 92%)',
										WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 92%)',
									}}
								>
									<Image
										src={speaker.image}
										alt={speaker.name}
										width={470}
										height={620}
										className="h-auto w-full object-contain"
										priority
									/>
								</div>
								<div
									className="absolute left-1/2 z-20 -translate-x-1/2"
									style={{ top: '55%', width: '110%' }}
								>
									<Image
										src="/speakers/Mist.svg"
										alt=""
										width={470}
										height={433}
										className="h-auto w-full object-contain"
									/>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					<div>
						<div className="relative overflow-hidden">
							<AnimatePresence mode="wait" custom={direction}>
								<motion.div
									key={index}
									custom={direction}
									initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
									transition={{ duration: 0.4, ease: 'easeInOut' }}
								>
									<h3 className="font-westmeath text-2xl text-amber-300 sm:text-3xl">
										{speaker.name}
									</h3>
									<p className="mt-4 font-raleway text-sm leading-6 text-white/80 sm:text-base">
										{speaker.description}
									</p>
								</motion.div>
							</AnimatePresence>
						</div>

						<div className="relative mt-10 overflow-hidden">
							<AnimatePresence mode="wait" custom={direction}>
								<motion.div
									key={index}
									custom={direction}
									initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
									transition={{ duration: 0.4, ease: 'easeInOut' }}
									className="flex items-end gap-6"
								>
									{thumbnails.map((src) => (
										<div key={src} className="w-1/3">
											<Image
												src={src}
												alt=""
												width={139}
												height={139}
												className="h-auto w-full object-contain"
											/>
										</div>
									))}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>

			<div className="relative mx-auto mt-12 max-w-6xl px-4 sm:mt-16 sm:px-6 lg:px-8">
				<div className="relative h-1 w-full overflow-hidden rounded-full bg-white">
					<div
						className="absolute inset-y-0 left-0 rounded-full bg-red-600 transition-all duration-500 ease-out"
						style={{ width: `${progress}%` }}
					/>
					<div
						className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-red-600 transition-all duration-500 ease-out"
						style={{ left: `calc(${progress}% - 5px)` }}
					/>
				</div>

				<div className="mt-5 flex items-center justify-center gap-6">
					<button
						onClick={() => navigate('prev')}
						aria-label="Previous speaker"
						className="text-white transition-transform duration-300 hover:-translate-x-1"
					>
						<ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7" />
					</button>
					<button
						onClick={() => navigate('next')}
						aria-label="Next speaker"
						className="text-white transition-transform duration-300 hover:translate-x-1"
					>
						<ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Speakers;
