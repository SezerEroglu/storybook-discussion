import useAnotherBusiness from "../use-another-business";

export default function ChildComponent() {
  const { text } = useAnotherBusiness();
  return <div>{text}</div>;
}
