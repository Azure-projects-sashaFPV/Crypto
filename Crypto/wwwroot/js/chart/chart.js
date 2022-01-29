let myChart = document.getElementById("chart").getContext("2d");

let massPopChart = new Chart(myChart, {
    type: "line",
    backgroundColor: 'rgb(42,48,66)',
    data: {
        labels: ['Boston', 'Work', 'Help', 'Me', 'Pls'],
        datasets: [
            {
                label: 'Currency',
                data: [100, 200, 300, 400, 200],
                borderColor: '#dea74b',
                backgroundColor: 'rgba(94, 105, 44, 0.15)',
                borderWidth: 1,
                fill: true
            }
        ],
    }
});