
const question = document.getElementById("question");
const submit = document.getElementById("submit");
const answer = document.getElementById("answer");

async function askGemini() {
  const userQuestion = question.value.trim();

  if (!userQuestion) {
    answer.textContent = "Please enter a question first.";
    question.focus();
    return;
  }

  submit.disabled = true;
  answer.textContent = "Gemini is thinking...";

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: userQuestion
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "Unable to get an answer.");
    }

    answer.textContent = data.answer || "No answer received.";

  } catch (error) {
    answer.textContent = error.message || "Something went wrong.";
    console.error(error);
  } finally {
    submit.disabled = false;
  }
}

submit.addEventListener("click", askGemini);

question.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    askGemini();
  }
});
