export const BUNDLE_PRICES = {
    SOLO: 84900,
    DUO: 160000,
    FOUR: 300000,
} as const;

export type BundleType = keyof typeof BUNDLE_PRICES;

export const BUNDLE_MEMBER_LINK = 'https://bit.ly/BundleMainEventTEDxTU';

export const BUNDLE_MEMBER_COUNT: Record<BundleType, number> = {
    SOLO: 1,
    DUO: 2,
    FOUR: 4,
};

export function formatPrice(amount: number): string {
    return `Rp${amount.toLocaleString('id-ID')}`;
}

export function formatBundlePrice(type: BundleType): string {
    return formatPrice(BUNDLE_PRICES[type]);
}