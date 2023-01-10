import Head from 'next/head';
import Layout from 'components/layout'
import { getAllPostIds, getPostData } from "lib/posts";
import Date from "components/date";
import utilStyles from "styles/utils.module.css"
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = (props: Props) => {
  const postData = props.postData
  return <Layout home={false}>
    {postData.title}
    <Head>
      <title>{postData.id}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  </Layout>
}

export default Post

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<{ [key: string]: any }, Params> = async (context) => {
  const postData = await getPostData(context.params.id)
  return {
    props: {
      postData
    }
  }
}

interface Params extends ParsedUrlQuery {
  id: string;
}
