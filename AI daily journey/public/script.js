

const mood = document.getElementById("mood");
const button = document.getElementById("generateBtn");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
    result.textContent = "Generating your journal prompt...";

    try {
        const response = await fetch("/journal-prompt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mood: mood.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        result.textContent = data.prompt;

    } catch (error) {
        result.textContent = error.message;
    }
});
