import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("grid", className)}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid }

