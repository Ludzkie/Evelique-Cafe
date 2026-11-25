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

window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeBtn");
    if (localStorage.getItem("evelique-theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (btn) btn.textContent = "☀️ Light Mode";
    }

    // 2. DISCORD WEBHOOK CONTACT FORM
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
