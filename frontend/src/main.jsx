import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import App from "./App.jsx";
import CatalogPage from "./components/pages/catalog/CatalogPage.jsx";
import ActorPage from "./components/pages/actor/ActorPage.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Layout from "./components/shared/layout/Layout.jsx";

const theme = createTheme({
  typography: {
    fontFamily: '"Oswald", sans-serif',
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/actor" element={<ActorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </ThemeProvider>,
);
