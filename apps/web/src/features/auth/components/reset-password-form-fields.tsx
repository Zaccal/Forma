'use client'

import type { ResetPasswordSchema } from '@/features/auth/schemas/password-reset.schema'
import { Button } from '@Forma/ui/components/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@Forma/ui/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Forma/ui/components/input-group'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { useState } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'

const passwordFields = [
  { name: 'password', label: 'Новый пароль' },
  { name: 'confirmPassword', label: 'Повторите пароль' },
] as const

export default function ResetPasswordFormFields({
  form,
}: {
  form: UseFormReturn<ResetPasswordSchema>
}) {
  const [visible, setVisible] = useState({ password: false, confirmPassword: false })

  return (
    <FieldGroup>
      {passwordFields.map(({ name, label }) => (
        <Controller
          key={name}
          name={name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`reset-${name}`}>{label}</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={`reset-${name}`}
                  type={visible[name] ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder={label}
                  disabled={form.formState.isSubmitting}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? `reset-${name}-error` : undefined}
                />
                <InputGroupAddon>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={visible[name] ? `Скрыть: ${label}` : `Показать: ${label}`}
                    aria-pressed={visible[name]}
                    disabled={form.formState.isSubmitting}
                    onClick={() =>
                      setVisible(previous => ({ ...previous, [name]: !previous[name] }))
                    }
                  >
                    {visible[name] ? <IconEyeClosed /> : <IconEye />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError id={`reset-${name}-error`} errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      ))}
    </FieldGroup>
  )
}
