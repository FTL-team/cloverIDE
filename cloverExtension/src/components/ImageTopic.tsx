import React, { useEffect, useRef } from 'react'
import { getCvConversion, getCvType } from '../ros/image'
import { useTopic } from '../ros/hooks/topic'
import { load as loadCv } from '../opencv'

await loadCv()
const cv = loadCv()

export default function ImageTopic(props: { topic: string }) {
  const message = useTopic(props.topic, true)
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (message != null) {
      const arr = message.data
      const mat = cv.matFromArray(
        message.height,
        message.width,
        cv[getCvType(message.encoding as string)],
        arr
      )
      cv.cvtColor(
        mat,
        mat,
        cv[`COLOR_${getCvConversion(message.encoding as string)}2RGB`]
      )
      cv.imshow(canvas.current, mat)
      mat.delete()
    }
  }, [message?.data])

  if (message === null) {
    return <div>Waiting for message...</div>
  }

  return (
    <>
      <canvas
        width={message.width as number}
        height={message.height as number}
        ref={canvas}
      ></canvas>
    </>
  )
}
