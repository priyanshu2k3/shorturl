import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();



export async function GET(request:NextRequest) {
    const headers=await request.headers
   console.log("got this ",headers)
    
    return NextResponse.json({ msg:headers });
  
  }


      
