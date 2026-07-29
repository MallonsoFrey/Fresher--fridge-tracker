import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingStep = 0 | 1 | 2;

interface OnboardingState {
  currentStep: OnboardingStep;
  completed: boolean;
}

interface OnboardingActions {
  setStep: (step: OnboardingStep) => void;
  completeOnboarding: () => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

const initialState: OnboardingState = {
  currentStep: 0,
  completed: false,
};

/* 
currentStep: 1 - pressed button "add first product"
currentStep: 2 - first product added after pressing button "add first product"
*/

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) =>
        set({
          currentStep: step,
        }),

      completeOnboarding: () =>
        set({
          completed: true,
        }),
    }),
    {
      name: "onboarding",
    },
  ),
);
