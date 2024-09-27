'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSessionFilter } from '../_providers/filter'

const FetchLoader = () => {
  const {isLoading: isFetching} = useSessionFilter()

  const controls = useAnimation()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isFetching) {
      setIsAnimating(true)
      controls.start({
        x: "200%",
        transition: {
          duration: 1.5,
          ease: "linear",
          repeat: Infinity,
        },
      })
    } else {
      controls.stop()
      if (isAnimating) {
        controls.start({
          x: "200%",
          transition: {
            duration: 0.2,
            ease: "linear",
          },
        }).then(() => {
          setIsAnimating(false)
          controls.set({ x: "-100%" })
        })
      } else {
        controls.set({ x: "-100%" })
      }
    }
  }, [isFetching, controls, isAnimating])

  return (
    <div
      className="h-0.5 w-full overflow-hidden mx-2.5"
      role="progressbar"
      aria-valuetext={isFetching ? "Loading" : "Loaded"}
    >
      <motion.div
        className="h-full w-1/3 bg-primary/30"
        initial={{ x: "-100%" }}
        animate={controls}
      />
    </div>
  )
}

export default FetchLoader
