// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of temperatures
    updateChart(category);
}

// This function converts strings to numeric temperatures during data preprocessing
function dataPreprocessor(row) {
    if (row.blueWins == 1) {
        return {
            winFirstBlood: row.blueFirstBlood == 1,
            winKills: +row.blueKills,
            winDeaths: +row.blueDeaths,
            winAssists: +row.blueAssists,
            winTotalGold: +row.blueTotalGold,
            winCSPerMin: +row.blueCSPerMin * 10,
            winTowers: +row.blueTowersDestroyed,
            winWards: +row.blueWardsPlaced,
            winGoldDiff: +row.blueGoldDiff,
            winAvgLvl: +row.blueAvgLevel,
            winColor: "blue",
            loseFirstBlood: row.blueFirstBlood == 0,
            loseKills: +row.redKills,
            loseDeaths: +row.redDeaths,
            loseAssists: +row.redAssists,
            loseTotalGold: +row.redTotalGold,
            loseCSPerMin: +row.redCSPerMin * 10,
            loseTowers: +row.redTowersDestroyed,
            loseWards: +row.redWardsPlaced,
            loseGoldDiff: +row.redGoldDiff,
            loseAvgLvl: +row.redAvgLevel,
        };
    }
    else {
        return {
            loseFirstBlood: row.blueFirstBlood == 1,
            loseKills: +row.blueKills,
            loseDeaths: +row.blueDeaths,
            loseAssists: +row.blueAssists,
            loseTotalGold: +row.blueTotalGold,
            loseCSPerMin: +row.blueCSPerMin * 10,
            loseTowers: +row.blueTowersDestroyed,
            loseWards: +row.blueWardsPlaced,
            loseGoldDiff: +row.blueGoldDiff,
            loseAvgLvl: +row.blueAvgLevel,
            winColor: "red",
            winFirstBlood: row.blueFirstBlood == 0,
            winKills: +row.redKills,
            winDeaths: +row.redDeaths,
            winAssists: +row.redAssists,
            winTotalGold: +row.redTotalGold,
            winCSPerMin: +row.redCSPerMin * 10,
            winTowers: +row.redTowersDestroyed,
            winWards: +row.redWardsPlaced,
            winGoldDiff: +row.redGoldDiff,
            winAvgLvl: +row.redAvgLevel,
        };
    }
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 120};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Compute the spacing for bar bands based on the number of countries (20 in this case)
var barBand = chartHeight / 20;
var barHeight = barBand * 0.7;

var allGames;

d3.csv('high_diamond_ranked_10min.csv', dataPreprocessor).then(function(dataset) {

    allGames = dataset
    // **** Your JavaScript code goes here ****
    updateChart();
});

function updateChart() {
    // Update the chart
    console.log(allGames);
}
