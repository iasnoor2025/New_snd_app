import React, { useState, useEffect } from "react";
import { Dialog as BaseDialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogErrorBoundary } from "@/components/DialogErrorBoundary";
import { Button } from "@/components/ui/button";

interface SafeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function SafeDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = "md",
}: SafeDialogProps) {
  // Local state to manage rendering - prevents issues with refs being accessed too early/late
  const [isRendered, setIsRendered] = useState(false);

  // Only render content when dialog is opened, with a small delay
  useEffect(() => {
    let timeoutId;

    if (open) {
      // Small delay to ensure proper DOM setup
      timeoutId = setTimeout(() => {
        setIsRendered(true);
      }, 10);
    } else {
      // When closing, keep rendered for a moment to allow animations
      timeoutId = setTimeout(() => {
        setIsRendered(false);
      }, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [open]);

  return (
    <DialogErrorBoundary>
      <BaseDialog open={open} onOpenChange={onOpenChange}>
        {(isRendered || open) && (
          <DialogContent
            className={`max-w-${maxWidth} overflow-y-auto max-h-[90vh]`}
            onPointerDownOutside={(e) => e.preventDefault()} // Prevent accidental closing
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
            <div>
              {children}
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        )}
      </BaseDialog>
    </DialogErrorBoundary>
  );
}
