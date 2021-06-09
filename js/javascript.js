(function () {
    let userScore = 0;
    let compScore = 0;
    let userScoreDiv;
    let compScoreDiv;
    let messageDiv;
    let currentTargetGlobal;

    window.addEventListener('load', function () {
        init();
    });

    function init() {
        const selectionsDiv = document.querySelectorAll('.item');
        userScoreDiv = document.getElementById('player-score');
        compScoreDiv = document.getElementById('comp-score');
        messageDiv = document.getElementById('message');

        for (let selected of selectionsDiv) {
            selected.addEventListener('click', function (event) {
                const target = event.target;
                let userChoice;
                
                if (target.dataset.value) {
                    userChoice = target.dataset.value;
                    currentTargetGlobal = target;
                } else {
                    userChoice = target.closest('.item').dataset.value;
                    currentTargetGlobal = target.closest('.item');
                }
                game(userChoice)
            });
        }
    }

    function getCompChoice() {
        const choices = ['p', 'r', 's'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function game(userChoice) {
        const compChoice = getCompChoice();

        switch (userChoice + compChoice) {
            case 'pp':
            case 'ss':
            case 'rr':
                draw(userChoice, compChoice, currentTargetGlobal);
                break;
            case 'pr':
            case 'sp':
            case 'rs':
                win(userChoice, compChoice, currentTargetGlobal);
                break;
            case 'rp':
            case 'ps':
            case 'sr':
                lose(userChoice, compChoice, currentTargetGlobal);
                break;
        }
    }

    function win(userChoice, compChoice, currentTarget) {
        userScore++;
        userScoreDiv.innerText = userScore;
        messageDiv.innerText = `User je odabrao ${convertLetter(userChoice)}, Comp je odabrao ${convertLetter(compChoice)}. You WON!`
        currentTarget.style.border = '3px solid #20fa00';
        setTimeout(() => {
            currentTarget.style.border = '3px solid #808080';
        }, 1000);
    }

    function lose(userChoice, compChoice, currentTarget) {
        compScore++;
        compScoreDiv.innerText = compScore;
        messageDiv.innerText = `User je odabrao ${convertLetter(userChoice)}, Comp je odabrao ${convertLetter(compChoice)}. You LOSE!`
        currentTarget.style.border = '3px solid #ff1234';
        setTimeout(() => {
            currentTarget.style.border = '3px solid #808080';
        }, 1000);
    }

    function draw(userChoice, compChoice) {
        // nereseno
        messageDiv.innerText = `User je odabrao ${convertLetter(userChoice)}, Comp je odabrao ${convertLetter(compChoice)}. It's DRAW!`
    }

    function convertLetter(letter) {
        switch (letter) {
            case 'p':
                return 'Paper';
            case 'r':
                return 'Rock';
            case 's':
                return 'Scissors';
        }
    }

})();