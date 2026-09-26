import { CONFIG } from "../config";

type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
    __metaPixelInitialized?: boolean;
  }
}

let pixelInitialized = false;

export function initMetaPixel() {
  if (typeof window === "undefined") return;

  if (pixelInitialized || window.__metaPixelInitialized) {
    return;
  }

  const pixelId = CONFIG.PIXEL_ID;

  if (!pixelId) {
    console.warn("Meta Pixel ID is not configured.");
    return;
  }

  if (!window.fbq) {
    const fbq: MetaPixelFunction = function (
      ...args: unknown[]
    ): void {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    };

    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";

    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");

    script.async = true;
    script.src =
      "https://connect.facebook.net/en_US/fbevents.js";

    const firstScript =
      document.getElementsByTagName("script")[0];

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");

  pixelInitialized = true;
  window.__metaPixelInitialized = true;
}

function fireEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (
    typeof window !== "undefined" &&
    typeof window.fbq === "function"
  ) {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}

export const trackViewContent = (
  params?: Record<string, unknown>
) => {
  fireEvent("ViewContent", params);
};

export const trackInitiateCheckout = (
  params?: Record<string, unknown>
) => {
  fireEvent("InitiateCheckout", params);
};

export const trackLead = (
  params?: Record<string, unknown>
) => {
  fireEvent("Lead", params);
};

export const trackPurchase = (
  params?: Record<string, unknown>
) => {
  fireEvent("Purchase", params);
};