// Blog posts. Each post is plain data rendered by src/app/cs/blog/[slug]/page.tsx.
// Body blocks: h2 heading, paragraph, bullet list, numbered list, or a call to action.
// In paragraphs and list items, **text** is bold and [text](url) is a link.

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'cta'; title: string; text: string; button: string; href: string };

export type Post = {
  slug: string;
  lang: 'cs' | 'en';
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  readingMinutes: number;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: 'jak-prejit-k-jinemu-distributorovi',
    lang: 'cs',
    title: 'Jak přejít k jinému distributorovi bez ztráty streamů',
    description:
      'Přechod k jinému hudebnímu distributorovi neznamená začínat od nuly. Co si připravit, v jakém pořadí postupovat a na co si dát pozor, aby vám zůstala přehrání i místa v playlistech.',
    date: '2026-11-21',
    readingMinutes: 5,
    body: [
      {
        type: 'p',
        text:
          'Přechod k jinému distributorovi neznamená začínat od nuly. Když se udělá správně, zůstanou vám přehrání i místa v playlistech a posluchači nic nepoznají. Když se udělá špatně, skladby se na platformách objeví jako nové a čísla začínají znovu od nuly. Rozhodují tři věci: **stejné kódy, stejná data a správné pořadí kroků.**',
      },
      { type: 'h2', text: 'Proč se streamy můžou ztratit' },
      {
        type: 'p',
        text:
          'Streamovací platformy poznávají skladbu podle kódu **ISRC** a celé vydání (singl, EP, album) podle kódu **UPC**. Pokud nový distributor přidělí nové kódy, nebo se nové vydání liší názvem, délkou skladby či obalem, platforma ho s původním nepropojí. Vznikne duplicitní vydání a počty přehrání začínají znovu.',
      },
      { type: 'h2', text: 'Co si připravit' },
      {
        type: 'ul',
        items: [
          '**Kódy ISRC** ke každé skladbě a **UPC** ke každému vydání. Najdete je v účtu u současného distributora, v detailu vydání nebo v exportu katalogu.',
          '**Původní datum vydání** u každého singlu, EP i alba.',
          '**Přesné názvy** skladeb a interpretů tak, jak jsou na platformách, včetně označení verzí (například Radio Edit nebo feat.).',
          '**Stejné zvukové soubory**, ideálně WAV, se stejnou délkou jako původně.',
          '**Stejný obal** a stejný typ vydání.',
        ],
      },
      { type: 'h2', text: 'Postup krok za krokem' },
      {
        type: 'ol',
        items: [
          '**Zatím nic nestahujte.** Původní vydání nechte online, dokud je nový distributor nedoručí.',
          '**Pošlete katalog novému distributorovi** s původními kódy ISRC a UPC a s původním datem vydání.',
          '**Počkejte, až se nová vydání objeví na platformách.** Na Spotify můžete pár dní vidět stejné vydání dvakrát. To je v pořádku.',
          '**Zkontrolujte, že se čísla propojila.** Počet přehrání u nového vydání by měl odpovídat původnímu.',
          '**Teprve pak požádejte původního distributora o stažení** (takedown). Někde na to je tlačítko v účtu, jinde je potřeba napsat podpoře.',
          '**Účet u původního distributora hned nerušte.** Platformy hlásí výnosy se zpožděním, zpravidla dvou až tří měsíců, takže výplaty za poslední měsíce dorazí ještě tam.',
        ],
      },
      { type: 'h2', text: 'Na co si dát pozor' },
      {
        type: 'ul',
        items: [
          '**Překlepy v kódech.** Stačí jeden prohozený ISRC a skladba se propojí špatně nebo vůbec. Kontrolujte kód po kódu.',
          '**Remastery a nové verze.** Pokud nahrávku upravíte, jde o novou verzi s novým ISRC a čísla se nepřenesou. Pro přechod použijte původní master.',
          '**YouTube Content ID.** Pokud vaše nahrávky v Content ID spravoval původní distributor, nechte ho tam zrušit dřív, než je zaregistruje nový. Dva nároky na stejnou nahrávku vedou ke sporu a výnosy se mezitím pozastaví.',
          '**Spotify for Artists.** Přístup k profilu interpreta vám zůstane. Profil patří vám, ne distributorovi.',
        ],
      },
      { type: 'h2', text: 'Jak dlouho přechod trvá' },
      {
        type: 'p',
        text:
          'Doručení na platformy obvykle trvá několik dní až dva týdny, u větších katalogů déle. Včetně kontroly a stažení u původního distributora počítejte zhruba se dvěma až čtyřmi týdny.',
      },
      {
        type: 'cta',
        title: 'Přechod k Musicraftu za vás vyřídíme',
        text:
          'Pošlete nám přehled katalogu. Převezmeme kódy a metadata, zkontrolujeme je proti tomu, co je na platformách, doručíme vydání a dáme vám vědět, kdy můžete u původního distributora požádat o stažení.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
];

export function getPost(lang: Post['lang'], slug: string) {
  return POSTS.find((p) => p.lang === lang && p.slug === slug);
}
