import { z } from 'zod/mini'

const BIN_REGEX = /^\d{12}$/

export const organizationSetupSchema = z.object({
  name: z
    .string()
    .check(
      z.minLength(2, 'Name must be at least 2 characters'),
      z.maxLength(100, 'Name must not exceed 100 characters'),
    ),

  bin: z.string().check(z.regex(BIN_REGEX, 'BIN must contain exactly 12 digits')),

  address: z.optional(z.string()),
})

export type OrganizationSetupInput = z.infer<typeof organizationSetupSchema>
