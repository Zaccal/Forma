'use client'

import OrganizationSetupFields from '@/features/auth/components/organization-setup-fields'
import Helment from '@/features/auth/components/shell/helmet'
import {
  organizationSetupSchema,
  type OrganizationSetupInput,
} from '@/features/auth/schemas/organization-setup.schema'
import { Button } from '@Forma/ui/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function CreateOrganization() {
  const form = useForm<OrganizationSetupInput>({
    resolver: zodResolver(organizationSetupSchema),
    defaultValues: {
      name: '',
      bin: '',
      address: '',
    },
  })

  function submitHandler(_data: OrganizationSetupInput) {
    toast.success('Данные формы заполнены корректно.')
  }

  return (
    <div className="w-full max-w-md min-w-0">
      <Helment title="Новая организация" description="Укажите данные новой организации." />
      <form
        id="create-organization-form"
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-6"
        noValidate
      >
        <OrganizationSetupFields form={form} />
        <Button type="submit" isLoading={form.formState.isSubmitting} fullWidth>
          Продолжить
        </Button>
      </form>
    </div>
  )
}
