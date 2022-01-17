import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export class PostsData {
  id: string;
  title: string;
  date: string;

  constructor(id: string, title: string, date: string) {
    this.id = id;
    this.title = title;
    this.date = date;
  }
}

export function getSortedPostsData(): PostsData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: PostsData[] = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    console.log("aaa")
    console.log(matterResult.data)

    // Combine the data with the id
    return new PostsData(
      id,
      matterResult.data.title,
      matterResult.data.date,
    )
  })
  // Sort posts by date
  let postsData = allPostsData.sort((a, b) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  });
  return postsData
}