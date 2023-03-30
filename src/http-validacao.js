import chalk from "chalk";

function extraiLinks (arrLinks) {
   return  arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checaStatus (listURLs) {
    const arrStatus = await Promise
    .all(
        listURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status;    
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )
    return arrStatus
}

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

async function listaValidada (listaDeLinks) {
   const links = extraiLinks(listaDeLinks)
   const status = await checaStatus(links)



   return listaDeLinks.map((obj, indice) => ({
        ...obj,
        status: status[indice]
   }))
}

export default listaValidada