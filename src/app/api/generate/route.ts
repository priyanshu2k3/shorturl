import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import Hashids from 'hashids'
import { shortid } from "@/app/lib/shortid"; //external function made to create short url 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { urlCreationSchema } from "@/app/lib/zod"


export async function POST(request:NextRequest) {
  const body = await request.json();
  const sid=shortid(body.userId);
  
  
  try {
 const validation = urlCreationSchema.safeParse(body);
    console.log(body)
    if (!validation.success) {
        console.log("reached here2")
      return NextResponse.json({ message: 'Invalid input', errors: validation.error.errors }, { status: 400 });
    }
    console.log("reached here")
    const dbresponse = await prisma.Url.create({
        data: {
            original:body.original,
            short:sid,
            userId:parseInt(body.userId),
        },
      });
      return (NextResponse.json({ msg: "created the shorturl sucessfully","sid":sid,"dbresponse":dbresponse}));
    }
   catch (error) {
   console.log(error)
    return (NextResponse.json({ msg: "problem in creating the url try again","error":error}))
  }
  
}
