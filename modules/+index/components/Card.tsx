import React, { MutableRefObject, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Card.module.scss'
import { IItem } from '../interfaces'
import { IndexContext } from '../../../pages'
import CardTags from './CardTags'
import CardSlider from './CardSlider'

interface IVideoCardProps {
  item: IItem
}

const Card: React.FC<IVideoCardProps> = ({ item }) => {
  const indexContext = useContext(IndexContext)
  const [contentHeight, setContentHeight] = useState(0)
  const isCollapsedDetails = useMemo(
    () => indexContext.collapsedCardId === item.id,
    [indexContext.collapsedCardId]
  )

  // Elements refs
  const descriptionEl = useRef(null)
  const tagsEl = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (isCollapsedDetails) {
      const totalHeight = [descriptionEl, tagsEl].reduce(
        (memo: number, el: MutableRefObject<HTMLElement>) => {
          memo += el.current.offsetHeight + el.current.offsetTop
          return memo
        },
        0
      )

      setContentHeight(totalHeight)
    } else {
      setContentHeight(0)
    }
  }, [isCollapsedDetails])

  const cardClasses = `${styles.Wrapper} ${
    isCollapsedDetails ? styles.DetailsCollapsed : ''
  }`

  function collapseDetails() {
    indexContext.setCollapsedCardId(item.id)
  }

  return (
    <article className={cardClasses}>
      <div className={styles.ImageContainer}>
        <CardSlider itemId={item.id} pictures={item.picture} />

        <ul className={styles.Meta}>
          <li className={styles.Added}>
            <strong>Added:</strong> <span>{item.added}</span>
          </li>
          <li className={styles.Duration}>
            <strong>Duration:</strong> <span>{item.duration}</span>
          </li>
          <li className={styles.Source}>
            <strong>Source:</strong> <span>{item.source}</span>
          </li>
        </ul>
      </div>

      <div
        className={styles.ContentWrapper}
        style={{
          height: contentHeight ? contentHeight : 'auto',
        }}
      >
        <div className={styles.Content}>
          <p ref={descriptionEl} className={styles.Description}>
            {isCollapsedDetails && <strong>Description</strong>}{' '}
            {item.description}
          </p>

          <CardTags
            ref={tagsEl}
            tags={item.tag}
            isCollapsedDetails={isCollapsedDetails}
          />
        </div>
      </div>

      {!isCollapsedDetails && (
        <button className={styles.MoreInfo} onClick={collapseDetails}>
          More info
        </button>
      )}
    </article>
  )
}

export default React.memo(Card)
