import { ReactNode } from "react";

type IEmptyCardProps = {
  icon: ReactNode;
  text: string;
};
export const EmptyCard = ({ icon, text }: IEmptyCardProps) => {
  return (
    <div className="border border-primary-border flex justify-center flex-col items-center gap-4 rounded-lg py-8 max-w-[650px] w-full border-dashed text-[13px] md:text-[16px] px-4 my-6 text-primary-white">
      {icon}
      <div className="">
        <p>{text}</p>
      </div>
    </div>
  );
};
