import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shakersdb"); 
    const subcategories = await db.collection("subcategories").find({}).toArray();

    return NextResponse.json(subcategories);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}