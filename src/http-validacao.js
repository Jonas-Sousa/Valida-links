function extraiLinks (arrLinks) {
   return  arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checaStatus (listURLs) {
    const arrStatus = await Promise
    .all(
        listURLs.map(async (url) => {
            const response = await fetch(url)
            return response.status;
        })
    )
    return arrStatus
}


async function listaValidada (listaDeLinks) {
   const links = extraiLinks(listaDeLinks)
   const status = await checaStatus(links)
   return status
}

export default listaValidada