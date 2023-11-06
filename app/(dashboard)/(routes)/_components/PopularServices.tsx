"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

type ServiceData = {
  name: string;
  label: string;
  image: string;
};

function PopularServices() {
  const router = useRouter();
  const popularServicesData: ServiceData[] = [
    { name: "Ai Artists", label: "Add talent to AI", image: "/service1.png" },
    { name: "Logo Design", label: "Build your brand", image: "/service2.jpeg" },
    { name: "Wordpress", label: "Customize your site", image: "/service3.jpeg" },
    { name: "Voice Over", label: "Share your message", image: "/service4.jpeg" },
    { name: "Social Media", label: "Reach more customers", image: "/service5.jpeg" },
    { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    { name: "Illustration", label: "Color your dreams", image: "/service7.jpeg" },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow:<PrevArrow />,
    responsive: [
      {
        breakpoint: 1536, // 2xl breakpoint w Tailwind CSS
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // xl breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // md breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
     <div className="relative mx-20 my-16">
      <h2 className="text-4xl mb-5 text-[#404145] font-bold">Popular Services</h2>
      <Slider {...settings}>
        {popularServicesData.map(({ name, label, image }) => (
          <div
          key={name}
          className="relative cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/search?q=${name.toLowerCase()}`);
          }}
        >
            <div className="absolute z-10 text-white left-5 top-4">
              <span>{label}</span>
              <h6 className="font-extrabold text-2xl">{name}</h6>
            </div>
            <div className="h-80 w-72 ">
            <Image src={image} alt={name} layout="responsive" width={288} height={320} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PopularServices;