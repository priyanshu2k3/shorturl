import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { date } from "zod";
import { requestLogSchema } from "@/app/lib/zod";
const prisma = new PrismaClient();


export async function GET(request:NextRequest) {
  var req=await request.url
  var  short=req.split("$")[1]
  if(short==""){
    return (NextResponse.json({"msg":"need to give the short url"}))
  }
  try {
      
  const ipAddress = request.headers?.get("x-forwarded-for")|| "";
  const userAgent = request.headers?.get('user-agent')||"";
  const referer = request.headers?.get('referer')||"";
  const timestamp=new Date();
  

  const urlEntry = await prisma.url.findUnique({
    where: { short }
  });
  if (!urlEntry) {
    return NextResponse.json({ message: 'Short URL not found' });
  }
  const userId=urlEntry?.userId
    short =urlEntry.short
    const requestData = {ipAddress,userAgent,referer,timestamp,short,userId};



    const validationResult = requestLogSchema.safeParse(requestData);
    console.log(validationResult,"validation")

   
    const saveRequestData = new Promise((resolve, reject) => {
    prisma.requestLog.create({
      data:{ipAddress,userAgent,referer,timestamp,short,userId},
    })
    .then(() => resolve('Data saved successfully'))
    .catch((error:Error) => {
      console.log('failed');
      reject(error);
    });
  });

    return NextResponse.redirect(urlEntry.original);
  } catch (error) {
    console.error('Error querying database:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
 

}