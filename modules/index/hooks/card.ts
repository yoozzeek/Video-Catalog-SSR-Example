import {
  MutableRefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { IndexContext } from '../context'
import { IItem } from '../interfaces'

export interface IUseVideoCardOutput {
  contentHeight: number
  isCollapsedDetails: boolean
  collapseDetails(): void
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function useVideoCard(
  item: IItem,
  descriptionRef,
  tagsRef,
  pornstarsRef,
  webcamsRef
): IUseVideoCardOutput {
  const indexContext = useContext(IndexContext)
  const [contentHeight, setContentHeight] = useState<number>(0)
  const isCollapsedDetails = useMemo(
    () => indexContext.collapsedCardId === item.id,
    [indexContext.collapsedCardId]
  )

  // Watch to isCollapsed changes and
  // update the content height
  useIsomorphicLayoutEffect(() => {
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

  function collapseDetails() {
    indexContext.setCollapsedCardId(isCollapsedDetails ? null : item.id)
    indexContext.setLaunchedSlideShowId(item.id)
  }

  return {
    contentHeight,
    isCollapsedDetails,
    collapseDetails,
  }
}
