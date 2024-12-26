const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files (HTML, CSS, JS)

app.post('/compile', (req, res) => {
    const { code, exercise } = req.body;

    if (!code || !exercise) {
        return res.status(400).json({ output: "No code or exercise provided!" });
    }

    // Mapping exercise names to their respective C code files
    const exerciseFiles = {
        'perm': 'perm.c',
        'powerset': 'powerset.c',
        'nqueens': 'nqueens.c',
        // Add more exercises here
    };

    const selectedExerciseFile = exerciseFiles[exercise];
    if (!selectedExerciseFile) {
        return res.status(400).json({ output: "Exercise not found!" });
    }

    // Save the input C code to a temporary file
    const tempFileName = path.join(__dirname, 'temp_code.c');
    const cCode = `#include <stdio.h>
    #include <stdlib.h>
    #include <string.h>

    // Your C code for ${exercise} will go here
    ${code}`;

    fs.writeFileSync(tempFileName, cCode);

    // Compile the C code using gcc
    exec(`gcc ${tempFileName} -o temp_program`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({ output: `Error compiling: ${stderr}` });
        }

        // Run the compiled program
        const executablePath = process.platform === 'win32' ? path.join(__dirname, 'temp_program.exe') : path.join(__dirname, 'temp_program');

        exec(executablePath, (execErr, execStdout, execStderr) => {
            if (execErr) {
                return res.status(500).json({ output: `Runtime error: ${execStderr}` });
            }

            // Send the program output as response
            res.json({ output: execStdout });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
