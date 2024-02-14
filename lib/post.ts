import path from "path";
import fs from "fs";
import matter from "gray-matter";
import remarkHtml from "remark-html";
import { remark } from "remark";

// C:\Users\user\Desktop\second_day\nextblog\posts
const postsDirectory = path.join(process.cwd(), 'posts');

console.log('postsDirectory', postsDirectory);

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    // [ 'pre-rendering.md', 'ssg-ssr.md' ]
    console.log('fileNames', fileNames);

    const allPostsData = fileNames.map( fileName => {
        const id = fileName.replace(/\.md$/,'')
        // C:\Users\user\Desktop\second_day\nextblog\posts\pre-rendering.md
        const fullPath = path.join(postsDirectory, fileName);

        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...( matterResult.data as { date: string, title: string })
        }        
    })


    return allPostsData;
}

export async function getPostData(id: string)
{
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content)

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...( matterResult.data as { date: string, title: string })
    }
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    /*
    [   
        params: {
        id: 'pre-rendering'
        },
        params: {
        id: 'ssg-ssr'
        },
    ]
    */
    return fileNames.map( fileName=> {
        return {
            params: {
                id: fileName.replace(/\.md$/,'')
            }
        }
    })
}

