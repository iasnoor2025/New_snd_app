export default function Heading({
    title,
    description,
    variant = 'default'
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    if (variant === 'small') {
        return (
            <header>
                <h3 className="mb-0.5 text-base font-medium">{title}</h3>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </header>
        );
    }

    return (
        <div className="mb-8 space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
    );
}
