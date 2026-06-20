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

export interface PortfolioData {
  journeyItems: JourneyItem[];
  coreStrengths: CoreStrength[];
  stackCategories: StackCategory[];
  customerPortfolio: CustomerIndustry[];
  automations: AutomationItem[];
  testimonials: TestimonialItem[];
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
        "Shopify", "WooCommerce", "Magento", "Gokwik", "Shopflo", "Zecpe", 
        "Fastrr", "Swift", "Simpl", "Ecom 360", "Blaze", "Razorpay Magic", 
        "Breeze", "ShopPass", "Nitro", "KwikPass", "Razorpay SSO", "Recharge"
      ]
    },
    {
      id: "messaging",
      name: "WhatsApp, Messaging & Comm",
      items: [
        "WhatsApp API", "QuickReply.ai", "Twilio", "Msg91", "Exotel", 
        "Ringg AI", "Instagram", "Facebook", "Meta Pixel"
      ]
    },
    {
      id: "crm",
      name: "CRM & Sales Systems",
      items: [
        "HubSpot", "Salesforce", "Zoho CRM", "Kylas", "LeadSquared", 
        "Go High Level", "SuiteCRM", "Salesmate", "TeleCRM", "Zoho Bigin"
      ]
    },
    {
      id: "support",
      name: "Support & Customer Ops",
      items: ["Freshdesk", "Zoho Desk", "Gorgias", "Periskope", "Asana", "Notion"]
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
        "Google Analytics 4", "MoEngage", "WebEngage", "CleverTap", 
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
        "NoPaperForms", "LMS", "Zenoti", "ERP", "Odoo", 
        "Amoga.app", "Zentrix", "Edusprint", "Teleforce"
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
        "GK Hair / pH Lab", "Indus Valley", "Goodveda", "Menoveda", 
        "Project Serotonin", "Dermawear", "Sploot - Dog Grooming"
      ]
    },
    {
      industry: "Healthcare & Ayurveda",
      brands: ["Jiva Ayurveda", "Motherland Hospital", "Major Hospital", "Saraswat Hospital", "Suwasthi"]
    },
    {
      industry: "Education",
      brands: [
        "IDP India", "CP Goenka International School", "Spring Dale Senior School", 
        "Christ University", "Manav Rachna Edu", "Bizgurukul"
      ]
    },
    {
      industry: "D2C, Lifestyle & E-commerce",
      brands: [
        "The Next Decor", "Uptownie", "Boldfit", "Amama Jewels", "TDF Diamonds", 
        "Aurelia Diamonds", "MyFrido", "Nestroots", "Agaro Lifestyle", 
        "PrimeStyle.com", "The Pillow Company", "Punam Metalcrafts"
      ]
    },
    {
      industry: "Food, FMCG & Nutrition",
      brands: ["Farmley", "Lal Sweets India", "Cornitos", "Priyagold", "Rage Coffee", "Dabur 1884"]
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
      brands: ["AlaanPay", "ExpenseOnDemand", "Ecom 360", "Blaze", "Amoga.app"]
    },
    {
      industry: "International / Cross-border",
      brands: ["Distacart / Dista USA", "Melange Singapore"]
    },
    {
      industry: "Others",
      brands: ["Revibe", "Beeaar Group", "Corvi LED", "Soham360", "Mat ALL"]
    }
  ],

  automations: [
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
    },
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
    }
  ],

  testimonials: [
    {
      client: "The Next Decor",
      country: "India",
      duration: "9 months using the app",
      date: "November 30, 2022",
      rating: 5,
      quote: "We are using this app for 1 Year and it is a great experience with it. Really it's amazing and solved our many problems. The Best thing is that customer support that was very quick specially <span class='highlight'>Utkarsh</span> is very supportive. Highly Recommended !!"
    },
    {
      client: "Uptownie",
      country: "India",
      duration: "9 months using the app",
      date: "September 16, 2022",
      rating: 5,
      quote: "Customer support for this app is absolutely great - especially <span class='highlight'>Utkarsh Kala</span> who is always prompt and very competent! Has helped me to increase conversions."
    },
    {
      client: "Meadbery",
      country: "India",
      duration: "29 days using the app",
      date: "January 27, 2024",
      rating: 5,
      quote: "I recently started using Quickreply, and I must say, it has transformed the way I handle messages on my shopify. The app's user-friendly interface and efficient features make communication a breeze. What really stood out, though, was the exceptional customer service provided by <span class='highlight'>Utkarsh</span>. <span class='highlight'>Utkarsh</span>'s quick attention to our requests made our experience with Quickreply even more enjoyable. It's rare to find such a dedicated and responsive support team member. He not only addressed our concerns promptly but also went the extra mile to ensure that we felt valued as users. The app itself is a game-changer, streamlining the process of CTWA Ads and keeping conversations organized. Quickreply has become an integral part of my daily routine, and I highly recommend it to anyone looking for a reliable messaging solution. Big shoutout to <span class='highlight'>Utkarsh</span> and the Quickreply team for their commitment to customer satisfaction and for creating a fantastic application. Keep up the great work!"
    },
    {
      client: "PERFECTSTYLESTORE-IN",
      country: "India",
      duration: "8 days using the app",
      date: "November 23, 2022",
      rating: 5,
      quote: "The app has been a complete game changer for our business. Not only it has reduced the boring manual work for us but also generated extra revenue on complete automation. Within just 2 days of using this app i could already see the difference in increase in sales and reduction in non delivereds. Their team has been very helpful and prompt with all the queries that we had. I would specially like to thank <span class='highlight'>Utkarsh</span> for really being so supportive looking after us. Lastly i would highly recommend this app to everyone who would like to increase their revenue and profits."
    }
  ]
};
