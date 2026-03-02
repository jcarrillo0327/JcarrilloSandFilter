let pressureData = [];
let cakeData = [];

let pressureCtx = document.getElementById("pressureChart").getContext("2d");
let cakeCtx = document.getElementById("cakeChart").getContext("2d");

let pressureChart = new Chart(pressureCtx, {
    type: "line",
    data: { labels: [], datasets: [{ label: "Pressure Drop (psi)", data: [] }] }
});

let cakeChart = new Chart(cakeCtx, {
    type: "line",
    data: { labels: [], datasets: [{ label: "Cake Thickness (inches)", data: [] }] }
});

function updateCharts(data) {
    pressureChart.data.labels.push("");
    pressureChart.data.datasets[0].data.push(data.pressure);

    cakeChart.data.labels.push("");
    cakeChart.data.datasets[0].data.push(data.cake);

    pressureChart.update();
    cakeChart.update();
}
