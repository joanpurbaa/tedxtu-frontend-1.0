import type { Metadata } from 'next';
import {
    Geist,
    Geist_Mono,
    Cinzel,
    Cinzel_Decorative,
    Playfair_Display,
    Raleway,
} from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import localFont from 'next/font/local';
import './globals.css';
import { icons } from 'lucide-react';

const westmeath = localFont({
    src: [
        {
            path: '../../public/font/westmeath.regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/font/westmeath.italic.ttf',
            weight: '400',
            style: 'italic',
        },
    ],
    variable: '--font-westmeath',
});

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

const cinzelNormal = Cinzel({
    variable: '--font-cinzel',
    subsets: ['latin'],
    style: ['normal'],
    weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
    title: 'TEDxTelkom University',
    description: 'TEDxTelkom University website made with <3',
    icons: {
        icon: '/logo-white.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning className={westmeath.variable}>
            <body
                suppressHydrationWarning
                className={`${geistSans.variable} ${raleway.variable} ${cinzelNormal.variable} ${playfairDisplay.variable} ${geistMono.variable} ${cinzelDecorative.className}  antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className=''>{children}</div>
                </ThemeProvider>
            </body>
        </html>
    );
}
