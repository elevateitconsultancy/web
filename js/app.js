document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic
    function switchTab(tabId) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.add('hidden'));

        const targetTab = document.getElementById('tab-' + tabId);
        if (targetTab) {
            targetTab.classList.remove('hidden');
        }

        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => btn.classList.remove('active-tab'));
        
        const activeNav = document.getElementById('nav-' + tabId);
        if (activeNav) {
            activeNav.classList.add('active-tab');
        }

        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach Tab triggers
    document.querySelectorAll('.nav-tab-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.currentTarget.getAttribute('data-tab');
            if (tab) switchTab(tab);
        });
    });

    document.querySelectorAll('.brand-home-trigger').forEach(el => {
        el.addEventListener('click', () => switchTab('home'));
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobileMenu');
            if (menu) menu.classList.toggle('hidden');
        });
    }

    // Pre-fill specific service in consultation form
    document.querySelectorAll('.service-req-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceName = e.currentTarget.getAttribute('data-service');
            switchTab('consultation');
            const serviceSelect = document.getElementById('consultService');
            if (serviceSelect && serviceName) {
                serviceSelect.value = serviceName;
            }
        });
    });

    // Chatbot Toggle & Interaction Logic
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    function toggleChatbot() {
        if (chatbotWindow) {
            chatbotWindow.classList.toggle('hidden');
            if (!chatbotWindow.classList.contains('hidden') && chatInput) {
                chatInput.focus();
            }
        }
    }

    if (chatbotToggleBtn) chatbotToggleBtn.addEventListener('click', toggleChatbot);
    if (chatbotCloseBtn) chatbotCloseBtn.addEventListener('click', toggleChatbot);

    function sendChatMessage() {
        if (!chatInput) return;
        const msg = chatInput.value.trim();
        if (!msg) return;

        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        // Securely append user message using textContent to prevent XSS
        const userBubble = document.createElement('div');
        userBubble.className = 'bg-brand-gold/10 border border-brand-gold/30 text-white p-3 rounded-xl ml-auto max-w-[85%]';
        userBubble.textContent = msg;
        chatMessages.appendChild(userBubble);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulated Automated Response linked to elevateitconsultancy@gmail.com
        setTimeout(() => {
            const botBubble = document.createElement('div');
            botBubble.className = 'bg-brand-800/60 p-3 rounded-xl border border-slate-700/60 max-w-[85%]';
            botBubble.innerHTML = `Thank you for your inquiry. Your query has been logged and our partner team will review it shortly. For immediate escalation, please email <a href="mailto:elevateitconsultancy@gmail.com" class="text-brand-gold underline font-mono">elevateitconsultancy@gmail.com</a> or use our WhatsApp direct link below.`;
            chatMessages.appendChild(botBubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    }

    if (chatSendBtn) chatSendBtn.addEventListener('click', sendChatMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    // Initialize Formspree AJAX SDK
    if (window.formspree) {
        window.formspree('initForm', { formElement: '#consultationForm', formId: 'xdeazbqv' });
    }

    // Initialize Active Tab on Page Load
    switchTab('home');
});