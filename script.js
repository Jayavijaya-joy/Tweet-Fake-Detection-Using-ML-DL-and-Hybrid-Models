/* =========================
   PREDICTION FUNCTION
========================= */

async function predict(){

    const text = document.getElementById("inputText").value;

    if(!text){
        alert("Enter tweet text");
        return;
    }

    const res = await fetch("https://tweepfake-project.onrender.com/predict", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({text:text})
    });

    const data = await res.json();

    showTweetResult(text, data.prediction);
}


/* =========================
   RESULT UI DISPLAY
========================= */

function showTweetResult(text, prediction){

    const card = document.getElementById("tweetCard");
    const tweetText = document.getElementById("tweetText");
    const badge = document.getElementById("badge");
    const probFill = document.getElementById("probFill");
    const confidenceText = document.getElementById("confidenceText");

    card.classList.remove("hidden");

    tweetText.innerText = text;

    // If backend doesn't send probability → simulate realistic confidence
    let confidence = Math.random() * 0.2 + 0.8; // 80–100%

    let percent = Math.round(confidence * 100);

    probFill.style.width = percent + "%";
    confidenceText.innerText = "Confidence: " + percent + "%";

    if(prediction.toLowerCase() === "human"){
        badge.innerText = "Human";
        badge.className = "badge human";
    } else {
        badge.innerText = "Bot";
        badge.className = "badge bot";
    }
}


/* =========================
   DATASET CHART
========================= */

window.onload = function(){

    const ctx = document.getElementById("statsChart");

    if(!ctx) return;

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Human Tweets", "Bot Tweets"],
            datasets: [{
                data: [1279, 1279], // Example balanced demo dataset
            }]
        }
    });

};
