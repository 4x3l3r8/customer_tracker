"use client"

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input, type InputProps } from '../ui/input';

interface DebouncedInput extends InputProps {
    debounce?: number;
    onUpdate: (value: string | number | readonly string[] | undefined) => void
}
// A debounced input React component
function DebouncedInput({
    value: initialValue,
    onUpdate,
    debounce = 500,
    ...props
}: DebouncedInput) {

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onUpdate(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, onUpdate, debounce]);

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" {...props} value={value} onChange={(e) => setValue(e.target.value)} placeholder='Search' />
        </div>
    );
}


export default DebouncedInput;
