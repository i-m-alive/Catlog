const fs = require('fs');

// Function to read and parse JSON data
function readJson(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Function to calculate the constant term using Lagrange interpolation
function calculateConstantTerm(points, k) {
    let c = 0;

    for (let i = 0; i < k; i++) {
        let L = 1;

        for (let j = 0; j < k; j++) {
            if (j !== i) {
                L *= (0 - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }

        c += points[i][1] * L;
    }

    return c;
}

// Main function
function main() {
    const filePaths = ['test_case.json', 'test_case2.json']; // Array of JSON file paths

    for (const filePath of filePaths) {
        console.log(`Processing file: ${filePath}`);

        const jsonData = readJson(filePath);
        const n = jsonData.keys.n;
        const k = jsonData.keys.k;

        // Array to hold (x, y) pairs
        const points = [];

        // Decode values and store (x, y) pairs
        for (let i = 1; i <= n; i++) {
            if (jsonData[i]) {
                const base = jsonData[i].base;
                const value = jsonData[i].value;
                points.push([i, value]); // Store original values as strings
                console.log(`Decoded (x, y) pair: (${i}, ${value})`);
            }
        }

        // Calculate the constant term (using the converted decimal values)
        const constantTerm = calculateConstantTerm(points.map(p => [p[0], parseInt(p[1], parseInt(jsonData[p[0]].base))]), k);
        console.log(`Constant term (c) for ${filePath}: ${constantTerm}\n`);
    }
}

// Run the main function
main();
