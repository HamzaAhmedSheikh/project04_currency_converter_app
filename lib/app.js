#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
let sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(`
              Welcome to the CURRENCY CONVERTER APP \n        
        `);
    await sleep();
    rainbowTitle.stop();
    console.log(gradient.pastel.multiline(figlet.textSync("CURRENCY-CONVERTER-APP")));
    console.log('\n');
    console.log(`
        ${chalk.cyan.bold(`Welcome to our Currency Converter App`)}
        
        `);
}
await welcome();
const exchangeRates = {
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
    ]);
    const fromCurrency = currency_converter.fromCurrency;
    const toCurrency = currency_converter.toCurrency;
    const amount = currency_converter.amount;
    // Convert the amount to PKR
    const pkrAmount = exchangeRates[fromCurrency] * amount;
    // Convert the PKR amount to the desired currency
    const convertedAmount = pkrAmount / exchangeRates[toCurrency];
    console.log(`\n ${chalk.hex("#FF5733").bold(`${amount} ${fromCurrency}`)} is equivalent to ${chalk.green.bold(`${convertedAmount.toFixed(2)} ${toCurrency}`)} \n`);
}
// await currencyConverter()
let isValid = false;
const continueConversion = async () => {
    const continueProcess = await inquirer.prompt({
        name: "continue:",
        type: "confirm",
        message: `${chalk.green.bold("Do you want to convert to another currency?")}`,
    });
    isValid = continueProcess["continue:"];
};
do {
    await currencyConverter();
    await continueConversion();
    console.log(`\n ${chalk.hex("#6495ED").bold("Thank you for using our Currency Converter App")}`);
} while (isValid);
