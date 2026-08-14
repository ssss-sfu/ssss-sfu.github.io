// JSON-LD component for the website
// It helps search engines understand the website

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  // replace < to avoid JSON parsing errors in HTML tags
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default JsonLd;