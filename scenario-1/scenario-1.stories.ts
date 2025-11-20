import { ComponentPropsWithoutRef } from "react";
import ParentComponent from "./parent-component";

const args: ComponentPropsWithoutRef<typeof ParentComponent> = {
  props: {
    text: "John",
  },
  childrensProps: {
    text: "Doe",
  },
};

export default {
  title: "Component/Title",
  component: ParentComponent,
  argTypes: args,
};
