const DATA = {
  // multiple and binary questions
  questions: [
    {
      type: `multiple`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      ans1: `תשובה 1`,
      ans2: `תשובה 2`,
      ans3: `תשובה 3`,
      ans4: `תשובה 4`,
      correctAns: `ans1`,
    },
    {
      type: `binary`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      correctAns: true,
    },
    {
      type: `multiple`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      ans1: `תשובה 1`,
      ans2: `תשובה 2`,
      ans3: `תשובה 3`,
      ans4: `תשובה 4`,
      correctAns: `ans1`,
    },
    {
      type: `binary`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      correctAns: true,
    },
    {
      type: `multiple`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      ans1: `תשובה 1`,
      ans2: `תשובה 2`,
      ans3: `תשובה 3`,
      ans4: `תשובה 4`,
      correctAns: `ans1`,
    },
    {
      type: `binary`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      correctAns: true,
    },
    {
      type: `multiple`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      ans1: `תשובה 1`,
      ans2: `תשובה 2`,
      ans3: `תשובה 3`,
      ans4: `תשובה 4`,
      correctAns: `ans1`,
    },
    {
      type: `binary`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      correctAns: true,
    },
    {
      type: `multiple`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      ans1: `תשובה 1`,
      ans2: `תשובה 2`,
      ans3: `תשובה 3`,
      ans4: `תשובה 4`,
      correctAns: `ans1`,
    },
    {
      type: `binary`,
      question: `שאלה שאלתית שיש לה תשובה?`,
      correctAns: true,
    },
  ],
};

// varubals
let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let arrMultipleQuestions = [];
let strCurrentItem;
// const
const AMOUNT_OF_QUESTION = 2; // how many questions per item
const AMOUNT_OF_TOTAL_QUESTION = 10; // how many questions all along
const ANSWERS_TO_WIN = 7; // how many questions needed to win the exer

/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => {
  document.querySelector(".loader").classList.add("fade");
  document
    .querySelector(`.instructions .xIcon`)
    .addEventListener("click", createShower);
  document
    .querySelector(`.aboutIcon`)
    .addEventListener("click", handelAboutPage);
});

/* createShower
--------------------------------------------------------------
Description: */
const handelAboutPage = () => {
  document.querySelector(".bodyContainer").classList.add("hidden");
  document.querySelector(".aboutInfo").classList.remove("hidden");
  document.querySelector(".aboutInfo .xIcon").addEventListener("click", () => {
    document.querySelector(".bodyContainer").classList.remove("hidden");
    document.querySelector(".aboutInfo").classList.add("hidden");
  })
}


/* createShower
--------------------------------------------------------------
Description: */
const createShower = () => {
  document.querySelector(`.instructions`).classList.add("hidden");
  let showerItems = El(
    "div",
    { cls: "showerItems" },
    El(
      "div",
      { classes: ["showerInstructions", "centerX"] },
      "עזרו לדני להתקלח"
    ),
    El("img", {
      attributes: { src: "./assets/daniDirty.svg", class: "david centerItem" },
    }),
    El("img", {
      attributes: { src: "./assets/bubblesBody.svg", class: "bodyBubbles " },
    }),
    El("div", {classes: ["dirtContainer", "centerItem"]}),
    El(
      "div",
      { classes: ["showerItemContainer", "centerX"] },
      El("img", {
        attributes: { src: "./assets/sponge.png", class: "sponge showerItem" },
      }),
      El("img", {
        attributes: {
          src: "./assets/shampoo.png",
          class: "shampoo showerItem",
        },
      }),
      El("img", {
        attributes: { src: "./assets/soap.png", class: "soap showerItem" },
      }),
      El("img", {
        attributes: {
          src: "./assets/hairMask.png",
          class: "hairMask showerItem",
        },
      }),
      El("img", {
        attributes: {
          src: "./assets/rubber-duck.png",
          class: "rubberDuck showerItem",
        },
      })
    )
  );
  document.querySelector(`.showerContainer`).append(showerItems);

  for(let i = 1; i < 10; i++ ) {
    let dirt = El("img", {attributes: {
      src: `./assets/dirt${i}.svg`,
      class: `dirt dirt${i}`,
    }},)
    document.querySelector(`.dirtContainer`).append(dirt);
  }

  arrMultipleQuestions = shuffle(DATA.questions);

  document.querySelectorAll(`.showerItem`).forEach((item) => {
    item.addEventListener("click", addContentToQuestion);
  });
};

