# 🌰 Gapçuk AI: Fındık Zürufu Biyokütle Döngüselliği & Külleme Erken Uyarı Platformu

<p align="center">
  <img src="src/assets/logo.png" alt="Gapçuk AI Logo" width="140" style="border-radius:50%; box-shadow:0 0 20px rgba(16,185,129,0.5);">
</p>

<p align="center">
  <strong>Ordu / Ünye Pilot Havzası • Biyokütle Atık Yönetimi, OSRM Dinamik Rota Optimizasyonu ve AI Külleme Tahmini</strong>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/COP31-Cutting%20Waste%20by%20Half%20by%202035-10B981.svg" alt="COP31"></a>
  <a href="#"><img src="https://img.shields.io/badge/Siemens-Resource%20Efficiency%20%26%20Circularity-0284C7.svg" alt="Siemens"></a>
  <a href="#"><img src="https://img.shields.io/badge/UN%20SDG-12%20Responsible%20Consumption-F59E0B.svg" alt="SDG 12"></a>
  <a href="#"><img src="https://img.shields.io/badge/Region-Ordu%20%2F%20%C3%9Cnye%2C%20T%C3%BCrkiye-D97706.svg" alt="Location"></a>
  <a href="#"><img src="https://img.shields.io/badge/Stack-HTML5%20%2F%20Vanilla%20CSS%20%2F%20Leaflet%20%2F%20OSRM-059669.svg" alt="Stack"></a>
</p>

---

## 📌 Problem ve Saha Gerçeği (Ordu / Ünye)
Türkiye, dünya fındık üretiminin **%70'ini** karşılamaktadır. Her yıl hasat sonrasında açığa çıkan yaklaşık **175.000 ton fındık zürufu (yöresel adıyla *gapçuk*)**, plansız yönetim nedeniyle iki büyük çevre ve tarım krizine yol açmaktadır:

1. **Çiğ Olarak Fındık Ocaklarına Saçılması (%80-90):** Üreticiler iyi niyetle gübre olsun diye çiğ gapçuğu bahçeye sermektedir. Bu durum hem topraktaki azotu tüketmekte (*azot hırsızlığı*) hem de fındıkta %30'a varan rekolte kaybına yol açan **Külleme Hastalığı (*Erysiphe corylacea*)** mantarı için kışlama yatağı oluşturmaktadır. Çiftçiler yoğun kimyasal fungisit kullanmak zorunda kalmaktadır.
2. **Açıkta Yakma ve Yol Kapanmaları (%5-10):** Dar köy yollarını kapatan dev gapçuk yığınları ateşe verilmekte; yoğun duman, PM2.5 partikül maddesi ve sera gazı salımı yaratmaktadır.

---

## 🚀 Çözüm: Gapçuk AI Üçlü Modüler Platform

Gapçuk AI; fındık zürufunu bir çevre felaketi ve hastalık yuvası olmaktan çıkarıp, **biyokütle enerjisi ve yüksek değerli biyo-komposta** dönüştüren uçtan uca karar destek sistemidir.

### 1. 🗺️ GapçukRoute™ (Gerçek Yol Takibi & Dinamik BES Sevk Paneli)
* **OSRM (*Open Source Routing Machine*) Entegrasyonu:** Kuş uçuşu düz çizgiler yerine; Ünye merkezden başlayarak Tekkiraz, Yazkonağı, Pelitliyatak gibi dağ köylerinin virajlı asfalt yollarını ve D010 karayolunu birebir takip eden gerçek rotalama motoru.
* **Nearest-Neighbor TSP Optimizasyonu:** Çöp/züruf nakliye kamyonu için duraklar mantıksal sıralamayla (`#1`, `#2`, `#3`...) dizilir; plansız turlamaya kıyasla **%34 yakıt tasarrufu** sağlanır.
* **Hedef Biyokütle Alıcısı:** Toplanan gapçuk, Samsun Çarşamba'da yer alan **Oltan & Köleoğlu Biyokütle Enerji Santrali'ne (27 MWe)** ve yerel seralara tonu **~2.200 TL** değerinde hammadde olarak sevk edilir.

<p align="center">
  <img src="src/assets/screenshots/tab1_route.png" alt="GapçukRoute OSRM Haritası ve Durak Sıralaması" width="90%">
</p>

---

