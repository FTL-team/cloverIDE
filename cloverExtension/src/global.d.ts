declare function acquireVsCodeApi(): any

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module 'react-promise-suspense' {
  export default function usePromise<T>(
    promise: (...inputs: any) => Promise<T>,
    inputs: any[],
    lifespan?: number
  ): T
}
