/**
 * Gapçuk AI - Ana Uygulama Kontrolörü (Master Orchestrator)
 * Ekolojik Biyokütle Döngüselliği & Külleme Erken Uyarı Platformu
 * Siemens & UP School Climathon 2026
 */

import { CONFIG, INITIAL_REPORTS } from './data.js';
import { fetchUnyeWeather } from './weather.js';
import { initMap, renderReports } from './map.js';
import { initChatSimulator, updateChatWeather } from './chat.js';
import { initModal } from './modal.js';

let reports = [...INITIAL_REPORTS];
let currentWeatherData = null;

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Haritayı başlat
    initMap('map', reports);

    // 2. Canlı hava ve mikroklima risk motorunu çek
    await loadWeather();

    // 3. Metrikleri ve durak listesini güncelle
    updateMetrics();
    renderReportList();

    // 4. WhatsApp simülatörünü ve çiftçi formunu bağla
    initChatSimulator(currentWeatherData, handleNewReport);

    // 5. Sekme geçişlerini başlat
    setupTabNavigation();

    // 6. Jüri & Onboarding Bilgi Merkezi Modalını başlat (İlk ziyarette otomatik açılır)
    initModal();
});

async function loadWeather() {
    const weatherBadge = document.getElementById('weather-badge');
    const riskIndicator = document.getElementById('risk-indicator');
    const riskText = document.getElementById('risk-recommendation');
    
    currentWeatherData = await fetchUnyeWeather();
    updateChatWeather(currentWeatherData);

    if (weatherBadge) {
        weatherBadge.innerHTML = `
            <div class="weather-chip">
                <span class="weather-temp">
                    <svg class="icon-svg sm" viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                    ${currentWeatherData.temp}°C
                </span>
                <span class="weather-sep">|</span>
                <span class="weather-hum">
                    <svg class="icon-svg sm" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                    %${currentWeatherData.humidity} Nem
                </span>
                <span class="weather-live-tag">${currentWeatherData.isLive ? 'Canlı Veri' : 'Tahmini'}</span>
            </div>
        `;
    }

    if (riskIndicator) {
        riskIndicator.innerHTML = `
            <div class="risk-indicator-box">
                <span class="risk-level-badge ${currentWeatherData.riskLevel === 'Kritik' ? 'critical' : (currentWeatherData.riskLevel === 'Orta' ? 'moderate' : 'low')}">
                    <svg class="icon-svg sm" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    <span>Mantar Spor Kuluçka Riski: %${currentWeatherData.riskScore} (${currentWeatherData.riskLevel})</span>
                </span>
            </div>
        `;
    }

    if (riskText) {
        riskText.innerHTML = `<strong>AI Saha Tavsiyesi:</strong> ${currentWeatherData.recommendation}`;
    }
}

function updateMetrics() {
    const totalSacks = reports.reduce((acc, cur) => acc + cur.sacks, 0);
    const totalTons = Math.round((totalSacks * CONFIG.kgPerSack / 1000) * 10) / 10;
    const valueTL = Math.round(totalTons * CONFIG.pricePerTonTL);
    const valueUSD = Math.round(valueTL / CONFIG.usdRate);
    const co2Offset = Math.round(totalTons * CONFIG.co2OffsetPerTon * 10) / 10;
    const roadBlockedCount = reports.filter(r => r.roadBlocked).length;

    document.getElementById('metric-sacks').innerText = `${totalSacks} Çuval`;
    document.getElementById('metric-tons').innerText = `${totalTons} Ton Biyokütle`;

    document.getElementById('metric-val-tl').innerText = `${valueTL.toLocaleString('tr-TR')} ₺`;
    document.getElementById('metric-val-usd').innerText = `$${valueUSD.toLocaleString('en-US')} (BES Değeri)`;

    document.getElementById('metric-road-blocked').innerText = `${roadBlockedCount} Nokta`;
    document.getElementById('metric-co2').innerText = `${co2Offset} Ton CO₂e`;
}

function renderReportList() {
    const tableBody = document.getElementById('reports-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    reports.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = item.urgency === 'critical' ? 'row-critical' : '';
        tr.innerHTML = `
            <td><strong>${item.village}</strong><br/><small class="text-muted">${item.farmer}</small></td>
            <td><span class="badge-pill">${item.sacks} çuval</span></td>
            <td><span class="urgency-badge ${item.urgency}">${item.urgency === 'critical' ? 'Kritik' : (item.urgency === 'high' ? 'Yüksek' : 'Normal')}</span></td>
            <td>${item.roadBlocked ? '<span class="status-blocked">Yol Kapalı</span>' : '<span class="status-open">Açık</span>'}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function handleNewReport(newReport) {
    reports.unshift(newReport);
    renderReports(reports);
    updateMetrics();
    renderReportList();
}

function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });
}

window.switchRole = function(role) {
    const opBtn = document.getElementById('role-operator-btn');
    const faBtn = document.getElementById('role-farmer-btn');
    if (opBtn) opBtn.classList.toggle('active', role === 'operator');
    if (faBtn) faBtn.classList.toggle('active', role === 'farmer');
    
    if (role === 'operator') {
        const tabOp = document.getElementById('tab-btn-operator');
        if (tabOp) tabOp.click();
    } else {
        const tabFa = document.getElementById('tab-btn-farmer');
        if (tabFa) tabFa.click();
    }
};
