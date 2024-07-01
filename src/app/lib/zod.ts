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
    original: z.string().url({ message: 'Invalid URL format' }),
    userId: z.string().min(1,{ message: 'User ID must be an string' })
  });

  export type UserSignup = z.infer<typeof userSignupSchema>;
  export type UserSignin = z.infer<typeof userSigninSchema>;