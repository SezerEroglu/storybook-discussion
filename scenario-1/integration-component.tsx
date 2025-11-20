import useAnotherBusiness from "../use-another-business";
import useBusiness from "../use-business";
import ParentComponent from "./parent-component";

export default function Page() {
  const hooksForParent = useBusiness();
  const hooksForChild = useAnotherBusiness();
  // All the hooks will be used and passed down
  return (
    <ParentComponent props={hooksForParent} childrensProps={hooksForChild} />
  );
}
