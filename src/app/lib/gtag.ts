
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? '';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type GAEventProps = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GAEventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

export const trackCodeCopy = (codeType: string) => {
    window.gtag('event', 'click', {
        event_category: 'code_copy',
        event_label: `${codeType}`,
        value: 1
      });
}

export const trackNavigation = (buttonName: string) => {
    window.gtag('event', 'click', {
        event_category: "navigation",
        event_label: buttonName,
        value: 1
      });
}