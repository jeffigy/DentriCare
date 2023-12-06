import RootLayout from "components/RootLayout";
import HomePage from "pages/HomePage";
import React from "react";
import { Route, Routes } from "react-router-dom";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};
export default App;
