// This function converts strings to numeric temperatures during data preprocessing
function dataPreprocessor(row) {
    if (row.blueWins == 1) {
        return {
            winFirstBlood: row.blueFirstBlood == 1,
            winKills: +row.blueKills,
            winDeaths: +row.blueDeaths,
            winAssists: +row.blueAssists,
            winTotalGold: +row.blueTotalGold,
            winCS: +row.blueCSPerMin * 10,
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
            loseCS: +row.redCSPerMin * 10,
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
            loseCS: +row.blueCSPerMin * 10,
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
            winCS: +row.redCSPerMin * 10,
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
    var firstBlood = document.getElementById("fbCheck").checked == true;
    var goldDiff = document.getElementById("goldDiffCheck").checked == true;
    var gold = document.getElementById("goldCheck").checked == true;
    var kill = document.getElementById("killCheck").checked == true;
    var death = document.getElementById("deathCheck").checked == true;
    var assist = document.getElementById("assistCheck").checked == true;
    var cs = document.getElementById("csCheck").checked == true;
    var tower = document.getElementById("towerCheck").checked == true;
    var ward = document.getElementById("wardCheck").checked == true;
    var level = document.getElementById("avgLvlCheck").checked == true;

    allGames.forEach(element => {
        if (firstBlood) {
            console.log("firstBlood: " + element.winFirstBlood + " " + element.loseFirstBlood);
        }
        if (goldDiff) {
            console.log("goldDiff: " + element.winGoldDiff + " " + element.loseGoldDiff);
        }
        if (gold) {
            console.log("totalGold: " + element.winTotalGold + " " + element.loseTotalGold);
        }
        if (kill) {
            console.log("kills: " + element.winKills + " " + element.loseKills);
        }
        if (death) {
            console.log("deaths: " + element.winDeaths + " " + element.loseDeaths);
        }
        if (assist) {
            console.log("assists: " + element.winAssists + " " + element.loseAssists);
        }
        if (cs) {
            console.log("cs: " + element.winCS + " " + element.loseCS);
        }
        if (tower) {
            console.log("towers taken: " + element.winTowers + " " + element.loseTowers);
        }
        if (ward) {
            console.log("wards placed: " + element.winWards + " " + element.loseWards);
        }
        if (level) {
            console.log("average level: " + element.winAvgLvl + " " + element.loseAvgLvl);
        }
    });
}
