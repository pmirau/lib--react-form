// https://stackoverflow.com/a/41946697/17311540
declare module '*.scss' {
  const classes: { [key: string]: string};
  export default classes;
}
