#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";

const exchangeRates: { [x: string]: any } = {
    PKR: 1,
    USD: 234.25,
    EUR: 267.00,
    GBP: 273.88,
    SAR: 66.7,
    AED: 69,
    INR: 2.76,
    CAD: 172,
    BHD: 604,
    KWD: 739.70,
    CNY: 32.41,
    AUD: 162,
    NZD: 144
};


async function currencyConverter() {
   let currency_converter = await inquirer.prompt([
       {
         type: 'list',
         name: 'fromCurrency',
         message: `${chalk.hex("#00A36C").bold("Choose the currency you want to convert FROM:")}`,
         choices: ['PKR', 'USD', 'EUR', 'GBP', 'SAR', 'AED', 'INR', 'CAD', 'BHD', 'KWD', 'CNY', 'AUD', 'NZD'],         
       },
       {
         type: 'list',
         name: 'toCurrency',
         message: `${chalk.hex("#008080").bold("Choose the currency you want to convert TO:")}`,
         choices: ['PKR', 'USD', 'EUR', 'GBP', 'SAR', 'AED', 'INR', 'CAD', 'BHD', 'KWD', 'CNY', 'AUD', 'NZD']
       },
       {
         type: 'input',
         name: 'amount',
         message: 'Enter the amount you want to convert:',
         validate: (answer) => {
            if (isNaN(answer)) {
                return "Please enter a valid number";
            }
            return true;
        },
       }
     ])


     const fromCurrency = currency_converter.fromCurrency;
     const toCurrency = currency_converter.toCurrency;
     const amount = currency_converter.amount;
   
     // Convert the amount to PKR
     const pkrAmount = exchangeRates[fromCurrency] * amount;
   
     // Convert the PKR amount to the desired currency
     const convertedAmount = pkrAmount / exchangeRates[toCurrency];
   
     console.log(`\n ${chalk.hex("#FF5733").bold(`${amount} ${fromCurrency}`)} is equivalent to ${chalk.green.bold(`${convertedAmount.toFixed(2)} ${toCurrency}`)}`);

   
}

await currencyConverter()