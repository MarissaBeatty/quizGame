// based on base code from https://www.sitepoint.com/simple-javascript-quiz/
 // with updated js and my own CSS


 var myQuestions = [
    {
        question: "What is a web browser?",
        answers: {
            a: 'A person who spends all day online',
            b: 'A tool that we can use to look at web sites',
            c: 'The Internet connection'
        },
        correct: 'b'
    },
    {
        question: "What does HTML stand for?",
        answers: {
            a: 'Hangry Tigers Make Lunch',
            b: 'Hypertext Markup Language',
            c: 'Heavytext Markup Language'
        },
        correct: 'b'
    }, 
     {
        question: "What does HTML do?",
        answers: {
            a: 'It creates the styles of the website',
            b: 'It helps us to create interactivity on the Internet',
            c: 'It is the building blocks of a website, including all of the site\'s content'
        },
        correct: 'c'
    }, 
     {
        question: "What does CSS stand for?",
        answers: {
            a: 'Cascading Style Sheets',
            b: 'Cavalier Style Setting',
            c: 'Cascading Setting System'
        },
        correct: 'a'
    }, 
     {
        question: "What does CSS do?",
        answers: {
            a: 'It tells the browser how to display the website',
            b: 'It makes interactive and fun websites',
            c: 'It contains all information that the browser needs; it\'s the main information included in the site'
        },
        correct: 'a'
    }, 
     {
        question: "What's the difference between the Internet and the World Wide Web?",
        answers: {
            a: 'There is no difference',
            b: 'The Internet is a network of networks connecting people all over the world, and the World Wide Web is the system we use to access the Internet',
            c: 'The World Wide Web is a network of networks connecting people all over the world, and the Internet is the system we use to access the World Wide Web'
        },
        correct: 'b'
    }, 
     {
        question: "What does JavaScript do?",
        answers: {
            a: 'It makes websites and web applications interactive',
            b: 'It tells the browser your location',
            c: 'It contains all the text and images on the website'
        },
        correct: 'a'
    }

];

var quizContainer = document.getElementById('quiz');
var resultsWrapper = document.getElementById('results-wrapper');
var resultsContainer = document.getElementById('results');
var closeResults = document.getElementById('popupCloseButton');
var submitButton = document.getElementById('submit');

displayQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function displayQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){
                // console.log(questions[i], i, letter, "wtf");

                // ...add an html radio button
                answers.push(
                    // '<label for="'+ letter + ':' +i+'"></label>'
                    '<input type="radio" name="question'+i+'" id="'+ letter + ':' +i+'" value="'+letter+'">'
                    + '</input>'
                    + '<label for="'+ letter + ':' +i+'">'
                    // + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers flex-center">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correct){
                // add to the number of correct answers, add green background
                answerContainers[i].classList.add("correct");
                numCorrect++;
            }
            // if user did not choose an answer
            else if(userAnswer == undefined) {
                answerContainers[i].classList.add("blank");
            }

            // if answer is wrong
            else if(userAnswer!==questions[i].correctA){
                // color the answers red
                answerContainers[i].classList.add("incorrect");
            }
        }

        // display results with message based on how well the user answered
            resultsWrapper.style="display: flex;"
            document.body.classList.add("noScroll");
        if(numCorrect > questions.length/2) {
            resultsContainer.innerHTML = 'You got ' + numCorrect + '/' + questions.length +' correct.<br>Awesome work!';
        } else {
            resultsContainer.innerHTML = 'You got ' + numCorrect + '/' + questions.length +' correct.<br>Keep trying, you\'ll get there!';
        }

        closeResults.onclick = function(){
            resultsWrapper.style="display: none;"
            document.body.classList.remove("noScroll");
    }

    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }
}