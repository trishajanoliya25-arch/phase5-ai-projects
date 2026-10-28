
async function getFunFact() {
    const fact = document.getElementById("fact");
    const button = document.getElementById("generateBtn");

    button.disabled = true;
    button.textContent = "Generating...";
    fact.textContent = "🤖 AI is discovering an amazing fact...";

    try {
        const response = await fetch("/fun-fact");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        fact.textContent = data.funFact;

    } catch (error) {
        fact.textContent = "Sorry! Unable to get a fun fact. Please try again.";
        console.error(error);

    } finally {
        button.disabled = false;
        button.textContent = "✨ Generate Fun Fact";
    }
}
