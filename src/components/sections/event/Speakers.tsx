'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, UserRound } from 'lucide-react';

interface Speaker {
	id: string;
	isLocked: boolean;
	name?: string | null;
	title?: string | null;
	description?: string | null;
	mainPhoto?: string | null;
	supportingPhoto1?: string | null;
	supportingPhoto2?: string | null;
	supportingPhoto3?: string | null;
}

const LOCKED_NAME = '???';
const LOCKED_DESCRIPTION = 'Stay tuned for more information.';

// Always render 6 speaker slots. Revealed speakers (from the API, in reveal order)
// fill the slots from the front; the remaining slots show a placeholder.
const SLOT_COUNT = 6;

const isImageUrl = (src?: string | null) =>
	!!src && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:'));

const Speakers = () => {
	const [speakers, setSpeakers] = useState<Speaker[]>([]);
	const [loading, setLoading] = useState(true);
	const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

	useEffect(() => {
		let cancelled = false;
		fetch('/api/speakers')
			.then((res) => res.json())
			.then((data: Speaker[]) => {
				if (!cancelled) setSpeakers(data);
			})
			.catch(() => {})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	// Build the 6 slots: revealed speakers first (in API order), then placeholders.
	const slotCount = Math.max(SLOT_COUNT, speakers.length);
	const slots: (Speaker | null)[] = Array.from({ length: slotCount }, (_, i) => speakers[i] ?? null);

	// Clamp the index whenever the slot count changes.
	useEffect(() => {
		setIndex(([prev]) => [slots.length > 0 ? prev % slots.length : 0, 0]);
	}, [slots.length]);

	const navigate = (dir: 'prev' | 'next') => {
		setIndex(([prev]) => {
			const nextIndex =
				dir === 'next'
					? (prev + 1) % slots.length
					: (prev - 1 + slots.length) % slots.length;
			return [nextIndex, dir === 'next' ? 1 : -1];
		});
	};

	if (loading) {
		return (
			<section className="relative overflow-hidden bg-black py-16">
				<div className="relative z-20 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-10 text-center font-westmeath text-3xl uppercase tracking-wide text-white sm:mb-14 sm:text-4xl lg:text-5xl">
						Our Speakers
					</h2>
					<p className="font-raleway text-sm text-white/50">Loading speakers...</p>
				</div>
			</section>
		);
	}

	const raw = slots[index];
	const isPlaceholder = !raw;
	const speaker = raw ?? ({} as Speaker);
	// A speaker is only "revealed" once it has a real image URL (data: or http(s):).
	// The seeded placeholder value ("placeholder") is NOT a valid image, so those
	// keep showing the placeholder frame instead of crashing the URL parser.
	const isRevealed = !isPlaceholder && isImageUrl(speaker.mainPhoto);
	const mainPhoto = isRevealed ? speaker.mainPhoto ?? '' : '';
	const displayedName = (isRevealed ? speaker.name : LOCKED_NAME) || LOCKED_NAME;
	const displayedDescription = isRevealed ? speaker.description : LOCKED_DESCRIPTION;
	const thumbnails = [
		speaker.supportingPhoto1,
		speaker.supportingPhoto2,
		speaker.supportingPhoto3,
	].filter((src): src is string => !!src);
	const hasThumbnails = isRevealed && thumbnails.length > 0;
	const progress = ((index + 1) / slots.length) * 100;

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
									{isRevealed ? (
										<div className="relative aspect-[3/4] w-full overflow-hidden">
											{mainPhoto.startsWith('data:') ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={mainPhoto}
													alt={displayedName}
													className="h-full w-full object-cover"
												/>
											) : (
												<Image
													src={mainPhoto}
													alt={displayedName}
													fill
													sizes="(max-width: 768px) 75vw, 400px"
													className="object-cover"
													priority
												/>
											)}
										</div>
									) : (
										<div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 bg-[#181818]">
											<UserRound
												className="h-28 w-28 text-white/20 sm:h-32 sm:w-32"
												strokeWidth={1}
											/>
											<span className="font-westmeath text-5xl text-white/30 sm:text-6xl">?</span>
										</div>
									)}
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
										{displayedName}
									</h3>
									{isRevealed && speaker.title && (
										<p className="mt-2 font-raleway text-sm font-medium uppercase tracking-wide text-white/50 sm:text-base">
											{speaker.title}
										</p>
									)}
									<p className="mt-4 font-raleway text-sm leading-6 text-white/80 sm:text-base">
										{displayedDescription}
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
									{hasThumbnails
										? thumbnails.map((src) => (
												<div key={src} className="w-1/3">
													<div className="relative aspect-square w-full overflow-hidden">
														{src.startsWith('data:') ? (
															// eslint-disable-next-line @next/next/no-img-element
															<img src={src} alt="" className="h-full w-full object-cover" />
														) : (
															<Image
																src={src}
																alt=""
																fill
																sizes="100px"
																className="object-cover"
															/>
														)}
													</div>
												</div>
										  ))
										: [0, 1, 2].map((i) => (
												<div key={i} className="w-1/3">
													<div className="flex aspect-square w-full items-center justify-center bg-[#181818]">
														<UserRound className="h-12 w-12 text-white/15" strokeWidth={1} />
													</div>
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
