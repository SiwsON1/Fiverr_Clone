import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serviceOwner = await db.service.findUnique({
      where: {
        id: params.serviceId,
        userId: userId,
      }
    });

    if (!serviceOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        serviceId: params.serviceId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("service_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}