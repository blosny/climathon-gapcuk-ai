# Gapçuk AI

<img src="src/assets/logo-readme.png" alt="Gapçuk AI logosu" width="120" align="right">

![Climathon 2026](https://img.shields.io/badge/Climathon%202026-Siemens%20%C2%B7%20YGA%20%C2%B7%20UP%20School-0F766E)
![Sonuç](https://img.shields.io/badge/Sonu%C3%A7-5.%20s%C4%B1ra-D97706)
![Pilot](https://img.shields.io/badge/Pilot-Ordu%20%2F%20%C3%9Cnye-15803D)
[![Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-2563EB)](https://blosny.github.io/climathon-gapcuk-ai/)

Fındık zürufunu (yöresel adıyla **gapçuk**) yakılan bir atıktan temiz enerjiye ve komposta dönüştüren döngüsel bir lojistik platformu. **Siemens, YGA ve UP School Climathon 2026** programında Ordu / Ünye pilot bölgesi için geliştirildi.

**Stack:** HTML · CSS · Vanilla JavaScript · Leaflet · OpenStreetMap · OSRM · Open-Meteo · React 18 · GitHub Pages

**Canlı demo:** [blosny.github.io/climathon-gapcuk-ai](https://blosny.github.io/climathon-gapcuk-ai/) · **Simülasyon:** [Döngüyü başlat](https://blosny.github.io/climathon-gapcuk-ai/simulasyon.html)

<img src="src/assets/screenshots/tab1_route.png" alt="GapçukRoute: Ünye köylerinden Çarşamba'ya gerçek yol rotası ve toplama sırası" width="100%">

---

## Modüller

| Modül | Ne yapar | Durum |
|---|---|---|
| GapçukRoute | Çiftçi bildirimlerinden durak sırası ve gerçek yol rotası çıkarır | Çalışıyor |
| GapçukBot | WhatsApp üzerinden bildirim alır, hava durumuna göre yanıt verir | Kural tabanlı |
| GapçukBio | Külleme riskini hesaplar, atığı santrale ya da komposta yönlendirir | Çalışıyor |
| Döngü simülasyonu | Atığın harmandan santrale ve toprağa dönüşünü canlandırır | Çalışıyor |

## Problem

- Patoz çoğu zaman tek şeritli köy yollarında yapılır; çıkan zürufun düzenli bir toplama mekanizması yoktur.
- Çiftçi yolu açmak için atığı ya **yakar** ya da bahçeye **çiğ serer**. Zürufun C/N oranı yüksektir (yaklaşık 33:1) ve literatürde doğrudan tarlaya uygulanması uygun bulunmaz [K3]. Açıkta yakma ise CH₄ ve N₂O açığa çıkarır [K5].
- Yılda yaklaşık 200 bin ile 500 bin ton züruf açığa çıktığı bildirilmektedir; iki kaynak arasında fark vardır [K2, K3].
- Bu biyokütle için biyokütle enerji santralleri olası alıcıdır. Eksik olan, küçük üreticiyle alıcıyı buluşturacak lojistik.

## GapçukRoute: Rota Motoru

- Her bildirim haritada numaralı bir durak olur. Sıralama en yakın komşu yöntemiyle yapılır ve **yolu kapalı** köyler öne alınır (`optimizeStopSequence`).
- Rota kuş uçuşu değil, **OSRM** `route/v1/driving` ile gerçek köy yolu geometrisi üzerinden çizilir.
- OSRM yanıt vermezse sıralı noktalarla yedek bir rota çizilir.

## GapçukBot: Çiftçi Asistanı

- Çiftçi uygulama indirmeden konumunu, çuval sayısını ve yol durumunu tek mesajla bildirir.
- Yanıt, **Open-Meteo**'dan gelen anlık sıcaklık ve nem verisine göre değişir: nem yüksekse atığı örtme ve yakmama uyarısı, yol kapalıysa öncelikli toplama bilgisi.
- Şu an yanıtlar kural tabanlı; bir dil modeline taşınması yol haritasında.

## GapçukBio: Erken Uyarı ve Kompost

- Sıcaklık ve nemden külleme (*Erysiphe corylacearum*) için sezgisel bir risk skoru hesaplanır (`calculateMildewRisk`). Eşikler yayımlanmış bir modele dayanmaz ve saha verisiyle kalibre edilmemiştir.
- Nem sınırının altındaki atık **biyokütle santraline**, üstündeki atık **Trichoderma** ile kompostlama hattına gider.
- Araç köye bir önceki partinin kompostunu götürür, dönüşte gapçuk yükler: boş dönüş olmaz.

## Döngü Simülasyonu

- [`src/simulasyon.html`](src/simulasyon.html): harman ve patoz, dağ lojistiği, enerji santrali ve biyo-kompost aşamalarını anlatan interaktif simülasyon.
- React 18 ve lucide-react ile tek dosya; build adımı yok. Değerler tek bir köy rotası için örnektir.

## İş Modeli

- Gelir, toplanan biyokütlenin santrale satışından gelir. Pilot bölgeye en yakın alıcı adayı Samsun Çarşamba'daki biyokütle enerji santralidir (27 MWe) [K4].
- Santral görüşmesine göre alım kantar teslimdir: ton başına yaklaşık **2.200 TL**, azami nem **%35**. Bu bilgi yazılı ve kamuya açık bir kaynakla doğrulanamadı; santralin zürufu yakıt olarak kabul ettiği de sahada teyit edilecek.
- Çiftçiye ücretsiz kompost geri döner. Birim ekonomi varsayımlara dayanır ve saha pilotunda gerçek maliyetlerle doğrulanacak.

## Etki Hesabı

Açıkta yakmanın önlenen emisyonu IPCC 2006 faktörleriyle hesaplanır: 0,80 × (2,7 g CH₄/kg × 28 + 0,07 g N₂O/kg × 265) ≈ **0,075 t CO₂e / ton atık** [K5, K6]. Biyokütle yanmasından çıkan CO₂ sayılmaz ve nem düzeltmesi yapılmaz; bu yüzden değer bir üst sınırdır. Santralde fosil yakıt ikamesi hesaba katılmamıştır.

Uygulamadaki tüm sayıların dayanağı ve doğrulama durumu [Kaynakça ve Doğrulama](https://blosny.github.io/climathon-gapcuk-ai/kaynakca.html) sayfasındadır.

## Ekran Görüntüleri

<img src="src/assets/screenshots/tab2_whatsapp.png" alt="GapçukBot WhatsApp simülatörü" width="100%">

<img src="src/assets/screenshots/tab3_bio.png" alt="GapçukBio risk ve kompost paneli" width="100%">

## Yol Haritası

- Bot yanıtlarını bir dil modeline taşımak, WhatsApp Business API ile gerçek mesajlaşma
- Ünye'de üreticiler, ziraat odası ve santralle saha görüşmeleri
- Rota tasarrufunu saha verisiyle ölçmek
- Sistemi fındık dışındaki tarımsal atıklara uyarlamak

## Yerel Çalıştırma

```bash
git clone https://github.com/blosny/climathon-gapcuk-ai.git
cd climathon-gapcuk-ai
python -m http.server 3000 --directory src
```

Ana platform `http://localhost:3000`, simülasyon `http://localhost:3000/simulasyon.html` adresinde açılır. Yedek yayın: [climathon-gapcuk-ai.vercel.app](https://climathon-gapcuk-ai.vercel.app) (vercel.app bazı Türkiye internet sağlayıcılarında açılmıyor).

## Kaynaklar

Her kaynağın hangi rakamı desteklediği [Kaynakça ve Doğrulama](src/kaynakca.html) sayfasında verilmiştir.

- **K1** Demirel, B., Gürdil, G. A. K. (2018). Fındık zurufu atığından yakıt briketi elde edilmesi ve brikete ait bazı özelliklerin belirlenmesi. *Anadolu Tarım Bilimleri Dergisi*, 33. [doi:10.7161/omuanajas.302527](https://doi.org/10.7161/omuanajas.302527)
- **K2** Gürdil, G. A. K., Demirel, B. (2020). Effect of moisture content, particle size and pressure on some briquetting properties of hazelnut residues. *Anadolu Tarım Bilimleri Dergisi*, 35. [doi:10.7161/omuanajas.736851](https://doi.org/10.7161/omuanajas.736851)
- **K3** Aygün, S., Bender Özenç, D. (2023). Fındık Atığı Ürünlerinin Buğday Yetiştiriciliğinde Değerlendirilmesi. *Akademik Ziraat Dergisi*, 12 (Özel Sayı), 213–226. [doi:10.29278/azd.1362301](https://doi.org/10.29278/azd.1362301)
- **K4** Electricity Turkey (2019). [Siemens steam turbines in Samsun Biomass Power Plant](https://www.electricityturkey.com/haber/samsun-carsamba-biyokutle-enerji-santralinde-siemens-buhar-turbinleri-kullanilecek-turkiyenin-en-buyuk-ikinci-biyokutle-santralnin-preferi-siemens-oldu-21473)
- **K5** IPCC (2006). *2006 IPCC Guidelines for National Greenhouse Gas Inventories*, Vol. 4, Ch. 2, Tablo 2.5 ve 2.6. [ipcc-nggip.iges.or.jp](https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol4.html)
- **K6** Myhre, G. vd. (2013). Anthropogenic and Natural Radiative Forcing. *IPCC AR5, WG I*, Bölüm 8, Tablo 8.7. [ipcc.ch](https://www.ipcc.ch/report/ar5/wg1/)
- **K7** Sezer, A. vd. (2019). Erysiphe corylacearum'un neden olduğu külleme hastalığına karşı Giresun ili fındık üretim alanlarında kimyasal mücadele olanaklarının belirlenmesi. *Akademik Ziraat Dergisi*, 8 (Özel Sayı), 71–78. [doi:10.29278/azd.656526](https://doi.org/10.29278/azd.656526)
- **K8** Sezer, A., Şahin, S. (2022). Fındıkta Külleme Hastalığının Uzun Süreli Depolamada Bazı İç Bozuklukları ve Kalite Parametrelerine Etkisi. *Ordu Üniversitesi Bilim ve Teknoloji Dergisi*, 12 (2), 179–188. [dergipark](https://dergipark.org.tr/en/pub/ordubtd/article/1207968)
- **K9** Organo, N. D. vd. (2022). Assessing the potential of a Trichoderma-based compost activator to hasten the decomposition of incorporated rice straw. *Scientific Reports*. [doi:10.1038/s41598-021-03828-1](https://doi.org/10.1038/s41598-021-03828-1)
- **K10** Komolafe, A. F. vd. (2020). Maturity indices of composting plant materials with Trichoderma asperellum as activator. *Agricultura Tropica et Subtropica*, 53 (1), 19–27. [doi:10.2478/ats-2020-0003](https://doi.org/10.2478/ats-2020-0003)
- **K11** T.C. 2872 sayılı Çevre Kanunu, madde 8. [mevzuat.gov.tr](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2872&MevzuatTur=1&MevzuatTertip=5)
- **K12** Servisler: [OpenStreetMap](https://www.openstreetmap.org/copyright) · [OSRM](https://project-osrm.org/) · [Open-Meteo](https://open-meteo.com/)
