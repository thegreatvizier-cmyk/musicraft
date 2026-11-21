import type { CoverIcon, CoverVariant } from '@/app/cs/blog/icons';

// Blog posts. Each post is plain data rendered by src/app/cs/blog/[slug]/page.tsx.
// Body blocks: h2 heading, paragraph, bullet list, numbered list, or a call to action.
// In paragraphs and list items, **text** is bold and [text](url) is a link.

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  // numbered step cards
  | { type: 'steps'; items: { title: string; text: string }[] }
  // highlighted box: tip = helpful advice, warning = something that can go wrong
  | { type: 'callout'; variant: 'tip' | 'warning'; title: string; text: string }
  // simple left-to-right flow of boxes, with an optional label on the connection
  | { type: 'flow'; nodes: { label: string; sub?: string }[]; link?: string; caption?: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'cta'; title: string; text: string; button: string; href: string };

export type Post = {
  slug: string;
  lang: 'cs' | 'en';
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  readingMinutes: number;
  cover: CoverIcon;
  // optional fixed cover look; by default covers rotate by publication order
  coverVariant?: CoverVariant;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: 'skladba-na-profilu-jineho-umelce',
    lang: 'cs',
    title: 'Skladba se objevila na profilu jiného umělce: jak to opravit',
    description:
      'Vaše nové vydání skončilo na Spotify nebo Apple Music u jiného interpreta se stejným jménem? Proč se to stává, jak to opravit a jak tomu příště předejít.',
    date: '2026-11-21',
    readingMinutes: 5,
    cover: 'profile',
    body: [
      {
        type: 'p',
        text:
          'Vydáte novou skladbu a na Spotify ji najdete u úplně jiného interpreta se stejným jménem. Nebo naopak ve vašem profilu přibude cizí album. Patří to k nejčastějším problémům v distribuci a dá se to opravit. Ukážeme, proč to vzniká, jak to vyřešit a jak tomu příště předejít.',
      },
      { type: 'h2', text: 'Proč se to stává' },
      {
        type: 'p',
        text:
          'Platformy přiřazují vydání k profilům automaticky. Pokud vydání nenese **ID konkrétního profilu**, platforma hledá shodu jen podle jména interpreta. A pokud už existuje umělec se stejným nebo podobným jménem, vydání skončí u něj.',
      },
      {
        type: 'flow',
        nodes: [
          { label: 'Vaše vydání', sub: 'jméno interpreta v metadatech' },
          { label: 'Platforma hledá profil', sub: 'podle ID, nebo jen podle jména' },
          { label: 'Profil se stejným jménem', sub: 'vydání skončí u jmenovce' },
        ],
        link: 'bez ID profilu',
        caption: 'Bez ID profilu rozhoduje jen jméno. A jmenovců je na platformách víc, než by člověk čekal.',
      },
      {
        type: 'ul',
        items: [
          '**Stejné nebo podobné jméno.** Na Spotify jsou desítky interpretů se stejným jménem.',
          '**Jméno pokaždé zapsané jinak.** Velká a malá písmena, diakritika, mezery nebo „&“ místo „a“ stačí, aby platforma profil nepoznala.',
          '**Chybí ID profilu.** Distributor neměl odkaz na váš profil, takže platforma hádala.',
          '**Spolupráce.** U skladeb s hostem (feat.) se může nesprávně přiřadit i profil hosta.',
        ],
      },
      { type: 'h2', text: 'Jak to opravit na Spotify' },
      {
        type: 'steps',
        items: [
          { title: 'Připravte si tři odkazy', text: 'Na vydání, na nesprávný profil a na váš správný profil. Pokud profil zatím nemáte, napište, že potřebujete nový.' },
          { title: 'Napište distributorovi', text: 'Distributor může opravu zadat přímo u Spotify se všemi podklady.' },
          { title: 'Nebo to nahlaste sami', text: 'V Spotify for Artists vyplňte formulář pro nesoulad obsahu (content mismatch). Potřebujete k tomu přístup k profilu.' },
          { title: 'Počkejte na potvrzení', text: 'Spotify uvádí, že opravu obvykle zvládne během několika dní, a pošle vám e-mail.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Nahlásit jde i chystané vydání',
        text: 'Pokud vidíte vydání na špatném profilu ještě před jeho zveřejněním, nahlaste ho hned. Spotify přijímá hlášení i u vydání, která ještě nevyšla.',
      },
      { type: 'h2', text: 'Jak to opravit na Apple Music' },
      {
        type: 'p',
        text:
          'Na Apple Music se oprava dělá v metadatech vydání: u vydání se vymění Apple ID interpreta za správné, nebo se pro nového umělce založí nové. Tohle udělá distributor, napište mu proto se stejnými třemi odkazy. Pokud je potřeba oddělit dva umělce se stejným jménem, platforma může chtít doklad, že jde o jiného interpreta, třeba odkazy na vaše sociální sítě.',
      },
      { type: 'h2', text: 'Jak dlouho to trvá' },
      {
        type: 'table',
        head: ['Situace', 'Kdo opravu zadá', 'Obvyklá doba'],
        rows: [
          ['Spotify', 'Vy přes Spotify for Artists, nebo distributor', 'Několik dní'],
          ['Apple Music', 'Distributor', 'Dny až týdny'],
          ['Oddělení dvou umělců se stejným jménem', 'Distributor', 'I několik týdnů'],
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Vydání znovu nenahrávejte',
        text: 'Stáhnout vydání a nahrát ho znovu problém většinou nevyřeší. Jen vznikne duplicita a můžete přijít o přehrání. Oprava přes distributora nebo formulář je rychlejší i bezpečnější.',
      },
      { type: 'h2', text: 'Jak tomu příště předejít' },
      {
        type: 'ul',
        items: [
          '**Pošlete distributorovi ID svých profilů.** Odkaz na profil na Spotify a Apple ID interpreta. S nimi platforma vydání přiřadí přesně a nemusí hádat podle jména.',
          '**Zapisujte jméno vždy stejně.** Stejná velká písmena, diakritika i mezery u každého vydání.',
          '**Prověřte jméno předem.** Než vydáte první skladbu, vyhledejte své jméno na Spotify a Apple Music. Pokud tam už je, zvažte, jak se odlišit.',
          '**U prvního vydání si nechte čas.** Nový profil vzniká s prvním vydáním. Než naplánujete další, ověřte, že první skončilo na správném místě.',
          '**U spoluprací pošlete ID všech interpretů**, nejen svoje.',
        ],
      },
      {
        type: 'cta',
        title: 'Profily hlídáme za vás',
        text:
          'Při zakládání interpreta u nás zadáváme ID jeho profilů na platformách. A když se něco přece jen přiřadí špatně, opravu se všemi podklady vyřídíme s platformou za vás.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
  {
    slug: 'jak-prejit-k-jinemu-distributorovi',
    lang: 'cs',
    title: 'Jak přejít k jinému distributorovi bez ztráty streamů',
    description:
      'Přechod k jinému hudebnímu distributorovi neznamená začínat od nuly. Co si připravit, v jakém pořadí postupovat a na co si dát pozor, aby vám zůstala přehrání i místa v playlistech.',
    date: '2026-11-21',
    readingMinutes: 5,
    cover: 'switch',
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
      {
        type: 'flow',
        nodes: [
          { label: 'Původní distributor', sub: 'vydání zůstává online' },
          { label: 'Nový distributor', sub: 'doručí stejná data' },
          { label: 'Streamovací platformy', sub: 'propojí obě vydání' },
        ],
        link: 'stejné ISRC a UPC',
        caption: 'Platforma propojí nové vydání s původním jen tehdy, když nese stejné kódy a stejná data.',
      },
      { type: 'h2', text: 'Co musí zůstat stejné' },
      {
        type: 'table',
        head: ['Údaj', 'Kde ho najdete'],
        rows: [
          ['Kód ISRC ke každé skladbě', 'V detailu vydání nebo v exportu katalogu u současného distributora'],
          ['Kód UPC ke každému vydání', 'Tamtéž, u singlu, EP i alba'],
          ['Původní datum vydání', 'V detailu vydání nebo přímo na platformě'],
          ['Názvy skladeb a interpretů', 'Přesně jak jsou na platformách, včetně verzí (Radio Edit, feat.)'],
          ['Zvukový soubor', 'Původní master, ideálně WAV, se stejnou délkou'],
          ['Obal a typ vydání', 'Stejný obrázek, singl zůstává singlem a album albem'],
        ],
      },
      { type: 'h2', text: 'Postup krok za krokem' },
      {
        type: 'steps',
        items: [
          { title: 'Zatím nic nestahujte', text: 'Původní vydání nechte online, dokud je nový distributor nedoručí.' },
          { title: 'Pošlete katalog novému distributorovi', text: 'S původními kódy ISRC a UPC a s původním datem vydání.' },
          { title: 'Počkejte, až se nová vydání objeví', text: 'Na Spotify můžete pár dní vidět stejné vydání dvakrát. To je v pořádku.' },
          { title: 'Zkontrolujte, že se čísla propojila', text: 'Počet přehrání u nového vydání by měl odpovídat původnímu.' },
          { title: 'Teprve pak požádejte o stažení', text: 'Původního distributora požádejte o takedown. Někde na to je tlačítko v účtu, jinde je potřeba napsat podpoře.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Účet u původního distributora hned nerušte',
        text: 'Platformy hlásí výnosy se zpožděním, zpravidla dvou až tří měsíců. Výplaty za poslední měsíce proto dorazí ještě k původnímu distributorovi.',
      },
      { type: 'h2', text: 'Na co si dát pozor' },
      {
        type: 'ul',
        items: [
          '**Překlepy v kódech.** Stačí jeden prohozený ISRC a skladba se propojí špatně nebo vůbec. Kontrolujte kód po kódu.',
          '**Remastery a nové verze.** Pokud nahrávku upravíte, jde o novou verzi s novým ISRC a čísla se nepřenesou. Pro přechod použijte původní master.',
          '**Spotify for Artists.** Přístup k profilu interpreta vám zůstane. Profil patří vám, ne distributorovi.',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'YouTube Content ID',
        text: 'Pokud vaše nahrávky v Content ID spravoval původní distributor, nechte ho tam zrušit dřív, než je zaregistruje nový. Dva nároky na stejnou nahrávku vedou ke sporu a výnosy se mezitím pozastaví.',
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

// Cover look of a post: its own coverVariant, or the next colour pair and motif in publication order,
// so neighbouring posts never share a cover.
export function coverVariantOf(post: Post): CoverVariant {
  if (post.coverVariant) return post.coverVariant;
  const ordered = POSTS.filter((p) => p.lang === post.lang)
    .map((p, i) => ({ p, i }))
    .sort((x, y) => x.p.date.localeCompare(y.p.date) || y.i - x.i)
    .map((x) => x.p);
  const n = ordered.indexOf(post);
  return { palette: n % 5, motif: n % 4 };
}
