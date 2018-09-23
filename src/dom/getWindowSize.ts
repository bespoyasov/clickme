const getWindowSize = (): {width: number, height: number} => {
  const height = window.innerHeight
  const width = window.innerWidth
  return {height, width}
}

export default getWindowSize