import { Link as RouterLink } from 'react-router-dom'
import { forwardRef, ReactNode } from 'react'

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  children: ReactNode
}

// Wrapper component to replace Next.js Link with React Router Link
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <RouterLink ref={ref} to={href} {...props}>
        {children}
      </RouterLink>
    )
  }
)

Link.displayName = 'Link'
