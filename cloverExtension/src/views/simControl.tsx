import { cloversimUiApi } from '../components/Cloversim'
import '../common'

cloversimUiApi.then((api) => {
  const root = document.querySelector('#root')
  if (!root) return

  api.attachControl(root)
})
