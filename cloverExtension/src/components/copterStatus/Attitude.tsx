import React, { useRef, useMemo, useEffect } from 'react'

function getDraw(canvas: HTMLCanvasElement) {
  const ctxMaybeNull = canvas.getContext('2d')
  if (ctxMaybeNull === null) return () => null
  const ctx = ctxMaybeNull

  function drawBack() {
    ctx.beginPath()
    ctx.arc(100, 100, 100, Math.PI * 0.5, Math.PI * 1.5)
    ctx.arc(300, 100, 100, Math.PI * 1.5, Math.PI * 0.5)
    ctx.lineTo(100, 200)

    ctx.fillStyle = '#222'
    ctx.fill()

    ctx.lineWidth = 2
    ctx.strokeStyle = '#fff'
    ctx.stroke()
  }

  function drawCircle(x: number, color: string) {
    ctx.translate(x, 100)
    ctx.beginPath()
    ctx.arc(0, 0, 90, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#fff'
    ctx.stroke()
    ctx.translate(-x, -100)
  }

  function drawAn(cx: number) {
    ctx.translate(cx, 100)
    ctx.beginPath()
    for (let i = 0; i < 36; i++) {
      let as = Math.sin((i * Math.PI) / 18)
      let ac = Math.cos((i * Math.PI) / 18)

      let l = i % 9 === 0 ? 75 : i % 3 === 0 ? 80 : 85

      ctx.moveTo(90 * as, 90 * ac)
      ctx.lineTo(l * as, l * ac)
    }
    ctx.stroke()
    ctx.translate(-cx, -100)
  }

  function drawArrow(iff: number) {
    ctx.save()
    ctx.translate(297.5, 100)
    ctx.rotate(iff)
    ctx.scale(1.2, 1.2)
    ctx.translate(-36, -36)

    let p

    p = new Path2D('M35.5,11.118 35.5,49.191 10.118,61.882 ')
    ctx.fillStyle = '#C72B27'
    ctx.fill(p)

    p = new Path2D(
      'M37,13.236l23.764,47.528L37,48.882V13.236 M36,9v40.5L63,63L36,9L36,9z '
    )
    ctx.fillStyle = '#7F0036'
    ctx.fill(p)

    p = new Path2D('M36.5,49.191 36.5,11.118 61.882,61.88 ')
    ctx.fillStyle = '#7F0036'
    ctx.fill(p)

    p = new Path2D(
      'M35,13.236v35.646L11.236,60.764L35,13.236 M36,9L9,63 l27-13.5 V9 L36,9 z'
    )
    ctx.fillStyle = '#7F0036'
    ctx.fill(p)

    ctx.restore()
  }

  function drawEarth(gg: number, a: number) {
    ctx.save()
    ctx.translate(102.5, 100)
    ctx.rotate(a)

    ctx.beginPath()
    ctx.arc(0, 0, 89.5, gg - Math.PI, -gg, true)
    ctx.fillStyle = '#689F30'
    ctx.fill()

    ctx.restore()
  }

  function draw(pitch: number, roll: number, yaw: number) {
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect(0, 0, 600, 600)
    ctx.save()
    ctx.scale(320 / 410, 320 / 410);
    ctx.translate(5, 5)

    drawBack()
    drawCircle(102.5, '#3F6EB5')
    drawCircle(297.5, '#222')

    drawAn(297.5)

    drawArrow(yaw)
    drawEarth(roll, pitch)

    ctx.restore()
  }

  return draw
}

export function Attitude({
  yaw,
  pitch,
  roll
}: {
  yaw: number
  pitch: number
  roll: number
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const draw = useMemo(
    () => (canvas.current !== null ? getDraw(canvas.current) : null),
    [canvas.current]
  )

  useEffect(() => {
    if (draw !== null) draw(roll, pitch, yaw)
  }, [yaw, pitch, roll])

  return <canvas width="320" height="168" ref={canvas} />
}
