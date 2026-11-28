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

// 2. MENU CATEGORY FILTER
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

// 3. FESTIVE PLACEHOLDER ARTWORK GENERATOR
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
                <text x="120" y="92" font-size="38" font-weight="bold" fill="#fde68a" text-anchor="middle" dominant-baseline="middle">🍪 LATTE</text>
            </svg>`;
            img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(bisSvg.trim());
            return;
        }

        const [emoji, bg1, bg2, accent] = map[type] || ["🎄☕", "#1b4332", "#7f1d1d", "#ffd166"];
        img.src = createPlaceholderDataUri(emoji, bg1, bg2, accent);
    });
}

// 4. EXTRA DETAILS LOOKUP FOR EACH MENU ITEM
const ITEM_DETAILS = {
    "Peppermint Mocha": {
        notes: "Double-shot Bukidnon Arabica pulled over 70% dark Belgian chocolate, cool peppermint extract, steamed whole milk, whipped cream & crushed candy cane.",
        tags: ["☕ 2 Espresso Shots", "🔥 Hot or Iced", "🥛 Contains Dairy"]
    },
    "Gingerbread Spiced Latte": {
        notes: "Warm holiday spices—Ceylon cinnamon, nutmeg, and molasses brown sugar—folded into velvety micro-foam and rich espresso.",
        tags: ["☕ 2 Espresso Shots", "🔥 Hot or Iced", "🌱 Oat Milk Option"]
    },
    "Toasted Marshmallow Cocoa": {
        notes: "Single-origin Cebuano tablea melted into creamy steamed milk and crowned with a caramelized house-made marshmallow fluff.",
        tags: ["🚫 Caffeine-Free", "🔥 Served Hot", "🍫 Local Tablea"]
    },
    "Spiced Eggnog Latte": {
        notes: "Chilled Arabica espresso topped with a thick, nutmeg-dusted holiday custard cold foam for a creamy winter treat.",
        tags: ["☕ 2 Espresso Shots", "🧊 Iced Only", "🎄 Holiday Exclusive"]
    },
    "Cafe Americano": {
        notes: "Full-bodied double shot of locally roasted Arabica espresso lengthened with filtered water for a crisp, aromatic finish.",
        tags: ["☕ 2 Espresso Shots", "🔥 Hot or Iced", "🌿 Zero Sugar"]
    },
    "Signature Spanish Latte": {
        notes: "Our #1 bestseller: bold double espresso balanced with sweetened condensed milk and silky fresh milk.",
        tags: ["☕ 2 Espresso Shots", "🧊 Best Iced", "⭐ House Favorite"]
    },
    "Salted Caramel Macchiato": {
        notes: "French vanilla milk layered with freshly pulled espresso shots and a house-made sea-salt caramel drizzle.",
        tags: ["☕ 2 Espresso Shots", "🔥 Hot or Iced", "🧂 Sweet & Salty"]
    },
    "White Chocolate Mocha": {
        notes: "Velvety white cocoa sauce whisked into hot espresso and steamed milk for a smooth, dessert-like cup.",
        tags: ["☕ 2 Espresso Shots", "🔥 Hot or Iced", "🥛 Contains Dairy"]
    },
    "Biscoff Cookie Latte": {
        notes: "Infused with caramelized Lotus Biscoff spread, topped with whipped cream and crunchy speculoos cookie crumbs.",
        tags: ["☕ 2 Espresso Shots", "🧊 Best Iced", "🌾 Contains Gluten"]
    },
    "Dark Mocha Espresso": {
        notes: "Extra-rich bittersweet cocoa paired with double espresso—built to power late-night study sessions.",
        tags: ["⚡ High Caffeine", "🔥 Hot or Iced", "🍫 72% Dark Cocoa"]
    },
    "Uji Matcha Cream Cloud": {
        notes: "First-harvest ceremonial Uji matcha whisked to order over fresh milk and topped with salted vanilla sweet cream.",
        tags: ["🍵 Ceremonial Matcha", "🧊 Iced", "☁️ Sweet Foam"]
    },
    "Strawberry Matcha Latte": {
        notes: "Chunky house-cooked strawberry compote layered beneath cold fresh milk and earthy Japanese matcha.",
        tags: ["🍵 Ceremonial Matcha", "🍓 Real Strawberries", "🧊 Iced"]
    },
    "Strawberry Hibiscus Fizz": {
        notes: "Cold-brewed ruby hibiscus flower tea shaken with macerated strawberries and sparkling soda water.",
        tags: ["🚫 Caffeine-Free", "🧊 Sparkling Iced", "🌱 Vegan"]
    },
    "Lychee Rose Cooler": {
        notes: "Fragrant Damascus rosewater and sweet lychee nectar served over ice with hydrated basil seeds.",
        tags: ["🚫 Caffeine-Free", "🧊 Refreshing", "🌱 Vegan"]
    },
    "Classic Butter Croissant": {
        notes: "27-layer laminated French pastry baked fresh every 7:00 AM with cultured butter for a crisp honeycomb crumb.",
        tags: ["🥐 Baked Fresh Daily", "🌾 Contains Gluten & Dairy"]
    },
    "Pain au Chocolat": {
        notes: "Flaky, golden croissant dough wrapped around two batons of semi-sweet dark chocolate.",
        tags: ["🥐 Baked Fresh Daily", "🍫 Dark Chocolate"]
    },
    "Cebuano Queso Ensaymada": {
        notes: "Pillowy soft brioche brushed with whipped butter, dusted with fine sugar, and piled with aged cheddar.",
        tags: ["🧀 Cebuano Classic", "🥐 Soft Brioche"]
    },
    "Bibingka Burnt Cheesecake": {
        notes: "Caramelized Basque-style cream cheese cake infused with coconut milk, topped with salted duck egg and toasted coconut.",
        tags: ["🍰 Limited Daily Batch", "🥥 Filipino Fusion"]
    },
    "Holiday Sugar Cookies (3pcs)": {
        notes: "Crisp-edged vanilla bean sugar cookies hand-decorated with festive red and emerald royal icing.",
        tags: ["🎁 Great for Gifting", "🎄 Holiday Batch"]
    },
    "Truffle Cream Pasta": {
        notes: "Al dente fettuccine tossed in roasted button mushroom cream, black truffle oil, parmesan, and toasted garlic bread.",
        tags: ["🍝 Heavy Meal", "🍄 Vegetarian Friendly"]
    }
};

// 5. OPEN / CLOSE ITEM DETAILS MODAL
function openItemModal(card) {
    const modal = document.getElementById("itemModal");
    if (!modal) return;

    const title = card.querySelector(".item-name")?.textContent.trim() || "Menu Item";
    const shortDesc = card.querySelector(".item-desc")?.textContent.trim() || "";
    const tagEl = card.querySelector(".hot-tag");
    const imgEl = card.querySelector(".menu-img");
    const sizePills = card.querySelectorAll(".size-pill");
    const singleChip = card.querySelector(".single-price-chip");

    const extra = ITEM_DETAILS[title] || {
        notes: shortDesc,
        tags: ["🎄 Evélique Special", "✨ Freshly Prepared"]
    };

    document.getElementById("modalImg").src = imgEl ? imgEl.src : "";
    document.getElementById("modalImg").alt = title;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDesc").textContent = extra.notes;

    const badge = document.getElementById("modalTag");
    if (tagEl) {
        badge.textContent = tagEl.textContent;
        badge.style.display = "inline-block";
    } else {
        badge.textContent = "Evélique Menu";
    }

    const metaContainer = document.getElementById("modalMeta");
    metaContainer.innerHTML = extra.tags
        .map(t => `<span class="meta-chip">${t}</span>`)
        .join("");

    const pricesContainer = document.getElementById("modalPrices");
    const orderBtn = document.getElementById("modalOrderBtn");

    function updateOrderLink(label) {
        const prefill = encodeURIComponent(`Hi Evélique Cafe! I'd like to reserve/order: 1x ${title} (${label})`);
        orderBtn.href = `contact.html?order=${prefill}`;
    }

    if (sizePills.length > 0) {
        pricesContainer.innerHTML = "";
        sizePills.forEach((pill, index) => {
            const size = pill.querySelector("small")?.textContent || "";
            const price = pill.querySelector("strong")?.textContent || "";
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "modal-price-option" + (index === 1 ? " selected" : "");
            btn.innerHTML = `<small>${size}</small><strong>${price}</strong>`;
            btn.onclick = () => {
                pricesContainer.querySelectorAll(".modal-price-option").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                updateOrderLink(`${size} - ${price}`);
            };
            pricesContainer.appendChild(btn);
            if (index === 1) updateOrderLink(`${size} - ${price}`);
        });
    } else if (singleChip) {
        const price = singleChip.textContent.trim();
        pricesContainer.innerHTML = `
            <button type="button" class="modal-price-option selected">
                <small>Regular Serving</small>
                <strong>${price}</strong>
            </button>`;
        updateOrderLink(price);
    }

    modal.classList.add("open");
}

function closeItemModal(event) {
    const modal = document.getElementById("itemModal");
    if (!modal) return;
    if (!event || event.target === modal) {
        modal.classList.remove("open");
    }
}

window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeItemModal();
});

window.addEventListener("DOMContentLoaded", () => {
    hydratePlaceholders();

    // Make every menu card interactive
    document.querySelectorAll(".menu-card").forEach(card => {
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.addEventListener("click", () => openItemModal(card));
        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openItemModal(card);
            }
        });
    });

    const btn = document.getElementById("themeBtn");
    if (localStorage.getItem("evelique-theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (btn) btn.textContent = "☀️ Light Mode";
    }

    // 6. AUTO-PREFILL RESERVATION IF COMING FROM MENU MODAL
    const params = new URLSearchParams(window.location.search);
    const prefilledOrder = params.get("order");
    const msgField = document.getElementById("message");
    if (prefilledOrder && msgField) {
        msgField.value = prefilledOrder + "\nTable for: \nPreferred Time: ";
    }

    // 7. DISCORD WEBHOOK CONTACT FORM
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
