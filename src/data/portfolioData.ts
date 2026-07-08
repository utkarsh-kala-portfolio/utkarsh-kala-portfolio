// Utkarsh Kala Portfolio Typed Data Store

export interface JourneyItem {
  date: string;
  location: string;
  title: string;
  description: string;
}

export interface CoreStrength {
  name: string;
  category: string;
}

export interface StackCategory {
  id: string;
  name: string;
  items: string[];
}

export interface ClientIndustry {
  industry: string;
  brands: string[];
}

export interface AutomationItem {
  title: string;
  problem: string;
  system: string;
  impact: string[];
  tags: string[];
}

export interface TestimonialItem {
  client: string;
  country: string;
  rating: number;
  quote: string;
}

export interface RecommendationItem {
  author: string;
  role: string;
  quote: string;
}

export interface PortfolioData {
  journeyItems: JourneyItem[];
  coreStrengths: CoreStrength[];
  stackCategories: StackCategory[];
  clientPortfolio: ClientIndustry[];
  automations: AutomationItem[];
  testimonials: TestimonialItem[];
  recommendations: RecommendationItem[];
  brandLogoMap: Record<string, string>;
  techStackLogos: Record<string, string>;
  simpleIconMappings: Record<string, string>;
  topics: string[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  journeyItems: [
    {
      date: "September 2000",
      location: "Kotdwara, Uttarakhand",
      title: "Building ambition from day one",
      description: "Raised in a small town with a belief that meaningful growth comes from consistency, curiosity, and ownership."
    },
    {
      date: "2003–2018",
      location: "St. Joseph's Convent School",
      title: "First lesson in leadership",
      description: "Set a goal to become Head Boy and achieved it through persistence, accountability, and the trust of peers and teachers."
    },
    {
      date: "2018–2022",
      location: "HNB Garhwal University",
      title: "Building a technical foundation",
      description: "Pursued Computer Science & Engineering with a focus on applying technology to solve real-world business problems."
    },
    {
      date: "2021",
      location: "QuickReply.ai",
      title: "Turning learning into execution",
      description: "Started working while completing my degree, gaining hands-on SaaS, customer, product, and business experience early in my career."
    },
    {
      date: "2021",
      location: "HNB Garhwal University",
      title: "Applying technology to accessibility",
      description: "Developed a machine-learning-powered virtual university experience to help prospective students explore campus remotely and make informed decisions."
    },
    {
      date: "2021–2022",
      location: "QuickReply.ai",
      title: "Business Analyst",
      description: "Mapped customer workflows, campaign goals, onboarding needs, and product adoption patterns across high-growth brands."
    },
    {
      date: "2022–2023",
      location: "QuickReply.ai",
      title: "Technical Business Analyst",
      description: "Bridged customers, Product, and Engineering by translating requirements into technical workflows, integrations, API troubleshooting, and scalable implementation systems."
    },
    {
      date: "2023–Present",
      location: "QuickReply.ai",
      title: "Head of Customer Success",
      description: "Scaled post-sale systems across enterprise accounts, building customer intelligence, retention, onboarding, automation, and expansion frameworks that sustained <2% gross churn, improved efficiency by 40%, and generated $50K+ MRR in growth opportunities."
    },
    {
      date: "Today",
      location: "Present Focus",
      title: "Business Systems Architect | Product Adoption | AI Workflows | Revenue Strategy",
      description: "Building the bridge between business strategy, product adoption, AI workflows, technical integrations, customer intelligence, and revenue systems."
    }
  ],

  coreStrengths: [
    { name: "QuickReply.ai", category: "WhatsApp Marketing" },
    { name: "Shopify", category: "Commerce Ecosystem" },
    { name: "WhatsApp API", category: "Messaging Protocols" },
    { name: "Pipedream", category: "Workflow Automation" },
    { name: "Airtable", category: "Operations DB" },
    { name: "Asana", category: "Project Execution" }
  ],

  stackCategories: [
    // {
    //   id: "ai",
    //   name: "AI & Automation",
    //   items: [
    //     "OpenAI", "Claude", "Gemini"
    //   ]
    // },
    {
      id: "commerce",
      name: "Commerce & Checkout",
      items: [
        "Shopify", "WooCommerce", "Magento", "Gokwik", "Shopflo",
        "Fastrr", "Swift", "Simpl", "Ecom 360", "Razorpay Magic Checkout",
        "ShopPass", "Nitro", "Razorpay SSO", "Recharge Subscriptions"
      ]
    },
    {
      id: "messaging",
      name: "WhatsApp, Messaging & Comm",
      items: [
        "WhatsApp API", "QuickReply.ai", "Twilio", "Msg91", "Exotel",
        "Ringg AI", "Instagram", "Meta", "Meta Pixel"
      ]
    },
    {
      id: "crm",
      name: "CRM & Sales Systems",
      items: [
        "HubSpot", "Salesforce", "Zoho CRM", "Kylas", "LeadSquared",
        "Go High Level", "Salesmate CRM", "TeleCRM", "Zoho Bigin"
      ]
    },
    {
      id: "support",
      name: "Support & Customer Ops",
      items: ["Freshworks", "Zoho Desk", "Gorgias", "Periskope", "Asana", "Notion"]
    },
    {
      id: "automation",
      name: "Automation, Data & Tools",
      items: [
        "Pipedream", "Airtable", "Zapier", "Google AppScripts",
        "Google Calendar", "Calendly", "Jibble", "Jotform", "Typeform"
      ]
    },
    {
      id: "analytics",
      name: "Analytics & Marketing Auto",
      items: [
        "Google Analytics", "MoEngage", "WebEngage", "CleverTap",
        "Klaviyo", "Zoho Analytics"
      ]
    },
    {
      id: "payments",
      name: "Payments & Finance",
      items: [
        "Razorpay", "PayU", "CashFree", "Easebuzz", "Zoho Books",
        "RazorpayX Payroll"
      ]
    },
    {
      id: "logistics",
      name: "Logistics, Shipping & Returns",
      items: [
        "Nimbus Post", "Shiprocket", "Shipio", "ClickPost",
        "WareIQ", "Delhivery", "Return Prime", "Vinculum"
      ]
    },
    {
      id: "reviews",
      name: "Reviews, Loyalty & Engagement",
      items: ["Judge.me", "Loox", "Nector", "Proviews"]
    },
    {
      id: "education",
      name: "Education, Health, ERP & Platforms",
      items: [
        "NoPaperForms", "Zenoti", "Odoo",
        "Amoga CRM", "Teleforce"
      ]
    }
  ],

  clientPortfolio: [
    {
      industry: "Sports & Entertainment",
      brands: ["Gujarat Titans", "AAFT University", "NasAcademy"]
    },
    {
      industry: "Beauty, Personal Care & Wellness",
      brands: [
        "Renee Cosmetics", "Shiseido Professional", "Advanced Hair Studio",
        "GK Hair", "pH Laboratories", "Indus Valley", "Goodveda", "Menoveda",
        "Project Serotonin", "Dermawear", "Sploot"
      ]
    },
    {
      industry: "Healthcare & Ayurveda",
      brands: ["Jiva Ayurveda", "Motherland Hospital", "Major Hospital", "Saraswat Hospital", "Suwasthi"]
    },
    {
      industry: "Education",
      brands: [
        "IDP India", "CP Goenka International School",
        "Christ University", "Manav Rachna Edu", "Bizgurukul"
      ]
    },
    {
      industry: "D2C, Lifestyle & E-commerce",
      brands: [
        "The Next Decor", "Uptownie", "Boldfit", "Amama Jewels", "TDF Diamonds",
        "Aurelia Diamonds", "Frido", "Nestroots", "Agaro Lifestyle",
        "PrimeStyle.com", "The Pillow Company", "Metalkart"
      ]
    },
    {
      industry: "Food, FMCG & Nutrition",
      brands: ["Farmley", "Lal Sweets India", "Cornitos", "Priyagold", "Rage Coffee", "Dabur"]
    },
    {
      industry: "Auto, Mobility & Services",
      brands: ["CarInfo", "VehicleCare", "Shivam Autozone"]
    },
    {
      industry: "Real Estate & Infrastructure",
      brands: ["Hero Homes", "Century Real Estate", "Europe Emirates Group", "Shree Ashtech"]
    },
    {
      industry: "Jewellery, Astrology & Spiritual",
      brands: ["Astro Arun Pandit", "GemsMantra", "The Akshaya Patra Foundation", "The Art of Living"]
    },
    {
      industry: "Technology, Finance & B2B",
      brands: ["AlaanPay", "ExpenseOnDemand"]
    },
    {
      industry: "International / Cross-border",
      brands: ["Distacart", "Dista USA", "Melange Singapore"]
    },
    {
      industry: "Others",
      brands: ["Revibe", "Beeaar Group", "Corvi LED", "Soham"]
    }
  ],

  automations: [
    {
      title: "Integration-Led Revenue Engine",
      problem: "Enterprise customers needed custom integrations and workflow enhancements before expanding usage.",
      system: "Created a pilot-to-production framework with Product and Engineering to validate customer-requested integrations, assess business impact, map technical feasibility, and move high-value workflows into production.",
      impact: [
        "Generated **$50K+ MRR** expansion opportunities",
        "Accelerated delivery of strategic integrations",
        "Improved CS / Product / Engineering execution",
        "Increased enterprise expansion potential"
      ],
      tags: ["Revenue Expansion", "Enterprise Integrations", "Product Collaboration", "Technical Strategy"]
    },
    {
      title: "AI Workflow & Recommendation System",
      problem: "GenAI-based eCommerce product mapping and recommendation outputs needed better consistency, retrieval quality, and lower hallucination risk.",
      system: "Improved prompts, restructured the RAG knowledge base, and designed a multi-agent flow separating pre-analysis, knowledge gathering, and message formatting.",
      impact: [
        "Improved recommendation consistency",
        "Reduced hallucination risk",
        "Improved output quality",
        "Created a more reliable AI-assisted recommendation workflow"
      ],
      tags: ["AI Workflows", "RAG", "Prompt Engineering", "Multi-Agent Systems"]
    },
    {
      title: "Predictive Customer Health / Revenue Protection Engine",
      problem: "Customer risk was often identified only after escalations occurred, limiting proactive intervention.",
      system: "Designed a health framework combining product adoption, platform usage, SLA adherence, engagement signals, customer sentiment, and commercial risk into a unified health score.",
      impact: [
        "Maintained **Gross Revenue Churn below 2%**",
        "Enabled proactive intervention before renewal risk materialized",
        "Improved CSM prioritization across the portfolio",
        "Created repeatable retention forecasting"
      ],
      tags: ["Customer Intelligence", "Health Scoring", "Churn Forecasting", "Revenue Protection"]
    },
    {
      title: "Customer Intelligence Platform",
      problem: "Leadership lacked real-time visibility into account health, customer happiness, adoption, risk, and portfolio trends across a rapidly growing customer base.",
      system: "Built an internal CRM and dashboard layer featuring live customer tracking, health indexing, happiness trends, portfolio risk monitoring, SLA visibility, and leadership reporting.",
      impact: [
        "Visibility across **900+ customer accounts**",
        "Reduced manual portfolio reviews by **60%**",
        "Accelerated at-risk account identification",
        "Improved forecasting and management decision-making"
      ],
      tags: ["Operational Intelligence", "CRM Systems", "Portfolio Visibility", "Executive Dashboards"]
    },
    {
      title: "Product Feedback Intelligence Loop",
      problem: "Customer feedback often existed as isolated feature requests without structured prioritization.",
      system: "Created a feedback loop to identify recurring business patterns, validate commercial value, define implementation requirements, and prioritize Product / Engineering investment.",
      impact: [
        "Improved roadmap-quality input",
        "Reduced noise in feature requests",
        "Connected customer pain to revenue and adoption impact",
        "Improved Product / Engineering alignment"
      ],
      tags: ["Product Strategy", "Customer Discovery", "Roadmap Influence", "Product Operations"]
    },
    {
      title: "Enterprise Onboarding Architecture",
      problem: "Enterprise onboarding required extensive coordination, causing delays and inconsistent implementation experiences.",
      system: "Designed onboarding workflows, ownership frameworks, milestone tracking, SLA monitoring, implementation checklists, and escalation paths.",
      impact: [
        "Accelerated onboarding timelines",
        "Improved onboarding consistency",
        "Reduced implementation bottlenecks",
        "Faster customer time-to-value"
      ],
      tags: ["Enterprise Onboarding", "Workflow Architecture", "Implementation Systems", "Time-to-Value"]
    },
    {
      title: "Customer Recovery Operating System",
      problem: "Recovery efforts varied across CSMs, creating inconsistent retention outcomes for high-risk customers.",
      system: "Built automated retention playbooks, risk-based follow-up sequences, escalation paths, customer recovery templates, and recovery roadmaps.",
      impact: [
        "Standardized recovery process",
        "Improved accountability across retention initiatives",
        "Reduced reliance on manual intervention",
        "Increased consistency in at-risk account management"
      ],
      tags: ["Retention Automation", "Recovery Playbooks", "Customer Success Systems"]
    },
    {
      title: "Support Operations Engine",
      problem: "Support tickets lacked structured ownership, consistent routing, SLA monitoring, and scalable documentation.",
      system: "Implemented automated ticket routing, CSM assignment workflows, SLA tracking, escalation triggers, ownership models, and self-serve documentation processes.",
      impact: [
        "Improved support operations efficiency by **40%**",
        "Reduced manual ticket assignment",
        "Increased SLA visibility",
        "Improved customer support consistency"
      ],
      tags: ["Support Operations", "SLA Management", "Workflow Automation", "Documentation Systems"]
    }
  ],

  testimonials: [
    {
      client: "Meadbery",
      country: "India",
      rating: 5,
      quote: "I recently started using Quickreply, and I must say, it has <span class='highlight'>transformed the way I handle messages on my shopify</span>. The app's user-friendly interface and efficient features make communication a breeze.<br/><br/>What really stood out, though, was the <span class='highlight'>exceptional customer service</span> provided by <span class='highlight'>Utkarsh</span>. <span class='highlight'>Utkarsh</span>'s <span class='highlight'>quick attention to our requests</span> made our experience with Quickreply even more enjoyable. It's rare to find such a <span class='highlight'>dedicated and responsive support team member</span>. He not only addressed our concerns promptly but also went the extra mile to ensure that we felt valued as users.<br/><br/>The app itself is a <span class='highlight'>game-changer, streamlining the process of CTWA Ads</span> and keeping conversations organized. Quickreply has become an integral part of my daily routine, and I highly recommend it to anyone looking for a reliable messaging solution.<br/><br/>Big shoutout to <span class='highlight'>Utkarsh</span> and the Quickreply team for their <span class='highlight'>commitment to customer satisfaction</span> and for creating a fantastic application. Keep up the great work!"
    },
    {
      client: "The Next Decor",
      country: "India",
      rating: 5,
      quote: "We are using this app for 1 Year and it is a <span class='highlight'>great experience</span> with it. Really it's amazing and <span class='highlight'>solved our many problems</span>.<br/><br/>The Best thing is that <span class='highlight'>customer support that was very quick</span> specially <span class='highlight'>Utkarsh</span> is very supportive. Highly Recommended !!"
    },
    {
      client: "Uptownie",
      country: "India",
      rating: 5,
      quote: "<span class='highlight'>Customer support for this app is absolutely great</span> - especially <span class='highlight'>Utkarsh Kala</span> who is always prompt and very competent!<br/><br/>Has helped me to <span class='highlight'>increase conversions</span>."
    },

    {
      client: "PERFECTSTYLESTORE-IN",
      country: "India",
      rating: 5,
      quote: "The app has been a <span class='highlight'>complete game changer for our business</span>. Not only it has <span class='highlight'>reduced the boring manual work</span> for us but also <span class='highlight'>generated extra revenue on complete automation</span>. Within just 2 days of using this app i could already see the difference in <span class='highlight'>increase in sales and reduction in non delivereds</span>.<br/><br/>Their team has been <span class='highlight'>very helpful and prompt</span> with all the queries that we had. I would specially like to thank <span class='highlight'>Utkarsh</span> for really being so supportive looking after us.<br/><br/>Lastly i would highly recommend this app to everyone who would like to <span class='highlight'>increase their revenue and profits</span>."
    }
  ],

  recommendations: [
    {
      author: "Adarsh Singh",
      role: "Manager - Campaign Operations @ SportzInteractive",
      quote: "I had the pleasure of working closely with <span class='highlight'>Utkarsh</span> while supporting a common client from different stakeholder groups. Throughout our collaboration, he consistently stood out for his <span class='highlight'>sharp analytical thinking, creativity, and proactive approach to problem-solving</span>.<br/><br/>Utkarsh has a remarkable ability to <span class='highlight'>break down complex challenges</span>, identify practical solutions, and <span class='highlight'>drive initiatives forward</span> with confidence and professionalism. He is articulate, dependable, and always willing to go the extra mile to ensure successful outcomes for the client and the wider team.<br/><br/>What I particularly appreciated was his <span class='highlight'>collaborative mindset</span>. Despite representing different organizations, we worked together seamlessly to <span class='highlight'>deliver impactful campaigns</span> and create success stories for our shared client. His ability to <span class='highlight'>balance strategic thinking with execution excellence</span> makes him a valuable partner and a trusted professional.<br/><br/>I would highly recommend Utkarsh to any organization looking for someone who combines <span class='highlight'>intelligence, ownership, and a strong commitment to delivering results</span>."
    },
    {
      author: "Rinkesh K Singh",
      role: "Sr. Implementations Specialist @ QuickReply.ai",
      quote: "I have had the privilege of knowing and working with <span class='highlight'>Utkarsh Kala</span> as a friend, colleague, and now as Head of Customer success manager at QuickReply.ai. Over time, I have seen him excel both as an individual contributor and as a team leader, consistently demonstrating dedication and professionalism.<br/><br/>What truly sets <span class='highlight'>Utkarsh</span> apart is his <span class='highlight'>deep understanding of Customer Success</span>. His ability to <span class='highlight'>empathize with clients</span>, quickly grasp their challenges, and <span class='highlight'>provide clear, actionable solutions</span> is remarkable. He not only ensures that issues are resolved effectively but also brings a fresh perspective that often <span class='highlight'>turns challenges into opportunities for growth</span>.<br/><br/>Alongside his customer-first approach, <span class='highlight'>Utkarsh</span> has a <span class='highlight'>strong technical foundation</span>, which allows him to <span class='highlight'>bridge the gap between client needs and product capabilities seamlessly</span>. This rare combination of customer empathy and technical expertise makes him one of the <span class='highlight'>most impactful leaders</span> I've worked with.<br/><br/>I am confident that his <span class='highlight'>passion, leadership, and vision</span> will continue to drive success for QuickReply.ai and inspire everyone who works with him."
    }, {
      author: "Raja Ganesan",
      role: "Head of PLG & Customer Success @ Flowace.ai",
      quote: "I've worked with many people in corporate, from different ages. But never seen anyone working like him. Pulling all nighter if needed to get the job done. He's one hell of a man whom you can trust to get things done. <span class='highlight'>Work first and the rest follows</span> ( that too only if he's done with the job)..<br/><br/>He has stood out in <span class='highlight'>managing multiple things at once</span>. Specially my journey with him at Quickreply, has been a great one. <span class='highlight'>You can always count on him!</span> We built things together that would last longer than the brand itself... if you are a recruiter seeing this, <span class='highlight'>you are in the right profile for CS!</span>"
    },

    {
      author: "Yamini Beri",
      role: "Digital Marketing & Growth Manager @ Amama Jewels",
      quote: "What began as an experiment in <span class='highlight'>retention marketing</span> soon grew into a strong partnership, and much of that credit goes to <span class='highlight'>Utkarsh</span>. Early on, he was closely involved himself, and as his role expanded, he continued to <span class='highlight'>guide his team</span> while stepping in whenever needed. His soft-spoken and approachable nature not only made <span class='highlight'>collaboration easy</span> but also seemed to influence his team’s own way of working.<br/><br/><span class='highlight'>Utkarsh’s mix of competence, reliability, and professionalism</span> makes him someone <span class='highlight'>I would strongly recommend for any team.</span>"
    },
    {
      author: "Rahul Parihar",
      role: "Head of Sales @ QuickReply.ai",
      quote: "Working with <span class='highlight'>Utkarsh</span> at QuickReply was a great experience. He's a <span class='highlight'>customer-facing professional with maturity well beyond his years</span>, combining <span class='highlight'>sincerity, patience, and responsiveness</span> with a <span class='highlight'>deep understanding of the product</span> both from tech capability & customer requirement perspective.<br/><br/>What really stands out is his <span class='highlight'>ability to simplify complexity and consistently deliver</span> — no matter how demanding the requirement. I’d happily work with him again and <span class='highlight'>highly recommend him</span>."
    },
    {
      author: "Parijat Kapoor",
      role: "Chief of Staff @ NitroCommerce",
      quote: "<span class='highlight'>Utkarsh</span> is a <span class='highlight'>dependable and collaborative partner</span> with a <span class='highlight'>strong command of customer success and conversational commerce</span>. He brings <span class='highlight'>clarity, structure, and a solutions-first approach</span> to every engagement, making collaboration smooth and impactful.<br/><br/>Working with him has always been a positive experience, and he’s someone <span class='highlight'>I’d strongly recommend to any team or partner ecosystem!</span>"
    },
    {
      author: "Shobhit Gupta",
      role: "AI Product Manager @ QuickReply.ai",
      quote: "I had the pleasure of working closely with <span class='highlight'>Utkarsh</span>, our Head of Customer Success at QuickReply, and he has been an <span class='highlight'>incredible partner in shaping the product and customer experience</span>. He was my go-to person whenever I wanted to brainstorm ideas, <span class='highlight'>validate innovations</span>, or understand what our customers truly needed.<br/><br/>What makes <span class='highlight'>Utkarsh</span> stand out is his <span class='highlight'>rare combination of product sense, technical knowledge, and business acumen</span>—a blend that makes every discussion with him <span class='highlight'>insightful and outcome-driven</span>. He leads the customer success team with great efficiency, always keeping customer satisfaction at the forefront while balancing internal priorities seamlessly.<br/><br/>Beyond his skills, <span class='highlight'>Utkarsh</span> is also a <span class='highlight'>fantastic team player</span> who collaborates effortlessly across functions, making him a <span class='highlight'>true asset to the organization</span>. I’ve learned a lot from working alongside him, and I’d <span class='highlight'>strongly recommend him</span> to any team looking for a leader who can <span class='highlight'>bridge the gap between customers, product, and business impact</span>."
    }
  ],

  brandLogoMap: {
    "aaft university": "aaft-university.png",
    "uptownie": "uptownie.png",
    "the art of living": "the_art_of_living.png",
    "soham": "soham.png",
    "boldfit": "boldfit.png",
    "saraswat hospital": "saraswat_hospital.png",
    "revibe": "revibe.png",
    "shiseido professional": "shiseido.png",
    "advanced hair studio": "advanced-hair-studio.png",
    "century real estate": "century_real_estate.png",
    "agaro lifestyle": "agaro-lifestyle.png",
    "alaanpay": "alaanpay.png",
    "amama jewels": "amama-jewels.png",
    "astro arun pandit": "astro-arun-pandit.png",
    "rage coffee": "rage_coffee.png",
    "aurelia diamonds": "aurelia-diamonds.png",
    "beeaar group": "beeaar-group.png",
    "bizgurukul": "bizgurukul.png",
    "metalkart": "metalkart.png",
    "carinfo": "carinfo.png",
    "christ university": "christ-university.png",
    "cornitos": "cornitos.png",
    "corvi led": "corvi-led.png",
    "cp goenka international school": "cp-goenka-international-school.png",
    "dabur": "dabur.png",
    "dermawear": "dermawear.png",
    "distacart": "distacart.png",
    "dista usa": "dista_usa.png",
    "expenseondemand": "expenseondemand.png",
    "europe emirates group": "europe_emirates_group.png",
    "farmley": "farmley.png",
    "gemsmantra": "gemsmantra.png",
    "gk hair": "gk_hair.png",
    "goodveda": "goodveda.png",
    "gujarat titans": "gujarat-titans.png",
    "hero homes": "hero-homes.png",
    "idp india": "idp-india.png",
    "indus valley": "indus-valley.png",
    "jiva ayurveda": "jiva-ayurveda.png",
    "lal sweets india": "lal-sweets-india.png",
    "manav rachna edu": "manav-rachna-edu.png",
    "melange singapore": "melange_singapore.png",
    "menoveda": "menoveda.png",
    "motherland hospital": "motherland_hospital.png",
    "ph laboratories": "ph_laboratories.png",
    "frido": "frido.png",
    "nasacademy": "nasacademy.png",
    "nestroots": "nestroots.png",
    "primestyle.com": "primestyle-com.png",
    "priyagold": "priyagold.png",
    "project serotonin": "project-serotonin.png",
    "renee cosmetics": "renee-cosmetics.png",
    "shree ashtech": "shree-ashtech.png",
    "shivam autozone": "shivam-autozone.png",
    "sploot": "sploot-dog-grooming.png",
    "suwasthi": "suwasthi.png",
    "tdf diamonds": "tdf-diamonds.png",
    "the akshaya patra foundation": "the-akshaya-patra-foundation.png",
    "the next decor": "the-next-decor.png",
    "the pillow company": "the-pillow-company.png",
    "vehiclecare": "vehiclecare.png"
  },

  techStackLogos: {
    "teleforce": "teleforce.png",
    "zoho analytics": "zoho_analytics.png",
    "zoho crm": "zoho_crm.webp",
    "zoho books": "zoho_books.png",
    "woocommerce": "woocommerce.png",
    "amoga crm": "amoga_crm.png",
    "typeform": "typeform.png",
    "webengage": "webengage.png",
    "vinculum": "vinculum.webp",
    "quickreply.ai": "quickreply_ai.png",
    "telecrm": "telecrm.png",
    "shoppass": "shoppass.svg",
    "zoho bigin": "zoho_bigin.webp",
    "nopaperforms": "no_paper_forms.png",
    "salesmate crm": "salesmate_crm.png",
    "exotel": "exotel.png",
    "return prime": "return_prime.png",
    "ringg ai": "ringg_ai.png",
    "periskope": "periskope.webp",
    "meta": "meta.png",
    "fastrr": "fastrr.png",
    "magento": "magento.png",
    "go high level": "go_high_level.webp",
    "google appscripts": "google_app_scripts.png",
    "google calendar": "google_calendar.png",
    "gorgias": "gorgias.png",
    "instagram": "instagram.webp",
    "jibble": "jibble.webp",
    "calendly": "calendly.png",
    "jotform": "jotform.png",
    "klaviyo": "klaviyo.png",
    "asana": "asana.png",
    "airtable": "airtable.png",
    "easebuzz": "easebuzz.png",
    "clevertap": "clevertap.png",
    "breeze": "breeze.png",
    "cashfree": "cashfree.png",
    "clickpost": "clickpost.png",
    "delhivery": "delhivery.png",
    "ecom 360": "ecom360.png",
    "nector": "nector.png",
    "freshworks": "freshworks.png",
    "gokwik": "gokwik.png",
    "google analytics": "google_analytics.png",
    "hubspot": "hubspot.png",
    "judge.me": "judge-me.png",
    "kylas": "kylas.png",
    "leadsquared": "leadsquared.webp",
    "loox": "loox.png",
    "msg91": "msg91.png",
    "meta pixel": "meta_pixel.png",
    "moengage": "moengage.png",
    "nimbus post": "nimbus_post.png",
    "nitro": "nitro.webp",
    "payu": "payu.png",
    "pipedream": "pipedream.png",
    "proviews": "proviews.png",
    "razorpay": "razorpay.svg",
    "razorpay magic checkout": "razorpay.svg",
    "recharge subscriptions": "recharge_subscriptions.png",
    "razorpayx payroll": "razorpay_x_payroll.png",
    "razorpay sso": "razorpay.svg",
    "salesforce": "salesforce.png",
    "shipio": "shipio.png",
    "shiprocket": "shiprocket.png",
    "shopflo": "shopflo.svg",
    "shopify": "shopify.png",
    "simpl": "simpl.png",
    "swift": "swift.png",
    "whatsapp api": "whatsapp.webp",
    "wareiq": "ware_iq.svg",
    "zapier": "zapier.png",
    "twilio": "twilio.png",
    "zenoti": "zenoti.webp",
    "zoho desk": "zoho_desk.png",
    "pabbly": "pabbly.svg"
  },

  simpleIconMappings: {
    "shopify": "shopify",
    "woocommerce": "woocommerce",
    "magento": "magento",
    "recharge": "recharge",
    "whatsapp api": "whatsapp",
    "twilio": "twilio",
    "instagram": "instagram",
    "meta": "meta",
    "meta pixel": "meta",
    "hubspot": "hubspot",
    "salesforce": "salesforce",
    "zoho crm": "zoho",
    "zoho desk": "zoho",
    "zoho analytics": "zoho",
    "zoho books": "zoho",
    "freshdesk": "freshworks",
    "gorgias": "gorgias",
    "asana": "asana",
    "notion": "notion",
    "pipedream": "pipedream",
    "airtable": "airtable",
    "zapier": "zapier",
    "google appscripts": "google",
    "google calendar": "google",
    "calendly": "calendly",
    "typeform": "typeform",
    "jotform": "jotform",
    "google analytics 4": "googleanalytics",
    "moengage": "moengage",
    "clevertap": "clevertap",
    "klaviyo": "klaviyo",
    "razorpay": "razorpay",
    "payu": "payu",
    "nimbus post": "nimbus",
    "shiprocket": "shiprocket",
    "delhivery": "delhivery",
    "judge.me": "judgeme",
    "odoo": "odoo",
    "lms": "canvaslms"
  },
  topics: [
    "Hiring",
    "Product Strategy",
    "AI Workflows",
    "Technical Strategy",
    "CS Leadership",
    "Customer Success",
    "RevOps",
    "Automation",
    "Integrations",
    "Consulting",
    "Advisory",
    "Fractional CS",
    "Growth Strategy",
    "Retention",
    "Partnerships"
  ]
};
