import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function DateTimeDisplay() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format the date like "June 26, 2024"
    const formattedDate = dateTime.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    // Format day name like "Wednesday"
    const dayName = dateTime.toLocaleDateString('en-US', {
        weekday: 'long',
    })

    // Format time with seconds HH:MM:SS
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    const ampm = dateTime.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <Card className="fixed right-4 top-0 z-[100] w-[220px] bg-white/5 border border-white/10 rounded-b-xl backdrop-blur-md shadow-lg shadow-black/5">
            <CardContent className="px-1.5 py-[1px] flex flex-col">
                <div className="flex justify-between">
                    <div className="text-primary/90 text-[10px] font-mono">{formattedDate}</div>
                    <div className="text-primary/90 text-[10px] font-mono">{dayName}</div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="text-base font-mono tracking-wider text-primary font-bold flex items-center">
                        <span className="opacity-90">{hours}</span>
                        <span className="text-primary opacity-90">:</span>
                        <span className="opacity-90">{minutes}</span>
                        <span className="text-primary opacity-90">:</span>
                        <span className="opacity-90">{seconds}</span>
                        <span className="ml-1 text-primary/80 text-xs">{ampm}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}