import { IconLoader2 } from '@tabler/icons-react'
import { cn } from '@Forma/ui/lib/utils'
import type { ComponentProps } from 'react'

export default function Loader({ className, ...props }: ComponentProps<typeof IconLoader2>) {
  return (
    <IconLoader2 aria-hidden="true" className={cn('size-4 animate-spin', className)} {...props} />
  )
}
