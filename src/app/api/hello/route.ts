import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
  var req=request.headers.get("Authorization");
  
  console.log(req)
  console.log("ended")

  
  return NextResponse.json({ msg: "hey from the get route hello server is working fine from ",body:req });

}
export async function PUT(request:NextRequest) {
  const body = await request.json();

  console.log("Request :: Body :: ", body);
  return NextResponse.json({ msg: "hey from the  put route hello server is working fine " });

}

export async function POST(request:NextRequest) {
  const body = await request.json();

  console.log("Request :: Body :: ", body);
  return NextResponse.json({ msg: "hey from the post route hello server is working fine " });

}


export async function DELETE(request:NextRequest) {
  const body = await request.json();

  console.log("Request :: Body :: ", body);
  return NextResponse.json({ msg: "hey from the delete route hello server is working fine " });

}