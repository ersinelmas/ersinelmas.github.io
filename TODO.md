# TODO

Portfolyo sitesi incelemesinden çıkan eksik/geliştirilebilir maddeler, öncelik sırasına göre.

## Yüksek öncelik

- [x] **og:image ekle** — `images/og-image.png` (1200×630, site temasıyla uyumlu) oluşturuldu; `og:image`, `og:image:width/height`, `og:locale` etiketleri eklendi.
- [x] **Twitter Card meta etiketleri ekle** — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` eklendi.
- [x] **canonical link ekle** — `<link rel="canonical" href="https://ersinelmas.github.io/">` eklendi.
- [x] **theme-color meta etiketi ekle** — `<meta name="theme-color" content="#0f141c">` eklendi.
- [x] **JSON-LD (Person) structured data ekle** — `<head>` içine `schema.org/Person` bloğu eklendi.
- [x] **Tekrarlanan `about.description` içeriğini düzelt** — Hero kartındaki tekrar eden paragraf kaldırıldı (About bölümünde kalıyor).
- [x] **Açık tema kontrast sorunu düzelt** — Eyebrow rozeti artık `--accent-strong` kullanıyor (yeni ölçüm: ~7.2:1, WCAG AA/AAA geçiyor).
- [x] **menu-toggle butonuna aria-label ekle** — `aria-label="Menüyü aç/kapat"` eklendi.
- [x] **Language toggle aria-label'ını Türkçeleştir** — `"Language selector"` → `"Dil seçici"`.
- [x] **Tema butonu aria-label mantığını düzelt** — Artık tıklamanın sonucunu değil, sonraki tıklamanın yapacağı eylemi anlatıyor (`updateThemeButton()`).
- [x] **Başlık hiyerarşisi düzelt** — Hero kartındaki isim `h3` → `h2` yapıldı, `h1 → h3` atlaması giderildi.
- [x] **"İçeriğe geç" (skip link) ekle** — `.skip-link`, `#main-content` hedefiyle eklendi; `data-i18n="a11y.skipLink"` ile iki dilde de çeviri eklendi.
- [x] **.gitignore ekle** — OS/editör dosyaları için minimal `.gitignore` eklendi.
- [x] **innerHTML enjeksiyon riskine karşı escape ekle** — `js/main.js`'e `escapeHtml()` eklendi ve tüm dinamik `innerHTML` alanlarında kullanıldı.
- [x] **noscript fallback ekle** — JS çalışmadığında temel iletişim bilgisini gösteren `<noscript>` bloğu eklendi.
- [x] **CSS bug — `header-height: 0px;`** — İncelendi, **kasıtlı olarak değiştirilmedi**. Detay: git geçmişinde bu satır önceden `--header-height: 0px;` idi (bkz. commit `8cfa68e`), ardından yapılan bir düzenlemeyle `--` kaybolmuş ve etkisiz hale gelmiş. `--` geri eklenirse mobilde (≤640px) açılan menü paneli `inset: var(--header-height) 0 auto` ile header'ın üzerinden (y:0'dan) başlayıp opak arka planıyla header'ı — ve içindeki kapatma düğmesini — tamamen örtebilir; kullanıcı menüyü kapatamayabilir. Bu commit'in hemen ardından gelen son commit (`0756a1f`, "Fix mobile nav dropdown layering") bu satıra dokunmadan sadece z-index eklemiş, yani mevcut (etkisiz) hâli muhtemelen kasıtlı bırakılmış ya da en azından zararsız. Görsel doğrulama yapılamadığı için (bkz. not) riskli bir görsel regresyon yaratmamak adına dokunulmadı — gerçek düzeltme, mobil menünün header'ın altından mı yoksa tam ekran mı açılması gerektiğine dair tasarım kararı gerektiriyor.

## Orta öncelik

- [x] **Contact kartı için geniş ekran düzeni** — `min-width: 700px` üzerinde `.contact-card` 2 sütuna geçiyor.
- [x] **Özel 404.html sayfası ekle** — Site temasıyla uyumlu, `noindex` işaretli `404.html` eklendi.
- [x] **README.md'yi geliştir** — Açıklama, canlı link, teknoloji yığını, yerel çalıştırma talimatı, lisans linki eklendi.
- [x] **LICENSE dosyası ekle** — MIT lisansı eklendi.
- [x] **sitemap.xml'e lastmod ekle** — `2026-08-12` eklendi.
- [x] **.editorconfig ekle** — Temel girinti/satır sonu/charset ayarları eklendi.

## Düşük öncelik / şimdilik kapsam dışı

- [ ] **favicon.ico boyutunu küçültme** — 15,4 KB, tipik favicon'lara göre büyük. *Gerekçe: Ortamda uygun bir ikon optimizasyon aracı yok; mevcut logo/marka tasarımına dokunmadan güvenli şekilde küçültülemedi.*
- [ ] **Çok dilli SEO için hreflang / ayrı URL yapısı** — Şu an tr/en aynı URL üzerinde client-side değişiyor. *Gerekçe: Routing/URL yapısında mimari bir değişiklik gerektiriyor; kapsamlı bir tasarım kararı olduğu için otomatik yapılmadı.*
- [ ] **Proje kartlarına demo ekran görüntüsü/canlı demo linki ekleme** — Projelerin `demo: null` durumu var. *Gerekçe: Gerçek bir canlı demo veya ekran görüntüsü kaynağı yok; içerik/varlık sağlanması gerekiyor.*
- [ ] **ESLint/Stylelint + package.json ekleme** — *Gerekçe: Bu, projeyi build-tool'suz statik yapıdan npm tabanlı bir yapıya taşır; kapsamı aşan bir mimari tercih olduğu için kullanıcı onayına bırakıldı.*
- [ ] **GitHub Actions CI pipeline (HTML/link doğrulama)** — *Gerekçe: CI/CD pipeline eklemek otomatik çalışan bir sistem kurmak demek; onay gerektiren bir değişiklik olduğu için otomatik yapılmadı.*

## Not

Bu ortamda tarayıcı otomasyonu (Playwright/chromium-cli) kurulu değildi; değişiklikler HTML/JS/CSS sözdizimi doğrulaması, statik sunucu üzerinden HTTP/erişilebilirlik kontrolleri ve manuel kontrast hesaplamalarıyla doğrulandı, ancak gerçek bir tarayıcıda görsel olarak test edilmedi. Yayına almadan önce özellikle mobil menü ve skip-link davranışını tarayıcıda kontrol etmeniz önerilir.
