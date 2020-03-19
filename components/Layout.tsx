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

      <footer className={styles.Footer}>
        <p>
          Disclaimer: All models are 18 years or older. All porn galleries and
          linksto sex videos are provided by 3rd parties. We have no control
          over thecontent of these pages. We take no responsibility for the
          content on anywebsite which we link to, please use your own discretion
          while surfing theporn links. And we are proudly labeled with the RTA.
        </p>
      </footer>
    </div>
  )
}
