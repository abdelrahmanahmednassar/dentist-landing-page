"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: any;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider>{children}</LanguageProvider>
    </NextIntlClientProvider>
  );
}
