import ChildComponent from "./child-component";
import useBusiness from "../use-business";
import useAnotherBusiness from "../use-another-business";

export default function ParentComponent({
  props,
  childrensProps,
}: {
  props: ReturnType<typeof useBusiness>;
  childrensProps: ReturnType<typeof useAnotherBusiness>;
}) {
  // const { text } = useBusiness();
  const { text } = props;

  return (
    <div>
      {text}
      <ChildComponent props={childrensProps} />
    </div>
  );
}
