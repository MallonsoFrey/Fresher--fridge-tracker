type OnboardingProps = {
  title: string;
  description: string;
  widgetName: string;
  setNextStep: () => void;
  completeOnboarding: () => void;
};

export default function Onboarding({
  title,
  description,
  widgetName,
  setNextStep,
  completeOnboarding,
}: OnboardingProps) {
  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-start justify-center">
      <div className="relative md:left-[5%] md:top-[10vh] top-[15%] w-[calc(100%-30px)] md:w-[360px] flex   gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <p className="font-bold">{title}</p>
        <p className="flex flex-col leading-none gap-1">
          {description} <span className="font-bold">{widgetName}</span>
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              setNextStep();
              completeOnboarding();
            }}
            className="transition-all duration-300 bg-[_rgba(236,242,230,0.9)] hover:bg-[#687063] hover:text-[_rgba(236,242,230,0.9)] py-2 px-4 rounded-[100px] cursor-pointer"
          >
            ОK!
          </button>
        </div>
      </div>
    </div>
  );
}
