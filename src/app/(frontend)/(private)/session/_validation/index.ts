import * as z from 'zod'

export const newSessionSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title should not be longer than 100 characters"),

  shortDescription: z.string()
    .min(1, "Short description is required")
    .max(300, "Short description should not be longer than 300 characters"),

  fullDescription: z.string()
    .max(5000, "Full description should not be longer than 5000 characters")
    .optional(),
  tags: z.array(z.string()).min(1, "Tag is required"),
})
