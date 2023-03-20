import '../common'

const rootUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:7777/')
    : new URL(location.href.substring(0, location.href.lastIndexOf('/ide/')))

const url = new URL('./gzweb/', rootUrl)

const root = document.querySelector('#root')
if (root) {
  const iframe = document.createElement('iframe')
  iframe.src = url.toString()
  iframe.style.position = 'fixed'
  iframe.style.top = '0'
  iframe.style.left = '0'
  iframe.style.width = '100vw'
  iframe.style.height = '100vh'
  iframe.style.border = 'none'
  root.appendChild(iframe)
}
