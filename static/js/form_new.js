document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 0;
    const totalQuestions = 60;
    const questions = document.querySelectorAll('.question');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const fillBtn = document.getElementById('fillIt');
    const myForm = document.getElementById("survey-form")

    const handleSubmit = () => {
        console.log("Submitted");
    }

    submitButton.addEventListener('click', handleSubmit);

    document.addEventListener("keydown", (event) => {
        let buttons = questions[currentQuestion].querySelectorAll('input[type="radio"]');
        if (event.key=="Enter" && currentQuestion == totalQuestions-1) {
            if (validateCurrentQuestion()) {
                fillBtn.textContent = "";
                myForm.submit();
                return;
            } else {
                fillBtn.textContent = "Please select an option before proceeding !!";
                return;
            }
        }
        let key = Number(event.key)-1;
        if (key < buttons.length) {
            fillBtn.textContent = "";
            buttons[key].checked = true;
        } else{
           fillBtn.textContent = "Please Select within the Range";
        }
    })

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });
    }

    function updateButtons() {
        prevButton.style.display = currentQuestion > 0 ? 'block' : 'none';
        nextButton.style.display = currentQuestion < totalQuestions - 1 ? 'block' : 'none';
        submitButton.style.display = currentQuestion === totalQuestions - 1 ? 'block' : 'none';
    }

    function validateCurrentQuestion() {
        const currentQuestionElement = questions[currentQuestion];
        const options = currentQuestionElement.querySelectorAll('input[type="radio"]');
        return Array.from(options).some(option => option.checked);
    }

    const handlePrev = () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateButtons();
        }
    }

    const handleNext = () => {
        if (validateCurrentQuestion()) {
            fillBtn.textContent = "";
            if (currentQuestion < totalQuestions - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateButtons();
            }
        } else {
            fillBtn.textContent = "Please select an option before proceeding !!";
        }
    }

    nextButton.addEventListener('click', handleNext);

    prevButton.addEventListener('click', handlePrev);

    document.addEventListener('keydown', function(event) {

        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            if (submitButton.style.display === 'block') {
                handleSubmit();
            } else {
                handleNext();
            }
        } else if (event.key === 'Backspace' || event.keyCode === 8) {
            event.preventDefault();
            handlePrev();
        }
    });

    showQuestion(currentQuestion);
    updateButtons();
});

console.log(document.getElementById("google_translate_element"));
