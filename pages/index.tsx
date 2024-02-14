import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getSortedPostsData } from "@/lib/post";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({allPostData} : {
  allPostData : {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <div>
      <Head>
        <title>Next Blog</title>
      </Head>
      <section>
        <h2>[Next Blog Introduction]</h2>
      </section>
      <section>
        <h2>Blog</h2>
        <ul>
          {
            allPostData.map (({id, date, title}) => (
              <li>
                <Link href={`posts/${id}`}>
                {title}
                </Link>
                <br/>
                {date}
              </li>              
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const allPostData = getSortedPostsData();

  return {
    props: {
      allPostData
    }
  }
}
