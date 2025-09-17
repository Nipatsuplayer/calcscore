function calculateScores() {
    const teamScores = []; 
    const positionsTaken = [];
    const totalPlayerCount = parseInt(document.getElementById("totalPlayerCountInput").value);
    const numberOfTeams = parseInt(document.getElementById("teamCountSelect").value);
    const teamNames = GetTeamNames();
    const settings = GetSettings();

    // Iterate over each team
    for (let i = 1; i <= numberOfTeams; i++) {
        var positionsInput, positions, teamScore;

        if(i < numberOfTeams)
        {
            positionsInput = document.getElementById("team" + i + "PositionsInput").value;
            positions = getPositions(positionsInput);
            teamScore = calculateTeamScore(positions, settings.iccMode);
            positionsTaken.push(...positions);
        }    
        else {
            positions = getMissingNumbers(positionsTaken,totalPlayerCount);
            teamScore = calculateTeamScore(positions, settings.iccMode);
        }
        // Store team score in the array
        teamScores.push({
            positions: positions,
            score: teamScore,
            totalPlayers: positions.length,
            teamName: teamNames[i-1]
        });
    }
    
    if(settings.sortScores)
    {
        teamScores.sort((a, b) => b.score - a.score);
    }

    let resultElement = document.getElementById("result");
    resultElement.innerHTML = "<h3>Results</h3>";

    for (let i = 0; i < teamScores.length; i++) {
        const team = teamScores[i];
        const teamNumber = i + 1;

        let teamResult = document.createElement("p");
        teamResult.classList.add("mb-0");
        teamResult.innerHTML += team.teamName + " score: <span>" + team.score + "</span> (players: " + team.totalPlayers + ")";
        resultElement.appendChild(teamResult);
    }

    resultElement.classList.remove("d-none");
}

function updateTeamInputs() {
    const selectedTeamCount = parseInt(document.getElementById("teamCountSelect").value);

    // Hide all team inputs
    for (let i = 1; i <= 3; i++) {
        document.getElementById("team" + i + "Inputs").style.display = "none";
    }

    // Show inputs for selected number of teams
    for (let i = 1; i < selectedTeamCount; i++) {
        document.getElementById("team" + i + "Inputs").style.display = "block";
    }

    // Update total player count based on selected team count
    let totalPlayerCountInput = document.getElementById("totalPlayerCountInput");
    if (selectedTeamCount === 2) {
        totalPlayerCountInput.value = "50";
    } else if (selectedTeamCount === 3) {
        totalPlayerCountInput.value = "75";
    } else if (selectedTeamCount === 4) {
        totalPlayerCountInput.value = "100";
    }
}


function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculateScores(); 
    }
}

function checkAndSetBoundaries(number, lowerBound, upperBound) {
    if (number < lowerBound) {
        return lowerBound;
    } else if (number > upperBound) {
        return upperBound;
    } else {
        return number;
    }
}

function getPositions(input) {
    if (!input) {
        return [];
    }

    const parts = input.split(',');
    const positions = [];

    for (const rawPart of parts) {
        const part = rawPart.trim();

        if (!part) {
            continue;
        }

        if (part.includes('-')) {
            const [startRaw, endRaw] = part.split('-');
            const start = Number(startRaw.trim());
            const end = Number(endRaw.trim());

            if (Number.isNaN(start) || Number.isNaN(end)) {
                continue;
            }

            const rangeStart = Math.min(start, end);
            const rangeEnd = Math.max(start, end);

            for (let i = rangeStart; i <= rangeEnd; i++) {
                positions.push(i);
            }
        } else {
            const position = Number(part);

            if (Number.isNaN(position)) {
                continue;
            }

            positions.push(position);
        }
    }

    return positions;
}

const scoresList = [
    300, 280, 262, 244, 228, 213, 198, 185, 173, 161, 
    150, 140, 131, 122, 114, 107, 99, 93, 87, 81, 
    75, 70, 66, 61, 57, 54, 50, 47, 44, 41, 
    38, 35, 33, 31, 29, 27, 25, 24, 22, 21, 
    19, 18, 17, 16, 15, 14, 13, 12, 11, 11,
    10, 9, 9, 8, 8, 7, 7, 6, 6, 6,
    5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 
    3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 
    2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

function getExpectedTotalScore(playerCount)
{
    let totalScore = 0;
    for (let i = 1; i <= playerCount; i++) {
        totalScore += scoresList[i - 1];
    }
    console.log(totalScore);
    return totalScore;
}


function calculateTeamScore(positions, iccMode) {
    let totalScore = 0;
    for (const position of positions) {
        totalScore += scoresList[position - 1];
    }
    
    if (iccMode && positions.includes(1)) {
        totalScore += 1;
    }

    return totalScore;
}


function getMissingNumbers(positions, totalPlayerCount) {
    const allPositions = Array.from({ length: totalPlayerCount }, (_, i) => i + 1);
    const missingNumbers = allPositions.filter((pos) => !positions.includes(pos));
    return missingNumbers;
}


function saveSettings() {
    const iccMode = document.getElementById('iccModeCheckbox').checked;
    const sortScores = document.getElementById('sortScoresCheckbox').checked;
    const team1Name = document.getElementById('team1NameInput').value;
    const team2Name = document.getElementById('team2NameInput').value;
    const team3Name = document.getElementById('team3NameInput').value;
    const team4Name = document.getElementById('team4NameInput').value;
  
    const settings = {
      iccMode,
      sortScores,
      teamNames: [team1Name, team2Name, team3Name, team4Name]
    };
    localStorage.setItem('hcr2Settings', JSON.stringify(settings));
    SetTeamNames();
  }

  function getDefaultSettings() {
    const iccMode = true;
    const sortScores = false;
  
    const settings = {
      iccMode,
      sortScores,
      teamNames: ['Team 1', 'Team 2','Team 3','Team 4']
    };
    return settings;
  }

  document.addEventListener('DOMContentLoaded', (event) => {
   InitSettings();
  });

function InitSettings() {
    const settings = GetSettings();
    document.getElementById('iccModeCheckbox').checked = settings.iccMode;
    document.getElementById('sortScoresCheckbox').checked = settings.sortScores;
    settings.teamNames.forEach((teamName, index) => {
       document.getElementById(`team${index + 1}NameInput`).value = teamName || '';
    });
    SetTeamNames();
}

function GetSettings()
{
    const savedSettings = localStorage.getItem('hcr2Settings');
    if (savedSettings) {
        return JSON.parse(savedSettings);
    }
    return getDefaultSettings();
}

function GetTeamNames()
{
    const settings = GetSettings();

    const teamNames = settings.teamNames.map((name, index) => {
    if (!name) { 
        return `Team ${index + 1}`; 
    }
    return name;
    });
    return teamNames;
}

function SetTeamNames(skipLast = true) {
    GetTeamNames().forEach((teamName, index, array) => {
    if (skipLast && index === array.length - 1) {
        return;
    }
    const label = teamName ? `${teamName} positions:` : `Team ${index + 1} positions:`;
    document.getElementById(`team${index + 1}PositionsLabel`).innerText = label;
});
}