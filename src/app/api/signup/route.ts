import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { userSignupSchema } from '@/app/lib/zod';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body using Zod schema
    const validation = userSignupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validation.error.errors }, { status: 400 });
    }

    const { email, password, firstName, lastName} = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Generate salt and hash the password
    const salt = nanoid();
    const hashedPassword = await bcrypt.hash(password + salt, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        salt,
        firstName,
        lastName
      },
    });

    
    // const payload = {
    //   id: newUser.id,
    //   email: newUser.email,
    // };
    // const secretKey = process.env.secretKey
    // const token = jwt.sign(payload, secretKey, { expiresIn: 3600 });
    // console.log(token)
    
    // response.cookies.set("token",token)
    // response.cookies.set('show-banner', 'false')
    // return response
     return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
