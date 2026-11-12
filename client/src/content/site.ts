/**
 * LOFIN FOUNDATION — central content source.
 *
 * PLACEHOLDER DRAFT for a Kenyan foundation. The framing, counties, currency and
 * giving methods are Kenyan; the specific facts are not. Programme names, statistics,
 * grant amounts, stories, people, addresses, documents and contact details are
 * stand-ins chosen to show the layout working end to end.
 *
 * To make the site real, edit this file and replace the files in
 * `client/public/images`. No page component needs to change: copy, figures,
 * programs, stories, team, pathways, imagery and page titles all come from here.
 * Colour and type tokens live in `src/index.css`.
 */

export const IMAGES = {
  heroCommunity: "/images/hero-community.webp",
  heroWatershed: "/images/hero-watershed.webp",
  heroLearning: "/images/hero-learning.webp",
  storyPublicSpace: "/images/story-public-space.webp",
  storyFarming: "/images/story-farming.webp",
  storyMarket: "/images/story-market.webp",
  storyHealth: "/images/story-health.webp",
  aboutValues: "/images/about-values.webp",
  getInvolved: "/images/get-involved.webp",
  storyYouth: "/images/story-youth.webp",
} as const;

/** Money is Kenyan shillings everywhere on this site. */
export const currency = {
  code: "KES",
  /** Written the way Kenyan institutions write it: KSh 1,000. */
  symbol: "KSh",
  locale: "en-KE",
} as const;

/** Single formatter so no page hard-codes a currency symbol. */
export const money = (value: number | string) => {
  const number = typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  if (!Number.isFinite(number)) return `${currency.symbol} —`;
  return `${currency.symbol} ${number.toLocaleString("en-KE")}`;
};

export const org = {
  name: "LOFIN Foundation",
  wordmarkTop: "LOFIN",
  wordmarkBottom: "FOUNDATION",
  country: "Kenya",
  /** Placeholder strapline. Replace with the foundation's own words. */
  strapline: "Building opportunity through stronger communities",
  /** Placeholder Kiswahili strapline — confirm the wording before launch. */
  straplineSw: "Jamii yenye nguvu, maendeleo thabiti",
  /** Unconfirmed legal detail — replace once registration is settled. */
  registrationNote: "Registered in Kenya · NGO Coordination Board number [to be confirmed]",
  taxNote: "KRA PIN [to be confirmed] · Public Benefits Organisation status [to be confirmed]",
  foundedYear: 2016,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", short: "IN" },
    { label: "Instagram", href: "https://www.instagram.com/", short: "IG" },
    { label: "Facebook", href: "https://www.facebook.com/", short: "FB" },
    { label: "X", href: "https://x.com/", short: "X" },
  ],
} as const;

export const nav = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Impact", href: "/impact" },
  { label: "Stories", href: "/stories" },
  { label: "Get Involved", href: "/get-involved" },
] as const;

export type HeroSlide = {
  id: string;
  image: string;
  kicker: string;
  headline: string;
  standfirst: string;
  ctaLabel: string;
  href: string;
  alt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "communities",
    image: IMAGES.heroCommunity,
    kicker: "Community voice",
    headline: "Building opportunity through stronger communities",
    standfirst:
      "Kenyans rank their own towns as places worth investing in. A survey we funded here finds that many still do not believe their ideas will be heard — or that they have a say in what comes next.",
    ctaLabel: "Read the research",
    href: "/impact",
    alt: "A women's group meeting outdoors under an acacia tree in rural Kenya",
  },
  {
    id: "water",
    image: IMAGES.heroWatershed,
    kicker: "Water & land",
    headline: "What we do next will determine the river's future",
    standfirst:
      "A reporting series following the people and communities using nature-based solutions — sand dams, terraces and restored catchment forest — to protect water through a changing climate.",
    ctaLabel: "Explore the series",
    href: "/our-work/water-land",
    alt: "Women filling jerrycans at a new borehole in semi-arid northern Kenya",
  },
  {
    id: "learning",
    image: IMAGES.heroLearning,
    kicker: "Learning & opportunity",
    headline: "Do students feel known at school?",
    standfirst:
      "Half of the young people in our grantee surveys said one adult who noticed them changed their path. We are funding the schools making that ordinary — from Primary 3 reading to the senior school transition.",
    ctaLabel: "See the programme",
    href: "/our-work/learning-opportunity",
    alt: "Kenyan pupils reading at their desks while a teacher writes on the board",
  },
];

