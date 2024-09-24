import React from 'react'
import Header from '@/Header/Component'

const Layout = ({children} : React.PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
)
}

export default Layout
