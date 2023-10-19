import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const service = await db.service.create({
        data:{
            userId,
            title,
        }
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICES", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
