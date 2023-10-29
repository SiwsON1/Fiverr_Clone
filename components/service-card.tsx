import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

interface ServiceCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: string;
  username: string;
  userPhoto: string;
};

export const ServiceCard = ({
    id,
    title,
    imageUrl,
    price,
    category,
    username,
    userPhoto
  }: ServiceCardProps) => {
    return (
      <Link href={`/services/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={title}
              src={imageUrl}
            />
          </div>

          <div className="flex flex-col pt-2">
            <div className="flex mb-3">
            <div className="relative w-5 h-5 rounded-lg overflow-hidden">
              <Image
                layout='responsive'
                width={100}
                height={100}
                className="object-cover"
                alt={username}
                src={userPhoto}
              />
            </div>
            <p className="text-xs ml-2">
              {username}
            </p>
            </div>
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
              {title}
            </div>
            <p className="text-xs text-muted-foreground">
              {category}
            </p>
              <p className="text-md md:text-sm font-medium text-slate-700">
                From {formatPrice(price)}
              </p>
          </div>
        </div>
      </Link>
    )
  }