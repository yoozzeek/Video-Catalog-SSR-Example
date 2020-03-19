import { useState } from 'react'

type idType = number | null

export interface IUseVideosList {
  collapsedCardId: idType
  launchedSlideShowId: idType
  setCollapsedCardId(id: idType)
  setLaunchedSlideShowId(id: idType)
}

export default function useVideosList(): IUseVideosList {
  const [collapsedCardId, setCollapsedCardId] = useState<idType>(null)
  const [launchedSlideShowId, setLaunchedSlideShowId] = useState<idType>(null)

  return {
    collapsedCardId,
    launchedSlideShowId,
    setCollapsedCardId,
    setLaunchedSlideShowId,
  }
}
