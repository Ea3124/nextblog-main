import { getAllPostIds, getPostData } from '@/lib/post'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

const Post = ({postData} : {
    postData: {
        id: string,
        title: string,
        date: string
        contentHtml: string
    }
}) => {
  return (
    <div>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1>{postData.title}</h1>
            <br/>
            <h3>{postData.date}</h3>

            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}}>
            </div>
        </article>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async({params} : {
    params: {
        id: string
    }
}) => {
    const postData = await getPostData(params.id as string)

    return {
        props: {
            postData
        }
    }
}

export const getStaticPaths : GetStaticPaths = async() => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}
export default Post