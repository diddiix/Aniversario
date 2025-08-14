const correctCode = "310724";
let enteredCode = "";

const keys = document.querySelectorAll(".key");
const display = document.querySelector(".display");
const scratchSection = document.getElementById("scratchSection");
const loginSection = document.getElementById("loginSection");
const heartButton = document.getElementById("heartButton");
const heartsContainer = document.getElementById("heartsContainer");
const letterSection = document.getElementById("letterSection");
const letter = document.getElementById("letter");
const homeSection = document.getElementById("homeSection");
const startButton = document.getElementById("startButton"); // ✅ Sin repetir scratchSection


keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.getAttribute("data-value");

        if (value === "clear") {
            enteredCode = "";
            display.textContent = "";
        } else if (value === "ok") {
            if (enteredCode === correctCode) {
                loginSection.style.display = "none";
                scratchSection.style.display = "block";
                initScratch();
                startHearts();
            } else {
                alert("Código incorrecto, intenta de nuevo.");
                enteredCode = "";
                display.textContent = "";
            }
        } else {
            enteredCode += value;
            display.textContent = "•".repeat(enteredCode.length);
        }
    });
});

function initScratch() {
    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");

    const width = 300;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#bfbfbf";
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'destination-out';

    let isDrawing = false;

    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        checkScratch(canvas);
    });
    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    });
}

function checkScratch(canvas) {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentPixels++;
    }

    if (transparentPixels / (canvas.width * canvas.height) > 0.5) {
        heartButton.classList.remove("hidden");

        const message = document.querySelector(".hidden-message");
        message.classList.add("show"); // Mostrar texto

        // ✅ Extra: hacer que el canvas desaparezca para que no tape nada
        canvas.style.opacity = "0";
        canvas.style.transition = "opacity 1s ease-in-out";
    }
}


function startHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 10 + "px";
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 500);
}

heartButton.addEventListener("click", () => {
    scratchSection.style.display = "none";
    letterSection.style.display = "block";
});

letter.addEventListener("click", () => {
    letter.classList.toggle("open");
});

