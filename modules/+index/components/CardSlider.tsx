import React, { useEffect, useState } from 'react'
import styles from './CardSlider.module.scss'
import { IItemPicture } from '../../../pages/api/search'

interface ICardSliderProps {
  pictures: IItemPicture[]
}

const CardSlider: React.FC<ICardSliderProps> = ({ pictures }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [picture, setPicture] = useState(
    pictures[currentSlideIndex]
      ? pictures[currentSlideIndex]
      : { id: 0, path: '' }
  )
  const [slideShowIsRunning, setSlideShowIsRunning] = useState(false)

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

  function startSlideShow() {
    setSlideShowIsRunning(!slideShowIsRunning)
  }

  return (
    <img
      className={styles.Image}
      alt={`${picture.id}`}
      src={picture.path}
      onClick={startSlideShow}
    />
  )
}

export default CardSlider
