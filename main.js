// This function converts strings to numeric temperatures during data preprocessing
function dataPreprocessor(row) {

    //if the blue team won, use blue team as winning team, otherwise use red.
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

//Create the scales for values
var firstBloodScale = d3.scaleLinear([30, chartHeight - 30], [0, 1]);
var goldDiffScale = d3.scaleLinear([30, chartHeight - 30], [-20000, 20000]);
var totalGoldScale = d3.scaleLinear([30, chartHeight - 30], [0, 20000]);
var killScale = d3.scaleLinear([30, chartHeight - 30], [0, 20]);
var deathScale = d3.scaleLinear([30, chartHeight - 30], [0, 20]);
var assistsScale = d3.scaleLinear([30, chartHeight - 30], [0, 40]);
var csScale = d3.scaleLinear([30, chartHeight - 30], [0, 300]);
var towerScale = d3.scaleLinear([30, chartHeight - 30], [0, 5]);
var wardScale = d3.scaleLinear([30, chartHeight - 30], [0, 50]);
var lvlScale = d3.scaleLinear([30, chartHeight - 30], [1, 18]);



var allGames;

d3.csv('high_diamond_ranked_10min.csv', dataPreprocessor).then(function(dataset) {
    allGames = dataset;

    updateChart();
});

function updateChart() {
    // clear the old stuff


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
        
        // Compute the spacing for axes based on number of categories selected
        var axisBand = chartHeight / (+firstBlood + +goldDiff + +gold + +kill + +death + +assist + +cs + +tower + +ward + +level);
        
        // Make a variable to store how far on the PCP we are
        var numberUsed = 0;
        
        // Create a variable for the previous line
        var previousDot = null;

        //use this to set the class of the lines to change the css
        var className = ".redWins";
        if (winColor == "blue") {
            className = ".blueWins";
        }
        if (firstBlood) {
            console.log("firstBlood: " + element.winFirstBlood + " " + element.loseFirstBlood);
        }
        if (goldDiff) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("goldDiff: " + element.winGoldDiff + " " + element.loseGoldDiff);
        }
        if (gold) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("totalGold: " + element.winTotalGold + " " + element.loseTotalGold);
        }
        if (kill) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("kills: " + element.winKills + " " + element.loseKills);
        }
        if (death) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("deaths: " + element.winDeaths + " " + element.loseDeaths);
        }
        if (assist) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("assists: " + element.winAssists + " " + element.loseAssists);
        }
        if (cs) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("cs: " + element.winCS + " " + element.loseCS);
        }
        if (tower) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("towers taken: " + element.winTowers + " " + element.loseTowers);
        }
        if (ward) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("wards placed: " + element.winWards + " " + element.loseWards);
        }
        if (level) {
            if (previousDot == null) {
                previousDot;
            }
            console.log("average level: " + element.winAvgLvl + " " + element.loseAvgLvl);
        }
    });
}
