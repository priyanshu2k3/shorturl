import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
import {userSigninSchema} from "@/app/lib/zod"




export async function POST(request:NextRequest) {
    const body = await request.json();
    const validation =userSigninSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: 'Invalid input', errors: validation.error.errors }, { status: 400 });
      }
    try {
            const user = await prisma.user.findUnique({
              where: {
                email: body.email,
              },
            });
            console.log(user,"signin route")
            if (!user) {
                return NextResponse.json({ message: 'No Such User Exist'}, { status: 400 });
              }
              const hashedPassword = await bcrypt.hash(body.password + user.salt, 10);
              console.log("password ,salt",hashedPassword,user.salt)
              const compare=await bcrypt.compare(body.password + user.salt,user.password)
             
              if (compare) {
                const payload = {
                    id: user.id,
                    email: user.email,
                  };
                const secretKey = process.env.secretKey
                const token = jwt.sign(payload, secretKey, { expiresIn: 3600 });
                console.log(token)
    
                return (NextResponse.json({"msg":"signed in sucessfully",token}))
              
            }
            else {
                return (NextResponse.json({"msg":"Wrong Email or PassWord"}))
            }
          }
    catch (error) {
        console.log(error)
        return NextResponse.json({"msg":"error occured",error})
    }}