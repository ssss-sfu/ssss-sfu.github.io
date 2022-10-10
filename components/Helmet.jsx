import Head from 'next/head'

export const Helmet = ({ pageTitle = '' }) => {
  const defaultTitle = 'Software Systems Student Society'
  const title = `${pageTitle} | ${defaultTitle}`
  const hasPageTitle = pageTitle.trim() !== ''

  return (
    <Head>
      <title>{hasPageTitle ? title : defaultTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}