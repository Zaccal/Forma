'use client'

import { register } from '@/features/auth/actions/register-action'
import RegisterFormFields from '@/features/auth/components/register-form-fields'
import { registerSchema, type RegisterSchema } from '@/features/auth/schemas/register.schema'
import { Button } from '@Forma/ui/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { Form, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterPage() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    progressive: true,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: true,
    },
  })

  async function handleAction(formData: FormData) {
    toast.promise(register(formData), {
      success: 'Аккаунт создан!',
      error: error => {
        const errorDescription =
          error instanceof Error ? error.message : 'Произошла внутренняя ошибка. Попробуйте позже.'

        return {
          message: 'Ой, ошибка!',
          description: errorDescription,
        }
      },
    })
  }

  return (
    <div>
      <div className="space-y-4 mb-8">
        <h2 className="uppercase font-black text-3xl">Добро пожаловать!</h2>
        <p className="text-muted-foreground">Добро пожаловать! Заполните данные для регистрации.</p>
      </div>
      <Form control={form.control} action={handleAction} id="login-form">
        <div className="space-y-4">
          <RegisterFormFields form={form} />

          <Button type="submit" isLoading={form.formState.isSubmitting} fullWidth>
            Зарегистрироваться
          </Button>
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            fullWidth
            variant={'outline'}
          >
            <Image src={'/google-icon.svg'} width={16} height={16} alt="google-icon" />
            Зарегистрироваться через Google
          </Button>
        </div>
      </Form>

      <div className="mt-12 flex items-center justify-center gap-1 text-center text-sm">
        <span>Уже есть аккаунт?</span>
        <Button
          variant="link"
          render={<Link href={'/'} />}
          disabled={form.formState.isSubmitting}
          className="h-auto p-0 text-sm"
        >
          Войти
        </Button>
      </div>
    </div>
  )
}
