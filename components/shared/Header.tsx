import * as React from 'react'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.Wrapper}>
      <h1 className={styles.Label}>Ozeex</h1>
    </header>
  )
}
