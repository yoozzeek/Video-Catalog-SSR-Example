import React, { MutableRefObject } from 'react'
import styles from './CardTags.module.scss'

interface ICardTagsProps {
  tags: string[]
  label?: string
  color?: 'primary' | 'success' | 'secondary'
  isHidden?: boolean
  isCollapsedDetails: boolean
}

/**
 * CardTags is common component for all
 * tags lists with custom labels and colors
 */
const CardTags = React.forwardRef<HTMLDivElement, ICardTagsProps>(
  (
    {
      tags,
      isCollapsedDetails,
      label = 'Tags:',
      color = 'secondary',
      isHidden = false,
    },
    ref: MutableRefObject<HTMLDivElement>
  ) => {
    const classes = `${styles.Wrapper} ${isCollapsedDetails ? styles.Wrap : ''}`

    return (
      <div
        ref={ref}
        className={classes}
        style={isHidden ? { display: 'none' } : {}}
      >
        {isCollapsedDetails && (
          <strong className={styles.Label}>{label}</strong>
        )}
        {tags.map((tag, index) => (
          <span key={index} className={`${styles.Tag} ${styles[color]}`}>
            {tag}
          </span>
        ))}
      </div>
    )
  }
)

export default CardTags
