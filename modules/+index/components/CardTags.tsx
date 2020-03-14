import * as React from 'react'
import styles from './CardTags.module.scss'

interface ICardTagsProps {
  tags: string[]
  label?: string
  isCollapsedDetails: boolean
}

const CardTags = React.forwardRef<HTMLDivElement, ICardTagsProps>(
  ({ tags, isCollapsedDetails, label }, ref) => {
    const classes = `${styles.Wrapper} ${isCollapsedDetails ? styles.Wrap : ''}`

    return (
      <div ref={ref} className={classes}>
        {isCollapsedDetails && (
          <strong className={styles.Label}>{label ? label : 'Tags:'}</strong>
        )}
        {tags.map((tag, index) => (
          <span key={index} className={styles.Tag}>
            {tag}
          </span>
        ))}
      </div>
    )
  }
)

export default CardTags
