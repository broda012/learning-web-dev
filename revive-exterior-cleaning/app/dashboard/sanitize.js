// The AI summary is generated from text submitted through the public quote
// form, so it must be treated as untrusted before rendering it as HTML in the
// (logged-in) dashboard. Strategy: neutralise every tag, then restore only a
// small allowlist of formatting tags that carry NO attributes. Because nothing
// with attributes is ever restored, event handlers / javascript: URLs / style
// injection can't survive.
const ALLOWED_TAGS = ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h3", "h4"];

const allowedTagPattern = new RegExp(
  `&lt;(\\/?)(${ALLOWED_TAGS.join("|")})\\s*\\/?&gt;`,
  "gi"
);

export function sanitizeSummaryHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(allowedTagPattern, (_, slash, tag) => `<${slash}${tag.toLowerCase()}>`);
}
