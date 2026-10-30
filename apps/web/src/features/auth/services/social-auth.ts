import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export async function googleAuthService() {
  const { error } = await authClient.signIn.social({
    provider: 'google',
    callbackURL: `${window.location.origin}/dashboard`,
  })

  if (error) {
    console.log(error)
    toast.error('Ой ошибка!', {
      description: error.message,
    })

    return
  }
}
