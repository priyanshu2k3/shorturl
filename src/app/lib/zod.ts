import { z } from 'zod';

 export const userSignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

export const userSigninSchema= z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
})

export const urlCreationSchema = z.object({
    original: z.string().url({ message: 'Invalid URL format' })
  });

export const requestLogSchema = z.object({
  id: z.number().int().optional(), // ID is auto-incremented and optional when creating a new log
  ipAddress: z.string().nullable().optional(), // Optional and nullable string
  userAgent: z.string().nullable().optional(), // Optional and nullable string
  referer: z.string().nullable().optional(), // Optional and nullable string
  timestamp: z.date().optional(), // Date, optional since it defaults to now
  short: z.string(), // Required string for the URL short code
  userId: z.number().int(), // Required integer for user ID
});




  export type UserSignup = z.infer<typeof userSignupSchema>;
  export type UserSignin = z.infer<typeof userSigninSchema>;