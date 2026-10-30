'use client'

import LoginFormFields from '@/features/auth/components/login-form-fields'
import { loginSchema, type LoginSchema } from '@/features/auth/schemas/auth.schema'
import { Button } from '@Forma/ui/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { Form, useForm } from 'react-hook-form'

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    progressive: true,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  async function handleAction(_formData: FormData) {}

  return (
    <div>
      <div className="space-y-4 mb-8">
        <h2 className="uppercase font-black text-3xl">С возвращением !</h2>
        <p className="text-muted-foreground">С возвращением! Пожалуйста, введите ваши данные.</p>
      </div>
      <Form control={form.control} action={handleAction} id="login-form">
        <div className="space-y-4">
          <LoginFormFields form={form} />

          <Button type="submit" isLoading={form.formState.isSubmitting} fullWidth>
            Войти
          </Button>
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            fullWidth
            variant={'outline'}
          >
            <Image src={'/google-icon.svg'} width={16} height={16} alt="google-icon" />
            Войти через Google
          </Button>
        </div>
      </Form>

      <div className="mt-12 flex items-center justify-center gap-1 text-center text-sm">
        <span>Нет аккаунта?</span>
        <Button
          variant="link"
          render={<Link href={'/register'} />}
          nativeButton={false}
          disabled={form.formState.isSubmitting}
          className="h-auto p-0 text-sm"
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  )
}
