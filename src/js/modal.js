/**
 * Gapçuk AI - Onboarding & Bilgi Merkezi Modalı (ES6 Modülü)
 * Girişte 3 temel soru (Gapçuk nedir, neden bahçeye dökülmez, neden yakılmaz)
 * Jüri ve detay inceleme için genişletilebilir 8 soruluk tam operasyon rehberi
 */

const STORAGE_KEY = 'gapcuk_faq_dismissed';
let isFaqExpanded = false;

export function initModal() {
    // 1. ESC tuşu ile kapatma desteği
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFaqModal();
        }
    });

    // 2. İlk ziyarette otomatik açılma (Sadece ilk 3 soru ile sade onboarding)
    const isDismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!isDismissed) {
        setTimeout(() => {
            openFaqModal(false); // İlk girişte sadece 3 temel soru
        }, 500);
    }
}

export function openFaqModal(expandAll = false) {
    const modal = document.getElementById('faq-modal');
    if (modal) {
        setFaqExpanded(expandAll);
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 15);
    }
}

export function toggleFaqCards() {
    setFaqExpanded(!isFaqExpanded);
}

export function setFaqExpanded(expanded) {
    isFaqExpanded = expanded;
    const grid = document.querySelector('.faq-grid');
    const expandText = document.getElementById('faq-expand-text');
    const modalSubtitle = document.getElementById('modal-faq-subtitle');

    if (grid) {
        if (isFaqExpanded) {
            grid.classList.add('faq-expanded');
        } else {
            grid.classList.remove('faq-expanded');
        }
    }

    if (expandText) {
        expandText.innerText = isFaqExpanded
            ? 'Daha Az Soru Göster (İlk 3 Soruya Dön)'
            : 'Tüm Saha & Operasyonel Soruları Gör (5 Ek Soru)';
    }

    if (modalSubtitle) {
        modalSubtitle.innerText = isFaqExpanded
            ? 'Jüri ve Değerlendiriciler İçin 8 Soruda Bölgesel Biyokütle Döngüselliği'
            : 'Jüri ve Değerlendiriciler İçin 3 Temel Saha Gerçeği (Giriş Rehberi)';
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
window.toggleFaqCards = toggleFaqCards;
window.setFaqExpanded = setFaqExpanded;
