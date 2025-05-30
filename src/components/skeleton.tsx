import { mergeClasses } from "@/lib/tailwind"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={mergeClasses("bg-accent animate-pulse rounded-md mb-0", className)}
      {...props}
    />
  )
}

export { Skeleton }
