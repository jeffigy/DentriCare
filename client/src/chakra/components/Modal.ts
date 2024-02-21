import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: 0,
  },
});
// TODO: find a way to make closeOnOverlayClick default to false in theming

export const ModalTheme = defineMultiStyleConfig({
  baseStyle,
});
