import ChildComponent from "./child-component";
import useBusiness from "../use-business";

export default function ParentComponent() {
  const { text } = useBusiness();

  return (
    <div>
      {text}
      <ChildComponent />
    </div>
  );
}
