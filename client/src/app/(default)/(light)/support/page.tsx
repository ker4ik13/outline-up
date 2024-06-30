import { AccordionUserService } from "@/services/content";
import { generateCustomMetadata } from "@/shared/helpers/lib";
import { Accordions } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata("/support", "website");
};

// export const metadata: Metadata = {
//   title: `Поддержка: Ответы на вопросы по использованию ${SITE_NAME}`,
//   description: `Здесь вы найдете ответы на самые часто задаваемые вопросы о использовании ${SITE_NAME}. Получите помощь здесь.`,
//   keywords:
//     "Поддержка, вопросы и ответы, Outline Up, VPN, помощь, поддержка пользователей, техническая поддержка, часто задаваемые вопросы, FAQ",
//   openGraph: {
//     title: `Поддержка: Ответы на вопросы по использованию ${SITE_NAME}`,
//     description: `Здесь вы найдете ответы на самые часто задаваемые вопросы о использовании ${SITE_NAME}. Получите помощь здесь.`,
//     type: "website",
//     siteName: SITE_NAME,
//     url: `${CLIENT_URL}${appLinks.user.support.main}`,
//     images: [poster.src],
//   },
//   alternates: {
//     canonical: `${CLIENT_URL}${appLinks.user.support.main}`,
//     languages: {
//       ru: `${CLIENT_URL}${appLinks.user.support.main}`,
//     },
//   },
// };

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
          />
        )}
    </>
  );
};

export default UserSupportPage;
