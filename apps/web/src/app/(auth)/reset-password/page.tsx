'use client'

import ResetPasswordFormFields from '@/features/auth/components/reset-password-form-fields'
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from '@/features/auth/schemas/password-reset.schema'
import { authClient } from '@/lib/auth-client'
import { Button } from '@Forma/ui/components/button'
import { FieldError } from '@Forma/ui/components/field'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [invalidToken, setInvalidToken] = useState(false)
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })
  const isInvalidLink = !token || searchParams.has('error') || invalidToken

  async function submitHandler({ password }: ResetPasswordSchema) {
    if (isInvalidLink) return
    form.clearErrors('root')

    try {
      const { error } = await authClient.resetPassword({ newPassword: password, token })

      if (error) {
        if (error.code === 'INVALID_TOKEN') {
          setInvalidToken(true)
          return
        }

        form.setError('root', {
          message: error.message || 'Не удалось изменить пароль. Попробуйте ещё раз.',
        })
        return
      }

      form.reset()
      toast.success('Пароль изменён. Войдите с новым паролем.')
      router.replace('/')
      router.refresh()
    } catch {
      form.setError('root', {
        message: 'Не удалось связаться с сервером. Проверьте подключение и попробуйте снова.',
      })
    }
  }

  return (
    <div className="w-full max-w-md min-w-0">
      <div className="mb-8 space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-black uppercase sm:text-3xl">
          {isInvalidLink ? 'Ссылка недействительна' : 'Новый пароль'}
        </h2>
        <p className="text-muted-foreground" role={isInvalidLink ? 'alert' : undefined}>
          {isInvalidLink
            ? 'Ссылка для сброса пароля недействительна или срок её действия истёк. Запросите новую ссылку.'
            : 'Используйте от 8 до 128 символов, включая латинские буквы, цифры и спецсимвол.'}
        </p>
      </div>

      {isInvalidLink ? (
        <Button render={<Link href="/forgot-password" />} nativeButton={false} fullWidth>
          Запросить новую ссылку
        </Button>
      ) : (
        <form
          id="reset-password-form"
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-6"
          noValidate
        >
          <ResetPasswordFormFields form={form} />
          {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}
          <Button type="submit" isLoading={form.formState.isSubmitting} fullWidth>
            Сохранить пароль
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p role="status">Загрузка…</p>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
