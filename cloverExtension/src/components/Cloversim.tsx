const webuiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3008/simvsext.tsx'
    : location.protocol + location.host + '/simvsext.js'

type Dispose = () => void
export interface CloversimUiApi {
  attachControl: (root: Element) => Dispose
  attachDescription: (root: Element) => Dispose
}

export const cloversimUiApi: Promise<CloversimUiApi> = import(
  /* webpackIgnore: true */ webuiUrl
)

// export class CloversimControl extends React.Component {
//   el: Element | undefined
//   dispose: Dispose | undefined

//   componentDidMount() {
//     cloversimUiApi.then((api) => {
//       if (this.el) {
//         this.dispose = api.attachControl(this.el)
//       }
//     })
//   }

//   componentWillUnmount() {
//     if (this.dispose) {
//       this.dispose()
//     }
//     this.el = undefined
//   }

//   render() {
//     return <>
//       <div ref={(el) => (this.el = el as Element)} />

//     </>
//   }
// }
