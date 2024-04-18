import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { Button } from "./components/Button";
import { defaultTheme } from "./styles/themes/default.ts";
import { GlobalStyle } from "./styles/global.ts";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <Button
        variant="secondary"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </Button>
      <Button variant="danger" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <Button variant="success" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <GlobalStyle />
    </ThemeProvider>
  );
}
