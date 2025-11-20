import useAnotherBusiness from "../use-another-business";

export default function ChildComponent({
  props,
}: {
  props: ReturnType<typeof useAnotherBusiness>;
}) {
  const { text } = props;
  return <div>{text}</div>;
}
