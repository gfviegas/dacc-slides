const getSupporterImgPath = (fileName) => {
  return require(`@/assets/logos/patrocinadores/${fileName}`)
}

export default [
  { title: 'Código Font', logo: getSupporterImgPath('codigoFont.png') },
  { title: 'DTI Digital', logo: getSupporterImgPath('dti.png') }
]
