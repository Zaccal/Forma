'use client'

import VerifyEmailFormFields from '@/features/auth/components/verify-email-form-fields'
import { otpSchema, type OtpSchema } from '@/features/auth/schemas/otp.schema'
import { authClient } from '@/lib/auth-client'
import { Button } from '@Forma/ui/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isResending, setIsResending] = useState(false)

  const form = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
      email: searchParams.get('email') ?? '',
    },
  })

  async function verifyHandler(data: OtpSchema) {
    const { error } = await authClient.emailOtp.verifyEmail(data)

    if (error) {
      toast.error('Не удалось подтвердить почту', { description: error.message })
      return
    }

    toast.success('Почта подтверждена')
    router.replace('/get-start')
    router.refresh()
  }

  async function resendHandler() {
    const email = form.getValues('email')

    if (!email) {
      toast.error('Введите адрес электронной почты')
      return
    }

    setIsResending(true)
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'email-verification',
    })
    setIsResending(false)

    if (error) {
      toast.error('Не удалось отправить код', { description: error.message })
      return
    }

    toast.success('Новый код отправлен на вашу почту')
  }

  return (
    <div className="w-full max-w-md min-w-0">
      <div className="mb-8 space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-black uppercase sm:text-3xl">Подтвердите почту</h2>
        <p className="text-muted-foreground">
          Мы отправили шестизначный код на вашу почту. Введите его, чтобы продолжить.
        </p>
      </div>
      <form id="verify-form" onSubmit={form.handleSubmit(verifyHandler)} className="space-y-4">
        <VerifyEmailFormFields form={form} />
      </form>
      <Button
        className="mt-8"
        type="submit"
        form="verify-form"
        isLoading={form.formState.isSubmitting}
        fullWidth
      >
        Подтвердить почту
      </Button>
      <div className="mt-5 flex flex-col items-center gap-8 text-sm">
        <Button
          type="button"
          variant="secondary"
          fullWidth
          isLoading={isResending}
          onClick={resendHandler}
        >
          {isResending ? 'Отправляем…' : 'Отправить код повторно'}
        </Button>
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Вернуться ко входу
        </Link>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailForm />
    </Suspense>
  )
}
