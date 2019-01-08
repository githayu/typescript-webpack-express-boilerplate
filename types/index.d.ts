declare var PRODUCTION: boolean

declare module '*.scss' {
  const value: { [className: string]: string }
  export default value
}
declare module '*.json' {
  const value: any
  export default value
}
