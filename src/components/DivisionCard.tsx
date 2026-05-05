import Image from 'next/image';
import { Card, CardContent } from './ui/card';

type DivisionCardProp = {
    title: string;
    description: string;
    className?: string;
};

export default function DivisionCard({ title, description, className }: DivisionCardProp) {
    return (
        <Card className={`relative bg-[#591303] rounded-xl overflow-hidden w-full max-w-[232px] min-w-[232px] mx-auto ${className}`}>
            <CardContent className='px-[16] py-[32px] relative h-[300px] bg-cover bg-right flex flex-col justify-between [background-image:url("/speakers/vector-1.webp")]'>
                <h2 className="text-center text-xl font-semibold">{title}</h2> {/* Title centered */}
                <p className='font-[raleway] text-justify[#f3b8ab]'>{description}</p>
            </CardContent>
        </Card>
    );
}
