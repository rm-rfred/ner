import React from "react";

import { Button } from "@mui/material";
import { DropzoneArea } from "react-mui-dropzone";
import { FormProvider, useForm } from "react-hook-form";

import { apiFetch } from "../utils/Fetch";

type FormData = {
  file: FileList;
};

export const FileUpload = (): JSX.Element => {
  const methods = useForm<FormData>();

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = (formData: FormData) => {
    const file = formData.file[0];
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);

    apiFetch("/api/ner/file", "POST", {}, formDataToSend).then((response) =>
      console.log(response)
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DropzoneArea
            acceptedFiles={[".pdf", ".doc", ".docx", ".odt"]}
            dropzoneText={"Drag and drop a file here or click to select a file"}
            filesLimit={1}
            showAlerts={isDirty}
          />
          <Button type="submit">Upload File</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default FileUpload;
