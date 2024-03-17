import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card, { CardProps } from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import * as React from "react";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Stack } from "@mui/joy";
import { BsFillFileEarmarkWordFill } from "react-icons/bs";
import { FaFileImage, FaFilePdf } from "react-icons/fa";

interface Props extends CardProps {
  icon?: React.ReactElement;
  fileName: string;
  fileSize: string;
  progress: number;
  removeFile: () => void;
}

const getFileType = (fileName: string) => {
  const type = fileName.split(".").pop();
  switch (type) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return "image";
    case "docx":
    case "doc":
      return "word";
    case "pdf":
      return "pdf";
    default:
      return "other";
  }
};

export const FileUpload = (props: Props) => {
  const { icon, fileName, fileSize, progress, sx, ...other } = props;
  getFileType(fileName);
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      {...other}
      sx={[
        {
          gap: 1.5,
          alignItems: "flex-start",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Stack
        color="neutral"
        component={"div"}
        justifyContent="center"
        alignItems="center"
        sx={{
          minWidth: 32,
          aspectRatio: "1",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          "--Icon-fontSize": "16px",
          fontSize: 16,
          backgroundColor: "var(--joy-palette-neutral-700, #dde7ee)",
        }}
      >
        {fileName && getFileType(fileName) === "image" && <FaFileImage />}
        {fileName && getFileType(fileName) === "word" && (
          <BsFillFileEarmarkWordFill />
        )}
        {fileName && getFileType(fileName) === "pdf" && <FaFilePdf />}
        {fileName && getFileType(fileName) === "other" && (
          <InsertDriveFileRoundedIcon />
        )}
      </Stack>
      <CardContent>
        <Typography fontSize="sm">{fileName}</Typography>
        <Typography level="body-xs">{fileSize}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LinearProgress
            color="neutral"
            value={progress}
            determinate
            sx={[
              {
                ...(progress >= 100 && {
                  color: "var(--joy-palette-success-solidBg)",
                }),
              },
            ]}
          />
          <Typography fontSize="xs">{progress}%</Typography>
        </Box>
      </CardContent>
      {progress >= 100 && (
        <AspectRatio
          ratio="1"
          variant="solid"
          color="success"
          sx={{
            minWidth: 20,
            borderRadius: "50%",
            "--Icon-fontSize": "14px",
          }}
        >
          <div>
            <CheckRoundedIcon />
          </div>
        </AspectRatio>
      )}
      <IconButton
        onClick={props.removeFile}
        variant="plain"
        color="danger"
        size="sm"
        sx={{ mt: -1, mr: -1 }}
      >
        <RemoveCircleOutlineRoundedIcon />
      </IconButton>
    </Card>
  );
};
