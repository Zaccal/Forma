import Image from 'next/image'
import type { ReactNode } from 'react'

const HERO_TITLE = 'Порядок в каждой детали' as const

const HERO_DESCRIPTION =
  'Управляйте спецодеждой и средствами индивидуальной защиты в одном месте. ' +
  'От складских остатков до выдачи сотрудникам - всё организовано, ' +
  'прозрачно и под контролем.'

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="grid min-h-screen min-w-0 grid-cols-1 p-3 sm:p-6 lg:grid-cols-2">
      <section
        aria-label="О Forma"
        className="relative hidden min-h-0 overflow-hidden rounded-none bg-[url('/login-background.webp')] bg-cover bg-center bg-no-repeat lg:block"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

        <div className="absolute top-6 left-6 hidden mb-16 mx-auto w-fit lg:flex items-center gap-2">
          <Image src={'/logos/favicon.svg'} width={48} height={48} alt="Forma icon" />
          <span className="font-bold text-2xl text-white">Forma</span>
        </div>

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

      <section className="flex min-w-0 items-center justify-center px-1 py-6 sm:p-6">
        <div className="">
          <div className="flex mb-16 mx-auto w-fit lg:hidden items-center gap-2">
            <Image src={'/logos/favicon.svg'} width={48} height={48} alt="Forma icon" />
            <span className="font-bold text-2xl">Forma</span>
          </div>
          {children}
        </div>
      </section>
    </main>
  )
}
