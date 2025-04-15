const questions = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
      answer: 0,
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "CSS", "JavaScript"],
      answer: 1,
    },
    {
      question: "What does JS stand for?",
      options: ["JavaStyle", "JavaScript", "JustScript"],
      answer: 1,
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let time = 10;
  let timer;
  
  function startQuiz() {
    document.getElementById("result").classList.add("hidden");
    score = 0;
    currentQuestion = 0;
    showQuestion();
  }
  
  function showQuestion() {
    if (currentQuestion >= questions.length) {
      endQuiz();
      return;
    }
  
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const optionsEl = document.getElementById("options");
    optionsEl.innerHTML = "";
  
    q.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(index);
      optionsEl.appendChild(btn);
    });
  
    time = 10;
    document.getElementById("time").textContent = time;
    clearInterval(timer);
    timer = setInterval(() => {
      time--;
      document.getElementById("time").textContent = time;
      if (time <= 0) {
        clearInterval(timer);
        checkAnswer(-1); // timeout is wrong answer
      }
    }, 1000);
  }
  
  function checkAnswer(selected) {
    clearInterval(timer);
    const correct = questions[currentQuestion].answer;
    if (selected === correct) {
      score += time * 10; // time-based scoring
    }
    currentQuestion++;
    showQuestion();
  }
  
  function endQuiz() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("final-score").textContent = score;
    loadLeaderboard();
  }
  
  function saveScore() {
    const name = document.getElementById("username").value.trim();
    if (!name) return;
  
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));
  
    document.getElementById("username").value = "";
    loadLeaderboard();
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
  }
  
  function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const scoresList = document.getElementById("scores-list");
    scoresList.innerHTML = "";
    leaderboard.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.score}`;
      scoresList.appendChild(li);
    });
  }
  