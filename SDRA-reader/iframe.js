
const IS_FILE = location.protocol === "file:";



// ----- تحميل حالة الوضع الداكن -----
function loadThemeState() {
    if (IS_FILE) {
        isDarkMode
    } else {
        isDarkMode = localStorage.getItem("darkMode") === "true";
    }
}

// ----- عرض الوضع الداكن -----
function renderTheme() {
    document.body.classList.toggle("dark-mode", isDarkMode);
    
}




// ----- عند تحميل الصفحة -----
window.addEventListener('DOMContentLoaded', () => {
 
    // تحميل وعرض الوضع الداكن
    loadThemeState();
    renderTheme();
});
