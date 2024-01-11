import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme } from "./components/Button";
import { FormLabelTheme } from "./components/FormLabel";
import { CardTheme } from "./components/CardTheme";
import { InputTheme } from "./components/Input";
import { SpinnerTheme } from "./components/Spinner";
import { ModalTheme } from "./components/Modal";
import { TextareaTheme } from "./components/Textarea";

const primary = {
  50: "#e5edff",
  100: "#bccaf9",
  200: "#92a6ef",
  300: "#6683e5",
  400: "#3c5fdd",
  500: "#2246c3",
  600: "#193699",
  700: "#10276e",
  800: "#061745",
  900: "#00081d",
};

const secondary = {
  50: "#d9fdff",
  100: "#adf0ff",
  200: "#7fe6fc",
  300: "#4fdaf8",
  400: "#23cff5",
  500: "#0ab6dc",
  600: "#008dac",
  700: "#00657c",
  800: "#003e4c",
  900: "#00161d",
};

const bg = "#f2f5fd";

export const theme = extendTheme({
  styles: {
    // set global body color to #f2f5fd
    global: {
      body: {
        bg: bg,
      },
    },
  },
  colors: {
    primary,
    secondary,
    bg,
  },
  components: {
    Button: ButtonTheme,
    FormLabel: FormLabelTheme,
    Card: CardTheme,
    Input: InputTheme,
    Spinner: SpinnerTheme,
    Modal: ModalTheme,
    Textarea: TextareaTheme,
  },
});
