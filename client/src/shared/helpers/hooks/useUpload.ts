import { useState } from "react";

export const useUpload = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileName, setFileName] = useState("");
  const [isDrag, setIsDrag] = useState(false);

  const onDragStartHandler = (event: any) => {
    event.preventDefault();
    setIsDrag(true);
  };
  const onDragLeaveHandler = (event: any) => {
    event.preventDefault();
    setIsDrag(false);
  };
  const onDropHandler = (event: any) => {
    event.preventDefault();
    setIsDrag(false);
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
  };
  const onChangeHandler = (event: any) => {
    console.log(event.target.files[0]);
    event.preventDefault();
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
  };

  const removeFile = () => {
    setFile(undefined);
    setFileName("");
  };

  return {
    file,
    fileName,
    isDrag,
    onChangeHandler,
    onDragLeaveHandler,
    onDragStartHandler,
    onDropHandler,
    removeFile,
  };
};
