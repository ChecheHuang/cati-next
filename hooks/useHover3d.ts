import React, { useState, useRef, useEffect, useCallback } from 'react'

interface Coords {
  x: number
  y: number
}

interface Props {
  x?: number
  y?: number
  z?: number
}
const defaultProps: Required<Props> = {
  x: 20,
  y: -5,
  z: 11,
}
export default function useHover3d(ref: React.RefObject<any>, props?: Props) {
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const x = props?.x || defaultProps.x
  const y = props?.y || defaultProps.y
  const z = props?.z || defaultProps.z

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { offsetWidth: width, offsetHeight: height } = ref.current
      const { clientX, clientY } = e

      const x = (clientX - width / 2) / width
      const y = (clientY - height / 2) / height

      setCoords({ x, y })
    },
    [ref],
  )

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    const { current } = ref

    current.addEventListener('mousemove', handleMouseMove)
    current.addEventListener('mouseenter', handleMouseEnter)
    current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      current.removeEventListener('mousemove', handleMouseMove)
      current.removeEventListener('mouseenter', handleMouseEnter)
      current.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, handleMouseMove])

  const { x: xCoord, y: yCoord } = coords

  const xTransform = isHovering ? xCoord * x : 0
  const yTransform = isHovering ? yCoord * y : 0
  const zTransform = isHovering ? z : 0

  const transform = `perspective(1000px) rotateX(${yTransform}deg) rotateY(${-xTransform}deg) translateZ(${zTransform}px)`
  const transition = isHovering ? 'none' : 'all 0.5s ease'

  return { transform, transition }
}
