import { ThemeProvider, useTheme } from "styled-components";
import "./styles/global-styles.css";

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <h1>Login</h1>
    </ThemeProvider>
  );
}

export default App;
