import React, { ReactNode } from "react";

type Props = {
  color: string;
  icon: ReactNode;
  quantity: number;
  title: string;
};

export default function OverallCard({ color, icon, quantity, title }: Props) {
  return (
    <div className="flex items-center p-8 bg-white shadow rounded-lg">
      <div
        className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-${color}-600 bg-${color}-100 rounded-full mr-6`}
      >
        {icon}
      </div>
      <div>
        <span className="block text-2xl font-bold">{quantity}</span>
        <span className="block text-gray-500">{title}</span>
      </div>
    </div>
  );
}
