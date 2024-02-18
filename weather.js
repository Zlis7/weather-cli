#!/usr/bin/env node

import { getArgs } from "./healpers/args.js"
import { getWeather, getIcon } from "./services/apiService.js";
import { printHelp, printError, printSuccess, printWeather } from "./services/logServices.js";
import { saveKeyValue } from "./services/storageServices.js";


const saveToken = async (token) => {
    if(!token.length){
        printError('Не передан token');
        return;
    }
    try{
        await saveKeyValue('token', token);
        printSuccess('Токен сохранен');

    }catch(error){
        printError(error);
    }
}

const saveCity = async (city) => {
    if(!city.length){
        printError('Не передан city');
        return;
    }
    try{
        await saveKeyValue('city', city);
        printSuccess('Город сохранен');

    }catch(error){
        printError(error);
    }
}

const getForcast = async() =>{
    try{
        const weather = await getWeather();

        printWeather(weather, getIcon(weather.weather[0].icon))

    }catch(error){
        if(error?.response?.status == 404){
            printError('Неверно указан город');

        }else if(error?.response?.status == 401){
            printError('Неверно указан токен')

        }else{
            printError(error.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);

    if(args.h){
        return printHelp(); 
    }
    if (args.s){
        return saveCity(args.s);
    }
    if(args.t){
        return saveToken(args.t);
    }

    return getForcast();
}

initCLI();