import React, { useState } from 'react'
import styles from './Card.module.scss'
import { IItem } from '../../../pages/api/search'
import CardTags from './CardTags'
import CardSlider from './CardSlider'

interface IVideoCardProps {
  item: IItem
}

const Card: React.FC<IVideoCardProps> = ({ item }) => {
  const [isOpenedDetails, setIsOpenedDetails] = useState(false)

  function showDetails() {}

  return (
    <article className={styles.Wrapper}>
      <figure className={styles.ImageContainer}>
        <CardSlider pictures={item.picture} />

        <div className={styles.Meta}>
          <small>{item.added}</small>
          <small>{item.duration}</small>
        </div>

        <figcaption className={styles.Description}>
          {item.description}
        </figcaption>
      </figure>

      <CardTags tags={item.tag} />

      <button className={styles.MoreInfo} onClick={showDetails}>
        More info
      </button>
    </article>
  )
}

export default React.memo(Card)
