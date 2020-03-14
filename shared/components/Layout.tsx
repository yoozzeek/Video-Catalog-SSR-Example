import * as React from 'react'
import Head from 'next/head'
import styles from './Layout.module.scss'
import Header from './Header'

export default function Layout(props) {
  return (
    <div className={styles.Wrapper}>
      <Head>
        <title>OZEEX</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />
      <main>{props.children}</main>
    </div>
  )
}
