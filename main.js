// Convert the rows into data with winning or losing team.
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
            loseFirstBlood: row.redFirstBlood == 1,
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
            winFirstBlood: row.redFirstBlood == 1,
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
var chartHeight = svgHeight - padding.t - padding.b - 50;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

//Create the scales for values
var firstBloodScale = d3.scaleLinear([0, 1], [chartHeight - 30, 30]);
var goldDiffScale = d3.scaleLinear([-10000, 10000], [chartHeight - 30, 30]);
var totalGoldScale = d3.scaleLinear([0, 30000], [chartHeight - 30, 30]);
var killScale = d3.scaleLinear([0, 20], [chartHeight - 30, 30]);
var deathScale = d3.scaleLinear([0, 20], [chartHeight - 30, 30]);
var assistsScale = d3.scaleLinear([0, 40], [chartHeight - 30, 30]);
var csScale = d3.scaleLinear([0, 300], [chartHeight - 30, 30]);
var towerScale = d3.scaleLinear([0, 5], [chartHeight - 30, 30]);
var wardScale = d3.scaleLinear([0, 300], [chartHeight - 30, 30]);
var lvlScale = d3.scaleLinear([1, 18], [chartHeight - 30, 30]);



var allGames;

d3.csv('high_diamond_ranked_10min.csv', dataPreprocessor).then(function(dataset) {
    allGames = dataset;

    updateChart();
});

function toggleButton(button, labelText) {
    button.classList.toggle("active");
    updateChart();
}

function drawAxis(scale, label, currentX, tick2) {
    const axisGroup = chartG.append("g")
         .attr("transform", `translate(${currentX}, 0)`);

    const axis = d3.axisLeft(scale)
    if (tick2) {
        axis.ticks(1);
    }
    else {
        axis.ticks(5);
    }
    axisGroup.call(axis);

    chartG.append("text")
         .attr("x", currentX)
         .attr("y", 15)
         .attr("text-anchor", "middle")
         .style("font-size", "12px")
         .text(label);
    }

function updateChart() {
    // clear the old stuff
    chartG.selectAll("*").remove();

    // chart title
    chartG.append("text")
    .attr("x", 0)
    .attr("y", -30)
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("FF 15?");

    chartG.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .style("font-size", "18px")
    .text("League Of Legends Team Stats at 10 Minutes");

    // chart key
    chartG.append("text")
    .attr("x", 20)
    .attr("y", chartHeight + 20)
    .style("font-size", "12px")
    .text("Red Team Won Game");

    chartG.append("line")
    .attr("x1", 0)
    .attr("x2", 15)
    .attr("y1", chartHeight + 18)
    .attr("y2", chartHeight + 18)
    .style("stroke", "red")
    .style("stroke-width", 2);

    chartG.append("text")
    .attr("x", 20)
    .attr("y", chartHeight + 30)
    .style("font-size", "12px")
    .text("Blue Team Won Game");

     chartG.append("line")
    .attr("x1", 0)
    .attr("x2", 15)
    .attr("y1", chartHeight + 28)
    .attr("y2", chartHeight + 28)
    .style("stroke", "blue")
    .style("stroke-width", 2);

    // Get what variables we are tracking for the checkbox
    var firstBlood = document.getElementById("fbCheck").classList.contains("active") == true;
    var goldDiff = document.getElementById("goldDiffCheck").classList.contains("active") == true;
    var gold = document.getElementById("goldCheck").classList.contains("active") == true;
    var kill = document.getElementById("killCheck").classList.contains("active") == true;
    var death = document.getElementById("deathCheck").classList.contains("active") == true;
    var assist = document.getElementById("assistCheck").classList.contains("active") == true;
    var cs = document.getElementById("csCheck").classList.contains("active") == true;
    var tower = document.getElementById("towerCheck").classList.contains("active") == true;
    var ward = document.getElementById("wardCheck").classList.contains("active") == true;
    var level = document.getElementById("avgLvlCheck").classList.contains("active") == true;
        
    // Compute the spacing for axes based on number of categories selected
    var axisBand = chartWidth / ((+firstBlood + +goldDiff + +gold + +kill + +death + +assist + +cs + +tower + +ward + +level) * 2);
    var numberUsed = 0;

    if (firstBlood) {
       drawAxis(firstBloodScale, "Winner First Blood", axisBand * numberUsed++, true);
       drawAxis(firstBloodScale, "Loser First Blood", axisBand * numberUsed++, true);
    }
    if (goldDiff) {
       drawAxis(goldDiffScale, "Winner Gold Diff", axisBand * numberUsed++, false);
       drawAxis(goldDiffScale, "Loser Gold Diff", axisBand * numberUsed++, false);
    }

    if (gold) {
       drawAxis(totalGoldScale, "Winner Gold", axisBand * numberUsed++, false);
       drawAxis(totalGoldScale, "Loser Gold", axisBand * numberUsed++, false);
    }

    if (kill) {
       drawAxis(killScale, "Winner Kills", axisBand * numberUsed++, false);
       drawAxis(killScale, "Loser Kills", axisBand * numberUsed++, false);
    }

    if (death) {
       drawAxis(deathScale, "Winner Deaths", axisBand * numberUsed++, false);
       drawAxis(deathScale, "Loser Deaths", axisBand * numberUsed++, false);
    }

    if (assist) {
       drawAxis(assistsScale, "Winner Assists", axisBand * numberUsed++, false);
       drawAxis(assistsScale, "Loser Assists", axisBand * numberUsed++, false);
    }

    if (cs) {
       drawAxis(csScale, "Winner CS", axisBand * numberUsed++, false);
       drawAxis(csScale, "Loser CS", axisBand * numberUsed++, false);
    }

    if (tower) {
       drawAxis(towerScale, "Winner Towers", axisBand * numberUsed++, false);
       drawAxis(towerScale, "Loser Towers", axisBand * numberUsed++, false);
    }

    if (ward) {
       drawAxis(wardScale, "Winner Wards", axisBand * numberUsed++, false);
       drawAxis(wardScale, "Loser Wards", axisBand * numberUsed++, false);
    }

    if (level) {
       drawAxis(lvlScale, "Winner Average Level", axisBand * numberUsed++, false);
       drawAxis(lvlScale, "Loser Average Level", axisBand * numberUsed++, false);
    }

    allGames.forEach(element => {
        
        // Make a variable to store how far on the PCP we are
        numberUsed = 0;
        
        // Create a variable for the previous line's position, so we can join to the next variable
        var previousDot = null;
        var newLine = chartG.append("g");
        // Set the style of the line to the color of the winner
        var style = "stroke:" + element.winColor + ";stroke-width:2;stroke-opacity:.08";

        // Use these to start the lines
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