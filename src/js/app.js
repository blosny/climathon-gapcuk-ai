/**
 * Gapçuk AI - Ana Uygulama Mantığı (Controller)
 */

import { CONFIG, INITIAL_REPORTS } from './data.js';
import { fetchUnyeWeather } from './weather.js';
import { initMap, renderReports } from './map.js';

let reports = [...INITIAL_REPORTS];
let currentWeatherData = null;

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Haritayı başlat
    initMap('map', reports);

    // 2. Canlı hava verisini ve külleme riskini çek
    await loadWeather();

    // 3. Metrikleri ve listeyi render et
    updateMetrics();
    renderReportList();

    // 4. Etkinlik dinleyicilerini bağla
    setupEventListeners();
});

async function loadWeather() {
    const weatherBadge = document.getElementById('weather-badge');
    const riskIndicator = document.getElementById('risk-indicator');
    const riskText = document.getElementById('risk-recommendation');
    
    currentWeatherData = await fetchUnyeWeather();

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
            <div class="risk-bar-container">
                <div class="risk-header">
                    <span>Mantar Spor Kuluçka Riski:</span>
                    <strong style="color:${currentWeatherData.riskColor}">%${currentWeatherData.riskScore} (${currentWeatherData.riskLevel})</strong>
                </div>
                <div class="risk-bar">
                    <div class="risk-fill" style="width:${currentWeatherData.riskScore}%; background-color:${currentWeatherData.riskColor}"></div>
                </div>
            </div>
        `;
    }

    if (riskText) {
        riskText.innerHTML = `<b>AI Tavsiyesi:</b> ${currentWeatherData.recommendation}`;
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

function setupEventListeners() {
    // Form Gönderimi (Çiftçi Bildirimi)
    const form = document.getElementById('farmer-report-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const villageSelect = document.getElementById('form-village');
            const sacksInput = document.getElementById('form-sacks');
            const farmerInput = document.getElementById('form-farmer');
            const roadRadio = document.querySelector('input[name="road-status"]:checked');

            const village = villageSelect.value;
            const sacks = parseInt(sacksInput.value, 10) || 25;
            const farmer = farmerInput.value.trim() || 'Yerel Üretici';
            const isBlocked = roadRadio ? roadRadio.value === 'blocked' : true;

            // Rastgele Ünye köy koordinatı sapması
            const baseCoords = CONFIG.unyeCenter;
            const lat = baseCoords[0] + (Math.random() - 0.5) * 0.15;
            const lon = baseCoords[1] + (Math.random() - 0.5) * 0.15;

            const newReport = {
                id: reports.length + 1,
                village: village,
                farmer: farmer,
                phone: "+90 53* *** ** **",
                lat: lat,
                lon: lon,
                sacks: sacks,
                status: isBlocked ? "Tek Şerit Yol Tıkalı" : "Harman Kenarı",
                urgency: isBlocked ? "critical" : "medium",
                time: "Az Önce",
                roadBlocked: isBlocked
            };

            reports.unshift(newReport);

            // Harita ve metrikleri güncelle
            renderReports(reports);
            updateMetrics();
            renderReportList();

            // WhatsApp Simülasyonuna mesaj ekle
            triggerWhatsAppMessage(farmer, village, sacks, isBlocked);

            // Bildirim mesajı göster
            showToast(`Bildirim Alındı: ${village} için ${sacks} çuvallık talep sisteme eklendi ve rota güncellendi!`);
            
            // Formu sıfırla
            farmerInput.value = '';
            sacksInput.value = '30';
        });
    }

    // Tab Geçişleri
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

function triggerWhatsAppMessage(farmer, village, sacks, isBlocked) {
    const chatContainer = document.getElementById('whatsapp-messages');
    if (!chatContainer) return;

    const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const farmerBubble = `
        <div class="chat-bubble farmer-bubble">
            <span class="chat-sender">Üretici: ${farmer} (${village}):</span>
            <p>Selamlar, patoz bitti. ${isBlocked ? 'Yol tek şerit kapandı, acil açılması lazım.' : 'Harman kenarında bekletiyoruz.'} Yaklaşık ${sacks} çuval gapçuk var.</p>
            <span class="chat-time">${timeStr}</span>
        </div>
    `;

    const botReplyHtml = generateSmartBotResponse(farmer, village, sacks, isBlocked);

    const botBubble = `
        <div class="chat-bubble bot-bubble">
            <span class="chat-sender">Gapçuk AI Asistanı:</span>
            <p>${botReplyHtml}</p>
            <span class="chat-time">${timeStr}</span>
        </div>
    `;

    chatContainer.innerHTML += farmerBubble;
    setTimeout(() => {
        chatContainer.innerHTML += botBubble;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 600);
}

/**
 * Durumsal & Akıllı Yanıt Üreteci
 * Hava durumu, yol durumu, çuval hacmi ve filo iş yüküne göre mantıksal cevaplar üretir
 */
function generateSmartBotResponse(farmer, village, sacks, isBlocked) {
    const weather = currentWeatherData || { temp: 16.5, humidity: 84, riskScore: 80, riskLevel: "Kritik" };
    const totalSacks = reports.reduce((sum, r) => sum + r.sacks, 0);
    const tons = (sacks * 0.045).toFixed(1);

    // 1. Yağmurlu / Yüksek Nem / Külleme Riski
    if (weather.humidity >= 78 || weather.riskScore >= 70) {
        return `Aleyküm selam ${farmer}! <strong>Konum:</strong> ${village} talebiniz sisteme alındı.<br/><br/>
        <strong>Mikroklima Uyarısı:</strong> Ünye'de hava şu an <strong>${weather.temp}°C</strong> ve nem <strong>%${weather.humidity}</strong>! Külleme mantarı kuluçka riski <strong>%${weather.riskScore} (${weather.riskLevel})</strong>.<br/>
        <em>Islak züruf bekledikçe spor saçar. Lütfen atığı fındık ocaklarına atma, üzerini hava alacak brandayla ört veya kireçle. Kesinlikle ateşe verme!</em><br/><br/>
        ${isBlocked ? '<strong>Acil Yol Önceliği:</strong> Tek şerit tıkandığı için kepçeli öncü araç doğrudan köyünüze yönlendirildi.' : '<strong>Yol Açık:</strong> Harman kenarında beklettiğiniz için teşekkürler.'}<br/>
        <strong>Lojistik Durumu:</strong> Köy yollarındaki yoğun sis ve çamur nedeniyle araçlarımızda <strong>1-2 saatlik güvenlik gecikmesi</strong> yaşanabilir. Tahmini alım saati: <strong>14:00 - 15:30</strong> arası. Şoförümüz köye girmeden 15 dk önce arayacaktır.`;
    }

    // 2. Güneşli / Düşük Nem Durumu
    if (weather.humidity < 65 || weather.temp >= 20) {
        return `Aleyküm selam ${farmer}! Bildiriminiz Ziraat Odası dinamik rotasına alındı.<br/><br/>
        <strong>Hava Durumu:</strong> Ünye'de hava şu an açık ve <strong>${weather.temp}°C</strong>. Acil mantar riski düşük; atığı harman kenarında güvenle bekletebilirsiniz. Yangın tehlikesine karşı ateşe vermeyiniz!<br/><br/>
        <strong>Ekipler Yolda:</strong> Ekiplerimiz Tekkiraz-Yazkonağı hattında seyir halinde. ${isBlocked ? 'Yol kapalı olduğu için rotada 1. sıraya alındınız (~40 dk içinde harmanındayız).' : 'Standart rotada tahmini 1 saat içinde kapınızdayız.'}<br/>
        <em>Bu ${sacks} çuval (~${tons} ton) atığınız Çarşamba BES tesisine ulaştırılacaktır.</em>`;
    }

    // 3. Yüksek Hacim & İş Yükü
    if (sacks >= 40 || totalSacks >= 220) {
        return `Aleyküm selam ${farmer}! <strong>${sacks} çuvallık (~${tons} ton)</strong> yüksek hacimli atık bildiriminiz alındı.<br/><br/>
        <strong>Filo & İş Yükü:</strong> Bugün havzada <strong>${totalSacks} çuvallık</strong> talep var. Ziraat Odası, Çarşamba BES sevkiyatı için <strong>2. ek kamyonu devreye aldı</strong>.<br/>
        <strong>Hava:</strong> ${weather.temp}°C, %${weather.humidity} nem. Şartlar toplama için uygun.<br/><br/>
        ${isBlocked ? 'Tek şerit kapalı olduğu için kepçeli kamyon önceliği köyünüze verdi (Tahmini: 45 dk).' : 'Toplama aracı bugün 13:00-14:30 arasında harmanınızdan alacaktır.'}`;
    }

    // 4. Standart Durum
    return `Aleyküm selam ${farmer}! <strong>${village}</strong> için <strong>${sacks} çuval</strong> gapçuk sisteme işlendi.<br/><br/>
    <strong>Canlı Durum:</strong> Hava ${weather.temp}°C, nem %${weather.humidity}. Ekiplerimiz yola çıktı.<br/>
    ${isBlocked ? 'Yol kapalı bildirildi, acil müdahale protokolü devrede.' : 'Harman kenarında güvenle bekletiliyor.'}<br/>
    Tahmini varış: <strong>1.5 saat içinde</strong> kapınızdayız. Fındık ocaklarına atmadığınız ve yakmadığınız için teşekkür ederiz!`;
}

/**
 * Hızlı Soru Butonları İşleyicisi (Jüri Simülasyonu)
 */
window.askBotQuestion = function(type) {
    const chatContainer = document.getElementById('whatsapp-messages');
    if (!chatContainer) return;

    const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const weather = currentWeatherData || { temp: 16.5, humidity: 84, riskScore: 80, riskLevel: "Kritik" };

    let questionText = "";
    let answerText = "";

    if (type === 'weather') {
        questionText = "Hava yağmurlu ve sisli gözüküyor, harman kenarındaki gapçuğu ne yapayım?";
        answerText = `
            Üreticimiz selamlar! Şu an Ünye'de hava <strong>${weather.temp}°C</strong> ve nem <strong>%${weather.humidity}</strong> seviyesinde. 
            Mantar sporları bu nemde hızla çoğalır. Gapçuğun üstünü hava alacak bir brandayla örtün, kesinlikle fındık ocaklarının dibine dökmeyin (kök boğazını çürütür). 
            Eğer evde sönmemiş kireç varsa üzerine hafifçe serpin. Ekiplerimiz yağış durumuna göre toplama yapacaktır, kesinlikle yakmayın!
        `;
    } else if (type === 'eta') {
        questionText = "Kamyon nerede, hava muhalefetinden dolayı gecikir mi?";
        answerText = `
            Selamlar! OSRM canlı navigasyonuna göre toplama filomuz şu an Pelitliyatak hattında 4. durağı tamamlıyor. 
            ${weather.humidity > 75 ? 'Yoğun sis ve kaygan köy yolları sebebiyle araçlarımız güvenlik protokolü gereği 1-2 saat gecikmeli seyrediyor.' : 'Hava açık, herhangi bir gecikme öngörülmüyor.'} 
            Şoförümüz köyünüze varmadan 15 dakika önce WhatsApp veya telefonla haber verecektir.
        `;
    } else if (type === 'road') {
        questionText = "Bizim köyün yolu tek şerit tamamen kapandı, kamyon yolu açabilir mi?";
        answerText = `
            Acil durum bildirimi kayda geçti! Tek şerit yol tıkanıklığı Ziraat Odası Operatör Masası'na iletildi. 
            Rotadaki öncü kepçeli araç doğrudan koordinatlarınıza yönlendirildi. Lütfen yolu açmaya çalışırken atığı dere yatağına veya orman kenarına dökmeyiniz, ekiplerimiz intikal halindedir!
        `;
    }

    const qBubble = `
        <div class="chat-bubble farmer-bubble">
            <span class="chat-sender">Üretici (Ünye):</span>
            <p>${questionText}</p>
            <span class="chat-time">${timeStr}</span>
        </div>
    `;

    const aBubble = `
        <div class="chat-bubble bot-bubble">
            <span class="chat-sender">Gapçuk AI Asistanı:</span>
            <p>${answerText}</p>
            <span class="chat-time">${timeStr}</span>
        </div>
    `;

    chatContainer.innerHTML += qBubble;
    setTimeout(() => {
        chatContainer.innerHTML += aBubble;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 450);
};

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
