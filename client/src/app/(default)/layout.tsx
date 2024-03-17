export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="eaf2fb"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="18191b"
      />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
