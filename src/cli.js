import chalk from "chalk";
import fs from 'fs'
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

function imprimeLista(valida, resultado, identificador = '') {
    
    if(valida) {
        console.log(
            chalk.yellow('Lista validada'), 
            chalk.black.bgGreen(identificador),
            listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('Lista de links'), 
            chalk.black.bgGreen(identificador),
            resultado);
    }
    
    
    
}

async function processaTexto(arg) {
    const caminho = arg[2];
    const valida = arg[3] === '--valida';

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
        imprimeLista(valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach( async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo)
        })
    }
}

processaTexto(caminho);