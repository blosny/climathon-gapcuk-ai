# 🌰 Gapçuk AI: Fındık Zürufu Biyokütle Döngüselliği & Külleme Erken Uyarı Platformu

<p align="center">
  <img src="src/assets/logo.png" alt="Gapçuk AI Logo" width="160" style="border-radius:50%; box-shadow:0 0 30px rgba(16,185,129,0.5);">
</p>

<p align="center">
  <strong>Ordu / Ünye Pilot Havzası • Biyokütle Atık Yönetimi, OSRM Dinamik Rota Optimizasyonu, İnteraktif Döngü Simülasyonu ve Gemini Destekli Külleme Tahmini</strong>
</p>

<p align="center">
  <a href="https://climathon-gapcuk-ai.vercel.app"><img src="https://img.shields.io/badge/Canlı%20Uygulama-Vercel%20Production-10B981?style=for-the-badge&logo=vercel" alt="Vercel Live Demo"></a>
  <a href="https://climathon-gapcuk-ai.vercel.app/simulasyon.html"><img src="https://img.shields.io/badge/İnteraktif%20Simülasyon-Döngüyü%20Başlat-059669?style=for-the-badge&logo=html5" alt="Interactive Simulation"></a>
  <a href="https://github.com/blosny/climathon-gapcuk-ai"><img src="https://img.shields.io/badge/GitHub-Açık%20Kaynak%20Repo-181717?style=for-the-badge&logo=github" alt="GitHub Repo"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/COP31-Cutting%20Waste%20by%20Half%20by%202035-10B981.svg" alt="COP31">
  <img src="https://img.shields.io/badge/Siemens-Resource%20Efficiency%20%26%20Circularity-0284C7.svg" alt="Siemens">
  <img src="https://img.shields.io/badge/UN%20SDG-12%20Responsible%20Consumption-F59E0B.svg" alt="SDG 12">
  <img src="https://img.shields.io/badge/Region-Ordu%20%2F%20%C3%9Cnye%2C%20T%C3%BCrkiye-D97706.svg" alt="Location">
  <img src="https://img.shields.io/badge/Stack-Vanilla%20JS%20%2F%20Leaflet%20%2F%20OSRM-059669.svg" alt="Stack">
</p>

---

## 🔄 Gapçuk Döngüsü: Canlı Biyokütle & Döngüsel Ekonomi Simülasyonu

Proje kapsamında; fındık zürufunun dağ köyü harmanından çıkıp enerji santraline ve organik gübreye dönüşüm serüvenini uçtan uca simüle eden tek sayfalık reaktif bir **İnteraktif Döngü Simülatörü** (`src/simulasyon.html`) geliştirilmiştir.

<div align="center">

