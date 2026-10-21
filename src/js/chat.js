/**
 * Gapçuk AI - WhatsApp Simülatörü & Çiftçi Bildirim Modülü (ES6 Modülü)
 * Çiftçi - Ziraat Odası - BES döngüsel iletişim akışı
 */

import { CONFIG } from './data.js';

let currentWeatherRef = null;

export function initChatSimulator(weatherData, onReportAdded) {
    currentWeatherRef = weatherData;

    // 1. Çiftçi Formu Gönderim Dinleyicisi
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

            // Koordinat hesaplama (Ünye havza sapması)
            const baseCoords = CONFIG.unyeCenter;
            const lat = baseCoords[0] + (Math.random() - 0.5) * 0.15;
            const lon = baseCoords[1] + (Math.random() - 0.5) * 0.15;

            const newReport = {
                id: Date.now(),
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

            // Callback ile ana kontrolöre yeni raporu bildir
            if (typeof onReportAdded === 'function') {
                onReportAdded(newReport);
            }

            // WhatsApp simülasyonuna mesaj düşür
            triggerWhatsAppMessage(farmer, village, sacks, isBlocked);

            // Toast bildirimi
            showToast(`Bildirim Alındı: ${village} için ${sacks} çuvallık talep sisteme eklendi ve rota güncellendi!`);

            // Form alanlarını sıfırla
            farmerInput.value = '';
            sacksInput.value = '30';
        });
    }

    // 2. Global Hızlı Soru Fonksiyonu Bağlantısı
    window.askBotQuestion = (type) => handleQuickQuestion(type);
}

export function updateChatWeather(weatherData) {
    currentWeatherRef = weatherData;
}

export function triggerWhatsAppMessage(farmer, village, sacks, isBlocked) {
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

function generateSmartBotResponse(farmer, village, sacks, isBlocked) {
    const weather = currentWeatherRef || { temp: 16.5, humidity: 84, riskScore: 80, riskLevel: "Kritik" };
    const tons = (sacks * 0.045).toFixed(1);

    if (weather.humidity >= 78 || weather.riskScore >= 70) {
        return `Aleyküm selam ${farmer}! <strong>Konum:</strong> ${village} talebiniz sisteme alındı.<br/><br/>
        <strong>Mikroklima Uyarısı:</strong> Ünye'de hava şu an <strong>${weather.temp}°C</strong> ve nem <strong>%${weather.humidity}</strong>! Külleme mantarı kuluçka riski <strong>%${weather.riskScore} (${weather.riskLevel})</strong>.<br/>
        <em>Islak züruf bekledikçe spor saçar. Lütfen atığı fındık ocaklarına atma, üzerini hava alacak brandayla ört veya kireçle. Kesinlikle ateşe verme!</em><br/><br/>
        ${isBlocked ? '<strong>Acil Yol Önceliği:</strong> Tek şerit tıkandığı için kepçeli öncü araç doğrudan köyünüze yönlendirildi.' : '<strong>Yol Açık:</strong> Harman kenarında beklettiğiniz için teşekkürler.'}<br/>
        <strong>Lojistik Durumu:</strong> Köy yollarındaki yoğun sis ve çamur nedeniyle araçlarımızda <strong>1-2 saatlik güvenlik gecikmesi</strong> yaşanabilir. Tahmini alım saati: <strong>14:00 - 15:30</strong> arası. Şoförümüz köye girmeden 15 dk önce arayacaktır.`;
    }

    if (weather.humidity < 65 || weather.temp >= 20) {
        return `Aleyküm selam ${farmer}! Bildiriminiz Ziraat Odası dinamik rotasına alındı.<br/><br/>
        <strong>Hava Durumu:</strong> Ünye'de hava şu an açık ve <strong>${weather.temp}°C</strong>. Acil mantar riski düşük; atığı harman kenarında güvenle bekletebilirsiniz. Yangın tehlikesine karşı ateşe vermeyiniz!<br/><br/>
        <strong>Ekipler Yolda:</strong> Ekiplerimiz Tekkiraz-Yazkonağı hattında seyir halinde. ${isBlocked ? 'Yol kapalı olduğu için rotada 1. sıraya alındınız (~40 dk içinde harmanındayız).' : 'Standart rotada tahmini 1 saat içinde kapınızdayız.'}<br/>
        <em>Bu ${sacks} çuval (~${tons} ton) atığınız Çarşamba BES tesisine ulaştırılacaktır.</em>`;
    }

    return `Aleyküm selam ${farmer}! <strong>${village}</strong> için <strong>${sacks} çuval</strong> gapçuk sisteme işlendi.<br/><br/>
    <strong>Canlı Durum:</strong> Hava ${weather.temp}°C, nem %${weather.humidity}. Ekiplerimiz yola çıktı.<br/>
    ${isBlocked ? 'Yol kapalı bildirildi, acil müdahale protokolü devrede.' : 'Harman kenarında güvenle bekletiliyor.'}<br/>
    Tahmini varış: <strong>1.5 saat içinde</strong> kapınızdayız. Fındık ocaklarına atmadığınız ve yakmadığınız için teşekkür ederiz!`;
}

function handleQuickQuestion(type) {
    const chatContainer = document.getElementById('whatsapp-messages');
    if (!chatContainer) return;

    const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const weather = currentWeatherRef || { temp: 16.5, humidity: 84, riskScore: 80, riskLevel: "Kritik" };

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
}

export function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
