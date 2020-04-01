import { useContext, useEffect, useState } from 'react'
import { IndexContext } from '../context'
import { IItemPicture } from '../interfaces'

export interface IUseCardSliderOutput {
  picture: IItemPicture
  toggleSlideShow(): void
}

export default function useCardSlider(
  itemId: number,
  pictures: IItemPicture[]
): IUseCardSliderOutput {
  const indexContext = useContext(IndexContext)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [picture, setPicture] = useState(
    pictures[currentSlideIndex]
      ? pictures[currentSlideIndex]
      : { id: 0, path: '' }
  )
  const slideShowIsRunning = indexContext.launchedSlideShowId === itemId

  // Sets the interval and updates
  // current slide index every second
  // when component destroyed clears interval
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

  // When slideIndex updated
  // set new picture model
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

  return {
    picture,
    toggleSlideShow,
  }
}
