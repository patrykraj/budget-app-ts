import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation, Button, FlexWrapper } from "./components";
import GlobalStyle from "./styles/index.css";

import theme from "./styles/theme";
import routes from "./static/routes";
import { buttonTypes, languages } from "./static/constants";
import useInitStore from "./hooks/useInitStore";

function RootPage() {
  const { regular } = buttonTypes;
  const { pl, en } = languages;
  useInitStore();

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navigation
          routes={routes}
          RightElement={
            <FlexWrapper>
              <Button type={regular}>{pl}</Button>
              <Button type={regular}>{en}</Button>
            </FlexWrapper>
          }
        />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.to}
              path={route.path || route.to}
              element={route.element()}
              exact={route.exact}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootPage />
    </ThemeProvider>
  );
}

export default App;
