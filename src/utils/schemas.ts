import { iArticle } from '../shared/interfaces'
import { WEBSITE_URL } from '../../BLOG_CONSTANTS/_BLOG_SETUP'
import { transformImagePaths } from './utils'

/**
 * Builds a Schema.org Person schema for Noel Wilson.
 * Used on the homepage to establish author identity in Google's knowledge graph.
 */
export const buildPersonSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Noel Wilson',
  url: WEBSITE_URL,
  jobTitle: 'Full Stack Engineer & Cloud Architect',
  description:
    'Experienced full stack engineer, cloud architect and engineering manager based in London with 15+ years of industry experience.',
  sameAs: [
    'https://www.linkedin.com/in/noel-wilson-0a194225/',
    'https://www.instagram.com/noelwilsonlon/',
  ],
})

/**
 * Builds a Schema.org BlogPosting schema for a given article.
 * Enables Google rich snippets (author, date, image) in search results.
 */
export const buildBlogPostingSchema = (
  article: iArticle,
  pageUrl: string
): Record<string, unknown> => {
  // article.preview.date is free-text and may be a non-date placeholder
  // (e.g. "TBC" for unpublished posts), so guard against an Invalid Date.
  const parsedDate = new Date(article.preview.date)
  const datePublished = Number.isNaN(parsedDate.getTime())
    ? undefined
    : parsedDate.toISOString()
  const imageUrl = article.preview.thumbnail
    ? `${WEBSITE_URL}${transformImagePaths(article.preview.thumbnail)}`
    : undefined

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.preview.articleTitle,
    description: article.preview.shortIntro,
    author: {
      '@type': 'Person',
      name: article.preview.author.name,
      url: WEBSITE_URL,
    },
    url: pageUrl,
    publisher: {
      '@type': 'Person',
      name: 'Noel Wilson',
      url: WEBSITE_URL,
    },
  }

  if (datePublished) {
    schema.datePublished = datePublished
  }

  if (imageUrl) {
    schema.image = imageUrl
  }

  return schema
}
