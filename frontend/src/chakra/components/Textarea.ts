import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const defaultProps = {
  colorScheme: "blue",
};

const baseStyle = defineStyle({
  borderRadius: 0,
});

export const TextareaTheme = defineStyleConfig({
  baseStyle,
  defaultProps,
});
