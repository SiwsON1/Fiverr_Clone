import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: {params: {serviceId: string}}
){
    try{
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
const service = await db.service.findUnique({
    where:{
        id:params.serviceId,
        userId,
    }
})

if(!service){
    return new NextResponse("Not found", {status: 404})
}

const deletedService = await db.service.delete({
    where: {
        id: params.serviceId,
    },
});
return NextResponse.json(deletedService);

    }catch(error){
        console.log("[Service_Id_Delete]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {serviceId: string}}

){
    try{
        const { userId } = auth();
        const {serviceId} = params;
        const values = await req.json();

        if(!userId) return new Response("Unauthorized", { status: 401 });

        const service = await db.service.update({
            where:{
                id: serviceId,
                userId
            },
            data: {
                ...values,

            }
        });
        return NextResponse.json(service);

    }catch(error){
        console.log("[SERVICE_ID]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}