export const mission = {
  eyebrow: "Why we exist",
  heading: "Every community already holds most of the answers. Our job is to fund them.",
  body: [
    "LOFIN Foundation backs Kenyan organisations in learning, water and land, health access and local economies — the four areas where a modest, patient grant changes what a place can do for itself.",
    "This is placeholder draft copy. Replace this paragraph with your registered mission statement, and the whole site updates from a single line in the content file.",
  ],
  image: IMAGES.aboutValues,
  imageAlt: "Kenyan growers potting tree seedlings in a community nursery",
  flagship: {
    eyebrow: "Flagship initiative",
    heading: "How opportunity takes root",
    body: "A placeholder for the multi-year initiative the foundation would be judged on: the research, the funded partners, and what changes in the third year rather than the first.",
    image: IMAGES.storyPublicSpace,
    alt: "Residents reviewing public-space plans on a street table in Nairobi",
    ctaLabel: "Read the plan",
    href: "/our-work/local-economies",
  },
} as const;

export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  note: string;
  decimals?: number;
};

/** Illustrative figures only — not real data. Both bands below are labelled as such. */
export const impactStats: Stat[] = [
  {
    label: "Granted to date",
    value: 426,
    prefix: `${currency.symbol} `,
    suffix: "M",
    decimals: 0,
    note: "Illustrative total across all four programme areas since 2016.",
  },
  {
    label: "Partner organisations",
    value: 128,
    note: "Illustrative count of funded Kenyan grantees.",
  },
  {
    label: "People reached a year",
    value: 340,
    suffix: "K",
    note: "Illustrative annual reach across funded programmes.",
  },
  {
    label: "Counties",
    value: 14,
    note: "Illustrative reach, from Turkana and Marsabit to Kilifi and Nairobi.",
  },
];

/** Strategy figures shown on the Our Work index. */
export const strategyFigures = [
  {
    value: "68%",
    label: "Multi-year operating support",
    body: "Share of grant spend that is unrestricted, so partners can plan past the current project.",
  },
  {
    value: "21 days",
    label: "Median decision time",
    body: "From complete enquiry to a written answer. Placeholder service standard.",
  },
  {
    value: "14 counties",
    label: "One country, mapped properly",
    body: "Everything funded sits inside Kenya, in named counties and wards with published boundaries.",
  },
] as const;

export type Program = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  detail: string;
  image: string;
  alt: string;
  focus: { title: string; body: string }[];
  figures: { value: string; label: string }[];
  grants: { recipient: string; amount: string; purpose: string }[];
  relatedStory: string;
};

