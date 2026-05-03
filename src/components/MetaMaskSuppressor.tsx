"use client";

import { useEffect } from "react";

export default function MetaMaskSuppressor() {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      // Suppress MetaMask connection errors
      const reason = event.reason?.message || event.reason?.toString() || "";
      if (
        reason.includes("Failed to connect to MetaMask") ||
        reason.includes("MetaMask") ||
        event.reason?.code === -32002
      ) {
        event.preventDefault();
        // Quietly log to console instead of showing the red error overlay
        console.warn("Suppressed known extension error: MetaMask connection issue.");
      }
    };

    const originalWarn = console.warn;
    const originalError = console.error;

    // Suppress specific library warnings that clutter the console
    console.warn = (...args) => {
      const msg = args.join(" ");
      if (
        msg.includes("THREE.Clock") || 
        msg.includes("deprecated parameters") ||
        msg.includes("non-static position")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      const msg = args.join(" ");
      if (msg.includes("Failed to connect to MetaMask") || msg.includes("MetaMask")) {
        return;
      }
      originalError.apply(console, args);
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}
