import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'

export default function NotFound() {
  return(
    <Layout noHeader>
      <div className="not-found">
        <h1 className="dark:text-white">Oops...</h1>
        <h2 className="dark:text-white">This page cannot be found.</h2>
        <p className="dark:text-white">Go back to the <Link href="/"><a>Homepage</a></Link></p>
      </div>
    </Layout>
  )
}