export const programs: Program[] = [
  {
    slug: "learning-opportunity",
    name: "Learning & Opportunity",
    tagline: "Schools and out-of-school time that notice the child",
    summary:
      "We support reading in the language of instruction, teacher coaching and the transition out of school — so young Kenyans finish with somewhere to go.",
    detail:
      "Placeholder detail: what the programme funds, what it refuses, and the theory of change in plain language. Two paragraphs is enough for most readers.",
    image: IMAGES.heroLearning,
    alt: "A Kenyan teacher helping two pupils at their desk",
    focus: [
      {
        title: "Teaching quality",
        body: "Residency places, coaching time and retention research with county education offices.",
      },
      {
        title: "Reading by Primary 3",
        body: "Small-group tutoring and family literacy sessions in primary schools, in Kiswahili or the mother tongue first.",
      },
      {
        title: "Pathways",
        body: "Employer-linked apprenticeship and TVET navigation for the last years of school.",
      },
    ],
    figures: [
      { value: "31", label: "Partner schools" },
      { value: "9,400", label: "Learners in programme, illustrative" },
    ],
    grants: [
      {
        recipient: "[County literacy network]",
        amount: money(14500000),
        purpose: "Two-year tutoring expansion into four primary schools",
      },
      {
        recipient: "[Arid counties teaching residency]",
        amount: money(26000000),
        purpose: "Coaching time and stipends for 40 resident teachers",
      },
    ],
    relatedStory: "matters-at-school",
  },
  {
    slug: "water-land",
    name: "Water & Land",
    tagline: "Working with nature, not around it",
    summary:
      "Catchment restoration, sand dams and farm conservation led by the people who live downstream of the decision.",
    detail:
      "Placeholder detail: the ecological and economic case for the programme, the reach of the current portfolio and the partners who hold the long-term mandate.",
    image: IMAGES.heroWatershed,
    alt: "A new borehole and sand dam in semi-arid northern Kenya",
    focus: [
      {
        title: "Catchment restoration",
        body: "Riverbank planting, terracing and indigenous trees on public and community land.",
      },
      {
        title: "Farmer-led conservation",
        body: "Cost-share for cover cropping, hedgerows and soil measurement on smallholdings.",
      },
      {
        title: "Drought and flood readiness",
        body: "Sand dams, water pans and early-warning work designed with county water departments.",
      },
    ],
    figures: [
      { value: "86 km", label: "Riverbank under restoration" },
      { value: "14", label: "Watershed partnerships" },
    ],
    grants: [
      {
        recipient: "[Dryland sand dam cooperative]",
        amount: money(38000000),
        purpose: "Five-year monitoring of three restored reaches",
      },
      {
        recipient: "[Escarpment growers network]",
        amount: money(21000000),
        purpose: "Cover-seed and terracing cost-share for 90 family farms",
      },
    ],
    relatedStory: "sand-dams-green-line",
  },
  {
    slug: "health-access",
    name: "Health Access",
    tagline: "Care that shows up where people already are",
    summary:
      "Outreach clinics, paid community health volunteers and transport support that remove the small obstacles behind big absences.",
    detail:
      "Placeholder detail: the access gap being closed, the delivery model, and what the evidence says about navigator-led outreach.",
    image: IMAGES.storyHealth,
    alt: "A Kenyan community health worker weighing a baby at an outreach clinic",
    focus: [
      {
        title: "Mobile services",
        body: "Outreach in wards without a pharmacy within a 30-minute walk.",
      },
      {
        title: "Community health volunteers",
        body: "Paid local promoters who stay with a family across appointments, working inside the county CHPS structure.",
      },
      {
        title: "Maternal & child",
        body: "Postnatal visits and boda-boda or ambulance transport support in the first twelve months.",
      },
    ],
    figures: [
      { value: "7", label: "Mobile units supported" },
      { value: "22,000", label: "Household visits, illustrative year" },
    ],
    grants: [
      {
        recipient: "[County health outreach team]",
        amount: money(29000000),
        purpose: "Second mobile clinic and two-year staffing",
      },
      {
        recipient: "[Navigator volunteer programme]",
        amount: money(12000000),
        purpose: "Train and pay 12 community health volunteers",
      },
    ],
    relatedStory: "power-of-working-together",
  },
  {
    slug: "local-economies",
    name: "Local Economies",
    tagline: "Money that stays in the mtaa",
    summary:
      "Support for jua kali artisans, market traders' co-operatives, chamas and public space that gives a trading centre a reason to reopen.",
    detail:
      "Placeholder detail: how the enterprise support works, why resident-designed public space is treated as economic infrastructure, and what survives three years.",
    image: IMAGES.storyMarket,
    alt: "Kenyan market traders arranging produce in baskets",
    focus: [
      {
        title: "Micro enterprise",
        body: "Bridge grants, bookkeeping help and stall fees for first-time traders and jua kali workshops.",
      },
      {
        title: "Group saving",
        body: "Registration, training and legal costs for chamas, SACCOs and worker co-operatives.",
      },
      {
        title: "Public space",
        body: "Small activation grants when traders and residents, not consultants, design the plan.",
      },
    ],
    figures: [
      { value: "54", label: "Businesses supported" },
      { value: "310", label: "Local jobs, illustrative" },
    ],
    grants: [
      {
        recipient: "[Market traders co-operative]",
        amount: money(9500000),
        purpose: "One market season with 40 stallholders, including shed repairs",
      },
      {
        recipient: "[Chama enterprise fund]",
        amount: money(16000000),
        purpose: "Registration and advisory costs for four worker buy-outs",
      },
    ],
    relatedStory: "neighbors-public-spaces",
  },
];

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);

export type Story = {
  slug: string;
  title: string;
  category: string;
  categoryHref: string;
  author: string;
  date: string;
  dateLabel: string;
  image: string;
  alt: string;
  summary: string;
  standfirst: string;
  body: string[];
  pullQuote: string;
};

