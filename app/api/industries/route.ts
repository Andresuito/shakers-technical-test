import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shakersdb"); 
    const industries = await db.collection("industries").find({}).toArray();

    return NextResponse.json(industries);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}