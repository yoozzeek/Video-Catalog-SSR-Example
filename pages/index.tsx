import * as React from 'react'
import { GetStaticProps } from 'next'
import fetch from 'isomorphic-unfetch'
import styles from './index.module.scss'
import Layout from '../shared/components/Layout'
import IndexMeta from '../modules/+index/components/Meta'
import { ISearchData } from './api/search'
import Card from '../modules/+index/components/Card'

/**
 * Index page component
 */
const Index: React.FC<ISearchData> = props => {
  return (
    <Layout>
      <IndexMeta term={props.info.search_term} total={props.info.total} />

      <section className={styles.VideosList}>
        {props.item.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </section>
    </Layout>
  )
}

/**
 * Fetch search result on server side
 */
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/search')
  const data = await res.json()
  return {
    props: data,
  }
}

// @ts-ignore
export default Index
