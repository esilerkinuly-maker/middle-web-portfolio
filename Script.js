document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navMenu = document.getElementById("navMenu");

    hamburgerMenu.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburgerMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    const sections = document.querySelectorAll(".section-block, section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    async function fetchQuote() {
        try {
            const response = await fetch("https://api.quotable.io/random?tags=technology,famous-quotes");
            if (!response.ok) throw new Error("Ошибка сети");
            const data = await response.json();
            quoteText.textContent = `"${data.content}"`;
            quoteAuthor.textContent = `— ${data.author}`;
        } catch (error) {
            quoteText.textContent = '"Великие дела нужно совершать, а не обдумывать бесконечно."';
            quoteAuthor.textContent = "— Юлий Цезарь";
        }
    }
    fetchQuote();
});