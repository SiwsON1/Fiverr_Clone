import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function DELETE (
    req: Request,
    {params}: {params: {serviceId:string, attachmentId: string}}
){
    try{
        const { userId } = auth();

        if (!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const serviceOwner = await db.service.findUnique({
            where: {
              id: params.serviceId,
              userId: userId,
            }
          });

          if(!serviceOwner){
            return new Response('Unauthorized', { status: 401 })
          }

          const attachment = await db.attachment.delete({
            where:{
                serviceId: params.serviceId,
                id: params.attachmentId,
            }
          });
          return NextResponse.json(attachment);
    }catch (error){
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}