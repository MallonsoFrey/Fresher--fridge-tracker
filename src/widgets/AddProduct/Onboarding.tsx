type OnboardingProps = {
  description: string;
  onboardingStep: number;
  setNextStep: () => void;
};

export default function Onboarding({
  description,
  onboardingStep,
  setNextStep,
}: OnboardingProps) {
  return (
    <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center">
      <div className="relative md:left-[34vw] md:top-[25vh] top-[15vh] w-[calc(100%-30px)] md:w-[350px] flex   gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <p className="font-bold">{description}</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              if (onboardingStep === 1) setNextStep();
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
