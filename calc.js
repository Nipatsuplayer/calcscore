function calculateScores(totalPlayerCount) {
    const input = document.getElementById("positionsInput").value;
    
    if(isNaN(totalPlayerCount))
    {
        totalPlayerCount = document.getElementById("totalInput").value;
    }
    
    const ourPositions = getPositions(input);
    const opponentPositions = getMissingNumbers(ourPositions, checkAndSetBoundaries(totalPlayerCount, 1, 100));
    const ourScore = calculateTeamScore(ourPositions);
    const opponentScore = calculateTeamScore(opponentPositions);
    const totalScore = ourScore + opponentScore;

    let resultElement = document.getElementById("result");
    let ourScoreElement = document.getElementById("ourScore");
    let opponentScoreElement = document.getElementById("opponentScore");

    ourScoreElement.textContent = ourScore + ' (players: ' + ourPositions.length + ')';
    opponentScoreElement.textContent = opponentScore  + ' (players: ' + opponentPositions.length + ')';

    // Only show results if the sum is correct
    if (totalScore == getExpectedTotalScore(totalPlayerCount)) {
         resultElement.classList.remove("d-none");
    }
    else if (!resultElement.classList.contains('d-none')) 
    {
        resultElement.classList.add('d-none');
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
    const parts = input.split(',');
    const positions = [];
    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) {
                positions.push(i);
            }
        } else {
            positions.push(Number(part));
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

function calculateTeamScore(positions) {
    let totalScore = 0;
    for (const position of positions) {
        totalScore += scoresList[position - 1];
    }
    return totalScore;
}

function getMissingNumbers(positions, totalPlayerCount) {
    const allPositions = Array.from({ length: totalPlayerCount }, (_, i) => i + 1);
    const missingNumbers = allPositions.filter((pos) => !positions.includes(pos));
    return missingNumbers;
}