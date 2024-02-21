import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "0",
  },
});

export const TagTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: "primary",
  },
  baseStyle,
});
