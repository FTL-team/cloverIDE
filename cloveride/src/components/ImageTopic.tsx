import React from 'react'

export default function ImageTopic(props: { topic: string }) {
  return <img src={'http://localhost:8080/stream?topic=' + props.topic} />
}
