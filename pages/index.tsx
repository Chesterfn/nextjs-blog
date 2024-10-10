import Head from "next/head";
import Layout, { siteTitle } from "../components/Layouthome";
import utilStyles from "../styles/utils.module.css"
import { getSortedPostsData, PostData } from "../lib/posts";
import Date from "../components/date";
import Link from "next/link";
interface HomeProps {
  allPostsData: PostData[];
}

export async function getStaticProps() {
  const allPostsData:PostData[] = getSortedPostsData()
  //console.log(allPostsData);
  return {
    props: {
      allPostsData
    }
  }
}

// //服务器端渲染
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }


export default function Home( {allPostsData}:HomeProps) {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
          </p>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  {title}
                </Link>
                <br />
                {id}
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    )
  }