/* eslint-disable jsx-a11y/anchor-is-valid */
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isDrag: boolean;
}

export const DropZone = (props: Props) => {
  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        name="file"
        id="file"
        accept="image/*"
        onChange={props.onChange}
        onDragLeave={props.onDragLeave}
        onDragStart={props.onDragStart}
        onDragOver={props.onDragStart}
        onDrop={props.onDrop}
      />
      <label
        htmlFor="file"
        style={{
          flexGrow: 1,
        }}
      >
        <Card
          variant="soft"
          sx={[
            {
              borderRadius: "sm",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
              px: 3,
              flexGrow: 1,
              boxShadow: "none",
              cursor: "pointer",
            },
          ]}
        >
          <AspectRatio
            ratio="1"
            variant="solid"
            color="primary"
            sx={{
              minWidth: 32,
              borderRadius: "50%",
              "--Icon-fontSize": "16px",
            }}
          >
            <div>{<FileUploadRoundedIcon />}</div>
          </AspectRatio>
          {props.isDrag ? (
            <Typography color="primary">Отпустите для загрузки</Typography>
          ) : (
            <Typography level="body-sm" textAlign="center">
              <Typography color="primary">Нажмите для загрузки</Typography> или
              перетащите изображение
              <br /> PNG, JPG, WEBP, GIF
            </Typography>
          )}
        </Card>
      </label>
    </>
  );
};
