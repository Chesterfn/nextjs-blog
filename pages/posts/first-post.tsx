import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import Alert from '../../components/Alert'

export default function FirstPost() {
  return (
    <>
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
          <Link href="/">
            Back to home
          </Link>
        </h2>
      </Layout>
      <Alert type="success">This is a success message!</Alert>
      <Alert type="error">This is an error message!</Alert>
    </>
  )
}