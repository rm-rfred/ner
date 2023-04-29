import React, { useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Grid,
  IconButton,
  PaletteMode,
  Stack,
} from "@mui/material";
import { Cookies } from "react-cookie";

import { Brightness4, Brightness7 } from "@mui/icons-material";
import TextForm from "./components/TextForm";
import TextNer from "./components/TextNer";

import "./";

type Entity = {
  text: string;
  label: string;
  start_char: number;
  end_char: number;
};

function App() {
  const cookies = new Cookies();
  const [themeMode, setThemeMode] = useState<PaletteMode>(
    cookies.get("theme") || "dark"
  );
  const [text, setText] = useState("");
  const [entities, setEntities] = useState<Entity[]>([]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#d0d0d0",
        light: "#ac6000",
        dark: "#ffbe4c",
        contrastText: "#000000",
      },
      secondary: {
        main: "#5a68e5",
        light: "#9196ff",
        dark: "#0d3eb2",
        contrastText: "#000000",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background:
              themeMode === "light"
                ? "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)"
                : "linear-gradient(90deg, #f7f7f7 0%, #dcdcdc 100%)",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
        <IconButton
          color="inherit"
          sx={{ position: "fixed", right: 25, top: 25, zIndex: 5 }}
          onClick={() => {
            let newTheme: PaletteMode = themeMode === "dark" ? "light" : "dark";
            setThemeMode(newTheme);
            cookies.set("theme", newTheme);
          }}
        >
          {cookies.get("theme") === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Container
          style={{
            width: "100vh",
            height: "100vh",
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "100vh" }}
          >
            <Grid item>
              <Stack spacing={2}>
                <TextForm
                  text={text}
                  setText={setText}
                  entities={entities}
                  setEntities={setEntities}
                />
                <TextNer text={text} entities={entities} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
