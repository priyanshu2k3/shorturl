import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import Hashids from 'hashids'
import { shortid } from "@/app/lib/shortid"; 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { urlCreationSchema } from "@/app/lib/zod"

import {verifyAndDecodeToken} from "@/app/lib/jwt"
const secretKey = process.env.secretKey
//import { headers } from "next/headers";


export async function POST(request:NextRequest) {
  

const coockies=request.headers.get("cookie") ||""
console.log(coockies)
const jwtResult= verifyAndDecodeToken(coockies);

if (!(jwtResult.valid)) {
  // console.log(coockie,jwtResult,!jwtResult.valid)
  return NextResponse.json({message:"unauthorised access"},{status:401})
}


  const body = await request.json();
  const { original} = body;
  const userId=jwtResult.decoded.id
  console.log(userId)
  const sid=shortid(userId);


  try {
    const validation = urlCreationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validation.error.errors }, { status: 400 });
    }

    
    const existingUrl = await prisma.url.findUnique({
      where: {
        userId_original: {
          userId: parseInt(userId),
          original,
        },
      },
    });

    if (existingUrl) {
      return NextResponse.json({ message: 'URL already exists', "sid": existingUrl.short ,"dbresponse":existingUrl});
    }

    // Generate a short URL (you can replace this with your own logic)

    const dbresponse = await prisma.url.create({
      data: {
        original,
        "short":sid,
        userId: parseInt(userId),
      },
    });

    return (NextResponse.json({ msg: "created the shorturl sucessfully","sid":sid,"dbresponse":dbresponse}));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Problem in creating the URL, try again', error }, { status: 500 });
  }
}