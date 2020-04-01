import * as React from 'react'
import styles from './Card.module.scss'
import { IItem } from '../interfaces'
import CardTags from './CardTags'
import CardSlider from './CardSlider'
import useVideoCard from '../hooks/card'
import { useRef } from 'react'

interface IVideoCardProps {
  item: IItem
}

/**
 * Card component is general part of video list
 * might be collapsed, has different styles for
 * desktop and mobile and shows base information
 */
const Card: React.FC<IVideoCardProps> = ({ item }) => {
  // Define elements refs
  const descriptionRef = useRef(null)
  const tagsRef = React.createRef<HTMLDivElement>()
  const pornstarsRef = React.createRef<HTMLDivElement>()
  const webcamsRef = React.createRef<HTMLDivElement>()

  // Use video card hook
  const { isCollapsedDetails, collapseDetails, contentHeight } = useVideoCard(
    item,
    descriptionRef,
    tagsRef,
    pornstarsRef,
    webcamsRef
  )

  const cardClasses = `${styles.Wrapper} ${
    isCollapsedDetails ? styles.DetailsCollapsed : ''
  }`

  return (
    <article
      className={cardClasses}
      style={{
        marginBottom: isCollapsedDetails ? contentHeight : 'auto',
      }}
    >
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

      <div className={styles.ContentWrapper}>
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
