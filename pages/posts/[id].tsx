import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/date';
import { useRouter } from 'next/router';
interface IdProps {
    postData: {
        id: string;
        contentHtml: string;
        date: string; // 根据您的需求，可以更改为 Date 类型
        // 添加其他数据字段
        title?: string; // 假设可能有标题字段
        // 根据您的 Markdown 文件的内容添加其他字段
    };
  }

interface IdParams {
    params: {
      id: string
    }
}
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({params}:IdParams) {
    const postData = await getPostData(params.id)
    //console.log(postData); 
    return {
      props: {
        postData
      }
    }
  // 根据 params.id 获取博客文章所需的数据
}

export default function Post( {postData}:IdProps) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
    return (
        <Layout>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <br />
          <p className={utilStyles.lightText}>{postData.id}</p>
          <br />
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          {router.isFallback && <div style={{color:'red'}}>Loading...</div>}
        </Layout>
      )
}