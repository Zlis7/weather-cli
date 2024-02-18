import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error)=>{
    console.log(chalk.bgRed(' ERROR ') + " " + error);
};

const printSuccess = (message)=>{
    console.log(chalk.bgGreen(' SUCCESS ') + " " + message);
};

const printHelp = () =>{
    console.log(dedent(`

    ${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    
    `));
};

const printWeather = (data,icon) =>{
    console.log(dedent(`

    ${chalk.bgYellow(' WEATHER ')} Погода в городе ${data.name}
    ${icon}  ${(data.weather[0].description)[0].toUpperCase() + (data.weather[0].description).slice(1)}
    Температура: ${data.main.temp} (ощущается как ${data.main.feels_like})
    Влажность: ${data.main.humidity}%
    Скорость ветра: ${data.wind.speed}м/с
    
    `));
};

export { printError, printSuccess, printHelp, printWeather};


