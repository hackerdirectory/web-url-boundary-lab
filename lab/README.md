# WEB-LAB-03 — URL Boundary Lab

WEB-06.01, WEB-06.02 ve WEB-06.03’e eşlik eden küçük local lab. Önce tahmin et, sonra native API sonucunu gözle ve farkı açıkla. Node.js 20+ yeterli; package install, server veya internet gerekmez. Komutlar URL metnini parse eder; URL’ye bağlanmaz, browser navigation yapmaz ve string’i code olarak çalıştırmaz.


## Derslerden bu çalışmaya

| Ders | Labda izlediğin sınır | Kaydında göstereceğin kanıt |
|---|---|---|
| WEB-06.01 | URL component ile request-target aynı şey değildir | Host/hostname/port, repeated tags ve target’tan çıkarılan fragment |
| WEB-06.02 | Origin ve site farklı eşitlik kurallarıdır | Subdomain/port/scheme pair’leri; listed-domain scope ve not-computed sonucu |
| WEB-06.03 | Relative reference sonucu base ve encoding context’ine bağlıdır | File/directory base, query-only/fragment-only, form round trip ve missing-base error |

Sitedeki lab sayfasında kısa kurulum, bu workbook, ipuçları ve çözüm bulunur. **Kaynak paketi indir** ile ZIP’i al; GitHub hesabı veya repository clone gerekmez. Paketi çıkarıp aşağıdaki komutları kendi çalışma klasöründe kullan. Workbook offline okunabilir; komutların çalışması için paketin JS dosyaları ve Node.js gerekir.

## Başlangıç

Repo kökünden `cd labs/web/url` çalıştır. İndirilen pakette bu README’nin bulunduğu klasöre geç. `cp predictions.example.json predictions.json` ile kendi cevap dosyanı oluştur. Sonuçları görmeden aşağıdaki 17 alanı doldur; JSON boolean için `true`/`false`, boş string için `""` kullan. `predictions.json` kişisel çalışma dosyasıdır, Git dışındadır. English workbook: `README.en.md`.

## 1 — Component, query ve fragment

Bu adresin hostname, host, port, tags ve httpOriginForm sonuçlarını tahmin et:

```sh
node inspect.mjs --reference 'https://books.example:8443/catalog/atlas?lang=tr&tag=network&tag=web#summary'
```

`hostname`, `host`, `port`, `tags`, `httpOriginForm` alanlarını doldur. `tags` array’inde neden iki value var? `hash` hangi değeri taşır ve neden httpOriginForm içinde bulunmaz? Komutun gerçek HTTP gönderdiği sonucunu çıkarabilir misin?

Sonra default port örneğini tahmin edip çalıştır:

```sh
node inspect.mjs --reference 'https://books.example:443/catalog'
```

`normalizedDefaultPort` alanına `port` getter sonucunu yaz. Boş değer ile service’in port kullanmaması aynı şey mi?

## 2 — Aynı reference, farklı base

İki komutun href sonuçlarını önce `fileBaseHref` ve `directoryBaseHref` alanlarına yaz:

```sh
node inspect.mjs --reference notes --base 'https://books.example/catalog/lesson.html?lang=tr#old'
node inspect.mjs --reference notes --base 'https://books.example/catalog/lesson/'
```

Son slash neden sonucu değiştiriyor? `lesson.html` gerçekten disk dosyası olmak zorunda mı? Ardından aynı iki base ile `/notes` ve `../notes` dene. Root-relative ile parent-relative farkını kendi cümlenle açıkla; bu hesap filesystem erişimi yapıyor mu?

## 3 — Query-only ve fragment-only

`queryHref` ve `fragmentHref` tahminlerini yaz, ardından gözle:

```sh
node inspect.mjs --reference '?lang=en' --base 'https://books.example/catalog/lesson.html?lang=tr#old'
node inspect.mjs --reference '#new' --base 'https://books.example/catalog/lesson.html?lang=tr#old'
```

Hangi component değişti, hangisi korundu? Resolution sonucu, notes resource’unun server’da var olduğunu kanıtlıyor mu?

## 4 — Origin ve site ayrı sorulardır

