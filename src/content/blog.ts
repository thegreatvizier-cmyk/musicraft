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
    slug: 'videoklip-na-spotify-a-apple-music',
    lang: 'cs',
    title: 'Jak dostat videoklip na Spotify a Apple Music',
    description:
      'Videoklipy už nejsou jen na YouTube. Jak se klip dostane na Spotify, Apple Music, VEVO a TIDAL, co platformy vyžadují a co připravit, aby vyšel spolu se skladbou.',
    date: '2026-11-21',
    readingMinutes: 6,
    cover: 'video',
    body: [
      {
        type: 'p',
        text:
          'Na YouTube nahrajete videoklip sami za pár minut. Na **Spotify**, **Apple Music**, **VEVO** nebo **TIDAL** ale jen přes distributora. Vyplatí se to: posluchač pak klip uvidí přímo tam, kde vaši hudbu poslouchá, a nemusí kvůli němu nikam odcházet.',
      },
      { type: 'h2', text: 'Videoklipy na Spotify' },
      {
        type: 'p',
        text:
          'Spotify videoklipy postupně rozšiřuje. Posluchač si v přehrávači přepne ze zvuku na video, klipy se zobrazují i na profilu interpreta a u vydání. Pár věcí ale platí jinak než u ostatních platforem:',
      },
      {
        type: 'ul',
        items: [
          '**Video musí doručit stejný distributor jako skladbu.** Spotify ho napojuje přímo na zvukovou verzi, takže klip i audio musí jít jednou cestou.',
          '**Jen oficiální videoklipy.** Lyric videa, vizualizéry ani záznamy koncertů Spotify zatím nepřijímá.',
          '**Funkce je stále v betě.** Videa vidí hlavně předplatitelé Premium a dostupnost se rozšiřuje postupně podle zemí.',
          '**Přímé nahrání v Spotify for Artists** zatím zkouší jen omezený okruh umělců. Hlavní cestou zůstává distributor.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Canvas není videoklip',
        text: 'Canvas je krátká smyčka o délce několika sekund, která běží za skladbou v přehrávači. Nahráváte ho sami v Spotify for Artists. Videoklip je celé video ke skladbě a jde přes distributora. Jedno nevylučuje druhé.',
      },
      { type: 'h2', text: 'Jedno video, čtyři platformy' },
      {
        type: 'flow',
        nodes: [
          { label: 'Váš videoklip', sub: 'video, náhled a údaje' },
          { label: 'Distributor', sub: 'kontrola a doručení' },
          { label: 'Spotify, Apple Music, VEVO, TIDAL', sub: 'najednou' },
        ],
        link: 'video ISRC',
        caption: 'Stejný HD master pokryje všechny platformy. Každá ho pak zobrazí po svém.',
      },
      {
        type: 'table',
        head: ['Platforma', 'Kde se klip zobrazí', 'Na co myslet'],
        rows: [
          ['Spotify', 'V přehrávači, na profilu a u vydání', 'Stejný distributor jako u skladby, jen oficiální klipy'],
          ['Apple Music', 'U interpreta a u skladby', 'Doručuje se jako samostatné video vydání'],
          ['VEVO', 'Kanál interpreta na YouTube a TV aplikace', 'Potřebujete kanál VEVO'],
          ['TIDAL', 'U interpreta a u skladby', 'Stejné video jako pro ostatní'],
        ],
      },
      { type: 'h2', text: 'Technické požadavky' },
      {
        type: 'p',
        text:
          'Nejpodrobnější požadavky má VEVO. Když video splní je, projde i na ostatních platformách.',
      },
      {
        type: 'table',
        head: ['Parametr', 'Požadavek (HD)'],
        rows: [
          ['Rozlišení', '1920 × 1080, na šířku (16 : 9). VEVO přijímá i 4K.'],
          ['Formát', 'MOV nebo MP4, kodek H.264 nebo ProRes. Pro 4K jen ProRes.'],
          ['Snímková frekvence', 'Původní, nejméně 23,98 snímku za sekundu, bez prokládání.'],
          ['Datový tok', 'Ideálně 20 Mb/s, nejméně 7,5 Mb/s.'],
          ['Zvuk', 'AAC stereo, 44,1 kHz, 320 kb/s.'],
          ['Úvodní a závěrečné titulky', 'Nevkládejte. Žádné tabule s názvem, logy ani závěrečné karty.'],
        ],
      },
      { type: 'h2', text: 'Kanál VEVO' },
      {
        type: 'p',
        text:
          'Na YouTube vycházejí klipy z VEVO na kanálu interpreta s koncovkou VEVO, například JmenoInterpretaVEVO. Název má nejvýš 20 znaků včetně slova VEVO, bez mezer, diakritiky a speciálních znaků. Založení nového kanálu trvá obvykle kolem pěti pracovních dnů.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Kanál VEVO vyřešte před prvním doručením',
        text: 'Po doručení už kanál u klipu nejde změnit. Klip doručený bez kanálu skončí jen v televizních aplikacích VEVO a na YouTube ho pak dostanete jen tak, že se stáhne a doručí znovu.',
      },
      { type: 'h2', text: 'Co připravit kromě videa' },
      {
        type: 'ul',
        items: [
          '**Náhledový obrázek.** Ostrý snímek z klipu nebo samostatná grafika.',
          '**ISRC videa.** Videoklip má vlastní kód, jiný než zvuková verze skladby. Pokud ho nemáte, přidělí ho distributor.',
          '**Údaje o klipu.** Interpret a název přesně jako u skladby, režie, produkce a label.',
          '**Práva ke všemu, co je v klipu.** K hudbě i k obrazu, včetně cizích záběrů, fotek nebo samplů.',
          '**Datum a čas vydání.** Ideálně stejný den jako skladba, aby se navzájem podpořily.',
        ],
      },
      {
        type: 'cta',
        title: 'Videoklipy distribuujeme na Spotify, Apple Music, VEVO i TIDAL',
        text:
          'Klip doručíme na všechny platformy najednou. Na Spotify ho napojíme rovnou ke skladbě, protože audio máte u nás. Zkontrolujeme technické parametry videa a vyřídíme i založení kanálu VEVO.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
  {
    slug: 'jak-pripravit-vydani',
    lang: 'cs',
    title: 'Jak připravit vydání: zvuk, obal a metadata v kostce',
    description:
      'Co musí splňovat zvukový soubor, obal a údaje o skladbě, aby vydání prošlo kontrolou platforem napoprvé. Přehledně, s nejčastějšími chybami.',
    date: '2026-11-21',
    readingMinutes: 6,
    cover: 'checklist',
    body: [
      {
        type: 'p',
        text:
          'Většina zdržení při vydávání nevzniká kvůli hudbě, ale kvůli drobnostem kolem ní: obal s odkazem na Instagram, host uvedený v názvu skladby, MP3 místo WAV. Platformy takové vydání vrátí a datum vydání se posouvá. Tady je přehled, co připravit, aby vydání prošlo napoprvé.',
      },
      { type: 'h2', text: 'Zvukový soubor' },
      {
        type: 'ul',
        items: [
          '**Formát WAV**, ne MP3. Ideálně 16 bitů a 44,1 kHz nebo vyšší kvalita, stereo.',
          '**Finální master.** Žádné demoverze, žádné ticho navíc na začátku ani na konci.',
          '**Každá skladba jako samostatný soubor**, pojmenovaný tak, aby bylo jasné, o kterou jde.',
        ],
      },
      { type: 'h2', text: 'Obal' },
      {
        type: 'ul',
        items: [
          '**Čtverec v dostatečném rozlišení.** Aspoň 3000 × 3000 pixelů, Apple Music nově doporučuje 4000 × 4000. Formát JPG nebo PNG.',
          '**Na obalu jen jméno interpreta a název vydání**, a ten musí přesně odpovídat názvu v metadatech.',
          '**Ostrý obrázek**, ne rozmazaný, oříznutý nebo nakřivo, pokud to není záměr.',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Co na obalu být nesmí',
        text: 'Odkazy na web nebo sociální sítě, e-mail, QR kódy, loga obchodů a streamovacích služeb, ceny, data, čárové kódy, nápisy jako CD, vinyl nebo Deluxe a obrázky, ke kterým nemáte práva. Logo Parental Advisory jen u vydání označeného jako explicitní.',
      },
      { type: 'h2', text: 'Metadata' },
      {
        type: 'table',
        head: ['Údaj', 'Na co myslet'],
        rows: [
          ['Jméno interpreta', 'Pokaždé zapsané stejně. Každý interpret ve vlastním poli, nikdy v názvu skladby.'],
          ['Název skladby', 'Bez jména interpreta, bez emoji a bez reklamních textů jako „nový hit“.'],
          ['Hosté (feat.)', 'Do pole interpretů s rolí host, ne do názvu skladby.'],
          ['Verze', 'Remix, Live nebo Acoustic do pole pro verzi, aby se skladby nepletly s originálem.'],
          ['Autoři hudby a textu', 'Celá jména. Hodí se i pro OSA a pro správné uvedení autorů na platformách.'],
          ['Explicitní obsah', 'Označte příznakem. Platformy pak samy zobrazí značku E, do názvu ji nepište.'],
          ['ISRC', 'Pokud skladba už někdy vyšla, použijte její původní kód. U nové ho přidělí distributor.'],
          ['Datum vydání', 'Datum, kdy má vydání vyjít, ne kdy jste ho dokončili.'],
        ],
      },
      { type: 'h2', text: 'Kdy vydání zadat' },
      {
        type: 'p',
        text:
          'Počítejte s kontrolou u distributora, doručením na platformy a časem na nabídku do playlistů. Spotify doporučuje mít vydání nahrané aspoň týden předem, aby šlo nabídnout redakci playlistů. U nás proto vydání zadávejte **aspoň 14 dní před datem vydání**.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Nabídněte skladbu do playlistů',
        text: 'Jakmile je vydání doručené, můžete v Spotify for Artists jednu nevydanou skladbu nabídnout redakci playlistů. Čím dřív, tím víc času na to redakce má.',
      },
      { type: 'h2', text: 'Rychlá kontrola před odesláním' },
      {
        type: 'steps',
        items: [
          { title: 'Zvuk', text: 'WAV, finální master, každá skladba zvlášť.' },
          { title: 'Obal', text: 'Čtverec aspoň 3000 × 3000 px, jen jméno a název, nic navíc.' },
          { title: 'Jména', text: 'Interpret i hosté ve správných polích, zapsaní stejně jako u předchozích vydání.' },
          { title: 'Autoři a příznaky', text: 'Autoři hudby a textu celým jménem, explicitní obsah označený.' },
          { title: 'Termín', text: 'Datum vydání aspoň 14 dní dopředu.' },
        ],
      },
      {
        type: 'cta',
        title: 'Vydání za vás zkontrolujeme',
        text:
          'Každé vydání u nás před odesláním na platformy ručně projde kontrolou metadat, obalu, zvuku i autorských údajů. Když něco nesedí, ozveme se dřív, než to vrátí platforma.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
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
          'Při zakládání interpreta u nás zadáváme ID jeho profilů na Spotify, Apple Music a SoundCloudu, takže vydání míří rovnou na správné místo. A když se něco přece jen přiřadí špatně, opravu se všemi podklady vyřídíme s platformou za vás.',
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
