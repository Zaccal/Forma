import Helment from '@/features/auth/components/shell/helmet'
import { Button } from '@Forma/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@Forma/ui/components/card'
import { Input } from '@Forma/ui/components/input'
import { IconBuilding, IconUsers } from '@tabler/icons-react'

export default function GetStart() {
  return (
    <div className="w-full max-w-2xl min-w-0">
      <Helment
        title="Добро пожаловать в Forma!"
        description="Давайте подготовим ваше рабочее место. У вас есть приглашение в какую-нибудь организацию?"
      />

      <div className="mt-8 grid xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <IconUsers className="my-2" />
            <CardTitle>Вступить в организацию</CardTitle>
            <CardDescription>
              У вас есть код приглашения? Присоединяйтесь к своей существующей организации.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="" className="space-y-4">
              <Input placeholder="Введите код" />
              <Button fullWidth type="submit">
                Вступить в организацию
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <IconBuilding className="my-2" />
            <CardTitle>Создать организацию</CardTitle>
            <CardDescription>
              Начинаете с нуля? Создайте организацию и пригласите свою команду.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button fullWidth type="submit">
              Создать организацию
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
