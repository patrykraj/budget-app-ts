import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components";
import GlobalStyle from "./styles/index.css";

import { lightTheme, darkTheme } from "./styles/theme";
import routes from "./static/routes";
import useInitStore from "./hooks/useInitStore";

function RootPage() {
  useInitStore();
  const [isDefaultTheme, setIsDefaultTheme] = useState(true);

  return (
    <ThemeProvider theme={isDefaultTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Navigation
          routes={routes}
          setIsDefaultTheme={setIsDefaultTheme}
          isDefaultTheme={isDefaultTheme}
        />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.to}
              path={route.path || route.to}
              element={route.element()}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default RootPage;
