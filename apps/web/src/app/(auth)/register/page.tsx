'use client'

import RegisterFormFields from '@/features/auth/components/register-form-fields'
import Helment from '@/features/auth/components/shell/helmet'
import { registerSchema, type RegisterSchema } from '@/features/auth/schemas/register.schema'
import { googleAuthService } from '@/features/auth/services/social-auth'
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

  async function submitHandler(data: RegisterSchema) {
    const { error } = await authClient.signUp.email(data)

    if (error) {
      toast.error('Ой ошибка!', {
        description: error.message,
      })

      return
    }

    toast.success('Код отправлен на вашу почту')
    router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
  }

  function googleAuthHandler() {
    void googleAuthService()
  }

  return (
    <div className="w-full max-w-md min-w-0">
      <Helment
        title="Добро пожаловать!"
        description="Добро пожаловать! Заполните данные для регистрации."
      />
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
            onClick={googleAuthHandler}
            variant="outline"
            className="h-auto min-h-8 whitespace-normal py-2 text-center leading-4"
          >
            <Image src={'/google-icon.svg'} width={16} height={16} alt="google-icon" />
            Зарегистрироваться через Google
          </Button>
        </div>
      </form>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center text-sm sm:mt-12">
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
