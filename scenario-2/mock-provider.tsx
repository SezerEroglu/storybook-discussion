import { createContext, useContext, ReactNode } from "react";
import useBusiness from "../use-business";
import useAnotherBusiness from "../use-another-business";

export type MockContext = {
  ParentHooks: ReturnType<typeof useBusiness>;
  ChildHooks: ReturnType<typeof useAnotherBusiness>;
};

const MockContextInstance = createContext<MockContext | null>(null);

export default function MockProvider({
  storybookArgs,
  children,
}: {
  storybookArgs: MockContext;
  children: ReactNode;
}) {
  return (
    <MockContextInstance.Provider value={storybookArgs}>
      {children}
    </MockContextInstance.Provider>
  );
}

export function useMockContext() {
  const ctx = useContext(MockContextInstance);
  if (!ctx) {
    throw new Error("useMockContext must be used inside <MockProvider />");
  }
  return ctx;
}
