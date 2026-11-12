import { Field, FieldError, FieldGroup, FieldLabel } from '@Forma/ui/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Forma/ui/components/input-group'
import { IconBuilding, IconId, IconMapPin } from '@tabler/icons-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { OrganizationSetupInput } from '../schemas/organization-setup.schema'

interface OrganizationSetupFieldsProps {
  form: UseFormReturn<OrganizationSetupInput>
}

export default function OrganizationSetupFields({ form }: OrganizationSetupFieldsProps) {
  const { isSubmitting } = form.formState

  return (
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="create-organization-name">Название организации</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="create-organization-name"
                type="text"
                autoComplete="organization"
                placeholder="Введите название организации"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? 'create-organization-name-error' : undefined}
              />
              <InputGroupAddon>
                <IconBuilding />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && (
              <FieldError id="create-organization-name-error" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="bin"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="create-organization-bin">БИН</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="create-organization-bin"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={12}
                placeholder="12 цифр"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? 'create-organization-bin-error' : undefined}
              />
              <InputGroupAddon>
                <IconId />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && (
              <FieldError id="create-organization-bin-error" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="create-organization-address">Адрес</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="create-organization-address"

                placeholder="Укажите адрес организации (необязательно)"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid ? 'create-organization-address-error' : undefined
                }
              />
              <InputGroupAddon>
                <IconMapPin />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && (
              <FieldError id="create-organization-address-error" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
