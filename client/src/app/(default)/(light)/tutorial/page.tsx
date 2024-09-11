import { AccordionUserService } from "@/services/content";
import { appLinks } from "@/shared/constants";
import { generateCustomMetadata } from "@/shared/helpers/lib";
import { Instructions } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata(appLinks.user.instructions.main, "website");
};

const UserInstructionsPage = async () => {
  const accordions = await AccordionUserService.getInstructions();

  return (
    <>
      <Instructions moreInstructions={accordions.data} />
    </>
  );
};

export default UserInstructionsPage;
