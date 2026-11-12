/**
 * LOFIN FOUNDATION — central content source.
 *
 * PLACEHOLDER DRAFT. Everything in this file is illustrative sample content:
 * mission wording, program names, statistics, stories, people, addresses,
 * documents and contact details are stand-ins chosen to show the layout
 * working end to end.
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

export const org = {
  name: "LOFIN Foundation",
  wordmarkTop: "LOFIN",
  wordmarkBottom: "FOUNDATION",
  /** Placeholder strapline. Replace with the foundation's own words. */
  strapline: "Building opportunity through stronger communities",
  /** Unconfirmed legal detail — replace once registration is settled. */
  registrationNote: "Registered charity number [to be confirmed]",
  foundedYear: 2016,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", short: "IN" },
    { label: "Instagram", href: "https://www.instagram.com/", short: "IG" },
    { label: "Facebook", href: "https://www.facebook.com/", short: "FB" },
    { label: "YouTube", href: "https://www.youtube.com/", short: "YT" },
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
      "People see their towns as places worth investing in. A new survey we funded finds many still do not believe their ideas will be heard — or that they have a say in what comes next.",
    ctaLabel: "Read the research",
    href: "/impact",
    alt: "A woman addressing a community meeting in a sunlit hall",
  },
  {
    id: "water",
    image: IMAGES.heroWatershed,
    kicker: "Water & land",
    headline: "What we do next will determine the river's future",
    standfirst:
      "A storytelling series following the people and communities using nature-based solutions to protect water through a changing climate.",
    ctaLabel: "Explore the series",
    href: "/our-work/water-land",
    alt: "A restored river winding through a green valley at golden hour",
  },
  {
    id: "learning",
    image: IMAGES.heroLearning,
    kicker: "Learning & opportunity",
    headline: "Do students feel known at school?",
    standfirst:
      "Half of the young people in our grantee surveys said one adult who noticed them changed their path. We are funding the schools making that ordinary.",
    ctaLabel: "See the program",
    href: "/our-work/learning-opportunity",
    alt: "A teacher kneeling beside two students working at a desk",
  },
];

