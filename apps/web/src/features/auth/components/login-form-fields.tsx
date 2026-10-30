'use client'

import { Button } from '@Forma/ui/components/button'
import { Checkbox } from '@Forma/ui/components/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@Forma/ui/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Forma/ui/components/input-group'
import { IconEye, IconEyeClosed, IconMail } from '@tabler/icons-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { LoginSchema } from '@/features/auth/schemas/login.schema'
import { useBoolean } from '@/shared/hooks'

interface LoginFormFieldsProps {
  form: UseFormReturn<LoginSchema>
}

export default function LoginFormFields({ form }: LoginFormFieldsProps) {
  const [isVisible, toggleVisible] = useBoolean(false)

  return (
    <>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-form-email">Почта</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="login-form-email"
                  type="email"
                  placeholder="Введите почту"
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
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-form-password">Пароль</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={!isVisible ? 'password' : 'text'}
                  id="login-form-password"
                  placeholder="Введите пароль"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <Button
                    onClick={() => toggleVisible()}
                    type="button"
                    variant={'ghost'}
                    size={'icon'}
                  >
                    {!isVisible ? <IconEye /> : <IconEyeClosed />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex items-center justify-between my-8">
        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
              <Checkbox
                id="login-form-remember-me"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={field.disabled}
              />
              <FieldLabel htmlFor="login-form-remember-me">Запомнить меня</FieldLabel>
            </Field>
          )}
        />

        <Button variant={'link'}>Забыли пароль?</Button>
      </div>
    </>
  )
}