Her pair için iki ayrı boolean tahmin et:

```sh
node inspect.mjs --left 'https://app.example.com/catalog' --right 'https://api.example.com/catalog'
node inspect.mjs --left 'https://app.example.com/catalog' --right 'https://app.example.com:8443/catalog'
node inspect.mjs --left 'https://app.example.com/catalog' --right 'http://app.example.com/catalog'
```

Sırasıyla `apiSameOrigin`, `apiSameSite`, `portSameOrigin`, `portSameSite`, `schemeSameSite` alanlarını doldur. İlk iki pair neden aynı same-site sonucu verirken origin’leri farklıdır? Bu sonuç object authorization veya browser response-read izni mi?

Site hesabı yalnız üç listed host için declared com/org fixture’ını kullanır. Tam Public Suffix List değildir. Liste dışındaki host’ta site sonucu `null`/not-computed olur; son iki label’dan guessed sonuç üretilmez. Origin karşılaştırması yalnız ordinary HTTP(S) tuple’ları kabul eder; opaque origin’in `null` string’ini identity sanmaz.

## 5 — Encoding ve local failure

```sh
node inspect.mjs --form-value 'notlar ı'
node inspect.mjs --form-value 'A+B'
node inspect.mjs --reference '/catalog/atlas'
```

İlk komut için `formSerialized` alanını doldur. İkincisinde literal plus nasıl korunuyor? `roundTrip` encryption veya permission sonucu mu?

Üçüncü komut için `missingBaseError` alanını doldur. Exit code 1 beklenir: relative reference’ın base’i yoktur. Bu HTTP404, DNS failure veya transport timeout değildir; hiç network başlamadı. Sonra geçerli base ekleyip farkı gözle.

## Son görev — Yeni base ve reference

`.local-results/` altında yerel bir kayıt oluştur. `https://books.example/` altında yeni bir path seç; bir base file-like olsun, diğerinin sonunda `/` bulunsun. Tekrarlanan `tag` query parametresi ve fragment içeren bir relative reference kullan. Kendi girdilerinle `inspect.mjs` çalıştırmadan önce beklediğin `href`, `pathname`, `tags` ve `httpOriginForm` değerlerini yaz.

Ardından listelenmiş `app.example.com` / `api.example.com` host'larıyla iki URL seç. Yalnız port veya scheme'i değiştir; karşılaştırmadan önce hem `sameOrigin` hem `sameSite` sonucunu tahmin et. Son olarak listelenmiş bir host ile listelenmemiş bir `.example` host'u karşılaştır: hesaplanmış farklılık ile fixture'ın hesaplamadığı sonucu ayır.

Tamamlama ölçütü: tam girdiler, ilk tahminlerin, native çıktılar ve farklılıkların açıklaması kaydında bulunsun. Fragment neden request target'ta yok; base'in son slash'i neden önemli; origin/site eşitliği authorization hakkında neyi kanıtlamaz? 17 alanlı checker özgün workbook'i kontrol eder; bu yeni girdileri puanlamaz. Bu görevde hiçbir URL'ye bağlantı kurulmaz.

Sıfırlamak için yerel kaydını kaldır; ortak kaynakları değiştirmen gerekmez.

## Kendini kontrol et

```sh
node checker.mjs predictions.json
```

Checker 17 alan için match/different/missing sonucu verir; bilinmeyen key’leri ayrıca gösterir. Tam eşleşme exit0, eksik/yanlış cevap exit1 verir. Bu bir öğrenme self-check’idir; site sınavı, sertifika veya öğrenci anlayışını ölçen bağımsız değerlendirme değildir. Bir değeri düzeltmeden önce nedenini not et. Takılırsan [HINTS.md](HINTS.md), çalışmayı bitirdikten sonra [SOLUTION.md](SOLUTION.md) oku.

Teslimin: tahmin dosyası, native observation’ların kısa özeti ve beş açıklama: host/hostname, fragment/request-target, trailing slash, origin/site, parsing failure/network failure. Gerçek hedef verisi veya secret kullanma; örnekler kendi başına yeterlidir. Reset için kişisel tahmin dosyanı şablondan yeniden oluştur; ortak kaynakları değiştirme.
