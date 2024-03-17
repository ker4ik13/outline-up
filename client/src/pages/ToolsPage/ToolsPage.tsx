import { language, translate } from "@/data/admin/translate";
import { appLinks } from "@/shared/constants";
import { CustomBreadcrumbs } from "@/shared/ui";
import { Card, Stack, Typography } from "@mui/joy";
import Link from "next/link";
import { IoQrCodeOutline } from "react-icons/io5";
import s from "../GeneralPage.module.scss";

const ToolsPage = () => {
  return (
    <div className={s.page}>
      <CustomBreadcrumbs
        pages={[{ label: "Инструменты", link: appLinks.admin.tools.main }]}
      />
      <h2 className={s.title}>{translate.sidebar.tools[language]}</h2>
      <Stack gap={1} direction="row" flexWrap="wrap" mt={3}>
        <Card
          variant="outlined"
          color="neutral"
          component={Link}
          href={appLinks.admin.tools.qr}
        >
          <IoQrCodeOutline size={50} />
          <Typography level="body-md" fontWeight="600">
            Создать QR-Code
          </Typography>
        </Card>
      </Stack>
    </div>
  );
};

export default ToolsPage;