/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = (event) => {
    document.querySelectorAll(`.showerItem`).forEach((item) => {
        item.style.pointerEvents = "none";
    });
  if (event) {
    event.currentTarget.removeEventListener("click", addContentToQuestion);
    document
      .querySelector(`.multipleQuestionContainer`)
      .classList.remove("hidden");
    strCurrentItem = event.currentTarget.classList[0];
  }

  document.querySelector(`.multipleQuestionContainer`).innerHTML = "";
  // add question
  let question = El(
    "div",
    { cls: `multipleQuestion` },
    arrMultipleQuestions[nMultipleCurrentQuestion].question
  );
  document.querySelector(`.multipleQuestionContainer`).append(question);
  // add answeres
  if (arrMultipleQuestions[nMultipleCurrentQuestion].type === "multiple") {
    let ansContainer = El("div", { classes: [`ansContainer`, `multiple`] });
    document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
    for (let i = 1; i <= 4; i++) {
      let answer = El(
        "div",
        {
          classes: [`multipleAns`, `ans${i}`, `ans`],
          listeners: { click: onClickAnswer },
        },
        arrMultipleQuestions[nMultipleCurrentQuestion][`ans${i}`]
      );
      document.querySelector(`.ansContainer`).append(answer);
    }
  } else {
    let ansContainer = El(
      "div",
      { classes: [`ansContainer`, `binary`] },
      El(
        "div",
        {
          classes: [`binaryAns`, `true`, `ans`],
          listeners: { click: onClickAnswer },
        },
        "נכון"
      ),
      El(
        "div",
        {
          classes: [`binaryAns`, `false`, `ans`],
          listeners: { click: onClickAnswer },
        },
        "לא נכון"
      )
    );
    document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
  }
};

/* onClickAnswer
--------------------------------------------------------------
Description: */
const onClickAnswer = (event) => {
  // remove listeners
  let arrAns = document.querySelectorAll(`.ans`);
  for (let i = 0; i < arrAns.length; i++) {
    arrAns[i].removeEventListener("click", onClickAnswer);
  }
  // check if answer is correct
  document.querySelector(`.${arrMultipleQuestions[nMultipleCurrentQuestion].correctAns}`).style.backgroundColor = "#6dcd6d";
  if (
    event.currentTarget.classList[1] ===
    String(arrMultipleQuestions[nMultipleCurrentQuestion].correctAns)
  ) {
    nMultipleCorrectAnswers++;
  } else {
    event.currentTarget.style.backgroundColor = "#e56060";
  }

  // send to next question.
  nMultipleCurrentQuestion++;
  setTimeout(() => {
    if (nMultipleCurrentQuestion % AMOUNT_OF_QUESTION === 0) {
      questionsEnd();
    } else {
      addContentToQuestion();
    }
  }, 1000);
};

