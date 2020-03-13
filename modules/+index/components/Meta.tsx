import * as React from 'react'
import styles from './Meta.module.scss'

interface IIndexMetaProps {
  term: string
  total: number
}

const IndexMeta: React.FC<IIndexMetaProps> = ({ term, total }) => {
  return (
    <div className={styles.Wrapper}>
      <h3 className={styles.Label}>
        Best <span className={styles.Term}>{term}</span> porn video
      </h3>
      <span className={styles.Total}>Total videos: {total}</span>
    </div>
  )
}

export default IndexMeta
