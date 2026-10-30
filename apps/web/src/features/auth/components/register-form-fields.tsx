import { Controller, type UseFormReturn } from 'react-hook-form'
import type { RegisterSchema } from '../schemas/register.schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '@Forma/ui/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Forma/ui/components/input-group'
import { IconEye, IconEyeClosed, IconMail, IconUser } from '@tabler/icons-react'
import { Button } from '@Forma/ui/components/button'
import { Checkbox } from '@Forma/ui/components/checkbox'
import { useBoolean } from '@/shared/hooks'

interface RegisterFormFieldsProps {
  form: UseFormReturn<RegisterSchema>
}

export default function RegisterFormFields({ form }: RegisterFormFieldsProps) {
  const [isVisible, toggleVisible] = useBoolean(false)
  const [isVisibleComfirm, toggleVisibleComfirm] = useBoolean(false)

  return (
    <>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-name">Имя пользователя</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="register-form-name"
                  type="text"
                  placeholder="Введите имя пользователя"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <IconUser />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-email">Почта</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="register-form-email"
                  type="email"
                  placeholder="Введите почту"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <IconMail />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-password">Пароль</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={!isVisible ? 'password' : 'text'}
                  id="register-form-password"
                  placeholder="Введите пароль"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <Button
                    onClick={() => toggleVisible()}
                    type="button"
                    variant={'ghost'}
                    size={'icon'}
                  >
                    {!isVisible ? <IconEye /> : <IconEyeClosed />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-confirm-password">Повторите пароль</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={!isVisibleComfirm ? 'password' : 'text'}
                  id="register-form-confirm-password"
                  placeholder="Введите пароль"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <Button
                    onClick={() => toggleVisibleComfirm()}
                    type="button"
                    variant={'ghost'}
                    size={'icon'}
                  >
                    {!isVisibleComfirm ? <IconEye /> : <IconEyeClosed />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex items-center justify-between my-8">
        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
              <Checkbox
                id="register-form-remember-me"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={field.disabled}
              />
              <FieldLabel htmlFor="register-form-remember-me">Запомнить меня</FieldLabel>
            </Field>
          )}
        />
      </div>
    </>
  )
}
