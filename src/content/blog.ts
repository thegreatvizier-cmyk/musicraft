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
  | { type: 'callout'; variant: 'tip' | 'warning' | 'musicraft'; title: string; text: string }
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
    slug: 'proc-platforma-zamitla-vydani',
    lang: 'cs',
    title: 'Proč platforma zamítla vydání: nejčastější důvody a jak je opravit',
    description:
      'Vydání se vrátilo s odmítnutím? Nejčastější důvody, proč Spotify, Apple Music a další platformy vydání zamítnou, a co s tím udělat, aby příště prošlo napoprvé.',
    date: '2026-11-22',
    readingMinutes: 6,
    cover: 'rejected',
    coverVariant: { palette: 4, motif: 1 },
    body: [
      {
        type: 'p',
        text:
          'Zamítnuté vydání neznamená, že je s hudbou něco špatně. Většinou jde o detail v obalu, v názvu nebo v údajích o interpretech, který nesedí s pravidly platformy. Většina takových problémů se dá opravit během pár dní. Nejtěžší je zjistit, co přesně je špatně.',
      },
      { type: 'h2', text: 'Nejčastější důvody' },
      {
        type: 'table',
        head: ['Důvod', 'Typický příklad', 'Jak to opravit'],
        rows: [
          ['Obal nesedí s údaji', 'Na obalu je jméno hosta, které v údajích chybí', 'Text na obalu musí přesně odpovídat interpretovi a názvu vydání'],
          ['Zakázané prvky na obalu', 'Odkaz na Instagram, logo Spotify, nápis „Out now“', 'Na obalu jen jméno a název, nic navíc'],
          ['Nekvalitní obal', 'Rozmazaný, malý nebo obyčejná barevná plocha', 'Ostrý čtverec aspoň 3000 × 3000 px'],
          ['Chybný formát údajů', 'Host v názvu skladby, emoji, VELKÁ PÍSMENA', 'Každý interpret do svého pole, název bez ozdob'],
          ['Zavádějící údaje', 'Jméno známého interpreta v názvu, aby skladba vyskakovala ve vyhledávání', 'Jen skuteční účinkující a pravdivý název'],
          ['Duplicita', 'Stejná skladba nahraná znovu pod jiným názvem', 'Jedna nahrávka, jedno vydání, jeden ISRC'],
          ['Nejasná práva', 'Cover verze bez licence, cizí sample, kupovaný beat bez smlouvy', 'Doložit licenci nebo smlouvu, nebo prvek odstranit'],
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Práva jsou nejvážnější důvod',
        text: 'Problémy s obalem nebo názvem se opraví za pár minut. Když platforma zjistí, že nahrávka nebo její část patří někomu jinému, jde o porušení práv. Opakované případy mohou vést až k ukončení spolupráce s distributorem. Licence a smlouvy mějte proto vyřešené dřív, než vydání zadáte.',
      },
      { type: 'h2', text: 'Co dělat, když vydání zamítnou' },
      {
        type: 'steps',
        items: [
          { title: 'Zjistěte přesný důvod', text: 'Distributor by vám měl říct, co konkrétně platforma vytkla. Obecné „nesplňuje pravidla“ nestačí, doptejte se.' },
          { title: 'Opravte jen to, co je potřeba', text: 'Měnit celé vydání není nutné. Upravte obal, název nebo údaje, které platforma vytkla.' },
          { title: 'Doložte, co je potřeba', text: 'U coverů, samplů nebo kupovaných beatů pošlete licenci nebo smlouvu.' },
          { title: 'Pošlete vydání znovu', text: 'Počítejte s novou kontrolou. Pokud se blíží datum vydání, posuňte ho raději hned.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Rezerva v termínu se vyplatí',
        text: 'Když zadáte vydání aspoň 14 dní předem, oprava se většinou stihne bez posunutí data. Při zadání na poslední chvíli posune vydání každá drobnost.',
      },
      { type: 'h2', text: 'Jak tomu předejít' },
      {
        type: 'ul',
        items: [
          '**Projděte si přípravu vydání.** Zvuk, obal a údaje podle [našeho přehledu](/cs/blog/jak-pripravit-vydani).',
          '**Text na obalu kontrolujte proti údajům.** Nejčastější chyba vůbec.',
          '**Uvádějte jen skutečné účinkující.** Žádná jména navíc kvůli vyhledávání.',
          '**Mějte doklady k právům** ke všemu, co jste sami nevytvořili.',
        ],
      },
      {
        type: 'callout',
        variant: 'musicraft',
        title: 'Kontrolujeme dřív než platformy',
        text: 'Každé vydání u nás před doručením ručně projde kontrolou obalu, údajů, zvuku i práv. Když něco nesedí, napíšeme vám konkrétně co a jak to opravit. K zamítnutí na straně platformy se tak většina vydání vůbec nedostane.',
      },
      {
        type: 'cta',
        title: 'Vydání, která projdou napoprvé',
        text: 'Ruční kontrola každého vydání je u nás součástí každého tarifu. Ušetříte čas i nervy s opravami na poslední chvíli.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
  {
    slug: 'spotify-for-artists-jak-ziskat-a-nastavit',
    lang: 'cs',
    title: 'Jak získat Spotify for Artists a co v něm nastavit',
    description:
      'Spotify for Artists je zdarma a bez něj přicházíte o statistiky, nabídku do playlistů i vlastní podobu profilu. Jak k němu získat přístup a co nastavit hned po přihlášení.',
    date: '2026-11-22',
    readingMinutes: 5,
    cover: 'profile',
    coverVariant: { palette: 2, motif: 0 },
    body: [
      {
        type: 'p',
        text:
          'Spotify for Artists je bezplatná aplikace, ve které spravujete svůj profil na Spotify, sledujete posluchače a nabízíte nové skladby redakci playlistů. Kdo ho nemá, přichází o jeden z mála nástrojů, které nic nestojí a skutečně pomáhají.',
      },
      { type: 'h2', text: 'Jak získat přístup' },
      {
        type: 'steps',
        items: [
          { title: 'Mějte na Spotify aspoň jedno vydání', text: 'Profil interpreta vzniká automaticky, když distributor doručí první vydání. Stačí, aby bylo doručené, nemusí být ještě venku.' },
          { title: 'Otevřete artists.spotify.com', text: 'Klikněte na Get Access a přihlaste se svým účtem Spotify, nebo si ho založte.' },
          { title: 'Najděte svůj profil', text: 'Vyhledejte své jméno, nebo vložte odkaz na profil interpreta.' },
          { title: 'Ověřte, že jste to vy', text: 'Spotify si žádost prověří, typicky přes odkazy na vaše sociální sítě nebo web. Mějte je v pořádku a s jasnou vazbou na vaši hudbu.' },
          { title: 'Počkejte na schválení', text: 'Žádosti posuzují lidé. Když ji Spotify zamítne, pošle e-mail s dalším postupem.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Profil si nárokujte ještě před vydáním',
        text: 'Jakmile je první vydání doručené, můžete si profil nárokovat i před datem vydání. Pomůže vám k tomu odkaz na profil a kód UPC vydání, obojí vám pošle distributor. Do vydání pak stihnete nastavit profil i nabídnout skladbu do playlistů.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Profil už někdo nárokoval?',
        text: 'Na jeden profil může běžet vždy jen jedna žádost. Pokud už profil spravuje váš manažer nebo label, nechte se pozvat do týmu, novou žádost podat nejde.',
      },
      { type: 'h2', text: 'Co nastavit hned po přihlášení' },
      {
        type: 'table',
        head: ['Nastavení', 'Proč na něm záleží'],
        rows: [
          ['Profilová fotka a záhlaví', 'První dojem. Výrazná fotka v dobrém rozlišení, ideálně stejná jako na sociálních sítích.'],
          ['Bio', 'Pár vět o tom, kdo jste a co hrajete. Pomůže posluchačům i redaktorům playlistů.'],
          ['Odkazy na sociální sítě', 'Ať vás fanoušek najde i mimo Spotify.'],
          ['Artist Pick', 'Skladba nebo playlist připnutý nahoře na profilu. Měňte ho s každým vydáním.'],
          ['Tým', 'Pozvěte manažera nebo label s odpovídající rolí, ať nemusíte sdílet heslo.'],
          ['Dvoufázové ověření', 'Chrání profil před zneužitím.'],
        ],
      },
      { type: 'h2', text: 'Co dělat s každým vydáním' },
      {
        type: 'ul',
        items: [
          '**Nabídněte skladbu redakci playlistů**, nejpozději 7 dní před vydáním. Je to zdarma a zároveň se tím skladba dostane do Release Radaru vašich fanoušků.',
          '**Přidejte Canvas**, krátkou smyčku za skladbou v přehrávači.',
          '**Aktualizujte Artist Pick** na nové vydání.',
          '**Sledujte statistiky**: odkud posluchači jsou, z jakých playlistů přicházejí a co ukládají.',
        ],
      },
      {
        type: 'callout',
        variant: 'musicraft',
        title: 'Když si nevíte rady',
        text: 'Přístup do Spotify for Artists si nárokujete sami, ale nejste v tom sami. Pošleme vám odkaz na profil i kód UPC a když se nárok zasekne nebo vydání skončí na cizím profilu, vyřešíme to s vámi.',
      },
      {
        type: 'cta',
        title: 'Distribuce, po které profil sedí',
        text: 'Při zakládání interpreta u nás zadáváme ID jeho profilů na platformách, takže vydání míří rovnou na správné místo.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
  {
    slug: 'umele-streamy-a-placene-playlisty',
    lang: 'cs',
    title: 'Umělé streamy a placené playlisty: proč se nevyplatí',
    description:
      'Nabídka „10 000 streamů za 50 eur“ nebo garantované místo v playlistu zní lákavě. Jak takové služby fungují, co za ně hrozí a jak poznat, které se vyhnout.',
    date: '2026-11-22',
    readingMinutes: 6,
    cover: 'rejected',
    body: [
      {
        type: 'p',
        text:
          'Skoro každý, kdo vydá skladbu, dostane brzy zprávu: „Dostaneme tě do playlistů s milionem sledujících“ nebo „10 000 streamů za pár eur“. Vypadá to jako rychlý start. Ve skutečnosti to často končí smazanými přehráními, zadrženými výnosy a v horším případě staženou skladbou. Vysvětlíme proč.',
      },
      { type: 'h2', text: 'Co jsou umělé streamy' },
      {
        type: 'p',
        text:
          'Umělý stream je přehrání, za kterým nestojí skutečný posluchač, který chtěl skladbu slyšet. Typicky jde o boty, skripty, farmy telefonů nebo playlisty, které nikdo neposlouchá, ale běží dokola. Platformy do jejich odhalování investují obrovské prostředky a stále se zlepšují.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Za umělé streamy můžete pykat, i když jste je nekupovali vy',
        text: 'Spotify posuzuje přehrání skladby, ne úmysl. Když vám umělé streamy „daruje“ podvodná služba nebo nadšený kamarád, důsledky nese vaše skladba.',
      },
      { type: 'h2', text: 'Co platformy dělají, když je odhalí' },
      {
        type: 'table',
        head: ['Postih', 'Co to znamená'],
        rows: [
          ['Výnosy se nevyplatí', 'Za umělá přehrání nedostanete nic. Peníze za ně zadrží platforma.'],
          ['Čísla se opraví', 'Počty přehrání i měsíčních posluchačů se veřejně sníží. Náhlý propad bývá prvním signálem.'],
          ['Vyřazení z playlistů', 'Skladba může zmizet z playlistů, včetně těch redakčních a algoritmických.'],
          ['Poplatek', 'Od dubna 2024 si Spotify účtuje labelům a distributorům poplatek za každou skladbu s výrazným podílem umělých streamů.'],
          ['Stažení skladby', 'Při opakovaném nebo hrubém porušení může platforma skladbu odstranit úplně.'],
        ],
      },
      {
        type: 'p',
        text:
          'Distributor se o problému dozví od platformy a podle pravidel Spotify může vydat varování, přenést na vás poplatek, pozastavit účet nebo skladbu stáhnout. Nejde o zlou vůli distributora: odpovídá platformě za všechno, co doručuje.',
      },
      { type: 'h2', text: 'Placené playlisty' },
      {
        type: 'p',
        text:
          'Spotify to říká jasně: **každá služba, která za peníze slibuje garantované místo v playlistu, porušuje jeho podmínky.** Nezáleží na tom, jak hezky vypadá web nebo kolik sledujících playlist má. Velká část takových playlistů je plněná právě umělými streamy, a vaše skladba v nich pak vypadá podezřele.',
      },
      { type: 'h2', text: 'Jak poznat podezřelou nabídku' },
      {
        type: 'ul',
        items: [
          '**Garance.** „Zaručeně 10 000 streamů“ nebo „garantované umístění“. Skutečný kurátor nic garantovat nemůže.',
          '**Cena za počet přehrání.** Platíte za čísla, ne za to, že vaši hudbu někdo uslyší.',
          '**Oslovili vás oni.** Nevyžádaná zpráva na Instagramu nebo e-mail s nabídkou je nejčastější cesta.',
          '**Playlisty bez života.** Statisíce sledujících, ale žádné ukládání skladeb, divné názvy nebo stovky skladeb všech žánrů.',
          '**Podezřelé statistiky.** Prudký nárůst přehrání z jedné země nebo z playlistu, který neznáte, a skoro žádní noví sledující.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Co dělat, když už se to stalo',
        text: 'Pokud jste službu už zaplatili, nebo se skladba objevila v podezřelém playlistu, ozvěte se distributorovi a pošlete mu název a odkaz na službu. Podezřelý playlist můžete nahlásit i přímo Spotify. Čím dřív, tím menší škoda.',
      },
      { type: 'h2', text: 'Co funguje místo toho' },
      {
        type: 'steps',
        items: [
          { title: 'Nabídněte skladbu redakci Spotify', text: 'Zdarma v Spotify for Artists, nejpozději 7 dní před vydáním.' },
          { title: 'Postavte vydání na fanoušcích', text: 'Pre-save, sociální sítě, newsletter. Skuteční posluchači ukládají a vracejí se, a to algoritmy odmění.' },
          { title: 'Hledejte kurátory, kteří poslouchají', text: 'Kurátoři a blogy, kteří si skladbu poslechnou a mohou ji i odmítnout. Platíte za čas, ne za místo.' },
          { title: 'Buďte trpěliví', text: 'Pět set skutečných posluchačů, kteří se vrátí, má větší cenu než deset tisíc přehrání od botů.' },
        ],
      },
      {
        type: 'callout',
        variant: 'musicraft',
        title: 'Proč to hlídáme',
        text: 'Každé vydání u nás před doručením kontrolujeme a podezřelé případy řešíme s umělcem dřív, než zasáhne platforma. Chráníme tím vaše výnosy i dobré jméno celého katalogu.',
      },
      {
        type: 'cta',
        title: 'Distribuce bez zkratek',
        text:
          'Neslibujeme žebříčky ani místa v playlistech. Dáme vaší hudbě pevný základ: správná metadata, spolehlivé doručení a podporu, když na platformách něco nesedí.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
  {
    slug: 'vlastni-label-a-distributor',
    lang: 'cs',
    title: 'Vlastní label: co mu dává distributor a na co se ptát před podpisem',
    description:
      'Zakládáte label nebo vydáváte víc interpretů? Co pro label dělá distributor, jak začít a deset otázek, které si položit, než podepíšete distribuční smlouvu.',
    date: '2026-11-21',
    readingMinutes: 6,
    cover: 'label',
    body: [
      {
        type: 'p',
        text:
          'Jakmile vydáváte víc než jednoho interpreta, budujete katalog pod vlastní značkou nebo chcete mít vydávání pod kontrolou, dává smysl vlastní label. Label nepotřebuje lisovnu ani kancelář. Potřebuje ale distributora, který zvládne víc než jen nahrát skladbu na Spotify.',
      },
      { type: 'h2', text: 'Co distributor labelu dává' },
      {
        type: 'table',
        head: ['Oblast', 'Co by měl distributor zajistit'],
        rows: [
          ['Doručení', 'Vydání všech interpretů na hudební i video platformy, pod jménem vašeho labelu.'],
          ['Kódy', 'Přidělení ISRC a UPC, nebo převzetí vašich vlastních.'],
          ['Kontrola', 'Kontrolu metadat, obalů a zvuku dřív, než vydání vrátí platforma.'],
          ['Výkazy', 'Royalty výkazy po interpretech a skladbách, abyste mohli spravedlivě vyplácet podíly.'],
          ['Profily', 'Správné přiřazení k profilům interpretů a řešení chyb s platformami.'],
          ['Katalog', 'Opravy, stažení a přesuny vydání i roky po vydání.'],
        ],
      },
      { type: 'h2', text: 'Jak začít' },
      {
        type: 'steps',
        items: [
          { title: 'Zvolte a prověřte název', text: 'Vyhledejte ho na Spotify, Apple Music a v obchodním rejstříku, aby se nepletl s jiným labelem.' },
          { title: 'Nastavte údaje o právech', text: 'U každého vydání se uvádí ℗ (práva k nahrávce) a © (práva k obalu a vydání) s rokem a názvem labelu.' },
          { title: 'Uzavřete smlouvy s interprety', text: 'Písemně: kdo vlastní nahrávky, jak se dělí výnosy a co se stane, když spolupráce skončí.' },
          { title: 'Vyberte distributora', text: 'Podle otázek níže. Pro label je důležitější podpora a výkazy než nejnižší cena.' },
          { title: 'Převeďte katalog', text: 'Pokud už vydání někde máte, přesuňte je se zachováním kódů ISRC a UPC, ať nepřijdete o přehrání.' },
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Smlouvy s interprety řešte předem',
        text: 'Nejvíc sporů na malých labelech nevzniká kvůli penězům, ale kvůli tomu, že se nikdo písemně nedomluvil, komu nahrávky patří a jak se dělí výnosy. Vyřešte to dřív, než skladba vyjde.',
      },
      { type: 'h2', text: 'Na co se ptát před podpisem' },
      {
        type: 'table',
        head: ['Otázka', 'Proč na ní záleží'],
        rows: [
          ['Komu patří práva k nahrávkám?', 'Musí zůstat vám. Distributor je jen doručuje.'],
          ['Kolik stojí a jaký je podíl z výnosů?', 'Porovnávejte paušál i procenta dohromady, ne jen jedno z nich.'],
          ['Jak dlouho smlouva platí a jak se vypovídá?', 'Dlouhá výpovědní lhůta vás může držet i ve chvíli, kdy chcete odejít.'],
          ['Co se stane s katalogem, když odejdu?', 'Kódy ISRC a UPC musí zůstat vaše, aby šlo vydání převést bez ztráty přehrání.'],
          ['Jak podrobné jsou výkazy?', 'Pro label potřebujete rozpad po interpretech a skladbách, ne jednu částku.'],
          ['Jak často a od jaké částky se vyplácí?', 'Zjistěte frekvenci výplat a minimální zůstatek.'],
          ['Na které platformy doručujete?', 'Včetně videa a sociálních sítí, kde dnes vzniká velká část výnosů.'],
          ['Kdo mi odpoví, když něco nefunguje?', 'Konkrétní člověk a lhůta, ne formulář bez odpovědi.'],
          ['Jak řešíte chyby na platformách?', 'Špatně přiřazené profily nebo zamítnutá vydání se u labelu stávají častěji.'],
          ['Pomůžete s převodem katalogu?', 'Převod se zachováním kódů je práce. Dobrý distributor ji udělá za vás.'],
        ],
      },
      {
        type: 'callout',
        variant: 'musicraft',
        title: 'Labely u nás',
        text: 'Pro labely máme individuální podmínky podle velikosti katalogu. Label má v royalty portálu vlastní přístup s výkazy celého katalogu, interpreti vidí svoje. Převod katalogu i řešení s platformami děláme za vás.',
      },
      {
        type: 'cta',
        title: 'Distribuce pro váš label',
        text:
          'Distribuujeme pro nezávislé labely na všechny hlavní hudební i video platformy. Pošlete nám krátký popis labelu a katalogu a ozveme se s návrhem podmínek.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
  {
    slug: 'proc-vydavat-14-dni-predem-a-pre-save',
    lang: 'cs',
    title: 'Proč vydávat 14 dní předem a jak na pre-save',
    description:
      'Skladba je hotová a chcete ji venku hned? Co během dvou týdnů před vydáním získáte, co ztratíte spěchem a jak funguje pre-save na Spotify a Apple Music.',
    date: '2026-11-21',
    readingMinutes: 5,
    cover: 'calendar',
    body: [
      {
        type: 'p',
        text:
          'Nejčastější otázka, kterou dostáváme: „Může to vyjít už tento pátek?“ Většinou to jde. Jenže skladba vydaná narychlo přichází o věci, které nic nestojí a výrazně jí pomůžou: o šanci na playlisty, o místo ve Spotify Release Radaru vašich fanoušků a o čas na pre-save. Proto doporučujeme zadávat vydání **aspoň 14 dní předem**.',
      },
      { type: 'h2', text: 'Co se během dvou týdnů děje' },
      {
        type: 'table',
        head: ['Kdy', 'Co se děje'],
        rows: [
          ['14 dní před vydáním', 'Zadáte vydání. Projde kontrolou metadat, obalu a zvuku.'],
          ['Zhruba 10 dní před', 'Vydání je doručené na platformy a čeká na datum.'],
          ['Nejpozději 7 dní před', 'Nabídnete skladbu redakci playlistů v Spotify for Artists. Tím se zároveň dostane do Release Radaru vašich fanoušků.'],
          ['Týden před', 'Běží pre-save kampaň: odkaz v biu, příběhy, newsletter.'],
          ['Den vydání', 'Skladba vyjde a fanouškům, kteří ji předem uložili, se sama objeví v knihovně.'],
        ],
      },
      { type: 'h2', text: 'Co ztratíte, když spěcháte' },
      {
        type: 'ul',
        items: [
          '**Nabídku do playlistů.** Redakci Spotify můžete nabídnout jen skladbu, která ještě nevyšla, a redakce potřebuje čas.',
          '**Release Radar první týden.** Spotify doporučuje nabídnout skladbu aspoň 7 dní před vydáním, aby se dostala do Release Radaru vašich fanoušků hned v týdnu vydání.',
          '**Pre-save.** Bez předstihu není co sdílet a fanoušci se o vydání dozvědí až dodatečně.',
          '**Čas na opravy.** Když kontrola najde chybu v obalu nebo údajích, na opravu nezbývá čas a termín se posune stejně.',
        ],
      },
      {
        type: 'callout',
        variant: 'musicraft',
        title: 'Spěcháte? Vydání i tak přijmeme',
        text: 'Vydání s kratším předstihem než 14 dní u nás zadat jde, jen termín nemůžeme zaručit. V tarifu Pro ho vyřizujeme přednostně.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Vydávejte v pátek',
        text: 'Release Radar se na Spotify obnovuje každý pátek a v pátek vychází většina nové hudby. Vydání na pátek tak zapadne do toho, kdy posluchači novinky hledají.',
      },
      { type: 'h2', text: 'Jak funguje pre-save' },
      {
        type: 'p',
        text:
          'Pre-save znamená, že si fanoušek skladbu uloží ještě před vydáním. V den vydání ji pak najde ve své knihovně a dostane upozornění. Pro vás je to signál zájmu hned od první minuty. Existují tři cesty:',
      },
      {
        type: 'table',
        head: ['Způsob', 'Pro koho', 'Jak se nastavuje'],
        rows: [
          ['Spotify Countdown Page', 'Alba a EP, interpreti s aspoň 3 000 aktivními posluchači měsíčně', 'Sami v Spotify for Artists, jakmile je vydání doručené'],
          ['Apple Music pre-add', 'Vydání doručená s předstihem', 'Zajišťuje distributor při doručení'],
          ['Pre-save odkaz', 'Každé vydání včetně singlů', 'Jeden odkaz pro více platforem, sdílíte ho kdekoli'],
        ],
      },
      { type: 'h2', text: 'Pre-save kampaň ve čtyřech krocích' },
      {
        type: 'steps',
        items: [
          { title: 'Zadejte vydání včas', text: 'Bez doručeného vydání pre-save nefunguje. Čtrnáct dní je bezpečná rezerva.' },
          { title: 'Připravte odkaz', text: 'Jeden pre-save odkaz pro všechny platformy, s obalem a názvem skladby.' },
          { title: 'Sdílejte ho', text: 'Do bia na Instagramu a TikToku, do příběhů, do newsletteru i do popisku posledního videa.' },
          { title: 'Připomeňte se v den vydání', text: 'Fanouškům, kteří skladbu uložili, se objeví sama. Ostatním připomeňte, že je venku.' },
        ],
      },
      {
        type: 'cta',
        title: 'Termín i pre-save pohlídáme',
        text:
          'Vydání zkontrolujeme a doručíme s předstihem, aby byl čas na nabídku do playlistů. Jako doplněk vám k vydání připravíme pre-save odkaz pro více platforem.',
        button: 'Chci distribuci',
        href: '/musicraft/apply',
      },
    ],
  },
  {
    slug: 'videoklip-na-spotify-a-apple-music',
    lang: 'cs',
    title: 'Jak dostat videoklip na Spotify a Apple Music',
    description:
      'Videoklipy už nejsou jen na YouTube. Jak se klip dostane na Spotify, Apple Music, VEVO a TIDAL, co platformy vyžadují a co připravit, aby vyšel spolu se skladbou.',
    date: '2026-11-21',
    readingMinutes: 6,
    cover: 'video',
    coverVariant: { palette: 3, motif: 4 },
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
          '**Spotify videa teprve rozšiřuje.** Zobrazují se hlavně předplatitelům Premium a dostupnost přibývá postupně podle zemí. Kdo klip doručí už teď, bude u toho od začátku.',
          '**Přímé nahrání v Spotify for Artists** zatím zkouší jen omezený okruh umělců. Hlavní cestou zůstává distributor.',
        ],
      },
      {
        type: 'callout',
        variant: 'musicraft',
        title: 'U Musicraftu mají distribuci videa všichni umělci',
        text: 'Nemusíte čekat, až se vám nabídne beta v Spotify for Artists. Každý umělec u nás může videoklip doručit na Spotify a zároveň na Apple Music, VEVO a TIDAL. Klip napojíme rovnou ke skladbě, kterou u nás máte.',
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
