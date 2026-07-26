"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: any;
  timeZone?: string;
}

export function Providers({
  children,
  locale,
  messages,
  timeZone = "Africa/Cairo",
}: ProvidersProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
}

