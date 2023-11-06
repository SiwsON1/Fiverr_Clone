import React from "react";
import { BsChevronLeft } from "react-icons/bs";

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const PrevArrow: React.FC<PrevArrowProps> = ({onClick }) => {
  return (
    <div
      className={`absolute left-0 top-1/2 `}
      onClick={onClick}
      style={{
        transform: "translate(-50%, -50%)",
        zIndex:20
      }}
    >
      <div className="bg-twine h-[50px] w-[50px] rounded-full grid place-items-center cursor-pointer">
        <BsChevronLeft className="text-black text-3xl" />
      </div>
    </div>
  );
};

export default PrevArrow;