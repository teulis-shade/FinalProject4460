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
var firstBloodScale = d3.scaleLinear([0, 1], [30, chartHeight - 30]);
var goldDiffScale = d3.scaleLinear([-10000, 10000], [30, chartHeight - 30]);
var totalGoldScale = d3.scaleLinear([0, 30000], [30, chartHeight - 30]);
var killScale = d3.scaleLinear([0, 20], [30, chartHeight - 30]);
var deathScale = d3.scaleLinear([0, 20], [30, chartHeight - 30]);
var assistsScale = d3.scaleLinear([0, 40], [30, chartHeight - 30]);
var csScale = d3.scaleLinear([0, 300], [30, chartHeight - 30]);
var towerScale = d3.scaleLinear([0, 5], [30, chartHeight - 30]);
var wardScale = d3.scaleLinear([0, 300], [30, chartHeight - 30]);
var lvlScale = d3.scaleLinear([1, 18], [30, chartHeight - 30]);



var allGames;

d3.csv('high_diamond_ranked_10min.csv', dataPreprocessor).then(function(dataset) {
    allGames = dataset;

    updateChart();
});

function updateChart() {
    // clear the old stuff
    chartG.selectAll("*").remove();

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
        var axisBand = chartWidth / ((+firstBlood + +goldDiff + +gold + +kill + +death + +assist + +cs + +tower + +ward + +level) * 2);
        
        // Make a variable to store how far on the PCP we are
        var numberUsed = 0;
        
        // Create a variable for the previous line
        var previousDot = null;
        var newLine = chartG.append("g");
        //use this to set the class of the lines to change the css
        var style = "stroke:" + element.winColor + ";stroke-width:2";
        if (firstBlood) {
            newLine.append("line")
                .attr("y1", firstBloodScale(element.winFirstBlood))
                .attr("y2", firstBloodScale(element.loseFirstBlood))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            previousDot = firstBloodScale(element.loseFirstBlood);
            numberUsed += 2;
        }
        if (goldDiff) {
            newLine.append("line")
                .attr("y1", goldDiffScale(element.winGoldDiff))
                .attr("y2", goldDiffScale(element.loseGoldDiff))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", goldDiffScale(element.winGoldDiff))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = goldDiffScale(element.loseGoldDiff);
            numberUsed += 2;
        }
        if (gold) {
            newLine.append("line")
                .attr("y1", totalGoldScale(element.winTotalGold))
                .attr("y2", totalGoldScale(element.loseTotalGold))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", totalGoldScale(element.winTotalGold))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = totalGoldScale(element.loseTotalGold);
            numberUsed += 2;
        }
        if (kill) {
            newLine.append("line")
                .attr("y1", killScale(element.winKills))
                .attr("y2", killScale(element.loseKills))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", killScale(element.winKills))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = killScale(element.loseKills);
            numberUsed += 2;
        }
        if (death) {
            newLine.append("line")
                .attr("y1", deathScale(element.winDeaths))
                .attr("y2", deathScale(element.loseDeaths))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", deathScale(element.winDeaths))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
        
            previousDot = deathScale(element.loseDeaths);
            numberUsed += 2;
        }
        if (assist) {
            newLine.append("line")
                .attr("y1", assistsScale(element.winAssists))
                .attr("y2", assistsScale(element.loseAssists))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", assistsScale(element.winAssists))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = assistsScale(element.loseAssists);
            numberUsed += 2;
        }
        if (cs) {
            newLine.append("line")
                .attr("y1", csScale(element.winCS))
                .attr("y2", csScale(element.loseCS))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", csScale(element.winCS))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = csScale(element.loseCS);
            numberUsed += 2;
        }
        if (tower) {
            newLine.append("line")
                .attr("y1", towerScale(element.winTowers))
                .attr("y2", towerScale(element.loseTowers))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", towerScale(element.winTowers))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = towerScale(element.loseTowers);
            numberUsed += 2;
        }
        if (ward) {
            newLine.append("line")
                .attr("y1", wardScale(element.winWards))
                .attr("y2", wardScale(element.loseWards))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", wardScale(element.winWards))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = wardScale(element.loseWards);
            numberUsed += 2;
        }
        if (level) {
            newLine.append("line")
                .attr("y1", lvlScale(element.winAvgLvl))
                .attr("y2", lvlScale(element.loseAvgLvl))
                .attr("style", style)
                .attr("x1", axisBand * numberUsed)
                .attr("x2", axisBand * (numberUsed + 1));

            if (previousDot != null) {
                newLine.append("line")
                    .attr("y1", previousDot)
                    .attr("y2", lvlScale(element.winAvgLvl))
                    .attr("style", style)
                    .attr("x1", axisBand * (numberUsed - 1))
                    .attr("x2", axisBand * numberUsed);
            }
            
            previousDot = lvlScale(element.loseAvgLvl);
            numberUsed += 2;
        }
    });
}
