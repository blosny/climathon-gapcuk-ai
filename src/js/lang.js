/**
 * Gapçuk AI - Çoklu Dil Motoru (TR / EN Language Engine)
 * COP31, Global Sustainability Challenge & Uluslararası Jüri Desteği
 */

export const TRANSLATIONS = {
    tr: {
        system_status: "SİSTEM AKTİF: Ordu / Ünye Pilot Sahası • Temiz Enerji & Biyo-Güvenlik Altyapısı",
        partner_bes: "Hedef: Oltan & Köleoğlu Çarşamba BES (27 MWe)",
        protocol: "Protokol: COP31 & TÜBİTAK-TOVAG-121O442",
        brand_subtitle: "<span>Ordu / Ünye Pilot Havzası</span><span>•</span><span>Fındık Zürufu Döngüsel Lojistik & Külleme Önleme Konsolu</span>",
        btn_faq: "Gapçuk Rehberi & SSS (8 Soru)",
        role_operator: "Operatör Paneli",
        role_farmer: "Çiftçi Görünümü",
        tab_map: "Dinamik Rota & Lojistik",
        tab_farmer: "Çiftçi WhatsApp Bildirimi",
        tab_bio: "GapçukBio & Trichoderma",
        kpi_sacks_title: "Toplam Toplanan Züruf",
        kpi_sacks_sub: "Kapasite Hedefi: 300 Çuval/Gün",
        kpi_sacks_footer: "Ordu/Ünye 4 Pilot Köy Toplamı",
        kpi_value_title: "Biyokütle Enerji Değeri",
        kpi_value_sub: "Çarşamba BES: 2.200 ₺/Ton Alım Garantisi",
        kpi_value_footer: "Yenilenebilir Biyo-Elektrik Satış Değeri",
        kpi_roads_title: "Tıkalı Köy Yolu",
        kpi_roads_sub: "Öncelikli Tahliye Sırasında",
        kpi_roads_footer: "Patoz Sonrası Daralan Asfalt & Köy Hatları",
        kpi_co2_title: "Karbon Yutak Kazancı",
        kpi_co2_sub: "Açıkta Yakma ve Çürüme Önleme",
        kpi_co2_footer: "IPCC 2019 Biyokütle Emisyon Faktörü",
        telemetry_cycle: "Döngü Süresi",
        telemetry_distance: "Toplam Mesafe",
        telemetry_diesel: "Dizel Sarfiyatı",
        telemetry_truck: "Tır Doluluk Oranı",
        recenter_btn: "Görünümü Ortala",
        sidebar_sequence_title: "OSRM Toplama & Müdahale Sırası",
        bes_dest_tag: "Hedef Santral Kantar Teslimi",
        bes_dest_desc: "Samsun / Çarşamba (42 km) • Günlük Fındık Zürufu Kabulü Aktif"
    },
    en: {
        system_status: "SYSTEM ACTIVE: Ordu / Ünye Pilot Basin • Clean Energy & Biosecurity Infrastructure",
        partner_bes: "Target: Oltan & Köleoğlu Çarşamba Biomass Plant (27 MWe)",
        protocol: "Protocol: COP31 & TÜBİTAK-TOVAG-121O442",
        brand_subtitle: "<span>Ordu / Ünye Pilot Basin</span><span>•</span><span>Hazelnut Husk Circular Logistics & Mildew Prevention Console</span>",
        btn_faq: "Gapçuk Field Guide & FAQ (8 Qs)",
        role_operator: "Operator Console",
        role_farmer: "Farmer View",
        tab_map: "Dynamic Route & Logistics",
        tab_farmer: "Farmer WhatsApp Reporting",
        tab_bio: "GapçukBio & Trichoderma",
        kpi_sacks_title: "Total Collected Husk",
        kpi_sacks_sub: "Capacity Target: 300 Sacks/Day",
        kpi_sacks_footer: "Ordu/Ünye 4 Pilot Villages Total",
        kpi_value_title: "Biomass Energy Value",
        kpi_value_sub: "Çarşamba BES: 2,200 ₺/Ton PPA Guarantee",
        kpi_value_footer: "Renewable Bio-Electricity Market Value",
        kpi_roads_title: "Blocked Village Roads",
        kpi_roads_sub: "In Priority Evacuation Queue",
        kpi_roads_footer: "Post-Threshing Blocked Rural Corridors",
        kpi_co2_title: "Carbon Offset Gain",
        kpi_co2_sub: "Roadside Burning & Decay Prevention",
        kpi_co2_footer: "IPCC 2019 Biomass Emission Factor",
        telemetry_cycle: "Cycle Time",
        telemetry_distance: "Total Distance",
        telemetry_diesel: "Diesel Consumption",
        telemetry_truck: "Fleet Load Capacity",
        recenter_btn: "Recenter View",
        sidebar_sequence_title: "OSRM Collection & Dispatch Queue",
        bes_dest_tag: "Target Power Plant Weighbridge Delivery",
        bes_dest_desc: "Samsun / Çarşamba (42 km) • Daily Hazelnut Husk Intake Active"
    }
};

let currentLang = 'tr';

export function initLanguage() {
    const saved = localStorage.getItem('gapcuk_lang') || 'tr';
    setLanguage(saved);

    window.switchLanguage = (lang) => {
        setLanguage(lang);
    };
}

export function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gapcuk_lang', lang);

    // Düğme aktifliğini güncelle
    const btnTr = document.getElementById('lang-btn-tr');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnTr) btnTr.classList.toggle('active', lang === 'tr');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    // data-i18n etiketlerini güncelle
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.tr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (dict[key].includes('<span')) {
                el.innerHTML = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });

    document.documentElement.lang = lang;
}
