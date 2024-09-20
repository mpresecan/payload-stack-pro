import * as z from 'zod'

export const emailSchema = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
  .min(5, {
    message: 'Email must be made of at least 5 characters',
  })
  .max(64, {
    message: 'Email must be made of at most 64 characters',
  })
  .email({
    message: 'Please enter a valid email address',
  })

const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(8, {
    message: 'Password must be made of at least 8 characters',
  })
  .max(256, {
    message: 'Password must be made of at most 256 characters',
  })

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  code: z.string().max(6).optional(),
})

export const passwordResetSchema = z.object({
  email: emailSchema,
})

export const passwordUpdateSchema = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          'Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character',
      },
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const signUpWithPasswordSchema = z
  .object({
    name: z
      .string({
        required_error: 'Your name is required',
        invalid_type_error: 'Your name must be a string',
      })
      .min(2, {
        message: 'Your name should be at least 2 characters',
      })
      .max(64),
    email: emailSchema,
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          'Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character',
      },
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
