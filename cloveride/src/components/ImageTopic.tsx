import React from 'react'
console.log("  dfgdfgdfgsd", process.env.NODE_ENV)
const host =
  process.env.NODE_ENV == 'development' ? 'localhost' : location.hostname

export default function ImageTopic(props: { topic: string }) {
  return <img src={`http://${host}:8080/stream?topic=${props.topic}`} />
}
  