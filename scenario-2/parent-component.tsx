import useBusiness from "../use-business";
import ChildComponent from "./child-component";
import { useMockContext } from "./mock-provider";

function useParentComponentMockHooks() {
  // Get the configurable context value
  const { ParentHooks } = useMockContext();
  return ParentHooks;
}

function useParentComponentHooks() {
  const hooks = useBusiness();
  return hooks;
}

export default function ParentComponent() {
  if (/* process.env.STORYBOOOK */ true) {
    // STORYBOOK env variable can be set in main.js/ts of storybook
    const mockHooks = useParentComponentMockHooks();
    return <ParentComponentUI props={mockHooks} />;
  }
  const childHooks = useParentComponentHooks();
  return <ParentComponentUI props={childHooks} />;
}

// Renamed from ParentComponent to ParentComponentUI to keep the other parent's React tree the same
export function ParentComponentUI({
  props,
}: {
  props: ReturnType<typeof useBusiness>;
}) {
  // const { text } = useBusiness();
  const { text } = props;

  return (
    <div>
      {text}
      {/* Parent's React tree is not changed */}
      <ChildComponent />
    </div>
  );
}
