import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from 'next/server';




export async function GET(request:NextRequest) {
    const headers=await request.headers
   console.log("got this ",headers)
    
    return NextResponse.json({ msg:headers });
  
  }


      
