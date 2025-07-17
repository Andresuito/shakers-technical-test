import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shakersdb"); 
    const skills = await db.collection("skills").find({}).toArray();

    return NextResponse.json(skills);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}