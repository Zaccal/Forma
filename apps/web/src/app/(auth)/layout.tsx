import type { ReactNode } from 'react'

const HERO_TITLE = 'Порядок в каждой детали' as const

const HERO_DESCRIPTION =
  'Управляйте спецодеждой и средствами индивидуальной защиты в одном месте. ' +
  'От складских остатков до выдачи сотрудникам - всё организовано, ' +
  'прозрачно и под контролем.'

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="grid min-h-screen grid-cols-1 p-4 sm:p-6 lg:grid-cols-2">
      <section
        aria-label="О Forma"
        className="relative hidden min-h-0 overflow-hidden rounded-lg bg-[url('/login-background.webp')] bg-cover bg-center bg-no-repeat lg:block"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-end p-6 text-white xl:p-10">
          <div className="flex max-w-3xl flex-col gap-4">
            <h1 className="text-4xl font-black uppercase leading-tight xl:text-6xl">
              {HERO_TITLE}
            </h1>

            <p className="text-base font-semibold leading-7 xl:text-lg xl:leading-8">
              {HERO_DESCRIPTION}
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-w-0 items-center justify-center p-4 sm:p-6">{children}</section>
    </main>
  )
}
