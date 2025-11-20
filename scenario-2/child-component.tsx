import useAnotherBusiness from "../use-another-business";
import { useMockContext } from "./mock-provider";

function childComponentMockHooks() {
  // Get the configurable context value
  const { ChildHooks } = useMockContext();
  return ChildHooks;
}

function childComponentHooks() {
  const childComponentHooks = useAnotherBusiness();
  return childComponentHooks;
}

export default function ChildComponent() {
  if (/* process.env.STORYBOOOK */ true) {
    // STORYBOOK env variable can be set in main.js/ts of storybook
    const mockHooks = childComponentMockHooks();
    return <ChildComponentUI props={mockHooks} />;
  }
  const hooks = childComponentHooks();
  return <ChildComponentUI props={hooks} />;
}

// Renamed from ChildComponent to ChildComponentUI to keep the ParentComponent's React tree the same
export function ChildComponentUI({
  props,
}: {
  props: ReturnType<typeof useAnotherBusiness>;
}) {
  const { text } = props;
  return <div>{text}</div>;
}
