import chalk from "chalk";
import fs from 'fs'
import pegaArquivo from "./index.js";

const caminho = process.argv;

function imprimeLista(resultado, identificador = '') {
    console.log(
        chalk.yellow('Lista de links'), 
        chalk.black.bgGreen(identificador),
        resultado);
}

async function processaTexto(arg) {
    const caminho = arg[2]
 
    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if(erro.code === 'ENOENT'){
            console.log('Não existe o arquivo');
            return
        }
    }


    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(arg[2])
        imprimeLista(resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach( async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(lista, nomeDeArquivo)
        })
    }
}

processaTexto(caminho);