export const mission = {
  eyebrow: "Why we exist",
  heading: "Every community already holds most of the answers. Our job is to fund them.",
  body: [
    "LOFIN Foundation backs local organisations in education, water and land, health access and local economies — the four areas where a modest, patient grant changes what a place can do for itself.",
    "This is placeholder draft copy. Replace this paragraph with your registered mission statement and the whole page updates from a single line in the content file.",
  ],
  image: IMAGES.aboutValues,
  imageAlt: "A riverside town seen from above at first light",
  flagship: {
    eyebrow: "Flagship initiative",
    heading: "How opportunity takes root",
    body: "A placeholder for the multi-year initiative the foundation would be judged on: the research, the funded partners, and what changes in the third year rather than the first.",
    image: IMAGES.storyPublicSpace,
    alt: "Residents reviewing public-space plans on a street table",
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
    value: 42.6,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    note: "Illustrative total across all four program areas.",
  },
  {
    label: "Partner organisations",
    value: 128,
    note: "Illustrative count of funded local grantees.",
  },
  {
    label: "People reached a year",
    value: 340,
    suffix: "K",
    note: "Illustrative annual reach across funded programs.",
  },
  {
    label: "Communities",
    value: 62,
    note: "Illustrative towns, districts and neighbourhoods.",
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
    value: "1",
    label: "Geography, not a globe",
    body: "Everything funded sits inside one defined region with published boundaries.",
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
      "We support teaching quality, reading confidence and career pathways so young people finish school with somewhere to go.",
    detail:
      "Placeholder detail: what the program funds, what it refuses, and the theory of change in plain language. Two paragraphs is enough for most readers.",
    image: IMAGES.heroLearning,
    alt: "A teacher helping two students at their desk",
    focus: [
      {
        title: "Teacher quality",
        body: "Residency places, coaching time and retention research in partner districts.",
      },
      {
        title: "Reading by nine",
        body: "Small-group tutoring and family literacy sessions in primary schools.",
      },
      {
        title: "Pathways",
        body: "Employer-linked apprenticeship navigation for the last two years of school.",
      },
    ],
    figures: [
      { value: "31", label: "Partner schools" },
      { value: "9,400", label: "Students in program, illustrative" },
    ],
    grants: [
      {
        recipient: "[Local literacy collective]",
        amount: "$120,000",
        purpose: "Two-year tutoring expansion into four primary schools",
      },
      {
        recipient: "[Regional teaching residency]",
        amount: "$210,000",
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
      "Watershed restoration, farm conservation and flood readiness led by the people who live downstream of the decision.",
    detail:
      "Placeholder detail: the ecological and economic case for the program, the reach of the current portfolio and the partners who hold the long-term mandate.",
    image: IMAGES.heroWatershed,
    alt: "A restored river at golden hour",
    focus: [
      {
        title: "Watershed restoration",
        body: "Riverbank planting, beaver and wetland analogues, and long-term monitoring.",
      },
      {
        title: "Farmer-led conservation",
        body: "Cost-share for cover cropping, hedgerows and soil carbon measurement.",
      },
      {
        title: "Flood readiness",
        body: "Nature-based defences designed with utilities and town engineers.",
      },
    ],
    figures: [
      { value: "86 km", label: "Riverbank under restoration" },
      { value: "14", label: "Watershed partnerships" },
    ],
    grants: [
      {
        recipient: "[River restoration coalition]",
        amount: "$340,000",
        purpose: "Five-year monitoring of three restored reaches",
      },
      {
        recipient: "[Growers conservation network]",
        amount: "$185,000",
        purpose: "Cover-seed cost-share for 90 family farms",
      },
    ],
    relatedStory: "building-trust-listening",
  },
  {
    slug: "health-access",
    name: "Health Access",
    tagline: "Care that shows up where people already are",
    summary:
      "Mobile clinics, community health workers and transport support that remove the small obstacles behind big absences.",
    detail:
      "Placeholder detail: the access gap being closed, the delivery model, and what the evidence says about navigator-led outreach.",
    image: IMAGES.storyHealth,
    alt: "A nurse talking with an elderly man outside a mobile clinic",
    focus: [
      {
        title: "Mobile services",
        body: "Outreach clinics in towns without a pharmacy within 30 minutes' drive.",
      },
      {
        title: "Community health workers",
        body: "Paid local navigators who stay with a family across appointments.",
      },
      {
        title: "Maternal & child",
        body: "Postnatal visits and transport vouchers in the first 12 months.",
      },
    ],
    figures: [
      { value: "7", label: "Mobile units funded" },
      { value: "22,000", label: "Visits, illustrative year" },
    ],
    grants: [
      {
        recipient: "[County health outreach]",
        amount: "$260,000",
        purpose: "Second mobile clinic and two-year staffing",
      },
      {
        recipient: "[Navigator program]",
        amount: "$95,000",
        purpose: "Train and pay 12 community health workers",
      },
    ],
    relatedStory: "power-of-working-together",
  },
  {
    slug: "local-economies",
    name: "Local Economies",
    tagline: "Money that stays in the neighbourhood",
    summary:
      "Small business support, worker co-operatives and public-space activation that give a main street a reason to reopen.",
    detail:
      "Placeholder detail: how the enterprise support works, why resident-designed public space is treated as economic infrastructure, and what survives three years.",
    image: IMAGES.storyMarket,
    alt: "A vendor arranging vegetables at a community market",
    focus: [
      {
        title: "Micro enterprise",
        body: "Bridge grants, bookkeeping help and market stalls for first-time sellers.",
      },
      {
        title: "Worker ownership",
        body: "Conversion counselling and legal costs for businesses moving to co-ownership.",
      },
      {
        title: "Public space",
        body: "Small activation grants when residents, not consultants, design the plan.",
      },
    ],
    figures: [
      { value: "54", label: "Businesses supported" },
      { value: "310", label: "Local jobs, illustrative" },
    ],
    grants: [
      {
        recipient: "[Main street traders association]",
        amount: "$75,000",
        purpose: "Twelve-week market season with 40 stallholders",
      },
      {
        recipient: "[Cooperative development fund]",
        amount: "$140,000",
        purpose: "Legal and advisory costs for four worker buyouts",
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
    alt: "A restored river valley in soft morning light",
    summary:
      "Partnerships with upstream communities show why lasting progress starts with listening, following their lead and earning trust over time.",
    standfirst:
      "Three towns, one river and a decade of learning that the first draft should never be written in an office.",
    body: [
      "The restoration plan that finally worked was the fourth one. The first three were technically sound and socially deaf — drawn up by engineers who had never had coffee with the people whose land the water crosses.",
      "What changed was sequence. The coalition ran twelve listening sessions before a single drawing, paid the residents who attended, and published what they had heard before publishing what they proposed.",
      "Two years on, the reach holds sediment in place, the town council funds the monitoring, and the word 'stakeholder' has quietly disappeared from the meeting minutes.",
    ],
    pullQuote: "We stopped asking people to accept a plan and asked them to write one.",
  },
  {
    slug: "beavers-wildfire",
    title: "A utility takes a cue from beavers to protect against future wildfires",
    category: "Water & Land",
    categoryHref: "/stories?area=water-land",
    author: "[Staff name]",
    date: "2026-09-28",
    dateLabel: "September 28, 2026",
    image: IMAGES.storyFarming,
    alt: "Farmland with hedgerows in low sun",
    summary:
      "Wetland analogues built by engineers and beavers are keeping water on the landscape through the fire season.",
    standfirst:
      "The cheapest firebreak in the county turns out to be a series of small dams, half of them built by animals.",
    body: [
      "When the utility's crews walked the upper basin in August, they found green strips where the model said there should be ash.",
      "The dams are low cost — a stake, a willow weave, a beaver's own maintenance. What took negotiation was the liability question, and the answer came from an insurance adjuster who had grown up on that creek.",
      "The program is now written into the utility's five-year resilience plan at a fraction of the cost of the mechanical option it replaced.",
    ],
    pullQuote: "Half our fire prevention budget now goes to animals we did not have to hire.",
  },
  {
    slug: "mining-town-river",
    title: "An old mining town writes its next chapter by restoring the river that runs through it",
    category: "Water & Land",
    categoryHref: "/stories?area=water-land",
    author: "[Staff name]",
    date: "2026-09-21",
    dateLabel: "September 21, 2026",
    image: IMAGES.storyPublicSpace,
    alt: "Neighbours gathered around plans on a table in the street",
    summary:
      "After the mine closed, the town bet on water, fishing and a river walk — and the first summer brought back more visitors than jobs.",
    standfirst:
      "A century of extraction left a poisoned creek and a proud town. Both are now being repaired by the same people.",
    body: [
      "The cleanup money arrived in 2019 and the argument started immediately: culverts or a walk? Concrete or cottonwoods? The town settled it the way it settles most things, at the hardware store, over six weeks.",
      "The compromise is a soft-engineered bank with a gravel path, cheap to build and forgiving of floods. Two of the young people who would have left for work elsewhere are now the crew that maintains it.",
      "Placeholder for the reporting you would do here: visitor numbers, water quality series, and the quotes of the people who actually live it.",
    ],
    pullQuote: "We are not saving the river for tourists. We are saving it so our kids come back.",
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
    alt: "Residents reviewing plans for a public square",
    summary:
      "Across small towns, strong civic participation is ensuring that local voices are reflected in the places they share.",
    standfirst:
      "The plan on the folding table had more red biro on it than the council's original had black ink.",
    body: [
      "The activation fund was designed to be small: five thousand, no consultants, a six-week turnaround. What nobody budgeted for was the argument about parking.",
      "It took three Saturday sessions. The eventual design lost two spaces and gained a shade structure, a water point and a stage flat enough for a wheelchair.",
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
    alt: "Teacher and students working in a bright classroom",
    summary:
      "Only one in three educators in our survey felt a strong sense of mattering at school, with fewer than half of undervalued staff planning to remain.",
    standfirst:
      "We asked 1,200 teachers one unusual question: does this place notice you? The answer predicts who stays.",
    body: [
      "The correlation is not salary. It is whether a teacher can name one adult in the building who checks on them on the hard days.",
      "Schools that funded thirty unprotected minutes a week for coaching conversations scored highest on mattering — and lowest on unplanned absence.",
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
    alt: "A nurse speaking with a resident outside a mobile clinic",
    summary:
      "One van, one nurse, one church hall and a transport voucher scheme turned out to be enough to restart antenatal attendance.",
    standfirst:
      "The clinic did not fail for lack of doctors. It failed because the bus does not run on Tuesdays.",
    body: [
      "Attendance recovered when the program paid for the taxi, not when it added the consultant.",
      "The navigator model costs a fraction of a satellite clinic and reaches people who would never book an appointment.",
      "Swap this paragraph for your own findings and name the partners properly before launch.",
    ],
    pullQuote: "We were solving a medical problem that was actually a bus timetable.",
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
    alt: "A farmer kneeling in a cover-crop field",
    summary:
      "A growers' coalition is proving that regenerative practice is the difference between a resilient season and a ruined one.",
    standfirst:
      "The rule is simple to say and hard to fund: put the marginal ground out of production and keep the good ground alive.",
    body: [
      "Cost-share removes the first-year risk, which is the only year most growers can afford to be wrong.",
      "By the third season the hedgerows carry the pollinators, the soil holds the rain and the input bill falls.",
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
    alt: "Teenagers building a model bridge in a community workshop",
    summary:
      "An after-school engineering club is producing something rarer than winners: young people who stay with a hard problem.",
    standfirst:
      "The brief is to build a bridge that holds 40 kilos, then load it until it breaks and write down exactly why.",
    body: [
      "Failure is the curriculum. The club keeps a wall of broken models, each labelled with the load and the reason.",
      "Four of last year's members are now studying civil engineering on scholarships the club did not arrange but did help them believe they could ask for.",
      "Names and outcomes are placeholders — get written consent before publishing any young person's story.",
    ],
    pullQuote: "We do not celebrate the bridge. We celebrate the diagnosis.",
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const quote = {
  eyebrow: "In our own words",
  text: "It is not what you gather in life, it is what you scatter that tells the kind of life you have lived.",
  attribution: "Placeholder founder attribution — replace with your own",
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
    name: "[Programs Director name]",
    role: "Director of Programs",
    bio: "Placeholder biography covering program leadership and prior sector experience.",
    group: "Staff",
  },
  {
    name: "[Finance Lead name]",
    role: "Finance & Compliance Lead",
    bio: "Placeholder biography covering grantmaking controls, audit and reporting.",
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
    text: "To put unrestricted money and long patience in the hands of people who already know their community.",
  },
  {
    label: "Vision",
    text: "A region where where you are born stops predicting what you will earn, learn or live to.",
  },
  {
    label: "Approach",
    text: "Four program areas, one defined geography, published grant data and multi-year operating support.",
  },
] as const;

export const values = [
  {
    title: "Local knowledge first",
    body: "Residents already understand their place better than any visiting expert. We fund their diagnosis, not ours.",
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
    title: "One quarter, one place",
    body: "We go deep in a defined geography rather than thin everywhere. Coverage is not the same as impact.",
  },
] as const;

export const history = [
  {
    year: "2016",
    title: "Founded",
    body: "Placeholder: the family, community or company that established the foundation and why.",
  },
  {
    year: "2019",
    title: "First program area",
    body: "Placeholder: the first funded area and the first ten grants.",
  },
  {
    year: "2022",
    title: "Watershed commitment",
    body: "Placeholder: the point at which the foundation moved from projects to systems.",
  },
  {
    year: "2024",
    title: "Local hiring",
    body: "Placeholder: programme teams recruited from the communities funded.",
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
    body: "Placeholder spreadsheet: every grant, recipient, amount and purpose.",
  },
  {
    title: "Governance policy",
    body: "Placeholder: conflicts of interest, decision rights and complaint route.",
  },
] as const;

/** Placeholder financial summary for the About page. */
export const financials = {
  note: "Illustrative only — replace with audited figures before publishing.",
  rows: [
    { label: "Grant expenditure", value: "$11.4M", detail: "Placeholder current-year spend" },
    { label: "Operating costs", value: "9%", detail: "Placeholder share of total outgoings" },
    { label: "Endowment", value: "$96M", detail: "Placeholder market value" },
    { label: "Auditor", value: "[Firm name]", detail: "Placeholder audit and opinion date" },
  ],
} as const;

export const pathways = [
  {
    title: "Volunteer",
    body: "Skills-based placements on grantee panels, monitoring days and translation. Placeholder commitments and time required.",
    cta: "See open placements",
    href: "/get-involved#volunteer",
  },
  {
    title: "Partner",
    body: "Co-funding, pooled vehicles and technical partnerships with companies, utilities and other foundations.",
    cta: "Start a conversation",
    href: "/contact?topic=Partnership",
  },
  {
    title: "Give",
    body: "One-off or monthly giving, legacy gifts and matched giving through an employer scheme.",
    cta: "Support the work",
    href: "/donate",
  },
  {
    title: "Work with us",
    body: "Roles across programs, communications and operations. Placeholder openings listed with location and grade.",
    cta: "View roles",
    href: "/get-involved#careers",
  },
] as const;

export const placements = [
  {
    role: "Grants reader, community panel",
    commitment: "Six hours per quarter",
    location: "[City] / remote",
    closes: "Rolling",
  },
  {
    role: "Translator, application support",
    commitment: "Occasional, per application",
    location: "Remote",
    closes: "Rolling",
  },
  {
    role: "Monitoring day volunteer, Water & Land",
    commitment: "Two field days a year",
    location: "[Watershed]",
    closes: "January",
  },
  {
    role: "Mentor, youth engineering club",
    commitment: "One afternoon a week",
    location: "[Community workshop]",
    closes: "September",
  },
] as const;

export const partnerTypes = [
  {
    title: "Companies",
    body: "Matched giving, payroll giving, pro-bono capacity and sponsorship of a specific program area.",
  },
  {
    title: "Other funders",
    body: "Pooled vehicles and co-granting. We share diligence so nobody repeats the same three interviews.",
  },
  {
    title: "Public services",
    body: "Councils, utilities and school districts who can move a system once the pilot has evidence.",
  },
  {
    title: "Grantees",
    body: "Our real partnership. Operating support, honest reporting and a phone that gets answered.",
  },
] as const;

export const roles = [
  { title: "Program Officer, Local Economies", type: "Full time", grade: "[Grade / salary]" },
  { title: "Communications & Stories Lead", type: "Full time", grade: "[Grade / salary]" },
  { title: "Finance & Compliance Lead", type: "Part time, 0.6 FTE", grade: "[Grade / salary]" },
] as const;

/** Ways to give and placeholder events shown on Get Involved. */
export const waysToGive = [
  {
    title: "Monthly giving",
    body: "Recurring gifts at any amount. The single most useful thing a foundation can receive.",
    href: "/donate",
    cta: "Set up monthly",
  },
  {
    title: "Give once",
    body: "A single gift pointed at one program area or left where the need is sharpest.",
    href: "/donate",
    cta: "Give once",
  },
  {
    title: "Employer matching",
    body: "Placeholder: list the matching schemes we are registered with and how to claim.",
    href: "/contact?topic=General%20enquiry",
    cta: "Ask about matching",
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
    place: "[Venue, city]",
  },
  {
    date: "09 May",
    year: "2027",
    title: "[River walk and monitoring briefing]",
    detail: "Placeholder: two hours on the bank with the restoration crew.",
    place: "[Meeting point]",
  },
  {
    date: "27 Jun",
    year: "2027",
    title: "[Annual public briefing]",
    detail: "Placeholder: results, budget and the year's grant rounds published in one sitting.",
    place: "[Venue] + online",
  },
] as const;

export const impactFaq = [
  {
    q: "Do you accept unsolicited applications?",
    a: "Not in the traditional form. Send a one-paragraph enquiry describing the place and the problem; if it fits our geography we will ask for more.",
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
    title: "Children reading confidently by age nine",
    detail: "Indicator: funded pupils at or above benchmark after 24 months.",
    baseline: "41%",
    current: "58%",
  },
  {
    title: "River reaches holding sediment through flood season",
    detail: "Indicator: monitored reaches meeting the agreed turbidity standard.",
    baseline: "3 of 14",
    current: "11 of 14",
  },
  {
    title: "Families keeping the first antenatal appointment",
    detail: "Indicator: attendance within eight weeks of booking, mobile-clinic catchments.",
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
    body: "Two of our four program areas are behind their own targets. That belongs on the website, not in an appendix.",
  },
  {
    title: "We pay for the counting",
    body: "Monitoring time is funded as a cost of the project rather than left as an unpaid favour to a small charity.",
  },
] as const;

/** Donation presets and the impact ladder on the Donate page. */
export const donate = {
  presets: { monthly: [10, 25, 50, 100], once: [50, 100, 250, 500] },
  ladder: [
    { amount: "10", body: "A month of tutoring hours for one child in a partner primary school." },
    { amount: "25", body: "Fuel and mileage for one mobile-clinic outreach day in a town with no pharmacy." },
    { amount: "50", body: "Cover seed for a quarter hectare, cost-shared with a family farm." },
    { amount: "100", body: "A full application-support session for a small organisation with no fundraiser." },
  ],
  heading: "Monthly money is the kind we can plan with",
  intro: [
    "A one-off gift funds a project. A regular gift pays for the staff, the monitoring and the awkward third year when the pilot has stopped being news but has not yet become a system.",
    "This page is a design preview. Payment processing is not connected, so pressing the button will not take money from anyone and records nothing.",
  ],
  liveNote:
    "What happens next, when this goes live: connect Stripe Checkout on the Donate page, keep the same amount ladder, and add Gift Aid or local tax-deduction handling once the registration number is confirmed.",
} as const;

export const ourWorkIntro = {
  title: "Four program areas, deliberately narrow",
  intro:
    "We would rather change one thing in sixty communities than mention sixty things in none of them.",
  image: IMAGES.heroWatershed,
  alt: "A restored river running through a green valley",
  heading: "Strategy, then grants, then proof",
  body: [
    "Each program page carries the same three things: the change we are buying, the organisations doing the work, and the figures we would publish if they were real.",
    "Program names, focus areas, grant amounts and recipients on this draft are placeholders chosen to show the layout working.",
  ],
} as const;

export const contact = {
  eyebrow: "Contact",
  heading: "Talk to a person, not a portal",
  intro:
    "Address, telephone and email below are placeholders. Confirm each one before the site goes live.",
  address: ["LOFIN Foundation", "[Street address placeholder]", "[City, Region, Postcode]"],
  email: "hello@lofinfoundation.example",
  phone: "[+00 000 000 0000]",
  hours: "Monday to Friday, [09:00–17:00] [timezone]",
  topics: ["General enquiry", "Grant application", "Partnership", "Press", "Volunteering"],
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
    title: "LOFIN Foundation — Building opportunity through stronger communities",
    description:
      "LOFIN Foundation invests in learning, water and land, health access and local economies. Preview draft with placeholder content.",
  },
  "/about": {
    title: "About us — LOFIN Foundation",
    description: "Purpose, vision, values, history, leadership and governance.",
  },
  "/our-work": {
    title: "Our work — LOFIN Foundation",
    description: "Four program areas: learning, water and land, health access, local economies.",
  },
  "/impact": {
    title: "Impact — LOFIN Foundation",
    description: "Placeholder figures, allocation and our approach to measuring what changed.",
  },
  "/stories": {
    title: "Stories — LOFIN Foundation",
    description: "Reporting from the communities we fund.",
  },
  "/get-involved": {
    title: "Get involved — LOFIN Foundation",
    description: "Volunteer, partner, give or work with us.",
  },
  "/donate": {
    title: "Donate — LOFIN Foundation",
    description: "Support the work. Preview only: payment processing is not connected.",
  },
  "/contact": {
    title: "Contact — LOFIN Foundation",
    description: "Placeholder address and enquiry form.",
  },
  "/404": {
    title: "Page not found — LOFIN Foundation",
    description: "The page you asked for is not available.",
  },
};
