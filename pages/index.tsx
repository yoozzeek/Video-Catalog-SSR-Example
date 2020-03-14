import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import styles from './index.module.scss'
import mockData from '../public/results.json'
import { ISearchData } from '../modules/+index/interfaces'
import Layout from '../shared/components/Layout'
import IndexMeta from '../modules/+index/components/Meta'
import Card from '../modules/+index/components/Card'

export const IndexContext = React.createContext({
  collapsedCardId: null,
  launchedSlideShowId: null,
  setCollapsedCardId: newId => newId,
  setLaunchedSlideShowId: newId => newId,
})

/**
 * Index page component
 */
const Index: React.FC<ISearchData> = props => {
  // Index page global context
  // available in any nested component
  const [collapsedCardId, setCollapsedCardId] = useState(null)
  const [launchedSlideShowId, setLaunchedSlideShowId] = useState(null)

  return (
    <Layout>
      <IndexMeta term={props.info.search_term} total={props.info.total} />

      <IndexContext.Provider
        value={{
          collapsedCardId,
          launchedSlideShowId,
          setCollapsedCardId,
          setLaunchedSlideShowId,
        }}
      >
        <section className={styles.VideosList}>
          {props.item.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </section>
      </IndexContext.Provider>
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
