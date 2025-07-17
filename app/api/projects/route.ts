import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shakersdb"); 
    const projects = await db.collection("projects").find({}).toArray();

    return NextResponse.json(projects);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}