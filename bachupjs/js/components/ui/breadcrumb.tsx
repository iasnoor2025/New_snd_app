import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"
import ListErrorBoundary from '@/components/error/ListErrorBoundary'

export interface BreadcrumbProps extends React.ComponentProps<"nav"> {
  segments: {
    title: string
    href?: string
  }[]
  separator?: React.ReactNode
  className?: string
}

const BreadcrumbContext = React.createContext<{
  separator?: React.ReactNode
}>({})

export function Breadcrumb({
  segments = [],
  separator = <ChevronRight className="h-4 w-4" />,
  className,
  ...props
}: BreadcrumbProps) {
  // Ensure segments is always an array
  const safeSegments = Array.isArray(segments) ? segments : [];

  return (
    <nav
      aria-label="breadcrumb"
      className={cn(
        "flex w-full items-center space-x-1 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {safeSegments.map((segment, index) => {
        const isLast = index === safeSegments.length - 1;

        return (
          <React.Fragment key={segment.href || index}>
            {separator}
            {isLast ? (
              <span className="font-medium text-foreground">
                {segment.title}
              </span>
            ) : (
              <Link
                href={segment.href || "#"}
                className="hover:text-foreground"
              >
                {segment.title}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export interface BreadcrumbListProps extends React.ComponentProps<"ol"> {
  className?: string
}

// Wrap BreadcrumbList in memo to prevent unnecessary re-renders
export const BreadcrumbList = React.memo(function BreadcrumbList({
  className,
  ...props
}: BreadcrumbListProps) {
  return (
    <ListErrorBoundary>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
          className
        )}
        {...props}
      />
    </ListErrorBoundary>
  )
})

export interface BreadcrumbItemProps extends React.ComponentProps<"li"> {
  className?: string
}

// Wrap BreadcrumbItem in memo to prevent unnecessary re-renders
export const BreadcrumbItem = React.memo(function BreadcrumbItem({
  className,
  ...props
}: BreadcrumbItemProps) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
})

export interface BreadcrumbLinkProps extends React.ComponentProps<typeof Link> {
  className?: string
  asChild?: boolean
}

// Wrap BreadcrumbLink in memo to prevent unnecessary re-renders
export const BreadcrumbLink = React.memo(function BreadcrumbLink({
  className,
  ...props
}: BreadcrumbLinkProps) {
  return <Link className={cn("transition-colors hover:text-foreground", className)} {...props} />
})

export interface BreadcrumbPageProps extends React.ComponentProps<"span"> {
  className?: string
}

// Wrap BreadcrumbPage in memo to prevent unnecessary re-renders
export const BreadcrumbPage = React.memo(function BreadcrumbPage({
  className,
  ...props
}: BreadcrumbPageProps) {
  return <span className={cn("font-medium text-foreground", className)} aria-current="page" {...props} />
})

export interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {
  className?: string
}

// Wrap BreadcrumbSeparator in memo to prevent unnecessary re-renders
export const BreadcrumbSeparator = React.memo(function BreadcrumbSeparator({
  className,
  children,
  ...props
}: BreadcrumbSeparatorProps) {
  const { separator } = React.useContext(BreadcrumbContext)
  return (
    <li className={cn("flex items-center", className)} aria-hidden="true" {...props}>
      {children || separator || <ChevronRight className="h-3 w-3" />}
    </li>
  )
})




