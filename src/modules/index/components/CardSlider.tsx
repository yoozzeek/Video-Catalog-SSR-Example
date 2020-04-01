import React from 'react'
import styles from './CardSlider.module.scss'
import { IItemPicture } from '../interfaces'
import useCardSlider from '../hooks/slider'

interface ICardSliderProps {
  itemId: number
  pictures: IItemPicture[]
}

/**
 * Slider component is a part of VideoCard
 * can start/stop (toggle) slide show
 * and gets global context for handle intervals
 */
const CardSlider: React.FC<ICardSliderProps> = ({ itemId, pictures }) => {
  const { picture, toggleSlideShow } = useCardSlider(itemId, pictures)

  return (
    <img
      className={styles.Image}
      alt={`${picture.id}`}
      src={picture.path}
      onClick={toggleSlideShow}
    />
  )
}

export default React.memo(CardSlider)
