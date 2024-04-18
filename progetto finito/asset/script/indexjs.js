// -------------------------------------------------------- Prima pagina

var btnProceed = document.getElementById("btn")

if(btnProceed){btnProceed.addEventListener("click", function(){
  let diff = prompt("Type Difficult: (easy, middle, hard)");
  localStorage.setItem("diff", diff);
  let numQuest = prompt("How many questions do you want?");
  localStorage.setItem("numQuest", numQuest);
  confirm('Confirm or deny');  
  })
}

///-------------------------------------------------------- Seconda pagina

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
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

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      showNextdomanda();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
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
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function restartTimer() {
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  clearInterval(timerInterval);
  startTimer(); // Riavvia il timer
}

/***************************** inizio js quiz II  pagina ******************************/

const domandas = [
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
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    question: "What is the purpose of HTML in web development?",
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
    question: "Which of the following is NOT a valid data type in JavaScript?",
    correct_answer: "Array",
    incorrect_answers: [
      "Boolean",
      "Number",
      "String",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    question: "What does the 'function' keyword signify in JavaScript?",
    correct_answer: "Declaring a reusable block of code",
    incorrect_answers: [
      "A built-in method",
      "A loop statement",
      "A data type",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    question: "In HTML, what tag is used to create a hyperlink?",
    correct_answer: "<a> ",
    incorrect_answers: [
      "<src>",
      "<link>",
      "<href>",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    question: "Which CSS property is used to create space between an element's border and its content?",
    correct_answer: "Padding",
    incorrect_answers: [
      "Margin",
      "Border-spacing",
      "Space"
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    question: "What symbol is used for single-line comments in JavaScript?",
    correct_answer: "// ",
    incorrect_answers: [
      "--!>",
      "/*",
      "<!--",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    question: "What is the purpose of the <script> tag in HTML?",
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
    question: "What JavaScript function is used to print content to the console for debugging?",
    correct_answer: "A) console.log() ",
    incorrect_answers: [
      "print()",
      "log()",
      "write()",
    ],
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "middle",
    question: "Which HTML tag is used to define the structure of a table?",
    correct_answer: "<table>",
    incorrect_answers: [
      "<tr>",
      "<row>",
      "<tab>",
    ],
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "HTML is responsible for the structure of a webpage, while CSS is responsible for the presentation of the content on the webpage.",
    correct_answer: "True ",
    incorrect_answers: ["False"]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "JavaScript is a server-side scripting language that helps with the functionality of a website.",
    correct_answer: "False",
    incorrect_answers: ["True "]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "In HTML, the '<head>' tag is where you would typically find the content that is directly displayed on the webpage.",
    correct_answer: "False",
    incorrect_answers: ["True "]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "CSS can be directly embedded within an HTML file using the '<css>' tag.",
    correct_answer: "False",
    incorrect_answers: ["True "]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "Inline CSS is when you apply CSS styling directly within the HTML element using the 'style' attribute.",
    correct_answer: "True ",
    incorrect_answers: ["False"]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "HTML is not a programming language but a markup language used to structure content on the web.",
    correct_answer: "True ",
    incorrect_answers: ["False"]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "JavaScript is mainly used for client-side scripting to make web pages interactive.",
    correct_answer: "True",
    incorrect_answers: ["False"]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "CSS stands for Central Style Sheets, which is a way to globally style web pages across different websites.",
    correct_answer: "False",
    incorrect_answers: ["True "]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "JavaScript is mandatory for creating interactive elements on a webpage, such as buttons that trigger specific actions.",
    correct_answer: "True ",
    incorrect_answers: ["False"]
  },
  {
    category: "Web Development",
    type: "boolean",
    difficulty: "middle",
    question: "The use of external CSS files allows for consistent styling across multiple HTML pages.",
    correct_answer: "True ",
    incorrect_answers: ["False"]
  },
  {
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Qual è il significato dell'acronimo HTML?",
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
    difficulty: "difficult",
    question: "Qual è l'attributo corretto per collegare un file CSS a un documento HTML?",
    correct_answer: "href",
    incorrect_answers: [
      "stylesheet",
      "hreflang",
      "rel",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Quale dei seguenti è un esempio di un selettore CSS che seleziona tutti gli elementi con una classe 'button'?",
    correct_answer: ".button",
    incorrect_answers: [
      "button",
      "button.button",
      "button",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Cosa significa 'JS' in JavaScript?",
    correct_answer: "JavaScript",
    incorrect_answers: [
      "Java Standalone",
      "Just Style",
      "Jump Start",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Quale tra le seguenti opzioni rappresenta un esempio di dichiarazione di variabile corretta in JavaScript?",
    correct_answer: "let x = 5;",
    incorrect_answers: [
      "const x = 5;",
      "var x = 5;",
      "variable x = 5;",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Qual è il simbolo per indicare l'ugualianza Stricatamente Uguale in JavaScript?",
    correct_answer: "===",
    incorrect_answers: [
      "=",
      "==",
      "!==",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Qual'è l'output corretto del seguente codice JavaScript: console.log(1 + '2' + 3)?",
    correct_answer: "123",
    incorrect_answers: [
      "6",
      "15",
      "21",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Cosa fa il metodo .join() in JavaScript?",
    correct_answer: "Concatena tutti gli elementi di un array in una stringa",
    incorrect_answers: [
      "Ordina gli elementi di un array in ordine decrescente",
      "Restituisce l'elemento più grande di un array",
      "Elimina tutti gli elementi duplicati da un array",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Quale dei seguenti non è un tipo di dato primitivo in JavaScript?",
    correct_answer: "object",
    incorrect_answers: [
      "string",
      "undefined",
      "boolean",
    ],
},
{
    category: "Web Development",
    type: "multiple",
    difficulty: "difficult",
    question: "Qual è la sintassi corretta per commentare in HTML?",
    correct_answer: "// Commento",
    incorrect_answers: [
      "/* Commento */",
      "* Commento *",
      "<!-- Commento -->",
    ],
},
  {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Il codice JavaScript può essere incorporato direttamente nel tag '<head>' di un documento HTML.",
        correct_answer: "true",
        incorrect_answers: [
            "false"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "CSS abbrevia 'Cascading Stylesheets'.",
        correct_answer: "true",
        incorrect_answers: [
            "false"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Il tag principale per scrivere un codice JavaScript direttamente in un documento HTML è <javascript>.",
        correct_answer: "false",
        incorrect_answers: [
            "true"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Con CSS è possibile modificare il contenuto di un documento HTML.",
        correct_answer: "false",
        incorrect_answers: [
            "true"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Il selettore CSS 'div p' seleziona tutti gli elementi <p> che sono discendenti diretti di un elemento <div>.",
        correct_answer: "true",
        incorrect_answers: [
            "false"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "L'evento 'onMouseOver' in JavaScript si attiva quando il mouse esce dall'elemento.",
        correct_answer: "false",
        incorrect_answers: [
            "true"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Per includere un file CSS esterno in un documento HTML, si utilizza il tag <style>.",
        correct_answer: "false",
        incorrect_answers: [
            "true"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Nel linguaggio HTML, il tag <canvas> è utilizzato per disegnare grafici, animazioni o giochi utilizzando script JavaScript.",
        correct_answer: "true",
        incorrect_answers: [
            "false"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Il selettore CSS '* {}' seleziona tutti gli elementi della pagina.",
        correct_answer: "true",
        incorrect_answers: [
            "false"
        ]
    },
    {
        category: "Web Development",
        type: "boolean",
        difficulty: "difficult",
        question: "Un loop 'for' in JavaScript può essere scritto come $for(i=0; i<5; i++)${...}$.",
        correct_answer: "true",
        incorrect_answers: [
            "false"
        ]
    }
];



// ----------------------------Fine domande
const divQuiz = document.getElementById("quiz");
const domandaElement = document.getElementById("domanda");
const answerButtons = document.getElementById("button_risposte");
const question_n = document.getElementById("ndomanda");
const totdomande = document.getElementById("totdomande");

let domandaNumber = 0;
let score = 0;

// Funzione per mostrare la domanda corrente
function showdomanda() {
  restartTimer();
  let currentdomanda = domandas[domandaNumber];
  let domandaNo = domandaNumber + 1;
  if (domandaElement){domandaElement.innerHTML = currentdomanda.domanda;}
  if (question_n){question_n.innerHTML = domandaNo;} //numero della domanda
  if (totdomande){totdomande.innerHTML = "  " + "/ " + domandas.length;} // num tot domande
  let answers = [
    currentdomanda.correct_answer,
    ...currentdomanda.incorrect_answers,
  ];
 if (answerButtons) {answerButtons.innerHTML = "";}

  while (answers.length > 0) {
    let randomIndex = Math.floor(Math.random() * answers.length);
    let newAnswer = `
          <button class="risposta">
              <span id="ansvalue">
                  ${answers[randomIndex]}
              </span>
          </button>
      `;
    if (answerButtons){answerButtons.innerHTML += newAnswer;}
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

// Funzione per reimpostare lo stato
function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Funzione per mostrare la prossima domanda
function showNextdomanda() {
  if (domandaNumber < domandas.length - 1) {
    domandaNumber++;
    divQuiz.classList.add("fade"); // Aggiungi la classe per la dissolvenza
    setTimeout(() => {
      // Rimuovi la classe dopo un breve ritardo
      divQuiz.classList.remove("fade");
      showdomanda();
    }, 500);
  } else {
    window.location = "./risultati.html";
  }
}
showdomanda()
if (answerButtons){answerButtons.addEventListener("click", showNextdomanda);}
//-----------------------------------Inizio terza pagina (Flavio)--------------------------------------
const risposteTotali = domandas.length;
const risposteCorrette = localStorage.getItem("score") || 0;
const risposteSbagliate = risposteTotali - risposteCorrette;

// Calcola le percentuali in base al numero totale di domande
const percentualeCorrette = Math.round(
  (risposteCorrette / risposteTotali) * 100
);
const percentualeSbagliate = 100 - percentualeCorrette;

// Visualizza percentuali nei paragrafi
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

// Rimani dentro la canvas del grafico

const canvas = document.getElementById("risposteChart");
if (canvas){
const ctx = canvas.getContext("2d");
canvas.style.width = "400px"; // Larghezza doughnut
canvas.style.height = "400px"; // Altezza doughnut

const congratulationText = // Testo per aver superato
  "Congratulations! You passed the exam. We'll send you the certificate in few minutes. Check your email (including promotions / spam folder)";
const failedText = // Testo per aver fallito
  "Oh no! You failed the exam. We'll send you the details in few minutes. Check your email (including promotions / spam folder)";

// Rimani dentro il grafico

const risposteChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [risposteCorrette, risposteSbagliate],
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
        function wrapText(text, x, y, maxWidth, lineHeight) {
          var words = text.split(" ");
          var line = "";
          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              ctx.fillText(line, x, y);
              line = words[n] + " ";
              y += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, x, y);
        }
        var maxWidth = width * 0.6;
        var lineHeight = fontSize * 1.8; // Spaziatura linee nel testo

        // Determina quale testo mostrare in base al superamento o al fallimento dell'esame
        let displayText = "";
        if (percentualeCorrette >= 60) {
          displayText = congratulationText;
          ctx.fillStyle = "rgba(0, 255, 255)";
        } else {
          displayText = failedText;
          ctx.fillStyle = "rgba(194, 18, 141)";
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
