import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shakersdb"); 
    const specialities = await db.collection("specialities").find({}).toArray();

    return NextResponse.json(specialities);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}