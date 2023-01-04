import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData, PostsData} from "../lib/posts";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import Link from 'next/link';
import Date from "../components/date";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps = () => {
  const allPostsData: PostsData[] = getSortedPostsData();
  const data: PostsData[] = allPostsData.map(value => {
    const {...v} = value;
    return v;
  })
  return {
    props: {
      data
    }
  };
}

export default function Home({data}: Props) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {data.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`posts/${id}`}>
                {title}
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
