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

export interface CustomerIndustry {
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
  duration: string;
  date: string;
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
  customerPortfolio: CustomerIndustry[];
  automations: AutomationItem[];
  testimonials: TestimonialItem[];
  recommendations: RecommendationItem[];
  brandLogoMap: Record<string, string>;
  techStackLogos: Record<string, string>;
  simpleIconMappings: Record<string, string>;
}

export const PORTFOLIO_DATA: PortfolioData = {
  journeyItems: [
    {
      date: "September 2000",
      location: "Kotdwara, Uttarakhand",
      title: "Building ambition from day one",
      description: "Raised in a small town with a simple belief: meaningful growth comes from consistency, curiosity, and taking ownership of opportunities."
    },
    {
      date: "2003–2018",
      location: "St. Joseph's Convent School",
      title: "First lesson in leadership",
      description: "Set a goal to become Head Boy and achieved it through persistence, accountability, and earning the trust of peers and teachers—an early foundation for leading teams and driving outcomes."
    },
    {
      date: "2018–2022",
      location: "HNB Garhwal University",
      title: "Building a technical foundation",
      description: "Pursued Computer Science & Engineering with a focus on applying technology to solve real-world business problems beyond the classroom."
    },
    {
      date: "2021",
      location: "QuickReply.ai",
      title: "Turning learning into execution",
      description: "Started working while pursuing a degree, balancing academics and professional responsibilities to gain hands-on SaaS, customer, and business experience early in my career."
    },
    {
      date: "2021",
      location: "HNB Garhwal University",
      title: "Applying technology to improve accessibility",
      description: "Developed a machine-learning-powered virtual university experience aimed at helping prospective students explore the campus remotely and make more informed decisions."
    },
    {
      date: "2021–2022",
      location: "QuickReply.ai",
      title: "Business Analyst",
      description: "Understanding what drives customer growth. Focused on customer workflows, product adoption, and business outcomes to identify the factors that influence retention, engagement, and long-term value."
    },
    {
      date: "2022–2023",
      location: "QuickReply.ai",
      title: "Technical Business Analyst",
      description: "Bridging customers, product, and technology. Led solution design, integrations, and technical consulting initiatives that translated customer requirements into scalable product outcomes."
    },
    {
      date: "2023–Present",
      location: "QuickReply.ai",
      title: "Head of Customer Success",
      description: "Scaling revenue through customer success. Built and scaled Customer Success operations across enterprise accounts, developing automation systems, retention frameworks, onboarding processes, and expansion strategies that helped maintain <2% gross revenue churn, improve operational efficiency, and generate $50K+ MRR in growth opportunities."
    },
    {
      date: "Today",
      location: "Present Focus",
      title: "Customer Success Leader | Revenue Operator | Automation Builder",
      description: "Focused on helping SaaS companies grow after the sale by combining Customer Success, RevOps, AI automation, and technical problem-solving to increase retention, expansion, and operational scale."
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

  customerPortfolio: [
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
      title: "$50K+ MRR Generated Through Integration-Led Expansion",
      problem: "Enterprise customers required custom integrations and workflow enhancements before expanding usage.",
      system: "Created a pilot-to-production framework with Product and Engineering teams to rapidly validate and deploy customer-requested integrations.",
      impact: [
        "Generated **$50K+ in new MRR opportunities**",
        "Accelerated delivery of strategic integrations",
        "Improved cross-functional execution between CS, Product, and Engineering",
        "Increased enterprise expansion potential"
      ],
      tags: ["Revenue Expansion", "Product Collaboration", "Enterprise Integrations"]
    },
    {
      title: "<2% Gross Revenue Churn Through Predictive Customer Health Scoring",
      problem: "Customer risk was often identified only after escalations occurred, limiting the team's ability to intervene proactively.",
      system: "Designed a customer health framework that combined product adoption, platform usage, SLA adherence, engagement signals, and customer sentiment into a unified health score.",
      impact: [
        "Maintained **Gross Revenue Churn below 2%**",
        "Enabled proactive intervention before renewal risk materialized",
        "Improved CSM prioritization across the customer portfolio",
        "Created a repeatable framework for retention forecasting"
      ],
      tags: ["Customer Retention", "Health Scoring", "Churn Forecasting"]
    },
    {
      title: "Enterprise Onboarding Automation at Scale",
      problem: "Enterprise onboarding required extensive coordination, resulting in delays and inconsistent implementation experiences.",
      system: "Designed onboarding workflows, ownership frameworks, milestone tracking, and SLA monitoring systems to streamline implementation.",
      impact: [
        "Accelerated enterprise onboarding timelines",
        "Improved onboarding consistency",
        "Reduced implementation bottlenecks",
        "Faster customer time-to-value"
      ],
      tags: ["Enterprise Onboarding", "Implementation Management", "Process Automation"]
    }, {
      title: "Automated Recovery Workflows for High-Risk Accounts",
      problem: "Customer recovery efforts varied significantly across CSMs, leading to inconsistent retention outcomes.",
      system: "Built automated retention playbooks, risk-based follow-up sequences, escalation paths, and recovery roadmaps.",
      impact: [
        "Standardized customer recovery processes",
        "Improved accountability across retention initiatives",
        "Reduced reliance on manual intervention",
        "Increased consistency in at-risk account management"
      ],
      tags: ["Retention Automation", "Playbooks", "Customer Recovery"]
    },
    {
      title: "900+ Accounts Managed Through a Custom CRM Visibility Platform",
      problem: "Leadership lacked real-time visibility into account health, customer happiness, and portfolio risk across a rapidly growing customer base.",
      system: "Built an internal CRM and operational dashboard layer featuring live customer tracking, health indexing, happiness trends, and risk monitoring.",
      impact: [
        "Improved visibility across **900+ customer accounts**",
        "Reduced manual portfolio reviews by **60%**",
        "Accelerated identification of at-risk customers",
        "Improved forecasting and management decision-making"
      ],
      tags: ["CRM Development", "Customer Health", "CS Operations", "Reporting Automation"]
    },
    {
      title: "40% Increase in Support Operations Efficiency",
      problem: "Support tickets lacked structured ownership, consistent routing, SLA monitoring, and scalable documentation.",
      system: "Implemented automated ticket routing, CSM assignment workflows, SLA tracking, escalation triggers, and self-service documentation processes.",
      impact: [
        "Improved support efficiency by **40%**",
        "Reduced manual ticket assignment effort",
        "Increased SLA compliance visibility",
        "Improved customer support consistency"
      ],
      tags: ["Support Operations", "SLA Management", "CSAT", "Workflow Automation"]
    }

  ],

  testimonials: [
    {
      client: "The Next Decor",
      country: "India",
      // duration: "9 months using the app",
      // date: "November 30, 2022",
      date: "",
      duration: "",
      rating: 5,
      quote: "We are using this app for 1 Year and it is a great experience with it. Really it's amazing and solved our many problems. The Best thing is that customer support that was very quick specially <span class='highlight'>Utkarsh</span> is very supportive. Highly Recommended !!"
    },
    {
      client: "Uptownie",
      country: "India",
      // duration: "9 months using the app",
      // date: "September 16, 2022",
      date: "",
      duration: "",
      rating: 5,
      quote: "Customer support for this app is absolutely great - especially <span class='highlight'>Utkarsh Kala</span> who is always prompt and very competent! Has helped me to increase conversions."
    },
    {
      client: "Meadbery",
      country: "India",
      // duration: "29 days using the app",
      // date: "January 27, 2024",
      date: "",
      duration: "",
      rating: 5,
      quote: "I recently started using Quickreply, and I must say, it has transformed the way I handle messages on my shopify. The app's user-friendly interface and efficient features make communication a breeze. What really stood out, though, was the exceptional customer service provided by <span class='highlight'>Utkarsh</span>. <span class='highlight'>Utkarsh</span>'s quick attention to our requests made our experience with Quickreply even more enjoyable. It's rare to find such a dedicated and responsive support team member. He not only addressed our concerns promptly but also went the extra mile to ensure that we felt valued as users. The app itself is a game-changer, streamlining the process of CTWA Ads and keeping conversations organized. Quickreply has become an integral part of my daily routine, and I highly recommend it to anyone looking for a reliable messaging solution. Big shoutout to <span class='highlight'>Utkarsh</span> and the Quickreply team for their commitment to customer satisfaction and for creating a fantastic application. Keep up the great work!"
    },
    {
      client: "PERFECTSTYLESTORE-IN",
      country: "India",
      // duration: "8 days using the app",
      // date: "November 23, 2022",
      date: "",
      duration: "",
      rating: 5,
      quote: "The app has been a complete game changer for our business. Not only it has reduced the boring manual work for us but also generated extra revenue on complete automation. Within just 2 days of using this app i could already see the difference in increase in sales and reduction in non delivereds. Their team has been very helpful and prompt with all the queries that we had. I would specially like to thank <span class='highlight'>Utkarsh</span> for really being so supportive looking after us. Lastly i would highly recommend this app to everyone who would like to increase their revenue and profits."
    }
  ],

  recommendations: [
    {
      author: "Adarsh Singh",
      role: "Manager - Campaign Operations @ SportzInteractive",
      quote: "I had the pleasure of working closely with <span class='highlight'>Utkarsh</span> while supporting a common client from different stakeholder groups. Throughout our collaboration, he consistently stood out for his <span class='highlight'>sharp analytical thinking, creativity, and proactive approach to problem-solving</span>."
    },
    {
      author: "Parijat Kapoor",
      role: "Chief of Staff @ NitroCommerce",
      quote: "<span class='highlight'>Utkarsh</span> is a <span class='highlight'>dependable and collaborative partner</span> with a <span class='highlight'>strong command of customer success and conversational commerce</span>. He brings clarity, structure, and a solutions-first approach to every engagement, making collaboration smooth and impactful. Working with him has always been a positive experience, and he’s someone <span class='highlight'>I’d strongly recommend to any team or partner ecosystem!</span>"
    },
    {
      author: "Yamini Beri",
      role: "Digital Marketing & Growth Manager @ Amama Jewels",
      quote: "What began as an experiment in retention marketing soon grew into a strong partnership, and much of that credit goes to <span class='highlight'>Utkarsh</span>. Early on, he was closely involved himself, and as his role expanded, he continued to guide his team while stepping in whenever needed. His soft-spoken and approachable nature not only made collaboration easy but also seemed to influence his team’s own way of working.<br/><br/><span class='highlight'>Utkarsh’s mix of competence, reliability, and professionalism</span> makes him someone <span class='highlight'>I would strongly recommend for any team.</span>"
    },
    {
      author: "Rahul Parihar",
      role: "Head of Sales @ QuickReply.ai",
      quote: "Working with <span class='highlight'>Utkarsh</span> at QuickReply was a great experience. He's a customer-facing professional with maturity well beyond his years, combining <span class='highlight'>sincerity, patience, and responsiveness</span> with a <span class='highlight'>deep understanding of the product</span> both from tech capability & customer requirement perspective.<br/><br/>What really stands out is his <span class='highlight'>ability to simplify complexity and consistently deliver</span> — no matter how demanding the requirement. I’d happily work with him again and <span class='highlight'>highly recommend him</span>."
    },
    {
      author: "Shobhit Gupta",
      role: "AI Product Manager @ QuickReply.ai",
      quote: "I had the pleasure of working closely with <span class='highlight'>Utkarsh</span>, our Head of Customer Success at QuickReply, and he has been an incredible partner in shaping the product and customer experience. He was my go-to person whenever I wanted to brainstorm ideas, validate innovations, or understand what our customers truly needed.<br/><br/>What makes <span class='highlight'>Utkarsh</span> stand out is his <span class='highlight'>rare combination of product sense, technical knowledge, and business acumen</span>—a blend that makes every discussion with him insightful and outcome-driven. He leads the customer success team with great efficiency, always keeping customer satisfaction at the forefront while balancing internal priorities seamlessly.<br/><br/>Beyond his skills, <span class='highlight'>Utkarsh</span> is also a <span class='highlight'>fantastic team player</span> who collaborates effortlessly across functions, making him a <span class='highlight'>true asset to the organization</span>. I’ve learned a lot from working alongside him, and I’d <span class='highlight'>strongly recommend him</span> to any team looking for a leader who can bridge the gap between customers, product, and business impact."
    }, {
      author: "Raja Ganesan",
      role: "Head of PLG & Customer Success @ Flowace.ai",
      quote: "I've worked with many people in corporate, from different ages. But never seen anyone working like him. Pulling all nighter if needed to get the job done. He's one hell of a man whom you can trust to get things done. <span class='highlight'>Work first and the rest follows</span> ( that too only if he's done with the job).. He has stood out in managing multiple things at once. Specially my journey with him at Quickreply, has been a great one. <span class='highlight'>You can always count on him!</span> We built things together that would last longer than the brand itself... if you are a recruiter seeing this, <span class='highlight'>you are in the right profile for CS!</span>"
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
    "leadsquared": "leadsquared.png",
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
    "salesforce": "salesforce.svg",
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
  }
};