/* questionsEnd
--------------------------------------------------------------
Description: */
const questionsEnd = () => {
  document.querySelector(`.multipleQuestionContainer`).classList.add("hidden");
  switch (strCurrentItem) {
    case "sponge":
      document.querySelector(`.sponge`).classList.add("animate");
      document.querySelector(`.dirt8`).style.animation = "fadeOut 2s 2s linear forwards";
      document.querySelector(`.dirt9`).style.animation = "fadeOut 2s 2s linear forwards";
      break;
      case "shampoo":
      document.querySelector(`.dirt1`).style.animation = "fadeOut 2s 2s linear forwards";
      document.querySelector(`.shampoo`).classList.add("animate");
      break;
      case "soap":
      document.querySelector(`.dirt6`).style.animation = "fadeOut 2s 2s linear forwards";
      document.querySelector(`.dirt5`).style.animation = "fadeOut 2s 2s linear forwards";
        let bubbles = El("div", {classes: ["bubblesContainer", "centerX"],},
            El("img", {attributes: {src: "./assets/bubbles.svg", class: "bubble bubble1"}}, ),
            El("img", {attributes: {src: "./assets/bubbles.svg", class: "bubble bubble2"}}, ),
            El("img", {attributes: {src: "./assets/bubbles.svg", class: "bubble bubble3"}}, ),
        );
        document.querySelector(`.showerItems`).append(bubbles);
        document.querySelector(`.bubble1`).style.animation = "soapAnimation 4s ease-in forwards";
        document.querySelector(`.bubble2`).style.animation = "soapAnimation 3s 1s linear forwards";
        document.querySelector(`.bubble3`).style.animation = "soapAnimation 2s 2s linear forwards";
      break;
    case "hairMask":
      document.querySelector(`.dirt2`).style.animation = "fadeOut 2s 2s linear forwards";
      document.querySelector(`.dirt7`).style.animation = "fadeOut 2s 2s linear forwards";
      document.querySelector(`.hairMask`).classList.add("animate");
      break;
    case "rubberDuck":
      document.querySelector(`.dirt3`).style.animation = "fadeOut 2s 2s linear forwards";
      document.querySelector(`.dirt4`).style.animation = "fadeOut 2s 2s linear forwards";
        document.querySelector(`.rubberDuck`).classList.add("animate");
      break;
    default:
    // code block
  }
  setTimeout(() => {
      document.querySelectorAll(`.showerItem`).forEach((item) => {
        item.style.pointerEvents = "all";
      });
      if(nMultipleCurrentQuestion === AMOUNT_OF_TOTAL_QUESTION) {
        finishExer();
      }
  }, 4000)

};

/* questionsEnd
--------------------------------------------------------------
Description: */
const finishExer = () => {
  if(nMultipleCorrectAnswers >= ANSWERS_TO_WIN) {
    document.querySelector(`.rain`).classList.remove("hidden");
    document.querySelector(`.bodyBubbles`).style.animation = "fadeOut 2s 2s linear forwards"; 

    document.querySelector(`.showerInstructions`).classList.add("hidden");
    setTimeout(() => {
      document.querySelector(`.showerInstructions`).classList.remove("hidden");
      document.querySelector(`.rain`).classList.add("hidden");
      document.querySelector(`.showerInstructions `).innerHTML = "ועכשיו נגבו את האדים";
      document.querySelector(`.scratch-container`).classList.remove("hidden");
      document.querySelector(`.david `).setAttribute("src", "./assets/daniClean.svg");
      handlePractice0();
    }, 5000)

  } else {
    document.querySelector(`.instructions`).classList.remove("hidden");
    document.querySelector(`.instructions`).innerHTML = "נכשלתם במשימה! לא היו מספיק מים חמים לקלח את דני ועכשיו הוא לא מוכן למסור לכם את הרמז הבא!";
  }
}

/* questionsEnd
--------------------------------------------------------------
Description: */
const winShower = () => {
  document.querySelector(`.showerInstructions `).innerHTML = "מעולים אתם!";
  document.querySelector(`.instructions`).classList.remove("hidden");
  document.querySelector(`.instructions`).classList.remove("centerItem");
  document.querySelector(`.instructions`).classList.add("win");
  document.querySelector(`.instructions`).innerHTML = "כל הכבוד הצלחתם לקלח את דני! סוף סוף אפשר לראות שהעניים שלו הן בצבע כחול";
}


/*
shuffle
------------------------------------------------
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal
------------------------------------------------
*/
function shuffle(arr) {
  let tmp = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor(Math.random() * tmp.length);
    arr[i] = tmp[index];
    tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
  }
  return arr;
}

function El(tagName, options = {}, ...children) {
  let el = Object.assign(document.createElement(tagName), options.fields || {});
  if (options.classes && options.classes.length)
    el.classList.add(...options.classes);
  else if (options.cls) el.classList.add(options.cls);
  if (options.id) el.id = options.id;
  el.append(...children.filter((el) => el));
  for (let listenerName of Object.keys(options.listeners || {}))
    if (options.listeners[listenerName])
      el.addEventListener(listenerName, options.listeners[listenerName], false);
  for (let attributeName of Object.keys(options.attributes || {})) {
    if (options.attributes[attributeName] !== undefined)
      el.setAttribute(attributeName, options.attributes[attributeName]);
  }
  return el;
}