👉 **[İnteraktif Simülatörü Tarayıcıda Tam Ekran Başlatın ↗](https://climathon-gapcuk-ai.vercel.app/simulasyon.html)**

</div>

### 🧬 Simülasyonda Canlandırılan 4 Temel Aşama:
1. **Harman & Patoz (Atık Ayrışması):** 350.000 ton zürufun köylerde yığılması, 50:1 C/N oranıyla topraktan azot çalması ve külleme mantarı kuluçkası.
2. **GapçukRoute™ & Lojistik (Akıllı Toplama):** Ziraat Odası araçlarının OSRM rota optimizasyonuyla dik dağ yollarında %34 yakıt tasarrufu sağlayarak köy yollarını açması.
3. **Çarşamba BES (Enerji Dönüşümü):** 3.820 kcal/kg alt ısıl değerli temiz biyokütlenin 27 MWe kurulu güçteki santralde 2.200 TL/ton ile elektriğe dönüştürülmesi.
4. **Trichoderma Biyo-Kompost (Toprağa Geri Dönüş):** Külleme sporlarını parazitleyen faydalı mikroorganizmalarla 21 günde A-sınıfı kompost üretimi ve çiftçiye ücretsiz dağıtımı.

---

## 📸 Canlı Platform Arayüzleri

Platformun tüm modülleri gerçek veriler, dinamik OSRM yol ağı ve canlı hava durumu telemetrisi ile tam fonksiyonel olarak çalışmaktadır:

### 1. 🗺️ GapçukRoute™ · Dinamik Rota & Filo Telemetrisi
<p align="center">
  <img src="src/assets/screenshots/tab1_route.png" alt="GapçukRoute OSRM Canlı Haritası" width="100%" style="border-radius:10px; border:1px solid rgba(16,185,129,0.3); box-shadow:0 4px 20px rgba(0,0,0,0.4);">
</p>
<p align="center"><em>Ordu/Ünye kırsalındaki gerçek asfalt ve köy yolları geometrisi, aciliyet ağırlıklı TSP rotalama ve %34 dizel tasarrufu.</em></p>

<br>

### 2. 📱 GapçukBot™ · WhatsApp AI & Canlı Mikroklima Asistanı
<p align="center">
  <img src="src/assets/screenshots/tab2_whatsapp.png" alt="GapçukBot WhatsApp Canlı Çiftçi Bildirimi" width="100%" style="border-radius:10px; border:1px solid rgba(16,185,129,0.3); box-shadow:0 4px 20px rgba(0,0,0,0.4);">
</p>
<p align="center"><em>Çiftçinin WhatsApp bildirimine Open-Meteo anlık bağıl nem ve sıcaklık verileriyle üretilen mikroklima & külleme mantarı erken uyarısı.</em></p>

<br>

### 3. 🍄 GapçukBio™ · Çarşamba BES & Biyomimikri Kompost Paneli
<p align="center">
  <img src="src/assets/screenshots/tab3_bio.png" alt="GapçukBio Çarşamba BES ve Kompost Paneli" width="100%" style="border-radius:10px; border:1px solid rgba(16,185,129,0.3); box-shadow:0 4px 20px rgba(0,0,0,0.4);">
</p>
<p align="center"><em>Oltan & Köleoğlu Çarşamba BES kantar şartnamesi, Trichoderma 21 günlük kompost fermantasyonu ve doğrulanmış birim ekonomi tablosu.</em></p>

---

## 📌 Problem ve Saha Gerçeği (Ordu / Ünye)
Türkiye, dünya fındık üretiminin **%70'ini** karşılamaktadır. Her yıl hasat sonrasında açığa çıkan yaklaşık **350.000 ton fındık zürufu (yöresel adıyla *gapçuk*)**, plansız yönetim ve kırsal lojistik eksikliği nedeniyle üç büyük krize yol açmaktadır:

1. **Çiğ Olarak Fındık Ocaklarına Saçılması (%80-90):** Üreticiler iyi niyetle gübre olsun diye çiğ gapçuğu bahçeye sermektedir. Bu durum hem topraktaki azotu tüketmekte (*C:N 45-50:1 Azot Hırsızlığı*) hem de fındıkta %30'a varan rekolte kaybına yol açan **Külleme Hastalığı (*Erysiphe corylacea*)** mantarı için kışlama yatağı oluşturmaktadır.
2. **Açıkta Yakma ve Heyelan Tehlikesi (%5-10):** Dar dağ köy yollarını ve dere yataklarını tıkayan dev yığınlar kaymakamlıklarca yasaklanmıştır. Açıkta yakılan her 1 ton züruf atmosfere **1.45 ton CO₂e sera gazı** ve yoğun PM2.5 partikül maddesi salmaktadır.
3. **Pazar Tıkanıklığı (Market Failure):** Bölgedeki biyokütle enerji santralleri (Çarşamba BES - 27 MWe) sınırsız hammadde talep etmekte ve tonuna 2.200 TL ödemektedir. Ancak santral araç göndermemekte (*santral kantar teslim*), küçük üretici ise 40 çuval için tek başına nakliye tutamamaktadır. **Gapçuk AI, bu lojistik ve koordinasyon açığını kapatan köprüdür.**

---

## 🚀 Çözüm: Gapçuk AI Üçlü Modüler Platform

### 1. 🗺️ GapçukRoute™ (Gerçek Yol Takibi & 2 Kademeli Hibrit Lojistik)
* **OSRM (*Open Source Routing Machine*) Entegrasyonu:** Kuş uçuşu düz çizgiler yerine; Ünye Ziraat Odası'ndan başlayarak Tekkiraz, Yazkonağı, Pelitliyatak ve Erenyurt dağ köylerinin virajlı asfalt yollarını ve D010 arterini birebir takip eden gerçek rotalama motoru.
* **Aciliyet Ağırlıklı TSP Optimizasyonu:** Çöp/züruf nakliye filosu için duraklar aciliyet ve coğrafi mesafeye göre (`#1`, `#2`, `#3`...) dizilir; plansız turlamaya kıyasla **%34 yakıt tasarrufu** sağlanır.
* **2 Kademeli Hibrit Lojistik (Hub & Spoke):** Dik dağ yollarında züruf **10-12 tonluk kırsal damperli ring araçlarıyla** toplanır. Ünye Ziraat Odası merkezinde konsolide edilerek Samsun Çarşamba BES kantar teslimine **tek bir 25 tonluk tırla** sevk edilir.
* **Hedef Biyokütle Alıcısı:** Oltan & Köleoğlu Çarşamba BES (27 MWe) kantar teslimi (42 km).

### 2. 📱 GapçukBot™ (Sıfır Dirençli Çiftçi WhatsApp AI Asistanı)
* **Uygulama İndirme Zorunluluğu Yok:** Karadenizli üretici karmaşık mobil uygulamalar indirmeden patoz bittiğinde WhatsApp üzerinden tek tıkla konum ve çuval adedi bildirir.
* **Canlı Mikroklimaya Göre Durumsal Yanıtlar:** Open-Meteo API'den çekilen canlı sıcaklık ve nem durumuna göre bot çiftçiye özel akıllı yanıt üretir:
  * *Yüksek Nem / Yağmur Varsa:* *"Nem %84, külleme riski yüksek. Atığı fındık ocaklarına atma, üzerini hava alacak brandayla ört. Sis nedeniyle toplama ekibimiz 1-2 saat gecikmeli gelecek."*
  * *Hava Açık / Güneşli İse:* *"Hava güneşli, mantar riski düşük. Ekiplerimiz yolda, 45 dk içinde harmanındayız."*
* **Acil Yol Açma Protokolü:** Tek şerit köy yolu kapandığında sistem kırmızı alarm verir ve kepçeli öncü araç doğrudan o koordinata sevk edilir.

### 3. 🍄 GapçukBio™ (Külleme Erken Uyarısı & Biyomimikri Kompostlama)
* **Biyolojik Risk Algoritması:** Sıcaklık (18-26°C) ve nem (>%70) verileriyle *Erysiphe corylacea* mantar sporlarının kuluçka riski canlı hesaplanır.
* **Trichoderma Biyo-Kompost Reçetesi:** Gapçuk yığınına faydalı *Trichoderma spp.* mikroorganizmaları pülverize edilerek zararlı külleme mantarı parazitlenir; 6 aylık çürüme 21 günde kokusuz A sınıfı organik komposta dönüştürülür.
* **Sıfır Boş Kilometre (Backhauling):** Toplama araçları köye giderken kasasında bir önceki partinin olgun kompostunu taşır, üreticinin kapısına bırakır; dönüşte boşalan kasaya taze zürufu yükler.
* **Bilimsel Doğrulama (Scientific Grounding):** Platform parametreleri **TÜBİTAK/KTAE (Proje No: 118O452)**, **Ordu Üniversitesi Ziraat Fakültesi**, **Oltan & Köleoğlu BES Şartnamesi** ve **IPCC 2019 Biyokütle Emisyon Metodolojisi**'ne dayandırılmıştır.

---

## 💰 Birim Ekonomi & Kendi Kendini Finanse Eden İş Modeli

| Kalem | Çiftçi Boyutu (40 Çuval / 1.8t) | Filo İşletme Boyutu (10 Tonluk Günlük Sefer) |
|---|---|---|
| **Girdi** | 40 Çuval Ham Gapçuk Teslimi | 220 Çuval Konsolide Biyokütle (9.9 Ton) |
| **Doğrudan Kazanç** | 2 Çuval (100 kg) Ücretsiz Biyo-Kompost (~1.200 ₺) | Çarşamba BES Satış Hasılatı: **+21.780 ₺** |
| **İndirim & Teşvik** | %30 Ziraat Odası Gübre Kuponu (~700 ₺) | Kompost Üretim Maliyeti (Trichoderma): **-100 ₺** |
| **Masraf Tasarrufu** | Harman Temizleme (800 ₺) + Külleme İlacı (1.500 ₺) | Dizel Sarfiyatı (28.5L) & Şoför: **-3.500 ₺** |
| **NET DEĞER** | **4.200 ₺ / Harman Sezonu Tasarruf** | **+18.180 ₺ / Gün Net Kasa Kârı** |

---

## 🏭 Endüstriyel Satın Alma Doğrulaması (Market Validation)
Oltan & Köleoğlu Biyokütle Enerji Santrali (Çarşamba BES - 27 MWe) Satın Alma Şartnamesi ile teyit edilen parametreler:
* **Fiyatlandırma:** 2.200 TL / Ton (Kantar Teslim)
* **Alt Isıl Değer (LHV):** 3.820 kcal/kg (Linyit kömürüne eşdeğer temiz kalori)
* **Nem Kabul Sınırı:** Maksimum %35 (Sahada el tipi nem probu ile test edilir; %35 altı santrale, %35 üstü biyo-kompost tesisine yönlendirilir).
* **Alım Kapasitesi:** Sezon boyunca sınırsız tarımsal biyokütle alımı.

---

## 🛠️ Mimari & Teknoloji Altyapısı
* **Arayüz (Frontend):** Modern Semantik HTML5, Glassmorphism Vanilla CSS (Biyo-Zümrüt Yeşil & Fındık Sarısı), Çoklu Dil Desteği (`[ TR | EN ]`).
* **Harita & Navigasyon:** Leaflet.js, OpenStreetMap Obsidian Dark Filtresi, Esri World Imagery Uydu Katmanı, **OSRM Driving Routing API** (Sıfır ticari bağımlılık, %100 açık kaynak).
* **Veri & Mikroklima:** Open-Meteo Canlı Meteoroloji API (Ünye koordinatları 41.13°K, 37.28°D).
* **AI Karar Destek:** Google AI Studio / Gemini Prompting Engine & WhatsApp simülatörü.
* **İnteraktif Simülasyon:** React 18, Babel Standalone, Lucide React (Tek dosya reaktif mimari).
* **Barındırma & CI/CD:** Vercel Global Edge Network.

---

## 🏃 Yerel Ortamda Çalıştırma

Projeyi çalıştırmak için harici bir derleyiciye veya paket yüklemesine gerek yoktur:

```bash
# 1. Depoyu klonlayın
git clone https://github.com/blosny/climathon-gapcuk-ai.git
cd climathon-gapcuk-ai

# 2. Yerel web sunucusunu başlatın
python -m http.server 3000 --directory src

# 3. Tarayıcınızda açın:
# Ana Platform: http://localhost:3000
# Simülasyon:   http://localhost:3000/simulasyon.html
```

---

## 🎯 Climathon 2026 Eşleşmeleri
* **COP31 Hedefi:** *Cutting waste by half by 2035* (Yıllık 350.000 tonluk organik tarımsal biyokütleyi ekonomiye kazandırma)
* **Siemens Odak Alanı:** *Resource Efficiency & Circularity*
* **BM Sürdürülebilir Kalkınma Amaçları:** SKA 12 (Sorumlu Üretim ve Tüketim), SKA 13 (İklim Eylemi), SKA 15 (Karasal Yaşam)

---

**Geliştirici:** Taha Buğra Çiçek • Ünye / Ordu  
*Siemens & UP School Climathon 2026 Hackathonu Kapsamında Geliştirilmiştir.*
