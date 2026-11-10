import type { ReactNode } from "react";
import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import Footer, { WhatsappFab } from "./Footer";
import Header from "./Header";

export default function PageShell({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <>
      <Header lang={lang} nav={dict.nav} />
      <main>{children}</main>
      <Footer footer={dict.footer} nav={dict.nav} lang={lang} />
      <WhatsappFab />
    </>
  );
}
