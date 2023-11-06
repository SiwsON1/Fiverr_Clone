import Image from "next/image";
import React from "react";

const Companies: React.FC = () => {
  // Liczba powtórzeń obrazków w karuzeli, dostosuj do swoich potrzeb
  const imagesCount = 10;
  const imageWidth = 100; // szerokość jednego obrazka w px
  const gapWidth = 100; // odstęp między obrazkami w px

  return (
    <div className="logo-carousel">
      <ul className="logo-wrapper">
        {Array.from({ length: imagesCount }, (_, i) => i + 1).map((num) => (
          <li key={num} className="logo-item">
            {/* Załóżmy, że obrazy są nazwane trusted1.png, trusted2.png, ..., trusted6.png */}
            <Image src={`/trusted${num}.png`} alt={`trusted brand ${num}`} layout="fill" objectFit="contain" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Companies;