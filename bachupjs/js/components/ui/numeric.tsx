import * as React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumericProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export function Numeric({
  value,
  onValueChange,
  min = 0,
  max = Infinity,
  step = 1,
  className,
  inputClassName,
  buttonClassName,
  ...props
}: NumericProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onValueChange(constrainValue(newValue));
    }
  };

  const handleIncrement = () => {
    onValueChange(constrainValue(value + step));
  };

  const handleDecrement = () => {
    onValueChange(constrainValue(value - step));
  };

  const handleBlur = () => {
    // Ensure value is within constraints on blur
    onValueChange(constrainValue(value));
  };

  const constrainValue = (val: number): number => {
    return Math.min(Math.max(val, min), max);
  };

  const isDecrementDisabled = value <= min;
  const isIncrementDisabled = value >= max;

  return (
    <div 
      className={cn(
        "flex h-10 w-full items-center rounded-md border border-input bg-background",
        className
      )}
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "h-full rounded-r-none px-3",
          isDecrementDisabled && "opacity-50 cursor-not-allowed",
          buttonClassName
        )}
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        tabIndex={-1}
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input
        {...props}
        type="number"
        className={cn(
          "h-full border-0 text-center rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          inputClassName
        )}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
      />
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "h-full rounded-l-none px-3",
          isIncrementDisabled && "opacity-50 cursor-not-allowed",
          buttonClassName
        )}
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        tabIndex={-1}
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
} 