
async function getResponse(type) {
    const result = document.getElementById("result");
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    result.textContent = "🤖 AI is thinking...";

    try {
        const response = await fetch(`/${type}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        let answer;

        if (type === "joke") {
            answer = data.joke;
        } else if (type === "motivation") {
            answer = data.motivation;
        } else {
            answer = data.tip;
        }

        result.textContent = answer || "No response received.";

    } catch (error) {
        result.textContent = "Error: " + error.message;
    } finally {
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
}
