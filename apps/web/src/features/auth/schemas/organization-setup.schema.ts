import { z } from 'zod/mini'

const BIN_REGEX = /^\d{12}$/

export const organizationSetupSchema = z.object({
  name: z
    .string()
    .check(
      z.minLength(2, 'Имя должно состоять как минимум из 2 символов'),
      z.maxLength(100, 'Имя не должно превышать 100 символов'),
    ),

  bin: z.string().check(z.regex(BIN_REGEX, 'BIN должен состоять ровно из 12 цифр')),

  address: z.optional(z.string()),
})

export type OrganizationSetupInput = z.infer<typeof organizationSetupSchema>
