import React, { useContext, useEffect, useState } from 'react'
import styles from './CardSlider.module.scss'
import { IItemPicture } from '../interfaces'
import { IndexContext } from '../../../pages'

interface ICardSliderProps {
  itemId: number
  pictures: IItemPicture[]
}

const CardSlider: React.FC<ICardSliderProps> = ({ itemId, pictures }) => {
  const indexContext = useContext(IndexContext)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [picture, setPicture] = useState(
    pictures[currentSlideIndex]
      ? pictures[currentSlideIndex]
      : { id: 0, path: '' }
  )
  const slideShowIsRunning = indexContext.launchedSlideShowId === itemId

  useEffect(() => {
    let interval

    if (slideShowIsRunning) {
      interval = setInterval(() => {
        setCurrentSlideIndex(prevState => prevState + 1)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [slideShowIsRunning])

  useEffect(() => {
    if (slideShowIsRunning) {
      let nextPicture = pictures[currentSlideIndex]

      if (!nextPicture) {
        setCurrentSlideIndex(0)
        nextPicture = pictures[0]
      }

      setPicture(nextPicture)
    }
  }, [currentSlideIndex])

  function toggleSlideShow() {
    indexContext.setLaunchedSlideShowId(
      indexContext.launchedSlideShowId === itemId ? null : itemId
    )
  }

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