/** Editorial placeholders. Never publish invented beneficiaries as real people. */
export const stories: Story[] = [
  {
    slug: "building-trust-listening",
    title: "Building trust means listening more than talking",
    category: "Water & Land",
    categoryHref: "/stories?area=water-land",
    author: "[Staff name]",
    date: "2026-10-14",
    dateLabel: "October 14, 2026",
    image: IMAGES.heroWatershed,
    alt: "A dryland riverbed with new planting in soft morning light",
    summary:
      "Partnerships with upstream communities show why lasting progress starts with listening, following their lead and earning trust over time.",
    standfirst:
      "Three wards, one river and a decade of learning that the first draft should never be written in Nairobi.",
    body: [
      "The restoration plan that finally worked was the fourth one. The first three were technically sound and socially deaf — drawn up by engineers who had never had tea with the people whose shambas the water crosses.",
      "What changed was sequence. The coalition ran twelve baraza meetings before a single drawing, paid the residents who attended, and published what they had heard before publishing what they proposed.",
      "Two years on, the reach holds sediment in place, the county assembly funds the monitoring, and the word 'stakeholder' has quietly disappeared from the meeting minutes.",
    ],
    pullQuote: "We stopped asking people to accept a plan and asked them to write one.",
  },
  {
    slug: "sand-dams-green-line",
    title: "The cheapest defence against the next drought is a line of small dams",
    category: "Water & Land",
    categoryHref: "/stories?area=water-land",
    author: "[Staff name]",
    date: "2026-09-28",
    dateLabel: "September 28, 2026",
    image: IMAGES.storyFarming,
    alt: "Farmland with terracing and hedgerows in low sun",
    summary:
      "Sand dams and terraces built by local labour are keeping water on the landscape through the long dry season.",
    standfirst:
      "The cheapest drought break in the county turns out to be a series of small dams, dug and maintained by the people downstream of them.",
    body: [
      "When the county's crews walked the upper basin in August, they found green strips where the model said there should be dust.",
      "The dams are low cost — cement, a stone weir, and a community that keeps the channel clear. What took negotiation was the question of who owns the water table, and the answer came from a chief who had grown up on that river.",
      "The approach is now written into the county's five-year integrated development plan at a fraction of the cost of the mechanical option it replaced.",
    ],
    pullQuote: "Half our drought budget now goes to works the community built itself.",
  },
  {
    slug: "quarry-town-river",
    title: "An old quarry town writes its next chapter by restoring the river that runs through it",
    category: "Water & Land",
    categoryHref: "/stories?area=water-land",
    author: "[Staff name]",
    date: "2026-09-21",
    dateLabel: "September 21, 2026",
    image: IMAGES.storyPublicSpace,
    alt: "Neighbours gathered around plans on a table in the street",
    summary:
      "After the stone stopped moving, the trading centre bet on water, fishing and a river walk — and the first season brought back more visitors than jobs.",
    standfirst:
      "A century of extraction left a silted river and a proud town. Both are now being repaired by the same people.",
    body: [
      "The cleanup money arrived in 2019 and the argument started immediately: culverts or a walk? Concrete or fig trees? The town settled it the way it settles most things, at the shop veranda, over six weeks.",
      "The compromise is a soft-engineered bank with a gravel path, cheap to build and forgiving of floods. Two of the young people who would have left for work elsewhere are now the crew that maintains it.",
      "Placeholder for the reporting you would do here: visitor numbers, water quality series, and the quotes of the people who actually live it.",
    ],
    pullQuote: "We are not saving the river for visitors. We are saving it so our children come back.",
  },
  {
    slug: "neighbors-public-spaces",
    title: "When neighbours help shape the future of public spaces",
    category: "Local Economies",
    categoryHref: "/stories?area=local-economies",
    author: "[Staff name]",
    date: "2026-09-02",
    dateLabel: "September 2, 2026",
    image: IMAGES.storyPublicSpace,
    alt: "Residents reviewing plans for a public square in a Nairobi mtaa",
    summary:
      "Across Kenyan trading centres, strong civic participation is ensuring that local voices are reflected in the places they share.",
    standfirst:
      "The plan on the folding table had more red biro on it than the sub-county's original had black ink.",
    body: [
      "The activation fund was designed to be small: KSh 500,000, no consultants, a six-week turnaround. What nobody budgeted for was the argument about parking for the matatu stage.",
      "It took three Saturday harambee sessions. The eventual design lost two parking spaces and gained a shade structure, a water point and a stage flat enough for a wheelchair.",
      "The square now hosts a weekly market. Two of the traders had been running from the boot of their car.",
    ],
    pullQuote: "Nobody objects to a bench until it is their bench.",
  },
  {
    slug: "matters-at-school",
    title: "A new report connects low morale to severe educator burnout",
    category: "Learning & Opportunity",
    categoryHref: "/stories?area=learning-opportunity",
    author: "[Staff name]",
    date: "2026-09-03",
    dateLabel: "September 3, 2026",
    image: IMAGES.heroLearning,
    alt: "Teacher and pupils working in a bright Kenyan classroom",
    summary:
      "Only one in three educators in our survey felt a strong sense of mattering at school, with fewer than half of undervalued staff planning to remain in the county.",
    standfirst:
      "We asked 1,200 teachers across nine counties one unusual question: does this place notice you? The answer predicts who stays.",
    body: [
      "The correlation is not salary. It is whether a teacher can name one adult in the staffroom who checks on them on the hard days — and whether the head teacher protects time to do it.",
      "Schools that funded thirty unprotected minutes a week for coaching conversations scored highest on mattering, and lowest on unplanned absence.",
      "Figures here are placeholders for whatever your research actually finds.",
    ],
    pullQuote: "Retention is not a pay problem. It is an attention problem.",
  },
  {
    slug: "power-of-working-together",
    title: "The power of working together",
    category: "Health Access",
    categoryHref: "/stories?area=health-access",
    author: "[Staff name]",
    date: "2026-08-28",
    dateLabel: "August 28, 2026",
    image: IMAGES.storyHealth,
    alt: "A community health worker speaking with a mother outside a rural clinic",
    summary:
      "One van, one nurse, one church hall and a transport scheme turned out to be enough to restart antenatal attendance.",
    standfirst:
      "The clinic did not fail for lack of clinicians. It failed because the matatu does not run on Tuesdays.",
    body: [
      "Attendance recovered when the programme paid for the boda boda, not when it added the clinical officer.",
      "The volunteer navigator model costs a fraction of a satellite clinic and reaches people who would never book an appointment.",
      "Swap this paragraph for your own findings and name the county partners properly before launch.",
    ],
    pullQuote: "We were solving a medical problem that was actually a transport problem.",
  },
  {
    slug: "farm-the-best",
    title: "'Farm the best, conserve the rest'",
    category: "Water & Land",
    categoryHref: "/stories?area=water-land",
    author: "[Staff name]",
    date: "2026-08-11",
    dateLabel: "August 11, 2026",
    image: IMAGES.storyFarming,
    alt: "A Kenyan smallholder farmer kneeling in green onion rows",
    summary:
      "A growers' association is proving that conservation is the difference between a resilient season and a ruined one.",
    standfirst:
      "The rule is simple to say and hard to fund: put the marginal ground out of production and keep the good ground alive.",
    body: [
      "Cost-share removes the first-season risk, which is the only season most smallholders can afford to be wrong about.",
      "By the third season the hedgerows carry the pollinators, the soil holds the rain and the fertiliser bill falls.",
      "Placeholder yield and soil-organic-matter series go here when you have them.",
    ],
    pullQuote: "Conservation is a business decision we help people afford.",
  },
  {
    slug: "youth-workshop",
    title: "The workshop where the model bridge always fails on purpose",
    category: "Learning & Opportunity",
    categoryHref: "/stories?area=learning-opportunity",
    author: "[Staff name]",
    date: "2026-07-19",
    dateLabel: "July 19, 2026",
    image: IMAGES.storyYouth,
    alt: "Young Kenyan technicians testing solar equipment on a workbench",
    summary:
      "An out-of-school engineering club is producing something rarer than winners: young people who stay with a hard problem.",
    standfirst:
      "The brief is to build a bridge that holds 40 kilos, then load it until it breaks and write down exactly why.",
    body: [
      "Failure is the curriculum. The club keeps a wall of broken models, each labelled with the load and the reason.",
      "Four of last year's members are now on TVET scholarships the club did not arrange but did help them believe they could ask for.",
      "Names and outcomes are placeholders — get written consent, and parental consent for anyone under eighteen, before publishing a young person's story.",
    ],
    pullQuote: "We do not celebrate the bridge. We celebrate the diagnosis.",
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const quote = {
  eyebrow: "In our own words",
  text: "It is not what you gather in life, it is what you scatter that tells the kind of life you have lived.",
  attribution: "Placeholder founder attribution — replace with your own, or use a board-approved line",
} as const;

export type Person = {
  name: string;
  role: string;
  bio: string;
  group: "Staff" | "Board" | "Advisory";
};

/**
 * Placeholder profiles. Monogram avatars are used deliberately rather than
 * generated faces, so nobody is presented as a real person.
 */
export const people: Person[] = [
  {
    name: "[Executive Director name]",
    role: "Executive Director",
    bio: "Placeholder biography: what this person did before, and why the foundation exists.",
    group: "Staff",
  },
  {
    name: "[Programmes Director name]",
    role: "Director of Programmes",
    bio: "Placeholder biography covering programme leadership and prior sector experience.",
    group: "Staff",
  },
  {
    name: "[Finance & Compliance Lead name]",
    role: "Finance & Compliance Lead",
    bio: "Placeholder biography covering grantmaking controls, NGO Board returns, audit and reporting.",
    group: "Staff",
  },
  {
    name: "[County Liaison name]",
    role: "County Partnerships Lead",
    bio: "Placeholder biography covering county government and ward-level relationships.",
    group: "Staff",
  },
  {
    name: "[Board Chair name]",
    role: "Board Chair",
    bio: "Placeholder biography. Board members are usually the first real content to add.",
    group: "Board",
  },
  {
    name: "[Vice Chair name]",
    role: "Board Vice Chair",
    bio: "Placeholder biography with community and sector context.",
    group: "Board",
  },
  {
    name: "[Trustee name]",
    role: "Trustee",
    bio: "Placeholder biography with professional background.",
    group: "Board",
  },
  {
    name: "[Community Advisor name]",
    role: "Community Advisor",
    bio: "Placeholder biography for a resident-led advisory seat.",
    group: "Advisory",
  },
  {
    name: "[Water Technical Advisor name]",
    role: "Technical Advisor, Water",
    bio: "Placeholder biography for a subject-matter advisory seat.",
    group: "Advisory",
  },
];

/** Purpose / vision / approach columns on the About page. */
export const pillars = [
  {
    label: "Purpose",
    text: "To put unrestricted money and long patience in the hands of Kenyans who already know their community.",
  },
  {
    label: "Vision",
    text: "A country where the ward you were born in stops predicting what you will earn, learn or live to.",
  },
  {
    label: "Approach",
    text: "Four programme areas, fourteen counties on a published map, open grant data and multi-year operating support.",
  },
] as const;

export const values = [
  {
    title: "Local knowledge first",
    body: "Residents understand their place better than any visiting expert. We fund their diagnosis, not ours.",
  },
  {
    title: "Patient money",
    body: "Multi-year operating support over one-year projects. The work that holds is the work that can plan.",
  },
  {
    title: "Say what we learned",
    body: "We publish failures and grant data. A foundation that only reports wins is selling something.",
  },
  {
    title: "Deep, not wide",
    body: "Harambee is in our culture; one-off appeals are not our model. We go deep in named counties rather than thin across all 47.",
  },
] as const;

export const history = [
  {
    year: "2016",
    title: "Founded in Nairobi",
    body: "Placeholder: the family, community or company that established the foundation and why.",
  },
  {
    year: "2019",
    title: "First programme area",
    body: "Placeholder: the first funded area and the first ten grants.",
  },
  {
    year: "2022",
    title: "Catchment commitment",
    body: "Placeholder: the point at which the foundation moved from projects to systems, and into the dryland counties.",
  },
  {
    year: "2024",
    title: "County partnerships",
    body: "Placeholder: memoranda of understanding signed with county governments and locally recruited programme teams.",
  },
  {
    year: "2026",
    title: "Public grant data",
    body: "Placeholder: opening the grant register and the learning reports.",
  },
] as const;

export const governanceDocuments = [
  {
    title: "Annual report",
    body: "Placeholder document: narrative year in review plus audited statements.",
  },
  {
    title: "Grant register",
    body: "Placeholder spreadsheet: every grant, recipient, KSh amount and purpose.",
  },
  {
    title: "Constitution and governance policy",
    body: "Placeholder: memorandum and articles, conflicts of interest, decision rights and the complaint route.",
  },
  {
    title: "Regulatory returns",
    body: "Placeholder: NGO Coordination Board annual return, KRA filings and data protection registration.",
  },
] as const;

/** Placeholder financial summary for the About page. */
export const financials = {
  note: "Illustrative only — replace with audited figures before publishing.",
  rows: [
    { label: "Grant expenditure", value: money(46800000), detail: "Placeholder current-year spend" },
    { label: "Operating costs", value: "9%", detail: "Placeholder share of total outgoings" },
    { label: "Funds held", value: money(312000000), detail: "Placeholder market value" },
    { label: "Auditor", value: "[Firm name]", detail: "Placeholder audit and opinion date" },
  ],
} as const;

export const pathways = [
  {
    title: "Volunteer",
    body: "Skills-based placements on grant panels, monitoring days and Kiswahili or English translation. Placeholder commitments and time required.",
    cta: "See open placements",
    href: "/get-involved#volunteer",
  },
  {
    title: "Partner",
    body: "Co-funding, pooled vehicles and technical partnerships with Kenyan companies, county governments, SACCOs and other foundations.",
    cta: "Start a conversation",
    href: "/contact?topic=Partnership",
  },
  {
    title: "Give",
    body: "One-off or monthly giving by M-Pesa or bank transfer, workplace schemes and legacy gifts.",
    cta: "Support the work",
    href: "/donate",
  },
  {
    title: "Work with us",
    body: "Roles across programmes, communications and operations. Placeholder openings listed with county and grade.",
    cta: "View roles",
    href: "/get-involved#careers",
  },
] as const;

export const placements = [
  {
    role: "Grants reader, community panel",
    commitment: "Six hours per quarter",
    location: "Nairobi / remote",
    closes: "Rolling",
  },
  {
    role: "Translator, Kiswahili and county languages",
    commitment: "Occasional, per application",
    location: "Remote",
    closes: "Rolling",
  },
  {
    role: "Monitoring day volunteer, Water & Land",
    commitment: "Two field days a year",
    location: "[County / catchment]",
    closes: "January",
  },
  {
    role: "Mentor, youth engineering club",
    commitment: "One afternoon a week",
    location: "[Nairobi workshop]",
    closes: "September",
  },
] as const;

export const partnerTypes = [
  {
    title: "Companies",
    body: "Corporate responsibility programmes, matched giving, payroll giving and sponsorship of a specific area.",
  },
  {
    title: "Other funders",
    body: "Pooled vehicles and co-granting. We share diligence so nobody repeats the same three interviews.",
  },
  {
    title: "County governments",
    body: "County departments and sub-county offices who can move a system once the pilot has evidence.",
  },
  {
    title: "Grantees",
    body: "Our real partnership. Operating support, honest reporting and a phone that gets answered.",
  },
] as const;

export const roles = [
  { title: "Programme Officer, Local Economies", type: "Full time", grade: "Nairobi · [salary band]" },
  { title: "Communications & Stories Lead", type: "Full time", grade: "Nairobi / hybrid · [salary band]" },
  { title: "Finance & Compliance Lead", type: "Part time, 0.6 FTE", grade: "Nairobi · [salary band]" },
] as const;

/** Ways to give and placeholder events shown on Get Involved. */
export const waysToGive = [
  {
    title: "Monthly giving by M-Pesa",
    body: "Recurring gifts at any amount, collected on the 5th. The single most useful thing a foundation can receive.",
    href: "/donate",
    cta: "Set up monthly",
  },
  {
    title: "Give once",
    body: "A single gift pointed at one programme area or left where the need is sharpest.",
    href: "/donate",
    cta: "Give once",
  },
  {
    title: "Chama and workplace giving",
    body: "Group gifts from chamas, staff teams and SACCOs, with one receipt and a named contact.",
    href: "/contact?topic=Donation%20query",
    cta: "Ask about group giving",
  },
  {
    title: "Legacy giving",
    body: "Placeholder: a named contact for legacies and a link to the professional guidance.",
    href: "/contact?topic=General%20enquiry",
    cta: "Speak to us",
  },
] as const;

export const events = [
  {
    date: "18 Mar",
    year: "2027",
    title: "[Grantee learning day]",
    detail: "Placeholder: partners present what worked, what did not and what it cost.",
    place: "[Venue], Nairobi",
  },
  {
    date: "09 May",
    year: "2027",
    title: "[River walk and monitoring briefing]",
    detail: "Placeholder: two hours on the bank with the restoration crew.",
    place: "[Meeting point], [County]",
  },
  {
    date: "27 Jun",
    year: "2027",
    title: "[Annual public briefing]",
    detail: "Placeholder: results, KSh budget and the year's grant rounds published in one sitting.",
    place: "[Venue], Nairobi + online",
  },
] as const;

export const impactFaq = [
  {
    q: "Do you accept unsolicited applications?",
    a: "Not in the traditional form. Send a one-paragraph enquiry describing the ward and the problem; if it fits our counties we will ask for more.",
  },
  {
    q: "How fast do you answer?",
    a: "Placeholder service standard: every enquiry receives a written answer within 21 days, including the ones we decline.",
  },
  {
    q: "Can we name the foundation in our report?",
    a: "Yes, with the grant reference. We ask to see the sentence first, mostly because we are fussy about tense.",
  },
  {
    q: "Do gifts qualify for tax relief in Kenya?",
    a: "Placeholder: state the position once Public Benefits Organisation approval and the relevant KRA guidance are confirmed, and explain how a donor claims it.",
  },
  {
    q: "Is my enquiry stored?",
    a: "In this draft, no. The form is front-end only — nothing is submitted, transmitted or saved anywhere.",
  },
] as const;

/**
 * Illustrative allocation shares, outcome indicators and method notes for the
 * Impact page. Replace with real spend and measured results.
 */
export const allocation = [
  { slug: "learning-opportunity", share: 34 },
  { slug: "water-land", share: 28 },
  { slug: "health-access", share: 22 },
  { slug: "local-economies", share: 16 },
] as const;

export const outcomes = [
  {
    title: "Children reading a simple sentence by Primary 3",
    detail: "Indicator: funded pupils at or above benchmark after 24 months, in the language of instruction.",
    baseline: "41%",
    current: "58%",
  },
  {
    title: "River reaches holding sediment through the long rains",
    detail: "Indicator: monitored reaches meeting the agreed turbidity standard.",
    baseline: "3 of 14",
    current: "11 of 14",
  },
  {
    title: "Mothers keeping the first antenatal appointment",
    detail: "Indicator: attendance within eight weeks of booking, in mobile-clinic catchments.",
    baseline: "52%",
    current: "79%",
  },
  {
    title: "Businesses still trading three years later",
    detail: "Indicator: survival rate for micro-enterprise grant recipients.",
    baseline: "n/a",
    current: "71%",
  },
] as const;

export const methods = [
  {
    title: "We set the measure with the partner",
    body: "Not after the report, and not in a template. If a partner cannot name a number they are willing to be judged by, the grant is not ready.",
  },
  {
    title: "We publish the misses",
    body: "Two of our four programme areas are behind their own targets. That belongs on the website, not in an appendix.",
  },
  {
    title: "We pay for the counting",
    body: "Monitoring time is funded as a cost of the project rather than left as an unpaid favour to a small Kenyan organisation.",
  },
] as const;

/** Donation presets, giving instructions and the impact ladder on the Donate page. */
export const donate = {
  presets: { monthly: [500, 1000, 2500, 5000], once: [1000, 2500, 5000, 10000] },
  ladder: [
    { amount: "500", body: "A month of tutoring hours for one child in a partner primary school." },
    { amount: "1000", body: "Fuel, mileage and airtime for one outreach day in a ward with no pharmacy." },
    { amount: "2500", body: "Seedlings and tree-guard materials for one quarter-acre of restored bank." },
    { amount: "10000", body: "A full application-support session for a small Kenyan organisation with no fundraiser." },
  ],
  /** Placeholder giving instructions. Confirm every number before publishing. */
  paybill: {
    title: "Give by M-Pesa",
    lines: [
      "Go to M-Pesa, then Lipa na M-Pesa (Paybill).",
      "Paybill number: [400XXXX] — placeholder, not a live number.",
      "Account code: your phone number, or LOFIN if you want the gift left where need is sharpest.",
    ],
  },
  bank: {
    title: "Give by bank transfer",
    lines: [
      "[Bank name], [Branch] — placeholder.",
      "Account name: LOFIN Foundation. Account number: [0000000000].",
      "Branch code and SWIFT: [to be confirmed]. Send the deposit slip to [email] for a receipt.",
    ],
  },
  heading: "Monthly money is the kind we can plan with",
  intro: [
    "A one-off gift funds a project. A regular gift pays for the staff, the monitoring and the awkward third year when the pilot has stopped being news but has not yet become a system.",
    "This page is a design preview. Payment processing is not connected and the paybill and account numbers above are placeholders, so pressing the button will not move money and records nothing.",
  ],
  liveNote:
    "What happens next, when this goes live: connect M-Pesa (Safaricom Daraja) for STK push and a card gateway such as Flutterwave or Pesapal for international donors, keep the same amount ladder in KSh, and add receipt handling plus any tax-relief wording once the registration and Public Benefits Organisation status are confirmed.",
} as const;

export const ourWorkIntro = {
  title: "Four programme areas, deliberately narrow",
  intro:
    "We would rather change one thing in sixty wards than mention sixty things in none of them.",
  image: IMAGES.heroWatershed,
  alt: "A dryland riverbed with new planting at first light",
  heading: "Strategy, then grants, then proof",
  body: [
    "Each programme page carries the same three things: the change we are buying, the organisations doing the work, and the figures we would publish if they were real.",
    "Programme names, focus areas, grant amounts and recipients on this draft are placeholders chosen to show the layout working.",
  ],
} as const;

export const contact = {
  eyebrow: "Contact",
  heading: "Talk to a person, not a portal",
  intro:
    "Address, telephone, paybill and email below are placeholders. Confirm each one before the site goes live.",
  address: ["LOFIN Foundation", "[Street address placeholder], [Estate]", "Nairobi, Kenya"],
  email: "info@lofinfoundation.co.ke",
  phone: "+254 700 000 000 [placeholder]",
  hours: "Monday to Friday, 08:00–17:00 East African Time (UTC+3)",
  topics: [
    "General enquiry",
    "Grant application",
    "Partnership",
    "Press",
    "Volunteering",
    "Donation query",
  ],
} as const;

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/our-work" },
      { label: "Impact", href: "/impact" },
      { label: "Stories", href: "/stories" },
    ],
  },
  {
    title: "Programmes",
    links: programs.map((program) => ({
      label: program.name,
      href: `/our-work/${program.slug}`,
    })),
  },
  {
    title: "Get involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/get-involved#volunteer" },
      { label: "Partner", href: "/get-involved#partner" },
      { label: "Careers", href: "/get-involved#careers" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { label: "Governance", href: "/about#leadership" },
      { label: "Contact us", href: "/contact" },
      { label: "Newsroom", href: "/stories" },
      { label: "FAQs", href: "/contact#faq" },
    ],
  },
];

