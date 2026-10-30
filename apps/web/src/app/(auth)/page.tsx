'use client'

import LoginFormFields from '@/features/auth/components/login-form-fields'
import { loginSchema, type LoginSchema } from '@/features/auth/schemas/login.schema'
import { googleAuthService } from '@/features/auth/services/social-auth'
import { authClient } from '@/lib/auth-client'
import { Button } from '@Forma/ui/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    progressive: true,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  async function submitHandler(data: LoginSchema) {
    const { error } = await authClient.signIn.email(data)

    if (error) {
      toast.error('Ой ошибка!', {
        description: error.message,
      })

      return
    }

    toast.success('C возвращением!')
    router.push('/dashboard')
    router.refresh()
  }

  function googleAuthHandler() {
    void googleAuthService()
  }

  return (
    <div className="w-full max-w-md min-w-0">
      <div className="mb-8 space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-black uppercase sm:text-3xl">С возвращением!</h2>
        <p className="text-muted-foreground">С возвращением! Пожалуйста, введите ваши данные.</p>
      </div>
      <form onSubmit={form.handleSubmit(submitHandler)} id="login-form">
        <div className="space-y-4">
          <LoginFormFields form={form} />

          <Button type="submit" isLoading={form.formState.isSubmitting} fullWidth>
            Войти
          </Button>
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            fullWidth
            onClick={googleAuthHandler}
            variant="outline"
            className="h-auto min-h-8 whitespace-normal py-2 text-center leading-4"
          >
            <Image src={'/google-icon.svg'} width={16} height={16} alt="google-icon" />
            Войти через Google
          </Button>
        </div>
      </form>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center text-sm sm:mt-12">
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
