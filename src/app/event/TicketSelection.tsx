"use client";

import Link from 'next/link';

export interface TicketTier {
	tier: string;
	price: string;
	badgeText?: string;
	remaining: string;
	features: string[];
}

const ticketsData: TicketTier[] = [
	{
		tier: 'EARLY BIRD',
		price: 'RP 75K',
		badgeText: 'Save 40%',
		remaining: '23 ticket remaining',
		features: [
			'Main event access',
			'Welcome kit & program',
			'Refreshments included',
			'Certificate of attendance',
		],
	},
	{
		tier: 'PRE-SALE',
		price: 'RP 110K',
		badgeText: 'Popular',
		remaining: '23 ticket remaining',
		features: [
			'Priority seating (first 5 rows)',
			'Pre-event speaker meet & greet',
			'Exclusive souvenir package',
			'Post-event gala dinner access',
			'Printed photo with speakers',
		],
	},
	{
		tier: 'REGULAR',
		price: 'RP 150K',
		remaining: '23 ticket remaining',
		features: [
			'All VIP benefits included',
			'Backstage access pass',
			'Name in event credits',
			'2x event tickets included',
			'Annual sponsor recognition',
		],
	},
];

const TicketSelection = () => {
	return (
		<section className="relative overflow-hidden bg-[#4a1512] px-4 py-16 sm:px-6 lg:px-8">
			<div
				className="absolute inset-0 hidden md:block"
				style={{
					backgroundImage: "url('/speakers/ticketSectionBackground.png')",
					backgroundRepeat: 'no-repeat',
					backgroundSize: '105%',
					backgroundPosition: 'center',
				}}
			/>
			<div
				className="absolute inset-0 md:hidden"
				style={{
					backgroundImage: "url('/Ticket%20section.png')",
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<div className="absolute inset-0 bg-black/20" />
			<div
				className="absolute inset-0"
				style={{
					backgroundImage:
						'linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)',
				}}
			/>

			<div className="relative mx-auto max-w-7xl">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="font-westmeath text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
						GET YOUR TICKETS
					</h2>
					<p className="mt-4 font-raleway text-sm leading-6 text-white/85 sm:text-base">
						Secure Your Place in History
					</p>
				</div>

				<div className="mt-10 mx-auto grid max-w-xl gap-8 sm:max-w-4xl lg:max-w-6xl lg:grid-cols-3">
					{ticketsData.map((ticket) => (
						<article
							key={ticket.tier}
							className="flex h-full flex-col rounded-2xl border border-amber-400/80 bg-black/40 px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]"
						>
							<div className="flex min-h-10 justify-center">
								{ticket.badgeText ? (
									<span className="inline-flex items-center rounded-full bg-amber-400 px-4 py-1 font-raleway text-xs font-bold uppercase tracking-[0.2em] text-[#3b150f] shadow-md">
										{ticket.badgeText}
									</span>
								) : (
									<span className="invisible inline-flex items-center rounded-full px-4 py-1 font-raleway text-xs font-bold uppercase tracking-[0.2em]">
										placeholder
									</span>
								)}
							</div>

							<div className="mt-4 text-center">
								<h3 className="font-westmeath text-2xl tracking-[0.1em] text-white">
									{ticket.tier}
								</h3>
								<p className="mt-4 font-westmeath text-4xl text-amber-300 sm:text-5xl">
									{ticket.price}
								</p>
								<p className="mt-2 font-raleway text-sm text-[#b79f8e]">{ticket.remaining}</p>
							</div>

							<ul className="mt-6 flex-1 space-y-3 text-left font-raleway text-sm leading-6 text-white/90">
								{ticket.features.map((feature) => (
									<li key={feature} className="flex gap-3">
										<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
										<span>{feature}</span>
									</li>
								))}
							</ul>

							<Link
								href="/ticketing"
								className="mt-8 rounded-full bg-amber-500 px-5 py-3 text-center font-westmeath text-sm uppercase tracking-[0.18em] text-white transition duration-300 hover:scale-[1.02] hover:bg-amber-400 hover:brightness-110"
							>
								RESERVE NOW
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default TicketSelection;
