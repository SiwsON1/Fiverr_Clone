import { Category, Service } from "@prisma/client";
import { clerkClient } from '@clerk/nextjs';

import { db } from "@/lib/db";

type ServiceWithCategory = Service & {
  category: Category | null;
  username: string;
  userPhoto: string;
};

type GetServices = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getServices = async ({
  userId,
  title,
  categoryId
}: GetServices): Promise<ServiceWithCategory[]> => {
  try {
    const Services = await db.service.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        purchases: {
          where: {
            userId,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });
    const servicesWithUsername = await Promise.all(Services.map(async (service) => {
      let username = "Unknown";
      let userPhoto ="";
      if (service.userId) {
        try {
          const user = await clerkClient.users.getUser(service.userId);
          username = user.firstName || username;
          userPhoto = user.imageUrl || userPhoto;
        } catch (error) {
          console.error("[servicesWithUsername]", error);
        }
      }
      return { ...service, username, userPhoto };
    }));

    return servicesWithUsername;

  } catch (error) {
    console.log("[GET_ServicES]", error);
    return [];
  }
}