import React, { useState } from 'react'

export const IndexContext = React.createContext({
  collapsedCardId: null,
  launchedSlideShowId: null,
  setCollapsedCardId: newId => newId,
  setLaunchedSlideShowId: newId => newId,
})

export default function IndexContextWrapper({ children }) {
  // Index page global context
  // available for nested components
  const [collapsedCardId, setCollapsedCardId] = useState(null)
  const [launchedSlideShowId, setLaunchedSlideShowId] = useState(null)

  return (
    <IndexContext.Provider
      value={{
        collapsedCardId,
        launchedSlideShowId,
        setCollapsedCardId,
        setLaunchedSlideShowId,
      }}
    >
      {children}
    </IndexContext.Provider>
  )
}
