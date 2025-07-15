// script.js

// Asegúrate de que el DOM esté completamente cargado antes de añadir listeners
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const userInput = document.getElementById('user-input');
    const getTipButton = document.getElementById('get-tip-button');
    const resultsDiv = document.getElementById('results');
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const loadingSpinner = document.getElementById('loading-spinner');
    const copyTipButton = document.getElementById('copy-tip-button');
    const tipHistorySection = document.getElementById('tip-history');
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const welcomeText = document.getElementById('welcome-text');
    const tipActionsContainer = document.getElementById('tip-actions');
    const shareButtonsContainer = document.getElementById('share-buttons-container');
    const shareTwitterButton = document.getElementById('share-twitter-button');
    const shareFacebookButton = document.getElementById('share-facebook-button');
    const shareWhatsappButton = document.getElementById('share-whatsapp-button');
    const qrCodeButton = document.getElementById('qr-code-button');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const contactForm = document.getElementById('contact-form');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const toastContainer = document.getElementById('toast-container');


    // Referencias a elementos de texto para traducción
    const mainTitle = document.getElementById('main-title');
    const initialResultsText = document.getElementById('initial-results-text');
    const copyButtonText = document.getElementById('copy-button-text');
    const shareButtonLabels = document.querySelectorAll('.share-button-label');
    const qrButtonText = document.getElementById('qr-button-text');
    const historyTitle = document.getElementById('history-title');
    const clearHistoryButtonText = document.getElementById('clear-history-button-text');
    const contactTitle = document.getElementById('contact-title');
    const contactNameLabel = document.getElementById('contact-name-label');
    const contactEmailLabel = document.getElementById('contact-email-label');
    const contactMessageLabel = document.getElementById('contact-message-label');
    const contactSubmitButton = document.getElementById('contact-submit-button');
    const aboutUsLink = document.getElementById('about-us-link');
    const contactLink = document.getElementById('contact-link');
    const copyrightText = document.getElementById('copyright-text');

    // References for social icons and footer links containers
    const socialIconsContainer = document.querySelector('.social-icons');
    const instagramIcon = document.querySelector('.social-icons a.instagram');
    const xTwitterIcon = document.querySelector('.social-icons a.x-twitter');
    const facebookIcon = document.querySelector('.social-icons a.facebook');
    const youtubeIcon = document.querySelector('.social-icons a.youtube');
    const footerLinksContainer = document.querySelector('.footer-links');


    // --- Funcionalidad de QR Code (declaración global para evitar ReferenceError) ---
    let qrCodeGenerated = false;

    // **¡CLAVE API INTEGRADA!**
    // Por favor, reemplaza esta cadena vacía con tu clave de API real de Gemini.
    // Puedes obtener una clave en Google AI Studio: https://aistudio.google.com/
    const apiKey = "AIzaSyCvTcgqJbgH2PJplmvIJvSkWBTMh_BbBAs";

    // --- Objeto de Traducciones ---
    const translations = {
        es: {
            title: 'Express',
            welcome: '¡Bienvenido a EcoTips Express! Introduce una pregunta o tema relacionado con la sostenibilidad y recibe consejos ecológicos rápidos y útiles.',
            placeholder: 'Escribe tu pregunta o tema aquí...',
            getTipButton: 'Obtener EcoTip',
            initialResults: 'Los resultados aparecerán aquí...',
            copied: 'Copiado!',
            copyError: 'Error al copiar',
            nothingToCopy: 'Nada que copiar',
            validationError: 'Por favor, introduce una pregunta o tema.',
            loading: 'Cargando EcoTip...',
            apiErrorPrefix: 'Error:',
            apiErrorGeneric: 'No se pudo obtener la respuesta de Gemini. Verifica tu clave API.',
            apiErrorConnection: 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
            apiKeyMissing: 'Error: La clave de API de Gemini no está configurada. Por favor, añade tu clave de API en el código.',
            copyTipButton: 'Copiar Tip',
            shareTwitter: 'X',
            shareFacebook: 'Facebook',
            shareWhatsapp: 'WhatsApp',
            showQr: 'Mostrar QR',
            hideQr: 'Ocultar QR',
            historyTitle: 'Historial de EcoTips',
            historyPrompt: 'Pregunta:',
            clearHistory: 'Borrar Historial',
            contactTitle: 'Contáctanos / Sugerencias',
            contactName: 'Nombre:',
            contactEmail: 'Correo Electrónico:',
            contactMessage: 'Mensaje:',
            contactSubmit: 'Enviar Mensaje',
            contactNamePlaceholder: 'Tu nombre',
            contactEmailPlaceholder: 'tu.email@ejemplo.com',
            contactMessagePlaceholder: 'Escribe tu mensaje o sugerencia aquí...',
            contactSuccess: '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.',
            contactError: 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.',
            aboutUs: 'Sobre Nosotros',
            contact: 'Contacto',
            copyright: '© 2024 EcoTips Express. Todos los derechos reservados.',
            ariaThemeToggleLight: 'Activar modo claro',
            ariaThemeToggleDark: 'Activar modo oscuro',
            ariaInput: 'Campo de entrada para tu pregunta o tema',
            ariaGetTipButton: 'Obtener EcoTip',
            ariaLoadingSpinner: 'Cargando resultados',
            ariaCopyButton: 'Copiar tip generado',
            ariaShareTwitter: 'Compartir en X (Twitter)',
            ariaShareFacebook: 'Compartir en Facebook',
            ariaShareWhatsapp: 'Compartir en WhatsApp',
            ariaQrButton: 'Mostrar código QR para compartir',
            ariaSocialNav: 'Redes Sociales',
            ariaInstagram: 'Visitar Instagram',
            ariaXTwitter: 'Visitar X (Twitter)',
            ariaFacebook: 'Visitar Facebook',
            ariaYoutube: 'Visitar YouTube',
            ariaFooterNav: 'Enlaces de pie de página',
            ariaAboutUs: 'Ir a la página Sobre Nosotros',
            ariaContact: 'Ir a la página de Contacto',
            ariaScrollToTop: 'Volver arriba',
        },
        en: {
            title: 'Express',
            welcome: 'Welcome to EcoTips Express! Enter a question or topic related to sustainability and get quick, useful eco-friendly tips.',
            placeholder: 'Type your question or topic here...',
            getTipButton: 'Get EcoTip',
            initialResults: 'Results will appear here...',
            copied: 'Copied!',
            copyError: 'Copy error',
            nothingToCopy: 'Nothing to copy',
            validationError: 'Please enter a question or topic.',
            loading: 'Loading EcoTip...',
            apiErrorPrefix: 'Error:',
            apiErrorGeneric: 'Could not get Gemini response. Check your API key.',
            apiErrorConnection: 'An error occurred while processing your request. Please try again later.',
            apiKeyMissing: 'Error: Gemini API key is not configured. Please add your API key in the code.',
            copyTipButton: 'Copy Tip',
            shareTwitter: 'X',
            shareFacebook: 'Facebook',
            shareWhatsapp: 'WhatsApp',
            showQr: 'Show QR',
            hideQr: 'Hide QR',
            historyTitle: 'EcoTips History',
            historyPrompt: 'Question:',
            clearHistory: 'Clear History',
            contactTitle: 'Contact Us / Suggestions',
            contactName: 'Name:',
            contactEmail: 'Email:',
            contactMessage: 'Message:',
            contactSubmit: 'Send Message',
            contactNamePlaceholder: 'Your name',
            contactEmailPlaceholder: 'your.email@example.com',
            contactMessagePlaceholder: 'Write your message or suggestion here...',
            contactSuccess: 'Thank you for your message! We will get back to you soon.',
            contactError: 'There was an error sending your message. Please try again.',
            aboutUs: 'About Us',
            contact: 'Contact',
            copyright: '© 2024 EcoTips Express. All rights reserved.',
            ariaThemeToggleLight: 'Activate light mode',
            ariaThemeToggleDark: 'Activate dark mode',
            ariaInput: 'Input field for your question or topic',
            ariaGetTipButton: 'Get EcoTip',
            ariaLoadingSpinner: 'Loading results',
            ariaCopyButton: 'Copy generated tip',
            ariaShareTwitter: 'Share on X (Twitter)',
            ariaShareFacebook: 'Share on Facebook',
            ariaShareWhatsapp: 'Share on WhatsApp',
            ariaQrButton: 'Show QR code to share',
            ariaSocialNav: 'Social Media',
            ariaInstagram: 'Visit Instagram',
            ariaXTwitter: 'Visit X (Twitter)',
            ariaFacebook: 'Visit Facebook',
            ariaYoutube: 'Visit YouTube',
            ariaFooterNav: 'Footer links',
            ariaAboutUs: 'Go to About Us page',
            ariaContact: 'Go to Contact page',
            ariaScrollToTop: 'Scroll to top',
        },
        ru: {
            title: 'Экспресс',
            welcome: 'Добро пожаловать в EcoTips Express! Введите вопрос или тему, связанную с устойчивым развитием, и получите быстрые и полезные экологические советы.',
            placeholder: 'Введите ваш вопрос или тему здесь...',
            getTipButton: 'Получить ЭкоСовет',
            initialResults: 'Результаты появятся здесь...',
            copied: 'Скопировано!',
            copyError: 'Ошибка копирования',
            nothingToCopy: 'Нечего копировать',
            validationError: 'Пожалуйста, введите вопрос или тему.',
            loading: 'Загрузка ЭкоСовета...',
            apiErrorPrefix: 'Ошибка:',
            apiErrorGeneric: 'Не удалось получить ответ Gemini. Проверьте ваш API ключ.',
            apiErrorConnection: 'Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.',
            apiKeyMissing: 'Ошибка: Ключ API Gemini не настроен. Пожалуйста, добавьте ваш ключ API в код.',
            copyTipButton: 'Скопировать совет',
            shareTwitter: 'X',
            shareFacebook: 'Facebook',
            shareWhatsapp: 'WhatsApp',
            showQr: 'Показать QR',
            hideQr: 'Скрыть QR',
            historyTitle: 'История ЭкоСоветов',
            historyPrompt: 'Вопрос:',
            clearHistory: 'Очистить историю',
            contactTitle: 'Связаться с нами / Предложения',
            contactName: 'Имя:',
            contactEmail: 'Электронная почта:',
            contactMessage: 'Сообщение:',
            contactSubmit: 'Отправить сообщение',
            contactNamePlaceholder: 'Ваше имя',
            contactEmailPlaceholder: 'ваш.email@пример.com',
            contactMessagePlaceholder: 'Напишите ваше сообщение или предложение здесь...',
            contactSuccess: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.',
            contactError: 'Произошла ошибка при отправке вашего сообщения. Пожалуйста, попробуйте еще раз.',
            aboutUs: 'О нас',
            contact: 'Контакты',
            copyright: '© 2024 EcoTips Express. Все права защищены.',
            ariaThemeToggleLight: 'Активировать светлый режим',
            ariaThemeToggleDark: 'Активировать темный режим',
            ariaInput: 'Поле ввода para su pregunta o tema',
            ariaGetTipButton: 'Obtener EcoTip',
            ariaLoadingSpinner: 'Cargando resultados',
            ariaCopyButton: 'Copiar tip generado',
            ariaShareTwitter: 'Compartir en X (Twitter)',
            ariaShareFacebook: 'Compartir en Facebook',
            ariaShareWhatsapp: 'Compartir en WhatsApp',
            ariaQrButton: 'Mostrar código QR para compartir',
            ariaSocialNav: 'Redes Sociales',
            ariaInstagram: 'Visitar Instagram',
            ariaXTwitter: 'Visitar X (Twitter)',
            ariaFacebook: 'Visitar Facebook',
            ariaYoutube: 'Visitar YouTube',
            ariaFooterNav: 'Enlaces de pie de página',
            ariaAboutUs: 'Ir a la página Sobre Nosotros',
            ariaContact: 'Ir a la página de Contacto',
            ariaScrollToTop: 'Volver arriba',
        }
    };

    const availableLanguages = ['es', 'en', 'ru'];

    // --- Funcionalidad de Modo Claro/Oscuro ---
    function setTheme(theme) {
        const welcomeTextElement = document.getElementById('welcome-text'); // Obtener referencia aquí
        if (theme === 'dark') {
            document.body.classList.remove('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            if (themeToggle) themeToggle.setAttribute('aria-label', translations[currentLang].ariaThemeToggleDark);
            if (welcomeTextElement) welcomeTextElement.style.color = '#a0aec0'; // Color gris claro para modo oscuro
        } else {
            document.body.classList.add('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            if (themeToggle) themeToggle.setAttribute('aria-label', translations[currentLang].ariaThemeToggleLight);
            if (welcomeTextElement) welcomeTextElement.style.color = '#2d3748'; // Color negro para modo claro
        }
        localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // --- Funcionalidad de Cambio de Idioma ---
    let currentLang = localStorage.getItem('language') || 'es'; // Idioma por defecto

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang; // Actualiza el atributo lang del HTML

        const t = translations[lang];

        // Actualizar textos visibles
        if (mainTitle) mainTitle.textContent = t.title;
        if (welcomeText) welcomeText.textContent = t.welcome;
        if (userInput) userInput.placeholder = t.placeholder;
        if (getTipButton) getTipButton.textContent = t.getTipButton;
        if (initialResultsText) initialResultsText.textContent = t.initialResults;
        if (copyButtonText) copyButtonText.textContent = t.copyTipButton;
        // Usa qrCodeGenerated aquí, que ahora está declarada
        if (qrButtonText) qrButtonText.textContent = qrCodeGenerated ? t.hideQr : t.showQr; // Actualizar texto del botón QR
        if (historyTitle) historyTitle.textContent = t.historyTitle;
        if (clearHistoryButtonText) clearHistoryButtonText.textContent = t.clearHistory;
        if (contactTitle) contactTitle.textContent = t.contactTitle;
        if (contactNameLabel) contactNameLabel.textContent = t.contactName;
        if (contactEmailLabel) contactEmailLabel.textContent = t.contactEmail;
        if (contactMessageLabel) contactMessageLabel.textContent = t.contactMessage;
        if (contactSubmitButton) contactSubmitButton.textContent = t.contactSubmit;
        if (document.getElementById('contact-name')) document.getElementById('contact-name').placeholder = t.contactNamePlaceholder;
        if (document.getElementById('contact-email')) document.getElementById('contact-email').placeholder = t.contactEmailPlaceholder;
        if (document.getElementById('contact-message')) document.getElementById('contact-message').placeholder = t.contactMessagePlaceholder;
        if (aboutUsLink) aboutUsLink.textContent = t.aboutUs;
        if (contactLink) contactLink.textContent = t.contact;
        if (copyrightText) copyrightText.textContent = t.copyright;
        if (languageToggle) languageToggle.textContent = lang.toUpperCase();

        // Actualizar etiquetas aria-label
        if (themeToggle) themeToggle.setAttribute('aria-label', document.body.classList.contains('light-mode') ? t.ariaThemeToggleLight : t.ariaThemeToggleDark);
        if (userInput) userInput.setAttribute('aria-label', t.ariaInput);
        if (getTipButton) getTipButton.setAttribute('aria-label', t.ariaGetTipButton);
        if (loadingSpinner) loadingSpinner.setAttribute('aria-label', t.ariaLoadingSpinner);
        if (copyTipButton) copyTipButton.setAttribute('aria-label', t.ariaCopyButton);
        if (shareTwitterButton) shareTwitterButton.setAttribute('aria-label', t.ariaShareTwitter);
        if (shareFacebookButton) shareFacebookButton.setAttribute('aria-label', t.ariaShareFacebook);
        if (shareWhatsappButton) shareWhatsappButton.setAttribute('aria-label', t.ariaShareWhatsapp);
        if (qrCodeButton) qrCodeButton.setAttribute('aria-label', t.ariaQrButton);

        // Asegurarse de que estos elementos existan antes de establecer atributos
        if (socialIconsContainer) socialIconsContainer.setAttribute('aria-label', t.ariaSocialNav);
        if (instagramIcon) instagramIcon.setAttribute('aria-label', t.ariaInstagram);
        if (xTwitterIcon) xTwitterIcon.setAttribute('aria-label', t.ariaXTwitter);
        if (facebookIcon) facebookIcon.setAttribute('aria-label', t.ariaFacebook);
        if (youtubeIcon) youtubeIcon.setAttribute('aria-label', t.ariaYoutube);
        if (footerLinksContainer) footerLinksContainer.setAttribute('aria-label', t.ariaFooterNav);
        if (aboutUsLink) aboutUsLink.setAttribute('aria-label', t.ariaAboutUs);
        if (contactLink) contactLink.setAttribute('aria-label', t.ariaContact);
        if (scrollToTopButton) scrollToTopButton.setAttribute('aria-label', t.ariaScrollToTop);

        // Actualizar textos de los botones de compartir
        if (shareButtonLabels[0]) shareButtonLabels[0].textContent = t.shareTwitter;
        if (shareButtonLabels[1]) shareButtonLabels[1].textContent = t.shareFacebook;
        if (shareButtonLabels[2]) shareButtonLabels[2].textContent = t.shareWhatsapp;


        // Volver a cargar el historial para que los prompts se muestren en el idioma actual
        loadTipsFromHistory();
    }

    // Función para alternar el idioma
    function toggleLanguage() {
        const currentIndex = availableLanguages.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % availableLanguages.length;
        setLanguage(availableLanguages[nextIndex]);
    }

    if (languageToggle) languageToggle.addEventListener('click', toggleLanguage);

    // Inicializar idioma y tema al cargar la página
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Obtener tema guardado o 'dark' por defecto
    setLanguage(currentLang);
    setTheme(savedTheme);


    // --- Funcionalidad de Historial de Tips ---
    function saveTipToHistory(prompt, response) {
        let history = JSON.parse(localStorage.getItem('ecoTipsHistory')) || [];
        const newTip = {
            prompt: prompt,
            response: response,
            timestamp: new Date().toLocaleString(currentLang) // Formatear fecha según el idioma
        };
        history.unshift(newTip); // Añadir al principio para que los más recientes estén arriba
        // Limitar el historial a, por ejemplo, 10 tips
        if (history.length > 10) {
            history = history.slice(0, 10);
        }
        localStorage.setItem('ecoTipsHistory', JSON.stringify(history));
        loadTipsFromHistory(); // Actualizar la visualización del historial
    }

    function loadTipsFromHistory() {
        const history = JSON.parse(localStorage.getItem('ecoTipsHistory')) || [];
        if (history.length > 0) {
            if (tipHistorySection) tipHistorySection.style.display = 'block'; // Mostrar la sección de historial
            if (historyList) historyList.innerHTML = ''; // Limpiar la lista antes de volver a renderizar
            history.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="history-item-prompt">${translations[currentLang].historyPrompt} "${item.prompt}"</span>
                    <span class="history-item-response">${formatGeminiResponse(item.response)}</span>
                    <small>${item.timestamp}</small>
                `;
                if (historyList) historyList.appendChild(listItem);
            });
        } else {
            if (tipHistorySection) tipHistorySection.style.display = 'none'; // Ocultar si no hay historial
        }
    }

    // Función para limpiar el historial
    function clearHistory() {
        localStorage.removeItem('ecoTipsHistory');
        loadTipsFromHistory(); // Volver a cargar para que se oculte la sección
        showToast(translations[currentLang].clearHistory + ' exitoso!', 'success'); // Notificación de éxito
    }

    if (clearHistoryButton) clearHistoryButton.addEventListener('click', clearHistory);

    // --- Funcionalidad de Copiar Tip ---
    if (copyTipButton) copyTipButton.addEventListener('click', () => {
        const textToCopy = resultsDiv.innerText; // Obtener el texto visible en el div de resultados
        if (textToCopy && textToCopy !== translations[currentLang].initialResults) {
            // Usar document.execCommand('copy') por compatibilidad en iframes
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast(translations[currentLang].copied, 'success');
            } catch (err) {
                console.error('Error al copiar texto: ', err);
                showToast(translations[currentLang].copyError, 'error');
            } finally {
                document.body.removeChild(textArea);
            }
        } else {
            showToast(translations[currentLang].nothingToCopy, 'error');
        }
    });

    // --- Funcionalidad de Compartir Tip en Redes Sociales ---
    function getShareText() {
        // Obtener el texto del último tip generado para compartir
        const lastTip = JSON.parse(localStorage.getItem('ecoTipsHistory'))?.[0];
        if (lastTip) {
            // Limpiar el texto de la respuesta para compartir
            const cleanedResponse = lastTip.response.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\n/g, ' ').trim();
            return `EcoTip: "${lastTip.prompt}" - ${cleanedResponse.substring(0, 150)}... ${translations[currentLang].welcome.split('!')[0]}!`; // Usar parte del mensaje de bienvenida como eslogan
        }
        return translations[currentLang].welcome.split('!')[0] + '!'; // Usar parte del mensaje de bienvenida como eslogan
    }

    if (shareTwitterButton) shareTwitterButton.addEventListener('click', () => {
        const text = encodeURIComponent(getShareText());
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    });

    if (shareFacebookButton) shareFacebookButton.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });

    if (shareWhatsappButton) shareWhatsappButton.addEventListener('click', () => {
        const text = encodeURIComponent(getShareText() + `\n${window.location.href}`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });

    // --- Funcionalidad de QR Code ---
    if (qrCodeButton) qrCodeButton.addEventListener('click', () => {
        if (!qrCodeGenerated) {
            if (qrcodeContainer) qrcodeContainer.innerHTML = ''; // Limpiar por si acaso
            if (qrcodeContainer) new QRCode(qrcodeContainer, {
                text: window.location.href,
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
            qrCodeGenerated = true;
            if (qrButtonText) qrButtonText.textContent = translations[currentLang].hideQr;
            if (qrcodeContainer) qrcodeContainer.style.display = 'inline-block'; // Mostrar el contenedor del QR
        } else {
            if (qrcodeContainer) qrcodeContainer.innerHTML = '';
            qrCodeGenerated = false;
            if (qrButtonText) qrButtonText.textContent = translations[currentLang].showQr;
            if (qrcodeContainer) qrcodeContainer.style.display = 'none'; // Ocultar el contenedor del QR
        }
    });

    // --- Funcionalidad de Formulario de Contacto ---
    if (contactForm) contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío real del formulario
        // Aquí iría la lógica para enviar el formulario a un servidor
        // Por ahora, solo mostraremos un toast de confirmación
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        console.log(`Mensaje de contacto recibido:\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`);

        // Simular un envío exitoso
        showToast(translations[currentLang].contactSuccess, 'success');

        // Limpiar el formulario
        contactForm.reset();
    });

    // --- Funcionalidad de Notificaciones Toast ---
    function showToast(message, type = 'success', duration = 3000) {
        // Elimina cualquier toast de carga existente antes de mostrar uno nuevo
        const existingLoadingToast = document.querySelector('.toast.loading');
        if (existingLoadingToast) {
            existingLoadingToast.remove();
        }

        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (type === 'error') {
            toast.classList.add('error');
        } else if (type === 'loading') {
            toast.classList.add('loading'); // Añadir clase para identificar el toast de carga
        }
        toast.textContent = message;
        if (toastContainer) toastContainer.appendChild(toast);

        // Forzar reflow para que la transición CSS funcione
        void toast.offsetWidth;

        toast.classList.add('show');

        // Si la duración es 0, el toast no se eliminará automáticamente
        if (duration > 0) {
            setTimeout(() => {
                toast.classList.remove('show');
                toast.addEventListener('transitionend', () => {
                    toast.remove();
                }, { once: true });
            }, duration);
        }
    }

    // --- Funcionalidad de Scroll hacia arriba ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Mostrar el botón después de 200px de scroll
            if (scrollToTopButton) scrollToTopButton.classList.add('show');
        } else {
            if (scrollToTopButton) scrollToTopButton.classList.remove('show');
        }
    });

    if (scrollToTopButton) scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });


    /**
     * Procesa el texto de Gemini para eliminar asteriscos y formatearlo como lista HTML.
     * @param {string} geminiText El texto crudo recibido de Gemini.
     * @returns {string} El texto formateado como una lista HTML.
     */
    function formatGeminiResponse(geminiText) {
        // Eliminar asteriscos de negrita (**)
        let cleanedText = geminiText.replace(/\*\*(.*?)\*\*/g, '$1');

        // Dividir el texto en líneas y formatear como lista ordenada
        const lines = cleanedText.split('\n').filter(line => line.trim() !== '');
        let formattedHtml = '<ol>';
        lines.forEach(line => {
            // Eliminar números de lista si Gemini ya los incluyó (ej. "1. ")
            const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
            if (cleanLine) {
                formattedHtml += `<li>${cleanLine}</li>`;
            }
        });
        formattedHtml += '</ol>';
        return formattedHtml;
    }

    /**
     * Realiza una llamada a la API de Gemini para obtener una respuesta.
     * @param {string} promptText El texto de la pregunta o tema para Gemini.
     * @returns {Promise<string>} La respuesta de Gemini o un mensaje de error.
     */
    async function getGeminiResponse(promptText) {
        // Validación de entrada: No permitir campos vacíos
        if (!promptText) {
            if (resultsDiv) resultsDiv.innerHTML = `<p class="text-center text-red-400" role="alert">${translations[currentLang].validationError}</p>`;
            if (resultsDiv) resultsDiv.style.animation = 'none'; // No animar mensajes de error
            return; // Detener la ejecución si el campo está vacío
        }

        // Verifica si la clave de API está configurada
        if (!apiKey) {
            if (resultsDiv) resultsDiv.innerHTML = `<p class="text-center text-red-400" role="alert">${translations[currentLang].apiKeyMissing}</p>`;
            showToast(translations[currentLang].apiKeyMissing, 'error');
            return;
        }

        // Limpia el div de resultados
        if (resultsDiv) resultsDiv.innerHTML = '';
        // Oculta los botones de acción del tip y de compartir
        if (tipActionsContainer) tipActionsContainer.style.display = 'none';
        if (shareButtonsContainer) shareButtonsContainer.style.display = 'none';
        // Muestra el spinner de carga
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        if (resultsDiv) resultsDiv.style.minHeight = '250px'; // Asegura que el espacio se mantenga durante la carga

        // Muestra el toast de carga
        showToast(translations[currentLang].loading, 'loading', 0); // Duración 0 para que no desaparezca automáticamente

        try {
            const chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: promptText }] });

            const payload = {
                contents: chatHistory,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                }
            };

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error en la llamada a la API de Gemini:', errorData);
                showToast(`${translations[currentLang].apiErrorPrefix} ${errorData.error.message || translations[currentLang].apiErrorGeneric}`, 'error');
                return `${translations[currentLang].apiErrorPrefix} ${errorData.error.message || translations[currentLang].apiErrorGeneric}`;
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                console.warn('Estructura de respuesta inesperada de Gemini:', result);
                showToast(translations[currentLang].apiErrorGeneric, 'error');
                return translations[currentLang].apiErrorGeneric;
            }

        } catch (error) {
            console.error('Error al conectar con la API de Gemini:', error);
            showToast(translations[currentLang].apiErrorConnection, 'error');
            return translations[currentLang].apiErrorConnection;
        } finally {
            // Oculta el spinner de carga al finalizar (éxito o error)
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            // Elimina el toast de carga
            const loadingToast = document.querySelector('.toast.loading');
            if (loadingToast) {
                loadingToast.remove();
            }
        }
    }

    // Listener para el evento click del botón
    if (getTipButton) getTipButton.addEventListener('click', async () => {
        const userTopic = userInput.value.trim();

        // La validación de entrada se maneja dentro de getGeminiResponse ahora
        const geminiPrompt = `Dame 5 consejos breves y prácticos sobre ${userTopic} para cuidar el medio ambiente.`;
        const rawGeminiResponse = await getGeminiResponse(geminiPrompt);

        // Solo formatear y mostrar si rawGeminiResponse no es un mensaje de error
        if (rawGeminiResponse && !rawGeminiResponse.startsWith(translations[currentLang].apiErrorPrefix)) {
            const formattedResponse = formatGeminiResponse(rawGeminiResponse); // Formatear la respuesta
            if (resultsDiv) resultsDiv.innerHTML = formattedResponse; // Muestra la respuesta formateada
            // Aplicar animación de aparición a los resultados
            if (resultsDiv) resultsDiv.style.animation = 'none'; // Reset animation
            if (resultsDiv) void resultsDiv.offsetWidth; // Trigger reflow
            if (resultsDiv) resultsDiv.style.animation = 'fadeIn 0.8s ease-out';

            // Mostrar botones de acción del tip
            if (tipActionsContainer) tipActionsContainer.style.display = 'flex';
            if (shareButtonsContainer) shareButtonsContainer.style.display = 'flex'; // Mostrar también los botones de compartir

            // Guardar el tip en el historial
            saveTipToHistory(userTopic, rawGeminiResponse);
            showToast('EcoTip generado con éxito!', 'success'); // Notificación de éxito al generar
        } else if (rawGeminiResponse) {
            // Si es un mensaje de error, simplemente mostrarlo
            if (resultsDiv) resultsDiv.innerHTML = `<p class="text-center text-red-400" role="alert">${rawGeminiResponse}</p>`;
            if (resultsDiv) resultsDiv.style.animation = 'none';
            if (tipActionsContainer) tipActionsContainer.style.display = 'none'; // Ocultar botones si hay error
            if (shareButtonsContainer) shareButtonsContainer.style.display = 'none';
            // El toast de error ya se muestra dentro de getGeminiResponse
        }
    });

    // Opcional: Permitir enviar con la tecla Enter en el input
    if (userInput) userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            if (getTipButton) getTipButton.click();
        }
    });

    // Cargar historial al inicio
    loadTipsFromHistory();
    
    // Inicializar particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});
