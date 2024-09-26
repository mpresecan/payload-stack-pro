import React from 'react'
import Header from '@/app/(frontend)/(public)/_components/header'
import Footer from './_components/footer'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
