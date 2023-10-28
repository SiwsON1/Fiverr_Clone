import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const service = await db.service.findUnique({
      where: {
        id: params.serviceId,
        userId,
      }
    });

    if (!service) {
      return new NextResponse("Not found", { status: 404 });
    }


    if (!service.title || !service.description || !service.imageUrl || !service.categoryId) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedservice = await db.service.update({
      where: {
        id: params.serviceId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedservice);
  } catch (error) {
    console.log("[service_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}