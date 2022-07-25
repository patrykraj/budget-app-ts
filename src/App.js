import { Suspense } from 'react';
import { Navigation, Loader, Button, FlexWrapper } from './components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/index.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {routes} from './static/routes';

import theme from './styles/theme.js';
import {buttonTypes, languages} from './static/constants';

function RootPage() {
  const {regular} = buttonTypes;
  const {pl, en} = languages;

  return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Navigation routes={routes} RightElement={(
            <FlexWrapper>
              <Button type={regular}>{pl}</Button>
              <Button type={regular}>{en}</Button>
            </FlexWrapper>
            )} />
          <Routes>
            {routes.map((route) => 
              <Route key={route.to} path={route.to} element={route.element()} exact={route.exact} />)}
          </Routes>
        </BrowserRouter>
      </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loader />}>
        <RootPage />
      </Suspense>
    </ThemeProvider>
  )
};

export default App;
