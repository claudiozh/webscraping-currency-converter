import puppeteer from 'puppeteer';
import readlineSync from 'readline-sync';

const DOWN_APP = 1;

const welcome = () => {
    console.log('\nBem vindo ao conversor de moeda');
}

const robotConverter = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const coins = ['real', 'dolar', 'euro'];
        const optionOne = readlineSync.keyInSelect(coins, 'Qual moeda de origem?', { cancel: false });
        const originCurrency = coins[optionOne];
        const coinsWithoutOrigin = coins.filter((item) => item !== originCurrency);

        const optionTwo = readlineSync.keyInSelect(coinsWithoutOrigin, 'Qual moeda de destino?', { cancel: false });
        const destinationCurrency = coinsWithoutOrigin[optionTwo];

        await page.goto(`https://www.google.com/search?q=${originCurrency}+para+${destinationCurrency}&oq=${originCurrency}+para+&aqs=chrome.1.69i57j0i131i433i512l2j0i512j0i433i512j0i131i433i512j0i512l4.2256j1j9&sourceid=chrome&ie=UTF-8`);

        const convertedValue = await page.evaluate(() => {
            return document.querySelector('.lWzCpb.a61j6').value;
        });

        console.log(`\nO valor de 1 ${originCurrency} em ${destinationCurrency} é: ${convertedValue}`);

        await browser.close();
    } catch (error) {
        console.log('\nErro:', error?.message);
        process.exit(DOWN_APP);
    }
}

welcome();
robotConverter();