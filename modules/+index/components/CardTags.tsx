import * as React from 'react'
import styles from './CardTags.module.scss'

interface ICardTagsProps {
  tags: string[]
}

const CardTags: React.FC<ICardTagsProps> = ({ tags }) => {
  return (
    <div className={styles.Wrapper}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.Tag}>
          {tag}
        </span>
      ))}
    </div>
  )
}

export default CardTags
