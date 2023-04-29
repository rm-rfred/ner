import React from "react";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Cookies } from "react-cookie";

import { apiFetch } from "../utils/Fetch";
import "./entities.css";

type FormValues = {
  text: string;
};

type Entity = {
  text: string;
  label: string;
  start_char: number;
  end_char: number;
};

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
}

export const TextForm: React.FC<Props> = ({
  text,
  setText,
  entities,
  setEntities,
}) => {
  const { handleSubmit, control } = useForm<FormValues>();
  const cookies = new Cookies();
  const themeMode = cookies.get("theme");

  const onSubmit: SubmitHandler<FormValues> = (text) =>
    apiFetch(
      "/api/ner/text",
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify(text)
    ).then((response) => {
      setText(text.text);
      setEntities(response.entities);
    });

  return (
    <Box sx={{ minWidth: "50vh", minHeight: "40vh" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Controller
            name={"text"}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={18}
                sx={{
                  height: "100%",
                  width: "60vh",
                  minHeight: "40vh",
                  borderWidth: "2px",
                  "& .MuiFormLabel-root": {
                    color: themeMode === "dark" ? "black" : "#fff",
                  },
                  "& .MuiInputBase-root": {
                    color: themeMode === "dark" ? "black" : "#fff",
                    width: "100%",
                    minHeight: "40vh",
                    backgroundColor:
                      themeMode === "dark" ? "#CAD1D5" : "#69696A",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderWidth: "2px",
                      borderColor: "rgba(63, 81, 181, 0.5)",
                      width: "100%",
                      minHeight: "40vh",
                    },
                }}
                variant="outlined"
                label={"Enter a text to detect entities"}
                InputLabelProps={{
                  style: { color: "secondary" },
                }}
              />
            )}
          />
        </Stack>
        <Button type="submit" variant="contained" color="primary">
          DETECT ENTITIES
        </Button>
      </form>
    </Box>
  );
};

export default TextForm;
