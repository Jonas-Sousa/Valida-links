import chalk from "chalk";
import fs from 'fs'
import pegaArquivo from "./index.js";

const caminho = process.argv;

function imprimeLista(resultado) {
    console.log(chalk.yellow('Lista de links'), resultado);
}


async function processaTexto(arg) {
    const caminho = arg[2]

    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(arg[2])
        imprimeLista(resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach( async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(lista)
        })
    }
}

processaTexto(caminho);