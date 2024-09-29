import React from 'react'
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <AdminPanelLayout>{children}</AdminPanelLayout>
  )
}

export default Layout
