"use client";
import { Category } from "@prisma/client";
import {
    FcCommandLine,              // Dla "Coding & Technology"
    FcOnlineSupport,     // Dla "Online Marketing & Promotion"
    FcFilm,              // Dla "Film & Motion Graphics"
    FcReading,           // Dla "Literature & Linguistics"
    FcHeadset,           // Dla "Audio & Melody"
    FcGallery,           // Dla "Imagery & Captures"
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItems } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Coding & Technology": FcCommandLine,
    "Online Marketing & Promotion": FcOnlineSupport,
    "Film & Motion Graphics": FcFilm,
    "Literature & Linguistics": FcReading,
    "Audio & Melody": FcHeadset,
    "Imagery & Captures": FcGallery,
}
export const Categories = ({ items }: CategoriesProps) => {
  return (
  <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
    {items.map((item) => (
        <CategoryItems
        key={item.id}
        label={item.name}
        icon={iconMap[item.name]}
        value={item.id}
        />
    ))}
    </div>

  )
};
