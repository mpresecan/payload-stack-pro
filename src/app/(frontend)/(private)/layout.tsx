import React from 'react'
import Header from '@/app/(frontend)/(public)/_components/header'
import Footer from '@/app/(frontend)/(public)/_components/footer'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className='max-w-4xl mx-auto w-full h-20 flex justify-center'/>
      <main className="flex-grow bg-muted/20">
        {children}
      </main>
      <div className='flex items-center mx-auto w-full max-w-4xl h-10 text-muted-foreground'>Copyright © 2024 Advent Conference - Build upon Payload Stack</div>
      {/*<Footer />*/}
    </div>
  )
}

export default Layout
