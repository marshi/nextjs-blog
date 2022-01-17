import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData, PostsData} from "../lib/posts.js";
import {InferGetStaticPropsType} from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPostsData: PostsData[] = getSortedPostsData();
  console.log("aoi");
  console.log(allPostsData);
  const data = allPostsData.map(value => {
    const {...v} = value;
    return v;
  })
  console.log(data);
  return {
    props: {
      data
    }
  };
}

export default function Home({data}: Props) {
  console.log(data)
  console.log("aaa")
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {data.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br/>
              {id}
              <br/>
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
