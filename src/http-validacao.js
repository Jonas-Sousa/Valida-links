function extraiLinks (arrLinks) {
   return  arrLinks.map((objLink) => Object.values(objLink).join())
}



function listaValidada (listaDeLinks) {
    return extraiLinks(listaDeLinks)
}

export default listaValidada