import type { Meta, ArgTypes, StoryObj } from "@storybook/react";
import { ComponentPropsWithoutRef } from "react";
import ParentComponent from "./parent-component";
import MockProvider from "./mock-provider";

const ParentComponentWithMockProvider = (
  args: ComponentPropsWithoutRef<typeof MockProvider>
) => {
  return (
    <MockProvider {...args}>
      <ParentComponent />
    </MockProvider>
  );
};

type Story = StoryObj<typeof ParentComponentWithMockProvider>;

export const Default: Story = {
  args: {
    storybookArgs: {
      ChildHooks: { text: "John" },
      ParentHooks: { text: "Doe" },
    },
  },
};

export default {
  title: "Component/Title",
  component: ParentComponentWithMockProvider,
  argTypes: { storybookArgs: { control: "object", description: "Text" } },
} satisfies Meta<typeof ParentComponentWithMockProvider>;
