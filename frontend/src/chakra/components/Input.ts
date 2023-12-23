import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    borderRadius: 0,
  },
});

const defaultProps = {
  colorScheme: "blue",
};

export const InputTheme = defineMultiStyleConfig({ baseStyle, defaultProps });
