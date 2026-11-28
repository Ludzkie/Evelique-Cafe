// 1. DARK / LIGHT THEME TOGGLE
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeBtn");
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("evelique-theme", "dark");
        if (btn) btn.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("evelique-theme", "light");
        if (btn) btn.textContent = "🌙 Dark Mode";
    }
}

// 2. MENU CATEGORY FILTER ("All" shows a tight 2-col compact view; single tabs expand full width)
function filterMenu(category, clickedBtn) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    if (clickedBtn) clickedBtn.classList.add("active");

    document.querySelectorAll(".menu-section").forEach(section => {
        const grid = section.querySelector(".menu-grid");
        if (category === "all" || section.dataset.category === category) {
            section.style.display = "block";
            if (grid) {
                grid.style.gridTemplateColumns =
                    category === "all"
                        ? "repeat(auto-fill, minmax(310px, 1fr))"
                        : "repeat(auto-fill, minmax(260px, 1fr))";
            }
        } else {
            section.style.display = "none";
        }
    });
}

// 3. FESTIVE PLACEHOLDER ARTWORK GENERATOR (SVG Data URIs)
function createPlaceholderDataUri(emoji, bg1, bg2, accent) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160">
        <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${bg1}"/>
                <stop offset="100%" stop-color="${bg2}"/>
            </linearGradient>
        </defs>
        <rect width="240" height="160" rx="16" fill="url(#g)"/>
        <circle cx="195" cy="34" r="10" fill="${accent}" opacity="0.35"/>
        <circle cx="42" cy="128" r="14" fill="${accent}" opacity="0.25"/>
        <text x="120" y="96" font-size="56" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
    </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg.trim());
}

function hydratePlaceholders() {
    document.querySelectorAll("[data-placeholder]").forEach(img => {
        const type = img.dataset.placeholder;
        const map = {
            hero: ["🎄☕", "#1b4332", "#7f1d1d", "#ffd166"],
            peppermint: ["🍬🍫", "#7f1d1d", "#1b4332", "#ffccd5"],
            gingerbread: ["🍪✨", "#7c2d12", "#451a03", "#fbbf24"],
            cocoa: ["🔥🍫", "#431407", "#991b1b", "#fde68a"],
            eggnog: ["❄️🥛", "#1e3a5f", "#1b4332", "#fef08a"],
            coffee: ["☕🤎", "#3f2314", "#1b4332", "#d4a373"],
            spanish: ["🥛☕", "#5c3a21", "#2d6a4f", "#ffd166"],
            caramel: ["🍮✨", "#78350f", "#3f2314", "#fcd34d"],
            whitechoco: ["🤍☕", "#4a5568", "#1b4332", "#ffffff"],
            biscoff: [" BIS", "#7c2d12", "#2d1609", "#f59e0b"],
            mocha: ["🍫☕", "#3b1d14", "#1b4332", "#f87171"],
            matcha: ["🍵☁️", "#1b4332", "#0f291e", "#a7f3d0"],
            strawberry: ["🍓🍵", "#881337", "#1b4332", "#fda4af"],
            hibiscus: ["🌺🧊", "#9f1239", "#4c0519", "#fecdd3"],
            lychee: ["🌸🧊", "#0f766e", "#134e4a", "#99f6e4"],
            croissant: ["🥐🧈", "#92400e", "#451a03", "#fde68a"],
            pain: ["🥐🍫", "#5c2b16", "#271108", "#fbbf24"],
            ensaymada: ["🧀👑", "#b45309", "#1b4332", "#fef08a"],
            cheesecake: ["🍰🥥", "#7f1d1d", "#451a03", "#fde047"],
            pasta: ["🍝🍄", "#3f3f46", "#18181b", "#e4e4e7"],
            cookie: ["🎄🍪", "#14532d", "#7f1d1d", "#fde047"]
        };

        if (type === "biscoff") {
            const bisSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160">
                <defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#2d1609"/></linearGradient></defs>
                <rect width="240" height="160" rx="16" fill="url(#b)"/>
                <text x="120" y="92" font-size="40" font-weight="bold" fill="#fde68a" text-anchor="middle" dominant-baseline="middle">🍪 LATTE</text>
            </svg>`;
            img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(bisSvg.trim());
            return;
        }

        const [emoji, bg1, bg2, accent] = map[type] || ["🎄☕", "#1b4332", "#7f1d1d", "#ffd166"];
        img.src = createPlaceholderDataUri(emoji, bg1, bg2, accent);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    hydratePlaceholders();

    const btn = document.getElementById("themeBtn");
    if (localStorage.getItem("evelique-theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (btn) btn.textContent = "☀️ Light Mode";
    }

    // 4. DISCORD WEBHOOK CONTACT FORM
    const form = document.getElementById("contactForm");
    if (!form) return;

    const statusMsg = document.getElementById("status-msg");
    const submitBtn = document.getElementById("submitBtn");

    const WEBHOOK_URL = "https://discord.com/api/webhooks/1575195278804259029/v82ligsbPnF8_v6LZrf96iHoUCZIbgRMXrsx_StsS-Dj1GDKsIbpR9iD5ENdzx_Ak-HQ";

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const payload = {
            username: "Evélique Cafe Bot",
            embeds: [
                {
                    title: "🎄 New Cafe Inquiry / Reservation",
                    color: 10166822,
                    fields: [
                        { name: "Customer Name", value: name, inline: true },
                        { name: "Email Address", value: email, inline: true },
                        { name: "Message / Order Details", value: message }
                    ],
                    footer: { text: "Evélique Cafe • Mandaue City" },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                statusMsg.style.display = "block";
                statusMsg.style.backgroundColor = "#d8f3dc";
                statusMsg.style.color = "#1b4332";
                statusMsg.textContent = "✅ Thank you! Your message has been sent to Evélique Cafe.";
                form.reset();
            } else {
                throw new Error("Discord returned an error");
            }
        } catch (error) {
            statusMsg.style.display = "block";
            statusMsg.style.backgroundColor = "#f8d7da";
            statusMsg.style.color = "#842029";
            statusMsg.textContent = "❌ Oops! Could not send message. Please check your internet or webhook URL.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    });
});
