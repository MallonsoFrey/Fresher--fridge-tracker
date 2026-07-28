import type { ReactNode } from "react";

export default function ExpDateCard({
  emoji,
  status,
  amount,
  bgColor,
  textColor,
  expText,
  children,
}: {
  status: string;
  emoji: string;
  amount: number;
  bgColor: string;
  textColor: string;
  expText: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 flex-col w-[218px]  p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
      <div className="flex flex-row-reverse md:flex-row justify-between items-center">
        <div
          className={`max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 ${bgColor}`}
        >
          {emoji}
        </div>
        <span
          className={`inline-block h-fit md:text-sm font-bold ${textColor} ${bgColor} rounded-[100px] py-1 px-2`}
        >
          {status}
        </span>
      </div>
      <div>
        <span className="text-[28px] md:text-lg font-bold mr-2">{amount}</span>
        <span className="text-[20px] font-bold md:text-[14px]">{expText}</span>
      </div>
      <div className="flex text-[14px] flex-col md:text-[12px] text-[#687063]">
      {children}
      </div>
    </div>
  );
}
