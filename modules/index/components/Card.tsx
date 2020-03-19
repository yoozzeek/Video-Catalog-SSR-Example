import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
  const [contentHeight, setContentHeight] = useState<number>(0)
  const isCollapsedDetails = useMemo(
    () => indexContext.collapsedCardId === item.id,
    [indexContext.collapsedCardId]
  )

  // Elements refs
  const descriptionRef = useRef(null)
  const tagsRef = React.createRef<HTMLDivElement>()
  const pornstarsRef = React.createRef<HTMLDivElement>()
  const webcamsRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (isCollapsedDetails) {
      const totalHeight = [descriptionRef, tagsRef, webcamsRef, pornstarsRef]
        .filter(el => el.current)
        .reduce((memo: number, el: MutableRefObject<HTMLElement>) => {
          memo += el.current.offsetHeight
          return memo
        }, 21)

      setContentHeight(totalHeight)
    }

    // setContentHeight(0)
  }, [isCollapsedDetails])

  const cardClasses = `${styles.Wrapper} ${
    isCollapsedDetails ? styles.DetailsCollapsed : ''
  }`

  function collapseDetails() {
    indexContext.setCollapsedCardId(isCollapsedDetails ? null : item.id)
  }

  return (
    <article className={cardClasses}>
      <i className={styles.CloseButton} onClick={collapseDetails} />

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
          height: isCollapsedDetails ? contentHeight : 'auto',
        }}
      >
        <div className={styles.Content}>
          <p ref={descriptionRef} className={styles.Description}>
            {isCollapsedDetails && <strong>Description:</strong>}{' '}
            {item.description}
          </p>

          <CardTags
            ref={tagsRef}
            tags={item.tag}
            isCollapsedDetails={isCollapsedDetails}
          />

          <CardTags
            ref={pornstarsRef}
            tags={item.pornstar}
            isCollapsedDetails={true}
            isHidden={!(isCollapsedDetails && item.pornstar.length)}
            color="primary"
            label="Pornstars:"
          />

          <CardTags
            ref={webcamsRef}
            tags={item.webcam}
            isCollapsedDetails={true}
            isHidden={!(isCollapsedDetails && item.webcam.length)}
            color="success"
            label="Webcam Models:"
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
