const fs = require('fs');
const read = require('readline-sync');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getCountFiles(path) {
  let files = fs.readdirSync(path);
  return files.length;
};

function getSelectQuestions(path, countQ) {
  const countAll = getCountFiles(path);
  let selected = [];

  do {
    let sel = getRandom(1, countAll);

    if (!selected.includes(sel)) {
      selected.push(sel);
    }
  } while(selected.length != countQ);

  return selected;
}

function readQuestion(file) {
  return fs.readFileSync(file).toString().split('\r\n');
}

function getQuiz(path) {
  const N_Q = 0;
  const N_A = 1;
  const N_V = 2;

  const count = 5;
  let selected = getSelectQuestions(path, count);
  const quiz = [];
  
  for(let i = 0; i < count; i++) {
    let q = readQuestion(path + selected[i] + '.txt');
    let variants = [];

    for(let j = N_V; j < q.length - 1; j++) {
      variants.push(`\t${j - 1}) ${q[j]}`);
    }

    quiz.push({
      question: q[N_Q],
      answer: q[N_A],
      variants: variants
    });
  }

  return quiz;
}

const path = "quiz/";
const quiz = getQuiz(path);
let score = 0;
let choice;

for(let i = 0; i < quiz.length; i++) {
  console.log("\n" + quiz[i].question);
  
  for(let j = 0; j < quiz[i].variants.length; j++) {
    console.log(quiz[i].variants[j]);
  }

  choice = +read.question("Enter number: ");

  if(choice == quiz[i].answer) {
    score++;
  }
}

console.log(`\nВаш счёт: ${score} / ${quiz.length}. ${score == quiz.length ? "Идеально!" : ""}`);
