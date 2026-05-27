/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://noel-wilson.co.uk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [],
  },
  trailingSlash: true,
  // exclude template/tutorial pages that are not real content
  exclude: ['/tutorial', '/tutorial/*'],
}
