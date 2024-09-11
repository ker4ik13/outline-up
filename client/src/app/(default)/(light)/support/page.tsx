import { AccordionUserService } from "@/services/content";
import { appLinks } from "@/shared/constants";
import { generateCustomMetadata } from "@/shared/helpers/lib";
import { Accordions } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata(appLinks.user.support.main, "website");
};

const UserSupportPage = async () => {
  const supportAccordions = await AccordionUserService.getSupport();

  return (
    <>
      {supportAccordions.data &&
        supportAccordions.data[0].attributes.values && (
          <Accordions
            accordions={supportAccordions.data[0].attributes.values}
            title={supportAccordions.data[0].attributes.title}
            key={supportAccordions.data[0].attributes.name}
            moreText={supportAccordions.data[0].attributes.moreText}
            isGrayBg
            lowerPadding
          />
        )}
    </>
  );
};

export default UserSupportPage;
