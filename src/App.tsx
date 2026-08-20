import { ThemeProvider } from "styled-components";
import packageJson from "../package.json";
import { AuthProvider } from "./hooks/auth";
import { AppRoutes } from "./routes";
import "./styles/global-styles.css";
import themeDefault from "./styles/themeDefault";
import { VersionBadge } from "./styles/styles";

function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <AuthProvider>
        <AppRoutes />
        <VersionBadge>Mini Task Manager - v{packageJson.version}</VersionBadge>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
