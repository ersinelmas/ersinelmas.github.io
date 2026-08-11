# ersinelmas.github.io

Ersin Elmas'ın kişisel portfolyo sitesi — Java, Spring Boot, .NET ve React ile
kurumsal ölçekte finansal uygulamalar geliştiren bir full-stack yazılım
geliştiricisinin özgeçmiş, proje ve iletişim bilgilerini içerir.

🔗 Canlı site: https://ersinelmas.github.io/

## Teknoloji yığını

Derleme aracı gerektirmeyen, sade bir statik site:

- Düz HTML5 / CSS3 / vanilla JavaScript (ES modülleri)
- İçerik, `data/i18n.json` üzerinden Türkçe/İngilizce olarak dışarıdan
  besleniyor (bkz. [CLAUDE.md](CLAUDE.md) için mimari detaylar)
- GitHub Pages ile doğrudan yayınlanıyor

## Yerel geliştirme

Herhangi bir statik dosya sunucusu ile çalıştırılabilir, örneğin:

```bash
npx serve .
```

`data/i18n.json` dosyası `fetch` ile okunduğundan, `index.html`'i doğrudan
`file://` protokolüyle açmak CORS nedeniyle çalışmaz — bir HTTP sunucusu
üzerinden servis edilmesi gerekir.

## Lisans

[MIT](LICENSE)
