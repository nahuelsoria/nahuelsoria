import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

type AnalyticsEvent = {
  action: string
  category?: string
  label?: string
  value?: number
}

export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function AnalyticsProvider() {
  return (
    <>
      <Analytics />
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}
    </>
  )
}
