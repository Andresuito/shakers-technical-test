import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import Navbar from "./components/navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const theme = createTheme({
  fontFamily: geist.style.fontFamily,
});

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "Shakers Technical Test",
  description: "Technical test by Andrés Barranco Ríos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} className={geist.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications
            containerWidth="200px"
            limit={3}
            color="rgba(254, 0, 0, 0)"
            position="top-right"
          />
          <NuqsAdapter>
            <Navbar />
            {children}
          </NuqsAdapter>
        </MantineProvider>
      </body>
    </html>
  );
}
