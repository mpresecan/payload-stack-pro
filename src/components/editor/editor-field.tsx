'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Editor, EDITOR_NAMESPACE } from './Editor'
import { toast } from 'sonner'
import { testSubmit } from '@/app/(frontend)/(private)/session/_actions/testSubmit'

const formSchema = z.object({
  content: z.string().max(5000, {
    message: "Content must not exceed 5000 characters.",
  }),
})

export function EditorField() {
  const [characterCount, setCharacterCount] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // content: localStorage.getItem(EDITOR_NAMESPACE) || '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement your database storage logic here
    console.log(values)
    await testSubmit(values);
    toast("You submitted the following values:",{
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  field={field}
                  content={field.value}
                  onChange={field.onChange}
                  placeholder='Write long document here...'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
