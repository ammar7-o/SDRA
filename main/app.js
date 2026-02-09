// ----- المتغيرات العامة -----
let IFRAME;
let SettingsOverlay;
let SettingsBtn;
let overlay;
let ToogleTheme;
let cards;
let searchInput;

// ----- الوضع الداكن -----
function SwitchToDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    ToogleTheme.innerHTML = isDark
        ? `<i class="fas fa-sun"></i>`
        : `<i class="fas fa-moon"></i>`;
}

// ----- إعدادات النافذة المنبثقة -----
function openSettings() {
    SettingsOverlay.classList.toggle("open");
    overlay.classList.toggle("open");
}

// ----- محتوى الكروت -----
const content = [
    { name: "SDRA", src: "Root/sdra/Areader.html" },
    { name: "HTML", src: "Root/html/Areader.html" },
    { name: "CSS", src: "Root/css/Areader.html" },
    { name: "JS", src: "Root/js/Areader.html" },
    { name: "LINUX", src: "Root/linux/Areader.html" },
     { name: "1bac-AR", src: "Root/1BACSEF/AR/Areader.html" },
];

function renderContent(filter = "") {
    cards.innerHTML = ""; // مسح الكروت القديمة

    const filteredContent = content.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredContent.forEach(item => {
        cards.innerHTML += `
            <div class="card">
                <a href="${item.src}">
                    <i class="fa-solid fa-book"></i>
                    <span>${item.name}</span>
                </a>
            </div>
        `;
    });
}

// ----- تحميل الصفحة -----
window.addEventListener('DOMContentLoaded', () => {
    // ربط المتغيرات العامة بالعناصر
    IFRAME = document.getElementById("Iframe");
    SettingsOverlay = document.querySelector(".settings-overlay");
    SettingsBtn = document.querySelector(".settings");
    overlay = document.querySelector(".overlay");
    ToogleTheme = document.querySelector(".toogle-theme");
    cards = document.getElementById("cards");
    searchInput = document.querySelector("form input");

    // أحداث
    if (SettingsBtn) SettingsBtn.addEventListener("click", openSettings);
    if (overlay) overlay.addEventListener("click", openSettings);
    if (ToogleTheme) ToogleTheme.addEventListener("click", SwitchToDarkMode);
    if (searchInput) {
        searchInput.addEventListener("input", (e) => renderContent(e.target.value));
    }

    document.querySelector("form").addEventListener("submit", e => e.preventDefault());

    // تحميل الوضع الداكن من localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        ToogleTheme.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        ToogleTheme.innerHTML = `<i class="fas fa-moon"></i>`;
    }

    // عرض الكروت عند التحميل
    renderContent();
});

// دعم زر الرجوع في المتصفح
window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    if (key) {
        SetIframeSrc(key);
    }
});
