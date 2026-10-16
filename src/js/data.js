/**
 * Gapçuk AI - Veri ve Konfigürasyon Katmanı
 * Ordu / Ünye pilot bölgesi başlangıç verileri ve ekonomik parametreler
 */

export const CONFIG = {
    unyeCenter: [41.1328, 37.2844],
    defaultZoom: 11,
    kgPerSack: 45, // 1 çuval yaş gapçuk ortalama 45 kg
    pricePerTonTL: 2200, // Fındık kabuğu endeksli ton biyokütle piyasa değeri
    usdRate: 34.5,
    co2OffsetPerTon: 1.45, // Yakılmayan biyokütle + linyit ikamesi
    buyerFacility: {
        name: "Oltan & Köleoğlu Biyokütle Enerji Santrali",
        location: "Samsun / Çarşamba (Eğercili)",
        capacity: "27 MWe",
        coords: [41.1980, 36.7260],
        distanceKm: 42
    }
};

export const INITIAL_REPORTS = [
    {
        id: 1,
        village: "Yazkonağı Köyü",
        farmer: "Mustafa Yılmaz",
        phone: "+90 532 *** ** 14",
        lat: 41.0920,
        lon: 37.2650,
        sacks: 35,
        status: "Yol Kenarında Yığın",
        urgency: "critical", // critical, high, medium, low
        time: "10:30 (Bugün)",
        roadBlocked: true
    },
    {
        id: 2,
        village: "Tekkiraz Mahallesi",
        farmer: "Ali Çiçek",
        phone: "+90 542 *** ** 28",
        lat: 41.0425,
        lon: 37.2410,
        sacks: 50,
        status: "Harman Çıkışı (Tek Şerit Yol)",
        urgency: "critical",
        time: "09:15 (Bugün)",
        roadBlocked: true
    },
    {
        id: 3,
        village: "Yeşilkent Köyü",
        farmer: "Hasan Kaya",
        phone: "+90 535 *** ** 91",
        lat: 40.9850,
        lon: 37.2150,
        sacks: 28,
        status: "Yol Kenarı",
        urgency: "medium",
        time: "Dün 17:00",
        roadBlocked: false
    },
    {
        id: 4,
        village: "Pelitliyatak Köyü",
        farmer: "Osman Şahin",
        phone: "+90 533 *** ** 44",
        lat: 41.0210,
        lon: 37.3300,
        sacks: 42,
        status: "Dar Yol Ağzı",
        urgency: "high",
        time: "08:45 (Bugün)",
        roadBlocked: true
    },
    {
        id: 5,
        village: "İnkur Mahallesi",
        farmer: "Mehmet Demir",
        phone: "+90 544 *** ** 73",
        lat: 41.1150,
        lon: 37.3620,
        sacks: 20,
        status: "Avlu Önü",
        urgency: "low",
        time: "Dün 14:20",
        roadBlocked: false
    },
    {
        id: 6,
        village: "Erenyurt Köyü",
        farmer: "Ahmet Aydın",
        phone: "+90 536 *** ** 55",
        lat: 41.0650,
        lon: 37.1950,
        sacks: 45,
        status: "Köy Yolu Kenarı",
        urgency: "critical",
        time: "11:00 (Bugün)",
        roadBlocked: true
    }
];
