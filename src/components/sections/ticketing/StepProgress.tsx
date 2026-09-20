export const ticketingSteps = ['Identity', 'About You', 'Payment', 'Consent'];

export default function StepProgress({
    activeIndex,
    labels,
}: {
    activeIndex: number;
    labels?: string[];
}) {
    const steps = labels ?? ticketingSteps;
    return (
        <div className='mb-6 flex gap-2'>
            {steps.map((label, i) => (
                <div
                    key={label}
                    className={`flex-1 rounded-full py-2 text-center font-raleway text-xs uppercase tracking-wide ${
                        i <= activeIndex
                            ? 'bg-[#C58A1C] text-black'
                            : 'bg-white/10 text-white/50'
                    }`}
                >
                    {label}
                </div>
            ))}
        </div>
    );
}
