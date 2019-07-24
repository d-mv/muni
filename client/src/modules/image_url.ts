const imageUrl = (url: string) => {
  const width = window.outerWidth
  const settings = `/upload/c_thumb,w_${width}/`
  const split = url.split('/upload/')

  return `${split[0]}${settings}${split[1]}`
}

export default imageUrl