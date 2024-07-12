import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

import {verifyAndDecodeToken} from "@/app/lib/jwt"



export async function GET(request:NextRequest,{ params }: { params: { query: string } }) {
const short = params.query
// console.log(short,"short",params)
const coockies=request.headers.get("cookie") ||""
// console.log(coockies)
const jwtResult = verifyAndDecodeToken(coockies);

if (!jwtResult || !jwtResult.valid ) {
  // console.log(coockie,jwtResult,!jwtResult.valid)
  return NextResponse.json({message:"unauthorised access"},{status:401})
}

const userId=jwtResult.decoded.id

//short fdrom the query parameter

if (!userId || !short) {
  return NextResponse.json({ error: 'userId and short are required' },{status:400});
}

try {
  const dbresponse = await prisma.requestLog.findMany({
    where: {
      userId: Number(userId),
      short: String(short),
    },
  });
  // console.log(userId,short,dbresponse)
  if (dbresponse.length === 0) {
    return NextResponse.json({ message: 'No request logs found' ,dbresponse},{status:404});
  }

  return NextResponse.json(dbresponse,{status:200});
} catch (error) {
  console.error('Error fetching request logs:', error);
  return NextResponse.json({ error: 'Internal server error' },{status:500});
}
}