import Head from 'next/head'

interface JsonLdProps {
  schema: Record<string, unknown>
  keyId: string
}

/**
 * Injects a JSON-LD structured data script tag into <head>.
 * Use keyId to prevent Next.js from deduplicating multiple schemas on the same page.
 */
const JsonLd = ({ schema, keyId }: JsonLdProps) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key={keyId}
      />
    </Head>
  )
}

export default JsonLd
