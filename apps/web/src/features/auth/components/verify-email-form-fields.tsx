import { Controller, type UseFormReturn } from 'react-hook-form'
import type { OtpSchema } from '../schemas/otp.schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '@Forma/ui/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Forma/ui/components/input-group'
import { IconLockPassword, IconMail } from '@tabler/icons-react'

interface VerifyEmailFormFieldsProps {
  form: UseFormReturn<OtpSchema>
}

export default function VerifyEmailFormFields({ form }: VerifyEmailFormFieldsProps) {
  return (
    <FieldGroup>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="verification-form-email">Почта</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder="Почта"
                id="verification-form-email"
                type="email"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon>
                <IconMail />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="verification-form-otp">OTP Код</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder="Код"
                id="verification-form-otp"
                type="number"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon>
                <IconLockPassword />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
