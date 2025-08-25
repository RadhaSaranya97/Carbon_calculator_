const suggestions = [
    "Unplug electronics when not in use to avoid 'vampire' energy drain.",
    "Opt for public transport, cycling, or walking more often.",
    "Reduce, Reuse, Recycle! Minimize your waste generation.",
    "Take shorter showers and fix leaky faucets to save water and energy.",
    "Choose energy-efficient appliances when replacing old ones.",
    "Eat more plant-based meals – food choices significantly impact your footprint.",
    "Adjust your thermostat: a few degrees lower in winter, higher in summer saves energy.",
    "Line dry your clothes instead of using a dryer.",
    "Buy local and seasonal produce to reduce transportation emissions.",
    "Compost organic waste to reduce landfill methane emissions.",
    "Consider carpooling or ride-sharing for daily commutes.",
    "Maintain your vehicle regularly for better fuel efficiency."
];

window.onload = () => {
    displayRandomSuggestion();
};

function displayRandomSuggestion() {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    document.getElementById('randomSuggestion').getElementsByTagName('p')[0].innerText = "💡 Tip: " + suggestions[randomIndex];
}

function calculateHouseholdEmissions() {
    const ele = parseFloat(document.getElementById('electricity').value) || 0;
    const lpg = parseFloat(document.getElementById('lpg').value) || 0;
    const waste = parseFloat(document.getElementById('waste').value) || 0;
    const water = parseFloat(document.getElementById('water').value) || 0;
    const distance = parseFloat(document.getElementById('distance').value) || 0;
    const vehicleFactor = parseFloat(document.getElementById('vehicle').value) || 0;

    const eleFactor = 0.82;
    const lpgFactor = 2.98;
    const wasteFactor = 0.57;
    const waterFactor = 0.001;

    const eleCO2 = ele * eleFactor;
    const lpgCO2 = lpg * lpgFactor;
    const wasteCO2 = waste * wasteFactor;
    const waterCO2 = water * waterFactor;
    const vehicleCO2 = distance * vehicleFactor;

    const totalCO2 = eleCO2 + lpgCO2 + wasteCO2 + waterCO2 + vehicleCO2;

    document.getElementById('eleCO2').innerText = eleCO2.toFixed(2);
    document.getElementById('lpgCO2').innerText = lpgCO2.toFixed(2);
    document.getElementById('wasteCO2').innerText = wasteCO2.toFixed(2);
    document.getElementById('waterCO2').innerText = waterCO2.toFixed(2);
    document.getElementById('vehicleCO2').innerText = vehicleCO2.toFixed(2);
    document.getElementById('totalCO2').innerText = totalCO2.toFixed(2);
    document.getElementById('resultBox').style.display = 'block';

    updateChart(eleCO2, lpgCO2, wasteCO2, waterCO2, vehicleCO2);
}

let emissionChart;

function updateChart(eleCO2, lpgCO2, wasteCO2, waterCO2, vehicleCO2) {
    const ctx = document.getElementById('emissionChart').getContext('2d');
    if (emissionChart) {
        emissionChart.destroy();
    }

    emissionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Electricity', 'LPG', 'Waste', 'Water', 'Vehicle'],
            datasets: [{
                label: 'CO2 Emissions (kg)',
                data: [eleCO2, lpgCO2, wasteCO2, waterCO2, vehicleCO2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sources of Emissions'
                    },
                    ticks: {
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 14
                        }
                    },
                    title: {
                        display: true,
                        text: 'CO2 Emissions (kg)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    formatter: value => value.toFixed(2) + ' kg',
                    color: '#333',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}