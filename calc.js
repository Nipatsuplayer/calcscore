function calculateScores() {
    const input = document.getElementById("positionsInput").value;
    const ourPositions = getPositions(input);
    const opponentPositions = getMissingNumbers(ourPositions);
    const ourScore = calculateTeamScore(ourPositions);
    const opponentScore = calculateTeamScore(opponentPositions);

    // Check if the total score is 4364
    const totalScore = ourScore + opponentScore;
    let resultElement = document.getElementById("result");
    let ourScoreElement = document.getElementById("ourScore");
    let opponentScoreElement = document.getElementById("opponentScore");

    ourScoreElement.textContent = ourScore;
    opponentScoreElement.textContent = opponentScore;

    if (totalScore == 4364) {
        resultElement.classList.remove("d-none");
    }
}

function getPositions(input) {
    // JavaScript implementation of your GetPositions function
    // Parse the input string and return an array of positions
    // ...

    // Example implementation (you may need to adapt it):
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

function calculateTeamScore(positions) {
    // JavaScript implementation of your CalculateTeamScore function
    // Calculate the team score based on positions and predefined scores
    // ...

    // Example implementation (you may need to adapt it):
    const scoresList = [
        300, 280, 262, 244, 228, 213, 198, 185, 173, 161, 
        150, 140, 131, 122, 114, 107, 99, 93, 87, 81, 
        75, 70, 66, 61, 57, 54, 50, 47, 44, 41, 
        38, 35, 33, 31, 29, 27, 25, 24, 22, 21, 
        19, 18, 17, 16, 15, 14, 13, 12, 11, 11
    ];

    let totalScore = 0;
    for (const position of positions) {
        totalScore += scoresList[position - 1];
    }
    return totalScore;
}

function getMissingNumbers(positions) {
    // JavaScript implementation of your GetMissingNumbers function
    // Calculate missing positions
    // ...

    // Example implementation (you may need to adapt it):
    const allPositions = Array.from({ length: 50 }, (_, i) => i + 1);
    const missingNumbers = allPositions.filter((pos) => !positions.includes(pos));
    return missingNumbers;
}