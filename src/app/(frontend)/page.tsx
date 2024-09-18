import { generateMetadata } from './[slug]/page'
import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
export { generateMetadata }

const Page = () => {
  return (
    <>
      <nav
        className="grid gap-4 text-sm text-muted-foreground"
        x-chunk="A sidebar navigation with links to general, security, integrations, support, organizations, and advanced settings."
        x-chunk-container="chunk-container after:right-0"
      >
        <Link href="#" className="font-semibold text-primary">
          General
        </Link>
        <Link href="#">Security</Link>
        <Link href="#">Integrations</Link>
        <Link href="#">Support</Link>
        <Link href="#">Organizations</Link>
        <Link href="#">Advanced</Link>
      </nav>
      <div className="grid gap-6">
        <Card x-chunk="A form to update the store name.">
          <CardHeader>
            <CardTitle>Store Name</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input placeholder="Store Name" />
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
        <Card
          x-chunk="A form to update the plugins directory with a checkbox to allow administrators to change the directory.">
          <CardHeader>
            <CardTitle>Plugins Directory</CardTitle>
            <CardDescription>
              The directory within your project, in which your plugins are
              located.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <Input
                placeholder="Project Name"
                defaultValue="/content/plugins"
              />
              <div className="flex items-center space-x-2">
                <Checkbox id="include" defaultChecked />
                <label
                  htmlFor="include"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Allow administrators to change the directory.
                </label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Page
