import React, { useState, useEffect } from "react";
import { Input } from "./input";
import { format, parse } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Array of hours (0-23)
const hours = Array.from({ length: 24 }, (_, i) => i);

// Array of minutes (0, 15, 30, 45)
const minutes = [0, 15, 30, 45];

// Common preset times
const presetTimes = [;
  { label: "8:00 AM", value: "08:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "5:00 PM", value: "17:00" },
];

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>("");
  
  // Parse the time string to get hours and minutes
  const parseTime = (timeString: string) => {
    try {
      // Handle both 24-hour format (HH:mm) and 12-hour format with AM/PM
      if (timeString.includes("AM") || timeString.includes("PM")) {
        const date = parse(timeString, "h:mm a", new Date());
        return {
          hours: date.getHours(),
          minutes: date.getMinutes(),
        };
      } else {
        const [hoursStr, minutesStr] = timeString.split(":");
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        
        if (!isNaN(hours) && !isNaN(minutes)) {
          return { hours, minutes };
        }
      }
      
      // If the above methods fail, try to use Date parsing as a fallback
      const date = new Date(`2000-01-01T${timeString}`);
      if (!isNaN(date.getTime())) {
        return {
          hours: date.getHours(),
          minutes: date.getMinutes(),
        };
      }
      
      throw new Error("Invalid time format");
    } catch (error) {
      return {
        hours: 0,
        minutes: 0,
      };
    }
  };
  
  // Format the time for display
  const formatDisplayTime = (timeString: string) => {
    try {
      const { hours, minutes } = parseTime(timeString);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return format(date, "h:mm a");
    } catch (error) {
      return "";
    }
  };
  
  // Update display value when value changes
  useEffect(() => {
    setDisplayValue(formatDisplayTime(value));
  }, [value]);
  
  // Handle input change directly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    
    // Try to parse the input value to a time format
    try {
      const date = parse(newValue, "h:mm a", new Date());
      onChange(format(date, "HH:mm"));
    } catch (error) {
      // If parsing fails with standard format, try alternative formats
      try {
        const time = parseTime(newValue);
        const date = new Date();
        date.setHours(time.hours);
        date.setMinutes(time.minutes);
        onChange(format(date, "HH:mm"));
      } catch (e) {
        // If all parsing fails, don't update the actual value
      }
    }
  };
  
  // Select a time from the picker
  const selectTime = (hour: number, minute: number) => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    
    const newTimeString = format(date, "HH:mm");
    onChange(newTimeString);
    setIsOpen(false);
  };
  
  // Select a preset time
  const selectPresetTime = (timeString: string) => {
    onChange(timeString);
    setIsOpen(false);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
          type="button"
          <Clock className="mr-2 h-4 w-4" />
          {displayValue || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          {/* Preset times */}
          <div>
            <div className="mb-2 text-center font-medium">Presets</div>
            <div className="flex justify-center gap-2">
              {presetTimes.map((preset) => (
                <Button
                  key={preset.value}
                  type="button"
                  variant="outline"
                  className="w-24"
                  onClick={() => selectPresetTime(preset.value)}
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Hours */}
          <div>
            <div className="mb-2 text-center font-medium">Hours</div>
            <div className="grid grid-cols-6 gap-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-8 w-10 p-0",
                    parseTime(value).hours === hour && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => selectTime(hour, parseTime(value).minutes)}
                  {hour}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Minutes */}
          <div>
            <div className="mb-2 text-center font-medium">Minutes</div>
            <div className="flex justify-center gap-2">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-8 w-16 p-0",
                    parseTime(value).minutes === minute && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => selectTime(parseTime(value).hours, minute)}
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Manual input */}
          <div className="mt-4">
            <Input
              value={displayValue}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Or type time (e.g. 2:30 PM)"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker; 
