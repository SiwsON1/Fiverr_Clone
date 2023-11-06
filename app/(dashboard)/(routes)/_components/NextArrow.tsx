import React from "react";
import { BsChevronRight } from "react-icons/bs";

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow: React.FC<NextArrowProps> = ({onClick }) => {
  return (
    <div
      className={`absolute right-0 top-1/2 `}
      onClick={onClick}
      style={{
        transform: "translate(30%, -50%)",
      }}
    >
      <div className="bg-twine h-[50px] w-[50px] rounded-full grid place-items-center cursor-pointer">
        <BsChevronRight className="text-black text-3xl" />
      </div>
    </div>
  );
};

export default NextArrow;