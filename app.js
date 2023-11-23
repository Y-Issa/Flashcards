document.addEventListener("DOMContentLoaded", function () {
  const rootElement = document.getElementById("root");

  const flashcards = [
    {
      id: 1,
      question: "What is JavaScript?",
      answer:
        "JavaScript is a high-level, interpreted programming language that is widely used for client-side web development.",
    },
    {
      id: 2,
      question: "Why is JavaScript important for web development?",
      answer:
        "JavaScript is essential for web development as it enables dynamic and interactive features on the client side, enhancing user experience.",
    },
    {
      id: 3,
      question: "Explain the concept of closures in JavaScript.",
      answer:
        "Closures refer to the ability of a function to remember and access its lexical scope even when it's executed outside that scope. They are a powerful feature for creating private variables and functions.",
    },
    {
      id: 4,
      question: "What is the event loop in JavaScript?",
      answer:
        "The event loop is a crucial part of JavaScript's concurrency model. It continuously checks the message queue for tasks, executes them in order, and handles asynchronous operations.",
    },
    {
      id: 5,
      question: "How does prototypal inheritance work in JavaScript?",
      answer:
        "JavaScript uses prototypal inheritance, where objects can inherit properties and methods directly from other objects. Each object has a prototype object, and if a property is not found on the object itself, it looks up the prototype chain.",
    },
    {
      id: 6,
      question: "Explain the 'this' keyword in JavaScript.",
      answer:
        "The 'this' keyword refers to the current execution context in which a function is called. Its value depends on how the function is invoked, and it can dynamically change during runtime.",
    },
  ];

  let selectedId = null;

  function render() {
    const formHtml = renderForm();
    const flashcardsHtml = renderFlashCards();
    const clearButtonHtml = renderClearButton();
    rootElement.innerHTML = formHtml + flashcardsHtml + clearButtonHtml;
    addEventListeners();
  }

  function renderForm() {
    return `
      <form class="add-form" onsubmit="handleAddFlashCard(event)">
        <div class="left">
          <p>Add your own flashcard! ✌️ </p>
          <button>Add</button>
        </div>
        <div class="right">
          <input
            type="text"
            placeholder="Question goes here..."
            value=""
            id="questionInput"
          />
          <textarea
            placeholder="Answer goes here..."
            value=""
            id="answerInput"
          ></textarea>
        </div>
      </form>
    `;
  }

  function renderFlashCards() {
    return `
      <div class="flashcards">
        ${flashcards
          .map(
            (card) => `
              <div
                key="${card.id}"
                class="flashcard ${card.id === selectedId ? "selected" : ""}"
                onclick="handleClick(${card.id})"
              >
                <p>${card.id === selectedId ? card.answer : card.question}</p>
                <button onclick="handleDeleteFlashCard(${
                  card.id
                })">✖️</button>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderClearButton() {
    return `
      <div >
        <button onclick="handleClearAll()" class="clear-button">Clear All</button>
      </div>
    `;
  }

  function addEventListeners() {
    // Add any necessary event listeners here
  }

  window.handleAddFlashCard = function (event) {
    event.preventDefault();
    const questionInput = document.getElementById("questionInput");
    const answerInput = document.getElementById("answerInput");

    if (!questionInput.value || !answerInput.value) return;

    const newCard = {
      id: Date.now(),
      question: questionInput.value,
      answer: answerInput.value,
    };

    flashcards.push(newCard);
    render();

    answerInput.value = "";
    questionInput.value = "";
  };

  window.handleClick = function (id) {
    selectedId = selectedId === id ? null : id;
    render();
  };

  window.handleDeleteFlashCard = function (id) {
    flashcards.splice(
      flashcards.findIndex((card) => card.id === id),
      1
    );
    render();
  };

  window.handleClearAll = function () {
    flashcards.length = 0;
    render();
  };

  render();
});
