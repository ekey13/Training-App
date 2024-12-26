document.getElementById('run-btn').addEventListener('click', function () {
    console.log("Run button clicked");  // Add this log to see if the click event is being fired
    const inputString = document.getElementById('code-editor').value;
    const exercise = document.getElementById('problem-description').dataset.exercise;

    if (!inputString) {
        alert("Please write some code!");
        return;
    }

    fetch('/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            exercise: exercise,
            code: inputString
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('output-box').textContent = data.output || "No output.";
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There was an error running the code.");
        });
});
// Initialize CodeMirror editor
var editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-csrc", // Adjust this to your preferred language, for example "text/x-csrc" for C
    theme: "dracula", // CodeMirror theme
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 4,
    lineWrapping: true
});

// Button click event to handle code submission
document.getElementById('run-btn').addEventListener('click', function () {
    const inputString = editor.getValue(); // Get the code from the editor
    const exercise = document.getElementById('problem-description').dataset.exercise;

    if (!inputString) {
        alert("Please write some code!");
        return;
    }

    fetch('/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            exercise: exercise,
            code: inputString
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('output-box').textContent = data.output || "No output.";
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There was an error running the code.");
        });
});

// Function to load different exercises
function loadExercise(exerciseName) {
    const exercises = {
        powerset: {
            title: "Powerset Problem",
            description: "Write a program that will print all the permutations of a string given as an argument, and the solution must be given in alphabetical order."
        },
        perm: {
            title: "Permutation Generator",
            description: "Generate permutations of a given string."
        },
        tsp: {
            title: "TSP Problem",
            description: "Solve the Travelling Salesman Problem (TSP)."
        },
        nqueens: {
            title: "N-Queens Problem",
            description: "Solve the N-Queens puzzle."
        },
        closed_parenthesis: {
            title: "Closed Parenthesis",
            description: "Write a function that checks if parentheses are properly balanced."
        },
        ft_popen: {
            title: "Ft_popen",
            description: "Implement a custom popen function."
        },
        picoshell: {
            title: "Picoshell",
            description: "Write a basic shell."
        },
        sandbox: {
            title: "Sandbox",
            description: "Test environment for coding exercises."
        },
        vbc: {
            title: "VBC",
            description: "Work on VBC problem."
        },
        still_idk: {
            title: "Still idk",
            description: "Still working on the exercise."
        }
    };

    const exercise = exercises[exerciseName];
    if (exercise) {
        document.getElementById('problem-description').dataset.exercise = exerciseName;
        document.querySelector('.problem h2').textContent = exercise.title;
        document.querySelector('.problem p').textContent = exercise.description;
    }
}
