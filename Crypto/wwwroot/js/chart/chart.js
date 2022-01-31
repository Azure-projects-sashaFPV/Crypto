let myChart = document.getElementById("chart").getContext("2d");


let massPopChart = new Chart(myChart, {
    type: "line",
    backgroundColor: 'rgb(42,48,66)',
    data: {
        labels: ['Site', 'Was', 'Made', 'By', 'Vika', 'Sasha', 'Vlad'],
        datasets: [
            {
                label: 'Currency',
                data: [100, 200, 300, 400, 200, 600, 150],
                borderColor: '#dea74b',
                backgroundColor: 'rgba(94, 105, 44, 0.15)',
                borderWidth: 1,
                fill: true
            }
        ],
    }
});

//document.querySelectorAll('.current_price');
const getCurrentPrices = (symbol) => {
    var burl = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=2`;
    var url = burl;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url, true);
    let response = '';
    let count = 0;


    ourRequest.onload = function () {
        response = JSON.parse(ourRequest.responseText);
        let prices = [];


        for (let item of response) {
            prices[count++] = item[4];
        }
        let res = prices[1] - prices[0];
        let price = prices[1];
        if (res >= 0) {
            document.getElementById(`${symbol}`).className = "price increase my-invisible";
            document.getElementById(`${symbol}`).childNodes[1].textContent = Number(price).toFixed(2) + " $";
        }
        else {
            document.getElementById(`${symbol}`).className = "price decrease my-invisible";
            document.getElementById(`${symbol}`).childNodes[1].textContent = Number(price).toFixed(2) + " $";
        }
    }
    ourRequest.send();
}


const getChart = (symbol, name) => {
    var burl = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1w&limit=40`;
    let mass = [];
    var url = burl;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url, true);
    let response = '';
    let count = 0;


    ourRequest.onload = function () {
        response = JSON.parse(ourRequest.responseText);
        let dates = []; 
        let prices = []; 


        for (let item of response) {
            let date = new Date(item[0]);
            let resultDate = formatDate(date);
            mass[count++] = new Currency(resultDate, item[4]);
        }

        let i = 0;
        for (let item of mass) {
            dates[i] = item.date;
            prices[i] = item.price;
            i++;
        }
        //console.log(dates);
        //console.log(`Name : ${name}`);
        //console.log(`Response : ${response}`);
        // -------------------------------------------------------------
        massPopChart.destroy(); // !!!
        massPopChart = new Chart(myChart, {
            type: "line",
            backgroundColor: 'rgb(42,48,66)',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: name,
                        data: prices,
                        borderColor: '#dea74b',
                        backgroundColor: 'rgba(94, 105, 44, 0.15)',
                        borderWidth: 1,
                        fill: true
                    }
                ],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                var label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    ourRequest.send();
}
class Currency {
    date;
    price;
    constructor(date, price) {
        this.date = date;
        this.price = price;
    }
}

$('.crypto-item').click((event) => {
    let abbreviation = event.target.firstElementChild.lastElementChild.lastElementChild.outerText;
    let crypto_name = event.target.firstElementChild.lastElementChild.textContent;
    getChart(abbreviation, crypto_name);
    getCurrentPrices(abbreviation);
});
const formatDate = (date) => {
    let dateOfyear = date.getFullYear() + ""; // год;
    let newDateOfyear = dateOfyear.slice(2); // год последние две цифры;

    let day = date.getDate(); // текущий день
    day = day < 10 ? "0" + day : day;
    let month = date.getMonth() + 1; //текущий мес€цж
    month = month < 10 ? "0" + month : month;

    return +day + "." + month + "." + newDateOfyear;
}