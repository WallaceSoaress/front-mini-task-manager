import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import packageJson from "../package.json";
import { AuthProvider } from "./hooks/auth";
import { AppRoutes } from "./routes";
import "./styles/global-styles.css";
import themeDefault from "./styles/themeDefault";
import { VersionBadge } from "./styles/styles";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
          <VersionBadge>Mini Task Manager - v{packageJson.version}</VersionBadge>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
