// import { Component } from "react";

declare function acquireVsCodeApi(): any

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  import { FunctionComponent } from "react";
  const component: FunctionComponent;
  export default component
}

declare module 'react-promise-suspense' {
  export default function usePromise<T>(
    promise: (...inputs: any) => Promise<T>,
    inputs: any[],
    lifespan?: number
  ): T
}

