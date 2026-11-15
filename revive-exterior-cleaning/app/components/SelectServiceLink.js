"use client";

// Jumps to the quote form and pre-selects the given service there
// (QuoteForm listens for the "quote:select-service" event).
export function selectService(service) {
  window.dispatchEvent(new CustomEvent("quote:select-service", { detail: service }));
}

export default function SelectServiceLink({ service, href = "#quote", className = "", children }) {
  return (
    <a href={href} className={className} onClick={() => selectService(service)}>
      {children}
    </a>
  );
}
