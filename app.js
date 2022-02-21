const fs = require('fs');
const path = require('path');
const filePath = 'jose_ulises_lauro.txt';
const regex = /<(.*)>/gm;

let allProccessEnd_seg = 0;
let allProccessEnd_ms = 0;

//Lectura de todos los archivos html en la carpeta
const files = fs.readdirSync('archivos/Files');
//Txt con los nombres y matriculas del equipo
if (!fs.existsSync(filePath)) {
    fs.writeFileSync('Nombres y matriculas.txt', '\nLauro Daniel Jiménez Custodio-4512077 Ulises Perez Gomez-2888460  Jose Luis Aguilar-2806108\n');
}
// iteracion de los nombres de los archivos
files.forEach(file => {
    const label = '\nTiempo para ' + path.join('archivos/Files', file + ' => ');
    //Entro a la lectura de cada archivo
    fs.readFile(path.join('archivos/Files', file), (error, stream) => {
        if (error) {
            console.error(error)
        } else {
            //Inicia bandera del timer 
            const start = process.hrtime();
            //Se parsea el stream a String para posterior hacer un replace con una expresion regular Regex
            const stringData = stream.toString().replace(regex, ' ');
            //Una vez obtenido el String sin las etiquetas,lo guardamos como un archivo nuevo 
            let splitedString = stringData.split('\n');
            splitedString = stringData.split(' ');
            splitedString.sort();
            splitedString.forEach(stringData => {
                fs.appendFileSync('archivos/Files2/' + file, stringData + '\n ');
            })
            //Finaliza e imprime bandera del timer
            const end = process.hrtime(start);
            const timeMessage = '\n**** ' + label + end[0] + ' seg con ' + end[1] + ' ms \n'
            allProccessEnd_seg += end[0];
            allProccessEnd_ms += end[1] / 10000;
            let RECORD_MESSAGE = '**** Record de tiempo total de ejecucion => ' + allProccessEnd_seg + ' Seg     | - ' + allProccessEnd_ms + ' ms - |\n';
            console.log(RECORD_MESSAGE)
            console.log(timeMessage);
            //Añadismo tiempo al file txt
            fs.appendFileSync('Nombres y matriculas.txt', timeMessage);
            fs.appendFileSync('Nombres y matriculas.txt', RECORD_MESSAGE);
        }
    })
})