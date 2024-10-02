import * as z from 'zod'

const newSessionSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be made of at least 5 characters' })
    .max(50, { message: 'Title must be made of at most 50 characters' }),
  shortDescription: z
    .string()
    .min(5, { message: 'Short description must be made of at least 5 characters' })
    .max(100, { message: 'Short description must be made of at most 300 characters' }),
  fullDescription: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === '') return true;
        try {
          const content = JSON.parse(value);
          const plainText = content.root.children
            .map(node => node.children.map(child => child.text).join(''))
            .join('\n');
          return plainText.length <= 5000;
        } catch (error) {
          return false;
        }
      },
      { message: 'Full description must be at most 5000 characters long' }
    ),
})
