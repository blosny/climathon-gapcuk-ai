/**
 * Gapçuk AI - Canlı Hava Durumu & Külleme Risk Motoru
 * Open-Meteo API (Açık ve Ücretsiz) Entegrasyonu
 */

export async function fetchUnyeWeather() {
    try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=41.1328&longitude=37.2844&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=Europe%2FIstanbul";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const current = data.current || {};
            const temp = Math.round((current.temperature_2m ?? 18.5) * 10) / 10;
            const humidity = Math.round(current.relative_humidity_2m ?? 82);
            const precip = current.precipitation ?? 0.0;
            const risk = calculateMildewRisk(temp, humidity);

            return {
                temp,
                humidity,
                precip,
                riskScore: risk.score,
                riskLevel: risk.level,
                riskColor: risk.color,
                recommendation: risk.recommendation,
                isLive: true
            };
        }
    } catch (e) {
        console.warn("Open-Meteo API erişilemedi, simüle mikroklima verisi kullanılıyor:", e);
    }

    // Fallback simüle verisi (Karadeniz sonbahar normalleri)
    const fallbackRisk = calculateMildewRisk(16.5, 84);
    return {
        temp: 16.5,
        humidity: 84,
        precip: 0.1,
        riskScore: fallbackRisk.score,
        riskLevel: fallbackRisk.level,
        riskColor: fallbackRisk.color,
        recommendation: fallbackRisk.recommendation,
        isLive: false
    };
}

/**
 * Erysiphe corylacea (Külleme Mantarı) Biyolojik Risk Algoritması
 * Optimum spor yayılım koşulları: 18-26°C sıcaklık ve > %70 bağıl nem
 */
export function calculateMildewRisk(temp, humidity) {
    let score = 20;

    // Sıcaklık faktörü
    if (temp >= 18 && temp <= 26) {
        score += 45;
    } else if (temp >= 14 && temp <= 30) {
        score += 25;
    }

    // Nem faktörü
    if (humidity >= 80) {
        score += 35;
    } else if (humidity >= 65) {
        score += 20;
    }

    score = Math.min(100, Math.max(10, score));

    if (score >= 70) {
        return {
            score,
            level: "Kritik",
            color: "#E53E3E", // kırmızı
            recommendation: "Mantar sporları kuluçka evresinde! Gapçuk 48 saat içinde toplanmalı veya Trichoderma biyo-solüsyonu / kireç uygulanmalıdır. Kesinlikle ateşe vermeyin!"
        };
    } else if (score >= 45) {
        return {
            score,
            level: "Orta Risk",
            color: "#DD6B20", // turuncu
            recommendation: "Hava nemi yükseliyor. Yol kenarındaki gapçuk yığınlarını hava alacak şekilde branda ile koruyun, doğrudan fındık ocaklarına dökmeyin."
        };
    } else {
        return {
            score,
            level: "Düşük Risk",
            color: "#38A169", // yeşil
            recommendation: "Külleme spor aktivitesi düşük. Standart toplama takvimi uygulanabilir."
        };
    }
}
