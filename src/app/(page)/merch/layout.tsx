import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Merchandise | TEDxTelkom University',
    description:
        'Official TEDxTelkom University merchandise — caps, keychains, notebooks, totes, T-shirts and curated bundle packs. Available for purchase only at the main event.',
    openGraph: {
        title: 'Merchandise | TEDxTelkom University',
        description:
            'Official TEDxTelkom University merchandise and bundle packs. Available for purchase only at the main event.',
        type: 'website',
    },
};

export default function MerchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}