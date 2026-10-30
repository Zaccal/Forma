'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from '@Forma/ui/components/button'

export default async function DashboardPage() {
  function logoutHandler() {
    authClient.signOut()
  }

  return (
    <div>
      <p>Welcome </p>
      <Button variant={'destructive'} onClick={logoutHandler}>
        Log out
      </Button>
    </div>
  )
}