/** Per-route document titles and descriptions, kept with the rest of the content. */
export const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "LOFIN Foundation — Building opportunity through stronger Kenyan communities",
    description:
      "LOFIN Foundation is a Kenyan foundation investing in learning, water and land, health access and local economies. Preview draft with placeholder content.",
  },
  "/about": {
    title: "About us — LOFIN Foundation, Kenya",
    description: "Purpose, vision, values, history, leadership and governance.",
  },
  "/our-work": {
    title: "Our work — LOFIN Foundation",
    description: "Four programme areas across fourteen Kenyan counties.",
  },
  "/impact": {
    title: "Impact — LOFIN Foundation",
    description: "Placeholder KSh figures, allocation and our approach to measuring what changed.",
  },
  "/stories": {
    title: "Stories — LOFIN Foundation",
    description: "Reporting from the Kenyan counties we fund.",
  },
  "/get-involved": {
    title: "Get involved — LOFIN Foundation",
    description: "Volunteer, partner, give by M-Pesa or work with us.",
  },
  "/donate": {
    title: "Donate — LOFIN Foundation",
    description: "Support the work in Kenyan shillings. Preview only: payment processing is not connected.",
  },
  "/contact": {
    title: "Contact — LOFIN Foundation",
    description: "Nairobi office, placeholder details and enquiry form.",
  },
  "/404": {
    title: "Page not found — LOFIN Foundation",
    description: "The page you asked for is not available.",
  },
};
