import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme } from "./components/Button";
import { FormLabelTheme } from "./components/FormLabel";
import { CardTheme } from "./components/CardTheme";
import { InputTheme } from "./components/Input";
import { SpinnerTheme } from "./components/Spinner";
import { ModalTheme } from "./components/Modal";
export const theme = extendTheme({
  components: {
    Button: ButtonTheme,
    FormLabel: FormLabelTheme,
    Card: CardTheme,
    Input: InputTheme,
    Spinner: SpinnerTheme,
    Modal: ModalTheme,
  },
});
