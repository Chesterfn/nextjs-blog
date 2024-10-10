import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import html  from 'remark-html'
// 定义一个接口来描述 post 数据的结构
export  interface PostData {
    id: string;
    date: string; // 根据您的需求，可以更改为 Date 类型
    // 添加其他数据字段
    title?: string; // 假设可能有标题字段
    // 根据您的 Markdown 文件的内容添加其他字段
  }

export  interface PostDataParm {
  id: string;
  contentHtml:string;
  date: string; // 根据您的需求，可以更改为 Date 类型
  // 添加其他数据字段
  title?: string; // 假设可能有标题字段
  // 根据您的 Markdown 文件的内容添加其他字段
}

const postsDirectory = path.join(process.cwd()+'/pages/', 'posts')

export function getSortedPostsData():PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.filter(fileName => fileName.endsWith('.md')).map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    } as PostData;
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}



export async function getPostData(id:string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用 gray-matter 解析文章的元数据部分
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()
  // 将数据与 id 结合
  return {
    id,
    contentHtml,
    ...matterResult.data
  } as PostDataParm
}



// //外部 API：你可以通过 fetch 从外部 API 获取数据
// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..')
//     return res.json()
//  }



  

// //数据库查询：你也可以直接查询数据库
// import someDatabaseSDK from 'someDatabaseSDK'
// const databaseClient = someDatabaseSDK.createClient(...)
// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }



export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.filter(fileName => fileName.endsWith('.md')).map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}