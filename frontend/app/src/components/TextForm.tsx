import React from "react";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";

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
              sx={{
                height: "100%",
                width: "100%",
                minWidth: "50vh",
                minHeight: "40vh",
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
                "& .MuiFormLabel-root": {
                  color: "#fff",
                },
                "& .MuiInputBase-root": {
                  color: "#fff",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderWidth: "2px",
                    borderColor: "rgba(63, 81, 181, 0.5)",
                    minWidth: "50vh",
                    minHeight: "40vh",
                  },
                backgroundColor: "rgba(0,0,0,0.35)",
                color: "rgba(255,255,255,1)",
                borderRadius: "5px",
              }}
              variant="outlined"
              label={"Texte"}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default TextForm;
