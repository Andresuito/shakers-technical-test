import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shakersdb"); 
    const categories = await db.collection("categories").find({}).toArray();

    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}