### 2. 📱 GapçukBot™ (Sıfır Dirençli Çiftçi WhatsApp AI Asistanı)
* **Uygulama İndirme Zorunluluğu Yok:** Karadenizli üretici karmaşık mobil uygulamalar indirmeden patoz bittiğinde WhatsApp üzerinden tek tıkla konum ve çuval adedi bildirir.
* **Canlı Mikroklimaya Göre Durumsal Yanıtlar:** Open-Meteo API'den çekilen canlı sıcaklık ve nem durumuna göre bot çiftçiye özel akıllı yanıt üretir:
  * *Yüksek Nem / Yağmur Varsa:* *"Nem %84, külleme riski yüksek. Atığı fındık ocaklarına atma, üzerini hava alacak brandayla ört veya kireçle. Sis nedeniyle kamyonumuz 1-2 saat gecikmeli gelecek."*
  * *Hava Açık / Güneşli İse:* *"Hava güneşli, mantar riski düşük, kireç atmana gerek yok. Ekiplerimiz yolda, 45 dk içinde harmanındayız."*
* **Acil Yol Açma Protokolü:** Tek şerit köy yolu kapandığında sistem kırmızı alarm verir ve kepçeli öncü araç doğrudan o koordinata sevk edilir.

<p align="center">
  <img src="src/assets/screenshots/tab2_whatsapp.png" alt="GapçukBot WhatsApp Simülasyonu ve Hızlı Sorular" width="90%">
</p>

---

### 3. 🍄 GapçukBio™ (Külleme Erken Uyarısı & Biyomimikri Kompostlama)
* **Biyolojik Risk Algoritması:** Sıcaklık (18-26°C) ve nem (>%70) verileriyle *Erysiphe corylacea* mantar sporlarının kuluçka riski canlı hesaplanır.
* **Trichoderma Biyo-Kompost Reçetesi:** Kamyonun hemen ulaşamadığı uzak mahallelerde, gapçuk yığınına faydalı *Trichoderma* mantarı aşılanarak zararlı külleme mantarı biyolojik olarak yok edilir; 6 aylık çürüme 21 günde kokusuz organik komposta dönüştürülür.
* **Bilimsel Doğrulama (Scientific Grounding):** Platformdaki parametreler **TÜBİTAK/KTAE (Proje No: 118O452)**, **Ordu Üniversitesi Ziraat Fakültesi**, **Oltan & Köleoğlu BES Teknik Raporu** ve **IPCC 2019 Biyokütle Emisyon Metodolojisi**'ne dayandırılmıştır.

<p align="center">
  <img src="src/assets/screenshots/tab3_bio.png" alt="GapçukBio Külleme Riski ve Bilimsel Kaynakça" width="90%">
</p>

---

## 🛠️ Mimari & Teknoloji Altyapısı
* **Arayüz (Frontend):** Modern Semantik HTML5, Glassmorphism Vanilla CSS (Yeşil Biyo-Zümrüt & Sıcak Gapçuk Sarısı Renk Paleti), Responsive Tasarım.
* **Harita & Navigasyon:** Leaflet.js, OpenStreetMap & Esri World Imagery Uydu Katmanı, **OSRM Driving Routing API** (Sıfır ticari token, %100 açık kaynak).
* **Veri & Mikroklima:** Open-Meteo Canlı Meteoroloji API (Ünye koordinatları 41.13°K, 37.28°D).
* **AI Karar Destek:** Google Gemini / AI Studio tabanlı karar modeli + ES6 modüler durum yöneticisi.

---

## 🏃 Yerel Ortamda Çalıştırma

Projeyi çalıştırmak için harici bir kütüphane veya paket yüklemesine gerek yoktur:

```bash
# Depoyu klonlayın
git clone https://github.com/blosny/climathon-gapcuk-ai.git
cd climathon-gapcuk-ai

# Web sunucusunu başlatın
python -m http.server 3000 --directory src

# Tarayıcınızda açın:
# http://localhost:3000
```

---

## 🎯 Climathon 2026 Eşleşmeleri
* **COP31 Hedefi:** *Cutting waste by half by 2035* (Yıllık 175.000 tonluk organik tarımsal biyokütleyi ekonomiye kazandırma)
* **Siemens Odak Alanı:** *Resource Efficiency & Circularity*
* **BM Sürdürülebilir Kalkınma Amaçları:** SKA 12 (Sorumlu Üretim ve Tüketim), SKA 13 (İklim Eylemi), SKA 15 (Karasal Yaşam)

---

**Geliştirici:** Taha Buğra Çiçek • Ünye / Ordu  
*Siemens & UP School Climathon 2026 Hackathonu Kapsamında Geliştirilmiştir.*
