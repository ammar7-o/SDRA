
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
    
    // إضافة مراقب لتحميل المحتوى من iframe
    observeIframeContent();
});

// ----- مراقبة محتوى iframe -----
function observeIframeContent() {
    // محاولة الوصول إلى iframe من الصفحة الرئيسية
    const iframe = parent.document.getElementById('Iframe');
    if (iframe) {
        // مراقبة تحميل iframe
        iframe.addEventListener('load', function() {
            analyzeIframeContent();
        });
    }
}

// ----- تحليل محتوى iframe -----
function analyzeIframeContent() {
    try {
        const iframe = parent.document.getElementById('Iframe');
        if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                // استخراج النص من iframe
                const textContent = iframeDoc.body.innerText || iframeDoc.body.textContent;
                
                // إرسال النص إلى نموذج الذكاء الاصطناعي للتحليل (وهمي)
                const aiResponse = generateAIResponse(textContent);
                
                // عرض الاستجابة في واجهة المستخدم
                displayAIResponse(aiResponse);
            }
        }
    } catch (error) {
        console.warn('Cannot access iframe content:', error);
    }
}

// ----- توليد استجابة ذكاء اصطناعي وهمية -----
function generateAIResponse(content) {
    // في تطبيق حقيقي، سيتم الاتصال بواجهة برمجة تطبيقات الذكاء الاصطناعي
    // هذه وظيفة تجريبية فقط
    
    const contentLength = content.length;
    const wordCount = content.trim().split(/\s+/).length;
    const summary = content.substring(0, 200) + (content.length > 200 ? '...' : '');
    
    return {
        summary: `هذا المحتوى يحتوي على ${wordCount} كلمة و ${contentLength} حرف. المحتوى يبدأ بـ: "${summary}"`,
        keywords: extractKeywords(content),
        questions: generateQuestions(content)
    };
}

// ----- استخراج الكلمات المفتاحية -----
function extractKeywords(content) {
    // في تطبيق حقيقي، سيتم استخدام خوارزميات متقدمة لاستخراج الكلمات المفتاحية
    const words = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const uniqueWords = [...new Set(words)];
    return uniqueWords.slice(0, 10); // أول 10 كلمات مميزة
}

// ----- توليد أسئلة بناءً على المحتوى -----
function generateQuestions(content) {
    // في تطبيق حقيقي، سيتم استخدام نماذج لغوية متقدمة لتوليد الأسئلة
    const sentences = content.split(/[.!?]/).filter(s => s.length > 10);
    const questions = [];
    
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
        questions.push(`ما معنى "${sentences[i].substring(0, 30)}..."؟`);
    }
    
    return questions;
}

// ----- عرض استجابة الذكاء الاصطناعي -----
function displayAIResponse(response) {
    // إنشاء عنصر لعرض المعلومات في الشريط الجانبي
    const aiInfoDiv = document.createElement('div');
    aiInfoDiv.className = 'ai-info';
    aiInfoDiv.innerHTML = `
        <details open>
            <summary>تحليل الذكاء الاصطناعي</summary>
            <div class="ai-summary">
                <h4>الملخص:</h4>
                <p>${response.summary}</p>
            </div>
            <div class="ai-keywords">
                <h4>الكلمات المفتاحية:</h4>
                <p>${response.keywords.join(', ')}</p>
            </div>
            <div class="ai-questions">
                <h4>أسئلة مقترحة:</h4>
                ${response.questions.map(q => `<p>${q}</p>`).join('')}
            </div>
        </details>
    `;
    
    // إضافة المعلومات إلى الشريط الجانبي
    const listContainer = parent.document.querySelector('.list');
    if (listContainer) {
        // تحقق مما إذا كانت معلومات الذكاء الاصطناعي موجودة بالفعل
        const existingAiInfo = listContainer.querySelector('.ai-info');
        if (existingAiInfo) {
            existingAiInfo.remove();
        }
        
        listContainer.insertBefore(aiInfoDiv, listContainer.firstChild);
    }
}
