import { YANDEX_METRIKA } from "@/shared/constants";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  verification: {
    yandex: "1549bedad3281d1a",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <>
          {/* Яндекс метрика */}
          <Script id="metrika-counter" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
            ym(${YANDEX_METRIKA}, "init", {
                  defer: true,
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
            });`}
          </Script>
          {/* Гугл метрика */}
          <GoogleAnalytics gaId="GTM-P3LH9BQD" />
          {/* <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=GTM-P3LH9BQD"
          ></Script>
          <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'GTM-P3LH9BQD');`,
            }}
          /> */}
        </>
      )}
      {children}
    </>
  );
}
