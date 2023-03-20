import { cloversimUiApi } from '../components/Cloversim'
import '../common'

cloversimUiApi.then((api) => {
  const root = document.querySelector<HTMLDivElement>('#root')
  if (!root) return
  root.style.margin = '10px'

  api.attachDescription(root)
})
