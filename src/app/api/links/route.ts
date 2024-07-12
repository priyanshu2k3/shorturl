import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

import {verifyAndDecodeToken} from "@/app/lib/jwt"
import { redirect } from "next/dist/server/api-utils";


export async function GET(request:NextRequest) {

const coockies=request.headers.get("cookie") ||""
console.log(coockies)
const jwtResult = verifyAndDecodeToken(coockies);

if (!jwtResult || !jwtResult.valid ) {
  // console.log(coockie,jwtResult,!jwtResult.valid)
  return NextResponse.json({message:"unauthorised access"},{status:401})
}

const userId=jwtResult.decoded.id
console.log(userId)

try {
    const page = 1; // Extract userId and optional page number from query


    const perPage = 10; // Number of items per page
    const skip = (parseInt(page.toString()) - 1) * perPage; // Calculate skip based on page number

    const dbresponse = await prisma.url.findMany({
      where: {
        userId: parseInt(userId.toString()), // Ensure userId is converted to integer if needed
      },
      take: perPage, // Limit to perPage items
      skip: skip, // Skip items based on pagination
    });

    return NextResponse.json(dbresponse);
  } catch (error) {
    console.error('Error retrieving links:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects after operation
  }



  
  return NextResponse.json({ msg: "hey from the get route hello server is working fine from "});

}