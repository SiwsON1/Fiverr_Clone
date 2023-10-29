import { Category, Service } from "@prisma/client";

import { ServiceCard } from "./service-card";

type ServiceWithCategory = Service & {
  category: Category | null;
  username: string;
  userPhoto: string;

};

interface ServicesListProps {
  items: ServiceWithCategory[];
}

export const ServicesList = ({
  items
}: ServicesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ServiceCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            price={item.price!}
            category={item?.category?.name!}
            username={item.username}
            userPhoto={item.userPhoto}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Services found
        </div>
      )}
    </div>
  )
}