import Image from "next/image"
import React from "react"

export default function Layout({children} : React.PropsWithChildren) {
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        {children}
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/auth-bg.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
