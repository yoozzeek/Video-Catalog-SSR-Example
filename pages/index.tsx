import * as React from 'react'
import { GetStaticProps } from 'next'
import styles from './index.module.scss'
import mockData from '../public/results.json'
import Layout from '../shared/components/Layout'
import IndexMeta from '../modules/+index/components/Meta'
import Card from '../modules/+index/components/Card'

/**
 * Data interfaces
 */
export interface IItemPicture {
  id: number
  path: string
}

export interface IItem {
  id: number
  source: string
  description: string
  added: string
  duration: string
  picture: IItemPicture[]
  tag: string[]
  pornstar: string[]
  webcam: string[]
}

export interface ISearchData {
  info: {
    total: number
    search_term: string
  }
  item: IItem[]
}

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
 * Fetch mock data on server side
 */
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: mockData,
  }
}

// @ts-ignore
export default Index
