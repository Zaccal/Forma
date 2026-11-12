'use client'

import Helment from '@/features/auth/components/shell/helmet'
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from '@/features/auth/schemas/password-reset.schema'
import { authClient } from '@/lib/auth-client'
import { Button } from '@Forma/ui/components/button'
import { Field, FieldError, FieldLabel } from '@Forma/ui/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Forma/ui/components/input-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false)
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  async function submitHandler({ email }: ForgotPasswordSchema) {
    form.clearErrors('root')

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: new URL('/reset-password', window.location.origin).toString(),
      })

      if (error) {
        form.setError('root', {
          message:
            error.status === 429
              ? 'Слишком много попыток. Попробуйте немного позже.'
              : 'Не удалось отправить запрос. Попробуйте ещё раз.',
        })
        return
      }

      setIsSent(true)
    } catch {
      form.setError('root', {
        message: 'Не удалось связаться с сервером. Проверьте подключение и попробуйте снова.',
      })
    }
  }

  return (
    <div className="w-full max-w-md min-w-0">
      <Helment
        title={isSent ? 'Проверьте почту' : 'Забыли пароль?'}
        description={
          isSent
            ? 'Если аккаунт с этой почтой существует, мы отправим ссылку для сброса пароля. Проверьте входящие и папку «Спам». Ссылка действительна 1 час.'
            : 'Введите почту вашего аккаунта. Мы отправим ссылку для создания нового пароля.'
        }
      />

      {isSent ? (
        <Button type="button" variant="outline" fullWidth onClick={() => setIsSent(false)}>
          Отправить новый запрос
        </Button>
      ) : (
        <form
          id="forgot-password-form"
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-6"
          noValidate
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="forgot-password-email">Почта</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="forgot-password-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Введите почту"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid ? 'forgot-password-email-error' : undefined
                    }
                  />
                  <InputGroupAddon>
                    <IconMail />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError id="forgot-password-email-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}
          <Button type="submit" isLoading={form.formState.isSubmitting} fullWidth>
            Отправить ссылку
          </Button>
        </form>
      )}

      <div className="mt-8 text-center text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Вернуться ко входу
        </Link>
      </div>
    </div>
  )
}
