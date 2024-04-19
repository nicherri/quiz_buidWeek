// -------------------------------------------------------- Prima pagina

var btnProceed = document.getElementById("btn"); // Selezione difficoltà domande
if (btnProceed) {
  btnProceed.addEventListener("click", function () {
    let isValid = false;
    while (!isValid) {
      let diff = prompt("Type Difficulty: (easy, middle, hard)"); // Utilizzo di prompt per mostrare come Pop-Up il messaggio sulla difficoltà
      if (diff === "easy" || diff === "middle" || diff === "hard") {
        localStorage.setItem("diff", diff); //****** / Utilizzo di localStorage per salvare la variabile e riusarla in un secondo momento
        isValid = true;
      } else {
        window.alert("Invalid! Choose easy, middle or hard");
      }
    }

    isValid = false; // Resetta isValid per il nuovo controllo
    while (!isValid) {
      let numQuest = prompt("How many questions do you want? (5-20)"); // Prompt per mostrare a video quante domande si vogliono selezionare
      if (
        !isNaN(numQuest) &&
        parseInt(numQuest) >= 5 &&
        parseInt(numQuest) <= 20
      ) {
        localStorage.setItem("numQuest", numQuest);
        isValid = true;
      } else {
        window.alert("Invalid! Please enter a number between 5 - 20."); // Range domande (5 - 20)
      }
    }
  });
}

///-------------------------------------------------------- Seconda pagina

const FULL_DASH_ARRAY = 283; // Lunghezza del percorso del cerchio completo (283 si riferisce alla lunghezza del percorso in pixel )
const WARNING_THRESHOLD = 10; // Costante, utilizzata dopo per cambiare colore a 10 secondi
const ALERT_THRESHOLD = 5; // Costante, utilizzata dopo per cambiare colore a 5 secondi

const COLOR_CODES = {
  // classi colorazione barra timer
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

//Attributi del timer (posizione, scorrimento della barra ecc..)

document.getElementById("timer").innerHTML = `
 <div class="base-timer">
   <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <g class="base-timer__circle">
       <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
       <path
         id="base-timer-path-remaining"
         stroke-dasharray="283"
         class="base-timer__path-remaining ${remainingPathColor}"
         d="
           M 50, 50
           m -45, 0
           a 45,45 0 1,0 90,0  
           a 45,45 0 1,0 -90,0
         "
       ></path>
     </g>
   </svg>
   <span id="base-timer-label" class="base-timer__label">${formatTime(
     timeLeft
   )}</span>
 </div>
 `;

startTimer(); // Chiamata funzione startTimer()

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  // Definizione funzione startTimer()
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      // Quando il tempo scade, il timer viene resettato e mostra la domanda successiva
      onTimesUp();
      showNextdomanda();
    }
  }, 1000);
}

