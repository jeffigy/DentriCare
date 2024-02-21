import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    borderRadius: 0,
  },
  icon: {
    color: "primary.500",
  },
});

export const selectTheme = defineMultiStyleConfig({ baseStyle });
