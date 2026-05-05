import type { Metadata } from 'next';
import {
    Geist,
    Geist_Mono,
    Cinzel,
    Cinzel_Decorative,
    Playfair_Display,
    Raleway,
    Great_Vibes,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const raleway = Raleway({
    variable: '--font-raleway',
    subsets: ['latin'],
    style: ['italic', 'normal'],
    weight: ['400', '700', '900'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
    variable: '--font-playfair-display',
    subsets: ['latin'],
    style: ['italic', 'normal'],
    weight: ['400', '700', '900'],
});

const cinzelDecorative = Cinzel_Decorative({
    variable: '--font-cinzel-decorative',
    subsets: ['latin'],
    weight: ['400', '700', '900'],
});

const greatVibes = Great_Vibes({
    variable: '--font-great-vibes',
    subsets: ['latin'],
    weight: ['400'],
});

const cinzelNormal = Cinzel({
    variable: '--font-cinzel',
    subsets: ['latin'],
    style: ['normal'],
    weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
    title: 'TEDxTelkom University',
    description: 'TEDxTelkom University website made with <3',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${geistSans.variable} ${raleway.variable} ${cinzelNormal.variable} ${playfairDisplay.variable} ${geistMono.variable} ${cinzelDecorative.className} ${greatVibes.variable} antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
