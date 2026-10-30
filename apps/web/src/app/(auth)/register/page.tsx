'use client'

import RegisterFormFields from '@/features/auth/components/register-form-fields'
import { registerSchema, type RegisterSchema } from '@/features/auth/schemas/register.schema'
import { authClient } from '@/lib/auth-client'
import { Button } from '@Forma/ui/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()
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

  async function submitHandler({ email, name, password }: RegisterSchema) {
    const { error } = await authClient.signUp.email({
      email,
      name,
      password,
    })

    if (error) {
      toast.error('Ой ошибка!', {
        description: error.message,
      })

      return
    }

    toast.success('Аккаунт создан!')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div>
      <div className="space-y-4 mb-8">
        <h2 className="uppercase font-black text-3xl">Добро пожаловать!</h2>
        <p className="text-muted-foreground">Добро пожаловать! Заполните данные для регистрации.</p>
      </div>
      <form onSubmit={form.handleSubmit(submitHandler)} id="login-form">
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
      </form>

      <div className="mt-12 flex items-center justify-center gap-1 text-center text-sm">
        <span>Уже есть аккаунт?</span>
        <Button
          variant="link"
          nativeButton={false}
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
