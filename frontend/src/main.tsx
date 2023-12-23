import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "app/store.ts";
import { theme } from "chakra/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
