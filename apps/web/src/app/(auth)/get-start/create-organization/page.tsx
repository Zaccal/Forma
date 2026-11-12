import Helment from '@/features/auth/components/shell/helmet'

export default function CreateOrganization() {
  return (
    <div className="w-full max-w-md min-w-0">
      <Helment
        title="Создание организации"
        description="Заполните информацию об организации, чтобы добавить её в систему. Указанные данные можно будет изменить позже."
      />
    </div>
  )
}
