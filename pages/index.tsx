import React from 'react'
import { GetStaticProps } from 'next'
import styles from './index.module.scss'
import mockData from '../public/results.json'
import { ISearchData } from '../modules/index/interfaces'
import Layout from '../components/Layout'
import IndexMeta from '../modules/index/components/Meta'
import Card from '../modules/index/components/Card'
import IndexContextWrapper from '../modules/index/context'

/**
 * Index page component
 */
const Index: React.FC<ISearchData> = props => {
  return (
    <Layout>
      <IndexMeta term={props.info.search_term} total={props.info.total} />
      <IndexContextWrapper>
        <section className={styles.VideosList}>
          {props.item.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </section>
      </IndexContextWrapper>
    </Layout>
  )
}

/**
 * Fetch mock data on server side
 */
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: mockData,
  }
}

// @ts-ignore
export default Index
