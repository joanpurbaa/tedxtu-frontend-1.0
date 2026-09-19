import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Merchandise | TEDxTelkom University',
    description:
        'Official TEDxTelkom University merchandise, including caps, keychains, notebooks, totes, T-shirts and bundle packs. You can only buy it at the main event on the day itself.',
    openGraph: {
        title: 'Merchandise | TEDxTelkom University',
        description:
            'Official TEDxTelkom University merchandise and bundle packs. You can only buy it at the main event on the day itself.',
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