function formatTime(time) {
  // Funzione per mostrare il timer in secondi
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  // Funzione che cambia il colore ogni qual volta il timer raggiunge i 10 e 5 secondi
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  } else {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(info.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  // Funzione che permette di colorare il percorso del timer
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function restartTimer() {
  // Funzione per far ripartire il Timer
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  clearInterval(timerInterval);
  startTimer(); // Riavvia il timer
}

/***************************** inizio js quiz II  pagina ******************************/

const domandas = [
  // Array domande facili
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    domanda: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    domanda:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    domanda: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    domanda:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    domanda:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    domanda: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    domanda:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    domanda: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    domanda: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    domanda:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
  {
    category: "Computer Science",
    type: "multiple",
    difficulty: "easy",
    domanda: "What is a computer?",
    correct_answer: " An electronic device",
    incorrect_answers: ["A vehicle", "An animal", "A tree"],
  },
  {
    category: "Computer Science",
    type: "multiple",
    difficulty: "easy",
    domanda: "Which of these is a computer brand?",
    correct_answer: "Dell",
    incorrect_answers: ["Ferrari", "Samsung", "Nike"],
  },
  {
    category: "Computer Science",
    type: "multiple",
    difficulty: "easy",
    domanda: "Which of these is not an operating system?",
    correct_answer: "Linux",
    incorrect_answers: ["Android", "iOS", "Windows"],
  },
  {
    category: "Computer Science",
    type: "multiple",
    difficulty: "easy",
    domanda: "Which of these is not a file type?",
    correct_answer: ".computer",
    incorrect_answers: [".doc", ".jpg", ".mp3"],
  },
  {
    category: "Computer Science",
    type: "multiple",
    difficulty: "easy",
    domanda: "What does the term 'Network' represent in computing?",
    correct_answer: "D) A collection of interconnected nodes",
    incorrect_answers: ["A sweater", "A column", "A fishing spot"],
  },
  {
    category: "Computer Science",
    type: "multiple",
    difficulty: "easy",
    domanda: "Which of these is a programming language?",
    correct_answer: "Python",
    incorrect_answers: ["English", "Italian", "Spanish"],
  },
  {
    category: "Computer Science",
    type: "boolean",
    difficulty: "easy",
    domanda: "Programming is a fundamental component of computer science",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Computer Science",
    type: "boolean",
    difficulty: "easy",
    domanda: "The mouse is a common input device associated with a computer",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Computer Science",
    type: "boolean",
    difficulty: "easy",
    domanda:
      "Computers solve mathematical problems much more efficiently than humans",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Computer Science",
    type: "boolean",
    difficulty: "easy",
    domanda: "HTML is a programming language used to create web pages",
    correct_answer: "false",
    incorrect_answers: ["true"],
  },
];

const questionsMiddle = [
  // Array domande difficoltà media
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda: "What is the purpose of HTML in web development?",
    correct_answer: "Structure the content of a website",
    incorrect_answers: [
      "Add interactivity and dynamic elements to a website",
      "Define the style and layout of a website",
      "Make a website interactive",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "middle",
    domanda: "Which of the following is NOT a valid data type in JavaScript?",
    correct_answer: "Array",
    incorrect_answers: ["Boolean", "Number", "String"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda: "What does the 'function' keyword signify in JavaScript?",
    correct_answer: "Declaring a reusable block of code",
    incorrect_answers: ["A built-in method", "A loop statement", "A data type"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda: "In HTML, what tag is used to create a hyperlink?",
    correct_answer: "&lt;a&gt;",
    incorrect_answers: ["&lt;src&gt;", "&lt;link&gt;", "&lt;href&gt;"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda:
      "Which CSS property is used to create space between an element's border and its content?",
    correct_answer: "Padding",
    incorrect_answers: ["Margin", "Border-spacing", "Space"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda: "What symbol is used for single-line comments in JavaScript?",
    correct_answer: "//",
    incorrect_answers: ["--!&gt;", "/*", "&lt;!--"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda: "What is the purpose of the <script> tag in HTML?",
    correct_answer: "Write JavaScript code within an HTML document",
    incorrect_answers: [
      "Load external images",
      "Style the content of a webpage",
      "Link to an external CSS file",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda:
      "What JavaScript function is used to print content to the console for debugging?",
    correct_answer: "console.log()",
    incorrect_answers: ["print()", "log()", "write()"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    domanda: "Which HTML tag is used to define the structure of a table?",
    correct_answer: "&lt;table&gt;",
    incorrect_answers: ["&lt;tr&gt;", "&lt;row&gt;", "&lt;tab&gt;"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "HTML is responsible for the structure of a webpage, while CSS is responsible for the presentation of the content on the webpage.",
    correct_answer: "True ",
    incorrect_answers: ["False"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "JavaScript is a server-side scripting language that helps with the functionality of a website.",
    correct_answer: "False",
    incorrect_answers: ["True "],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "In HTML, the '<head>' tag is where you would typically find the content that is directly displayed on the webpage.",
    correct_answer: "False",
    incorrect_answers: ["True "],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "CSS can be directly embedded within an HTML file using the '<css>' tag.",
    correct_answer: "False",
    incorrect_answers: ["True "],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "Inline CSS is when you apply CSS styling directly within the HTML element using the 'style' attribute.",
    correct_answer: "True ",
    incorrect_answers: ["False"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "HTML is not a programming language but a markup language used to structure content on the web.",
    correct_answer: "True ",
    incorrect_answers: ["False"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "JavaScript is mainly used for client-side scripting to make web pages interactive.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "CSS stands for Central Style Sheets, which is a way to globally style web pages across different websites.",
    correct_answer: "False",
    incorrect_answers: ["True "],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "JavaScript is mandatory for creating interactive elements on a webpage, such as buttons that trigger specific actions.",
    correct_answer: "True ",
    incorrect_answers: ["False"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    domanda:
      "The use of external CSS files allows for consistent styling across multiple HTML pages.",
    correct_answer: "True ",
    incorrect_answers: ["False"],
  },
];

const questionsDifficult = [
  // Array domande difficili
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda: "What is the meaning of the acronym HTML?",
    correct_answer: "Hyper Text Markup Language",
    incorrect_answers: [
      "Home Technology Markup Language",
      "Home Text Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda:
      "What is the Correct attribute for linking a CSS file to an HTML document?",
    correct_answer: "href",
    incorrect_answers: ["stylesheet", "hreflang", "rel"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda:
      "Which of the following is an example of a CSS selector that selects all elements with a 'button' class?",
    correct_answer: ".button",
    incorrect_answers: ["button", "button.button", "button"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda: "What does 'JS' mean in JavaScript?",
    correct_answer: "JavaScript",
    incorrect_answers: ["Java Standalone", "Just Style", "Jump Start"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda:
      "Which of the following represents an example of a correct variable declaration in JavaScript?",
    correct_answer: "let x = 5;",
    incorrect_answers: ["const x = 5;", "var x = 5;", "variable x = 5;"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda: "What symbol indicates Strict Equality in JavaScript?",
    correct_answer: "===",
    incorrect_answers: ["=", "==", "!=="],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda:
      "What is the correct output of the following JavaScript code: console.log(1 + '2' + 3)?",
    correct_answer: "123",
    incorrect_answers: ["6", "15", "21"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda: "What does the .join() method do in JavaScript?",
    correct_answer: "Concatenates all elements of an array into a string",
    incorrect_answers: [
      "Sorts the elements of an array in descending order",
      "Returns the largest element of an array",
      "Deletes all duplicate elements from an array",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda:
      "Which of the following is not a primitive data type in JavaScript?",
    correct_answer: "object",
    incorrect_answers: ["string", "undefined", "boolean"],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "hard",
    domanda: "What is the correct syntax for commenting in HTML?",
    correct_answer: "// Comment",
    incorrect_answers: ["/* Comment */", "* Comment *", "<!-- Comment -->"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "Can JavaScript code be embedded directly within the '<head>' tag of an HTML document?",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda: "Does CSS abbreviate 'Cascading Stylesheets'?",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "Is the main tag for writing JavaScript code directly in an HTML document <javascript>?",
    correct_answer: "false",
    incorrect_answers: ["true"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "With CSS, is it possible to modify the content of an HTML document?",
    correct_answer: "false",
    incorrect_answers: ["true"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "Does the CSS selector 'div p' select all <p> elements that are direct descendants of a <div> element?",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "Does the 'onMouseOver' event in JavaScript trigger when the mouse exits the element?",
    correct_answer: "false",
    incorrect_answers: ["true"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "To include an external CSS file in an HTML document, the <style> tag is used.",
    correct_answer: "false",
    incorrect_answers: ["true"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "In HTML, is the <canvas> tag used to draw graphics, animations, or games using JavaScript scripts?",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda: "Does the CSS selector '* {}' select all elements on the page?",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "hard",
    domanda:
      "Can a 'for' loop in JavaScript be written as $for(i=0; i<5; i++)${...}$?",
    correct_answer: "true",
    incorrect_answers: ["false"],
  },
];

// ----------------------------Fine domande
const divQuiz = document.getElementById("quiz");
const domandaElement = document.getElementById("domanda");
const answerButtons = document.getElementById("button_risposte");
const question_n = document.getElementById("ndomanda");
const totdomande = document.getElementById("totdomande");
const diff = localStorage.getItem("diff"); // Riporto il valore diff preso dal Pop-up
const numQuest = localStorage.getItem("numQuest"); // Riporto il valore numQuest preso dal Pop-up

let domandaNumber = 0; // Variabile inizializzata a 0 che verrà utilizzata per mostrare a video il valore della domanda corrente
let score = 0; // Variabile inizializzata a 0 che verrà incrementata ogni qual volta verrà selezionata la risposta giusta

// Funzione per mostrare la domanda corrente
function showdomandaeasy() {
  // Funzione per mostrare le domande prese dall'array di domande facili
  restartTimer(); // Richiamo la funzio restartTimer per far ripartire il timer ogni volta che si passà alla domanda successiva

  // Utilizzeremo gli if come condizione una sola variabile e restituisce true o false se trova o meno l'elemento (Utilizzato per evitare conflitti)
  // Restituisce sempre true ed esegue l'istruzione, nelle pagine dove non è presente quell'elemento restituisce false e non esegue l'istruzione

  let currentdomanda = domandas[domandaNumber]; // domanda corrente
  let domandaNo = domandaNumber + 1; // domanda corrente mostrata a video
  if (domandaElement) {
    domandaElement.innerHTML = currentdomanda.domanda;
  } // Posiziono il numeretto della domanda corrente nell'HTML per mostrarla a video
  if (question_n) {
    question_n.innerHTML = domandaNo;
  } //numero della domanda
  if (totdomande) {
    totdomande.innerHTML = "  " + "/ " + numQuest;
  } // num tot domande

  let answers = [
    currentdomanda.correct_answer, // Array contente tutte le risposte (corrette e sbagliate) di ogni singolo oggetto
    ...currentdomanda.incorrect_answers,
  ];
  if (answerButtons) {
    answerButtons.innerHTML = "";
  } // Mettiamo "" per resettare ogni volta i bottoni e non mostrare i bottoni precedenti

  // Template literals per creare i bottoni tanto quanto sono le risposte per ogni singolo oggetto

  while (answers.length > 0) {
    let randomIndex = Math.floor(Math.random() * answers.length);
    let newAnswer = `
          <button class="risposta">                                                         
              <span id="ansvalue">
                  ${answers[randomIndex]}
              </span>
          </button>
      `;
    if (answerButtons) {
      answerButtons.innerHTML += newAnswer;
    }
    answers.splice(randomIndex, 1); // Rimuove la risposta inserita per evitare la duplicazione
  }
  const allButtons = document.querySelectorAll(".risposta");
  allButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Funzione al click di ogni risposta
      const selectedAnswer = this;
      const answerText = selectedAnswer.textContent.trim();
      if (answerText === currentdomanda.correct_answer) {
        selectedAnswer.classList.remove("risposta");
        selectedAnswer.classList.add("correct");
        localStorage.setItem("score", ++score); // Incremento dello score e salvataggio
      } else {
        selectedAnswer.classList.remove("risposta");
        selectedAnswer.classList.add("wrong");
      }
    });
  });
}

function showdomandamiddle() {
  // Funzione identica a quella precedente per le domande con difficoltà middle
  restartTimer();
  let currentdomanda = questionsMiddle[domandaNumber];
  let domandaNo = domandaNumber + 1;
  if (domandaElement) {
    domandaElement.innerHTML = currentdomanda.domanda;
  }
  if (question_n) {
    question_n.innerHTML = domandaNo;
  } //numero della domanda
  if (totdomande) {
    totdomande.innerHTML = "  " + "/ " + numQuest;
  } // num tot domande

  let answers = [
    currentdomanda.correct_answer,
    ...currentdomanda.incorrect_answers,
  ];
  if (answerButtons) {
    answerButtons.innerHTML = "";
  }

  while (answers.length > 0) {
    let randomIndex = Math.floor(Math.random() * answers.length);
    let newAnswer = `
          <button class="risposta">
              <span id="ansvalue">
                  ${answers[randomIndex]}
              </span>
          </button>
      `;
    if (answerButtons) {
      answerButtons.innerHTML += newAnswer;
    }
    answers.splice(randomIndex, 1); // Rimuove la risposta inserita per evitare la duplicazione
  }
  const allButtons = document.querySelectorAll(".risposta");
  allButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedAnswer = this;
      const answerText = selectedAnswer.textContent.trim();
      if (answerText === currentdomanda.correct_answer) {
        selectedAnswer.classList.remove("risposta");
        selectedAnswer.classList.add("correct");
        localStorage.setItem("score", ++score); // Incremento dello score e salvataggio
      } else {
        selectedAnswer.classList.remove("risposta");
        selectedAnswer.classList.add("wrong");
      }
    });
  });
}

function showdomandahard() {
  // Funzione identica a quella precedente per le domande con difficoltà difficult
  restartTimer();
  let currentdomanda = questionsDifficult[domandaNumber];
  let domandaNo = domandaNumber + 1;
  if (domandaElement) {
    domandaElement.innerHTML = currentdomanda.domanda;
  }
  if (question_n) {
    question_n.innerHTML = domandaNo;
  } //numero della domanda
  if (totdomande) {
    totdomande.innerHTML = "  " + "/ " + numQuest;
  } // num tot domande

  let answers = [
    currentdomanda.correct_answer,
    ...currentdomanda.incorrect_answers,
  ];
  if (answerButtons) {
    answerButtons.innerHTML = "";
  }

  while (answers.length > 0) {
    let randomIndex = Math.floor(Math.random() * answers.length);
    let newAnswer = `
          <button class="risposta">
              <span id="ansvalue">
                  ${answers[randomIndex]}
              </span>
          </button>
      `;
    if (answerButtons) {
      answerButtons.innerHTML += newAnswer;
    }
    answers.splice(randomIndex, 1); // Rimuove la risposta inserita per evitare la duplicazione
  }
  const allButtons = document.querySelectorAll(".risposta");
  allButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedAnswer = this;
      const answerText = selectedAnswer.textContent.trim();
      if (answerText === currentdomanda.correct_answer) {
        selectedAnswer.classList.remove("risposta");
        selectedAnswer.classList.add("correct");
        localStorage.setItem("score", ++score); // Incremento dello score e salvataggio
      } else {
        selectedAnswer.classList.remove("risposta");
        selectedAnswer.classList.add("wrong");
      }
    });
  });
}


// Funzione per mostrare la prossima domanda
function showNextdomanda() {
  if (domandaNumber < numQuest - 1) {
    // se la domanda corrente è minore al numero di domande scelto da noi, passa alla domanda successiva
    domandaNumber++;
    divQuiz.classList.add("fade"); // Aggiungi la classe per la dissolvenza
    setTimeout(() => {
      // Rimuovi la classe dopo un breve ritardo
      divQuiz.classList.remove("fade");
      if (diff == "easy") {
        // chiamo le funzioni in base alla difficoltà scelta da noi
        showdomandaeasy();
      } else if (diff == "middle") {
        showdomandamiddle();
      } else {
        showdomandahard();
      }
    }, 500);
  } else {
    window.location = "./risultati.html"; // Dopo l'ultima domanda reindirizza alla pagina che mostra il risultato
  }
}

if (diff == "easy") {
  // Se il valore diff inserito nel PopUp è uguale a easy
  showdomandaeasy(); // Chiama la funzione showdomandaeasy()
} else if (diff == "middle") {
  // Se il valore diff inserito nel PopUp è uguale a middle
  showdomandamiddle(); // Chiama la funzione showdomandamiddle()
} else {
  showdomandahard(); // Altrimenti chiama la funzione showdomandahard()
}

if (answerButtons) {
  answerButtons.addEventListener("click", showNextdomanda);
} // Al click di ogni risposta, passa alla domanda successiva

//-----------------------------------Inizio terza pagina (Flavio)--------------------------------------

const risposteTotali = numQuest; // numero di domande totali scelte
const risposteCorrette = localStorage.getItem("score") || 0; //riprende lo score salvato
const risposteSbagliate = risposteTotali - risposteCorrette; // mostra risposte sbagliate (differenza totali - giuste)

// Calcola le percentuali in base al numero totale di domande
const percentualeCorrette = Math.round(
  (risposteCorrette / risposteTotali) * 100
);
const percentualeSbagliate = 100 - percentualeCorrette;

// Visualizza percentuali nei paragrafi
//mostra a schermo le percentuali calcolate
if (document.getElementById("percentualegiusta")) {
  document.getElementById(
    "percentualegiusta"
  ).innerText = `${percentualeCorrette}%`;
}
if (document.getElementById("percentualesbagliata")) {
  document.getElementById(
    "percentualesbagliata"
  ).innerText = `${percentualeSbagliate}%`;
}

// Visualizza conteggio delle domande corrette e sbagliate nei paragrafi
//scritte a dx e sx del grafico circolare stampate su html
if (document.getElementById("domandegiuste")) {
  document.getElementById(
    "domandegiuste"
  ).innerText = `${risposteCorrette}/${risposteTotali} answers`;
}
if (document.getElementById("domandesbagliate")) {
  document.getElementById(
    "domandesbagliate"
  ).innerText = `${risposteSbagliate}/${risposteTotali} answers`;
}

//  canvas del grafico

const canvas = document.getElementById("risposteChart");
if (canvas) {
  const ctx = canvas.getContext("2d"); //crea costante ctx da utilizzare come parametro del grafico
  canvas.style.width = "400px"; // Larghezza doughnut
  canvas.style.height = "400px"; // Altezza doughnut

  const congratulationText = // Testo per aver superato
    "Congratulations! You passed the exam. We'll send you the certificate in few minutes. Check your email (including promotions / spam folder)";
  const failedText = // Testo per aver fallito
    "Oh no! You failed the exam. We'll send you the details in few minutes. Check your email (including promotions / spam folder)";

  //crea il grafico a schermo
  new Chart(ctx, {
    type: "doughnut", //tipo di grafico (circolare)
    data: {
      datasets: [
        {
          data: [risposteCorrette, risposteSbagliate], //parametri usati nel grafico
          backgroundColor: [
            "rgba(0, 255, 255)", // Colore per risposte corrette nel grafico
            "rgba(194, 18, 141)", // Colore per risposte sbagliate nel grafico
          ],
          borderWidth: 0, // Rimuovi i bordi
        },
      ],
    },
    options: {
      cutout: 150, // Spessore cerchio
      responsive: false, // Centra il grafico nel div
      plugins: {
        legend: {
          display: false, // Rimuovi la legenda sopra al grafico
        },
      },
      // Testo dentro al grafico
      //animazione del cerchio al caricamento della pagina
      animation: {
        onProgress: function () {
          const width = canvas.width;
          const height = canvas.height;

          const fontSize = 18; // Grandezza font testo centrale
          const x = width / 2; // Posizione orizzontale testo all'interno
          const y = height / 3; // Posizione verticale testo all'interno

          ctx.font = fontSize + "px sans-serif"; // Font testo centrale
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Funzione per il wrapping del testo
          //i parametri sono : text(testo), x,y (posizione di partenza del testo), maxWidth(larghezza max del testo), lineHeight(spazio tra righe)
          function wrapText(text, x, y, maxWidth, lineHeight) {
            // Suddivide il testo in singole parole
            var words = text.split(" ");
            // Inizializza una variabile per la riga corrente
            var line = "";
            // Loop attraverso tutte le parole del testo
            for (var n = 0; n < words.length; n++) {
              // Crea un testo di prova unendo la parola corrente con la riga esistente
              var testLine = line + words[n] + " ";
              // Misura la larghezza del testo di prova
              var metrics = ctx.measureText(testLine);
              var testWidth = metrics.width;
              // Verifica se il testo di prova supera la larghezza massima consentita
              // e se non si tratta della prima parola
              if (testWidth > maxWidth && n > 0) {
                // Disegna la riga corrente sul canvas
                ctx.fillText(line, x, y);
                // Resetta la riga corrente alla parola corrente
                line = words[n] + " ";
                // Sposta la coordinata y verso il basso di lineHeight
                y += lineHeight;
              } else {
                // Aggiorna la riga corrente al testo di prova
                line = testLine;
              }
            }
            // Disegna l'ultima riga corrente sul canvas
            ctx.fillText(line, x, y);
          }
          var maxWidth = width * 0.6; //ampiezza max del testo nel cerchio
          var lineHeight = fontSize * 1.8; // Spaziatura linee nel testo

          // Determina quale testo mostrare in base al superamento o al fallimento dell'esame (se la percentuale supera o meno 60%)
          let displayText = "";
          if (percentualeCorrette >= 60) {
            displayText = congratulationText;
            ctx.fillStyle = "rgba(0, 255, 255)"; //colore successo
          } else {
            displayText = failedText;
            ctx.fillStyle = "rgba(194, 18, 141)"; //Colore fallimento
          }

          // Chiama la funzione wrapText per visualizzare il testo in modo appropriato nel canvas
          wrapText(displayText, x, y, maxWidth, lineHeight);
        },
      },
    },
  });
}
//fine doughnut chart (cerchio risultati)
//---------------------------------------- 4 PAGINA (nicola)--------------------------///
// Definizione della funzione per la gestione delle stelle

initStarRating();
function initStarRating() {
  // Seleziona tutte le immagini all'interno dell'elemento con id "stelle"
  const stars = document.querySelectorAll("#stelle img");

  // Array per memorizzare i commenti in base alla valutazione
  const commentStyles = [
    "Insufficient!", // 1
    "Insufficient!", // 2
    "Insufficient!", // 3
    "Insufficient!", // 4
    "Insufficient!", // 5
    "Sufficient!", // 6
    "Discrete!", // 7
    "Excellent!", // 8
    "Outstanding!", // 9
    "Fantastic!", // 10
  ];

  // Crea un nuovo elemento <p> per il testo del commento
  const commentText = document.createElement("p");

  // Imposta la classe "comment-text" al paragrafo
  commentText.classList.add("comment-text");

  // Aggiungi il paragrafo al contenitore delle stelle
  const starsContainer = document.getElementById("sottocomment");
  starsContainer.appendChild(commentText);

  // Itera su ciascuna stella
  stars.forEach((star, index) => {
    // Aggiungi un listener per l'evento mouseover (passaggio del mouse)
    star.addEventListener("mouseover", function (event) {
      // Imposta il testo del commento in base all'indice della stella
      commentText.textContent = commentStyles[index];
      // Evidenzia tutte le stelle fino alla stella corrente
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("active");
      }
    });

    // Aggiungi un listener per l'evento mouseout (uscita del mouse)
    star.addEventListener("mouseout", function (event) {
      // Rimuovi l'evidenziazione di tutte le stelle
      stars.forEach((s, i) => {
        s.classList.remove("active");
      });
    });

    // Aggiungi un listener per l'evento click su ciascuna stella
    star.addEventListener("click", function () {
      // Assegna la valutazione corrispondente all'indice della stella
      rating = index + 1;

      // Rimuovi eventuali stili aggiuntivi su altre stelle
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add("clicked"); // Aggiungi classe "clicked"
        } else {
          s.classList.remove("clicked"); // Rimuovi classe "clicked"
        }
      });

      // Imposta il testo del commento in base alla valutazione
      commentText.textContent = commentStyles[index];
    });
  });
}
// Aggiungi un gestore di eventi per il contenitore dei pulsanti delle risposte
