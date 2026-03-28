import React from 'react'
import { motion, useInView } from 'framer-motion'

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  y = 32,
  className,
  style,
  once = true,
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
