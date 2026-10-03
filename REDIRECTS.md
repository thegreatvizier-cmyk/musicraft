# Přesměrování starých URL

Staré adresy ze starého webu (Visu CMS) jsou pořád v indexu Googlu
a dnes vracejí 404. Tohle je přesměruje na odpovídající nové stránky.

## Kam to patří

Do `next.config.mjs` ve webovém repu (`musicraft`).

Pokud tam už `async redirects()` je, přidej položky do existujícího pole.
Pokud ne, vlož celou funkci dovnitř `const nextConfig = { ... }`.

```js
async redirects() {
  return [
    // konkrétní staré stránky
    { source: '/en/plans', destination: '/musicraft/pricing', permanent: true },
    { source: '/en/service', destination: '/musicraft/how-it-works', permanent: true },
    { source: '/en/services', destination: '/musicraft/how-it-works', permanent: true },
    { source: '/en/contact', destination: '/musicraft/contact', permanent: true },
    { source: '/en/about', destination: '/musicraft/artists', permanent: true },

    // objednávkové stránky starých tarifů
    { source: '/en/order/:slug*', destination: '/musicraft/apply', permanent: true },

    // zbytek staré jazykové větve
    { source: '/en', destination: '/', permanent: true },
    { source: '/en/:path*', destination: '/', permanent: true },
  ];
},
```

Pořadí hraje roli — konkrétní cesty musí být před catch-all `/en/:path*`,
jinak by je přebil.

## Ověření po nasazení

```bash
curl -sI https://www.musicraft.eu/en/plans | head -3
```

Má vrátit `HTTP/2 308` nebo `301` a hlavičku `location` s novou adresou.

## Co tím neřešíš

`distribution.musicraft.eu` je samostatná subdoména a tohle se jí netýká.
Pokud ji nepoužíváš, zruš její DNS záznam, nebo ji přesměruj na hlavní web.
