import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function GET(request:NextRequest) {
  var req=await request.url
  const short=req.split("$")[1]
  if(short==""){
    return (NextResponse.json({"msg":"need to give the short url"}))
  }
  try {
    const urlEntry = await prisma.url.findUnique({
      where: { short }
    });

    if (!urlEntry) {
      return NextResponse.json({ message: 'Short URL not found' });
    }

    return NextResponse.redirect(urlEntry.original);
  } catch (error) {
    console.error('Error querying database:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
 

}