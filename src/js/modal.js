/**
 * Gapçuk AI - Onboarding & Bilgi Merkezi Modalı (ES6 Modülü)
 * Jüri ve değerlendiriciler için 6 soruluk saha gerçekleri rehberi
 */

const STORAGE_KEY = 'gapcuk_faq_dismissed';

export function initModal() {
    // 1. ESC tuşu ile kapatma desteği
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFaqModal();
        }
    });

    // 2. İlk ziyarette otomatik açılma (Onboarding Auto-Popup)
    const isDismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!isDismissed) {
        // Harita ve DOM elementlerinin render olması için kısa yumuşak gecikme
        setTimeout(() => {
            openFaqModal();
        }, 500);
    }
}

export function openFaqModal() {
    const modal = document.getElementById('faq-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Animasyon için reflow sonrası active class'ı eklenir
        setTimeout(() => modal.classList.add('active'), 15);
    }
}

export function closeFaqModal(rememberDismiss = false) {
    const modal = document.getElementById('faq-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 250);

        if (rememberDismiss) {
            sessionStorage.setItem(STORAGE_KEY, 'true');
        }
    }
}

// Global scope window bağlamaları (HTML onclick erişimi için)
window.openFaqModal = openFaqModal;
window.closeFaqModal = closeFaqModal;
