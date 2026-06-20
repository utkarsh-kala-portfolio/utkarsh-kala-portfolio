import React from "react";
import { Link } from "react-router-dom";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ContactCTA } from "../components/ContactCTA";
import { FilteredHub, type HubCategory } from "../components/FilteredHub";
import { LogoMarquee } from "../components/LogoMarquee";
import {
  customerBannerDurationSeconds,
  customerBannerLogos,
} from "../data/logoBanners";

const LayersIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--accent-green)" }}
  >
    <path d="m12 3-10 5 10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);

const getStackIcon = (itemName: string): string | null => {
  const name = itemName.toLowerCase().trim();

  // QuickReply.ai direct integrations logo URLs
  const quickReplyLogos: { [key: string]: string } = {
    "blaze": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/686244615008fda2385c81a0_Frame%202087327305.svg",
    "breeze": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fc298489d35b1a7143_68531aa9d740f3473a10a333_Integration%2520Components-10.png",
    "cashfree": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fc71d0b7f24e560b5b_68531cec3c76470b032d3259_Integration%2520Components-23.png",
    "clickpost": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fd7256899fceadd547_68531e6c36a77506f379e124_Integration%2520Components-28.png",
    "delhivery": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fdda7f6f17b98456c3_68531f5259da870e33ae2a27_Integration%2520Components-25.png",
    "ecom 360": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fc7508e794c64c6cdb_68531951090ce765709bbdac_Integration%2520Components-5.png",
    "freshdesk": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fd21cc07c970e24e0c_68531bdda254fa1e84da3bd0_Integration%2520Components-15.png",
    "go high level": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6944f4fbb411be1667de0c08_6858ea025ea41ad531962f15_68531b21a8a4bffb54001a89_Integration%252520Components-11.png.svg",
    "gokwik": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fd4497f1531a379f1e_6853189883db84b419169048_Integration%2520Components-3.png",
    "google analytics 4": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fd70dc91488d7c8e8a_685317b32c6ebcbb5cf1f034_Integration%2520Components-1.png",
    "hubspot": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fe3c5b583be20afd39_68531bb7c8d9b12af7816fe4_Integration%2520Components-14.png",
    "judge.me": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fe8e3557f75c4197e8_68531c294907fe5957ddc168_Integration%2520Components-17.png",
    "kylas": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fe83ef107dfcb88445_68531b68683438882d34a36b_Integration%2520Components-12.png",
    "leadsquared": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fe82937600c778ddba_68531b8de6f78641cb3ccd95_Integration%2520Components-13.png",
    "loox": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9fe246b0a1471b38f9d_68531c49fa12139e15545b77_Integration%2520Components-18.png",
    "meta pixel": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9ffa0610fb044a0fd50_6853184905caa14bf47c9d50_Integration%2520Components-2.png",
    "nector": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9ffea792b6f10fc4266_68531c599198c770296d134d_Integration%2520Components-19.png",
    "nimbus post": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9ff4511dbaa7613f571_68531d0178b1e1c398d2ecb1_Integration%2520Components-24.png",
    "nitro": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6a105b54f152b2cee688a1a3_CNmKwbC8zYwDEAE%3D.webp",
    "payu": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9ff24961583aa730eca_68531cc3cddabfac468424f5_Integration%2520Components-22.png",
    "pipedream": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6944f358b81d4d184b023462_6858ea0026aefbfebac4263a_68531a72f1db0ca94f2d32e4_Integration%252520Components-9.png.svg",
    "proviews": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858e9ff7be5710475a07225_68531c89cb60a11d5233953d_Integration%2520Components-20.png",
    "razorpay": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea00a0610fb044a0fe2b_68531a72f1db0ca94f2d32e4_Integration%2520Components-9.png",
    "razorpay magic": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea0026aefbfebac4263a_68531a72f1db0ca94f2d32e4_Integration%2520Components-9.png",
    "salesforce": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6944f66afc5c69562ce95569_lk09xsr45salesforce.svg",
    "shipio": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6864d54099c13a002e00f2bd_Frame%202087327216.svg",
    "shiprocket": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea005af7daf5480c578e_6853197b2aebbbe1848cfc54_Integration%2520Components-6.png",
    "shopflo": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea016a8c5fed9e687e76_685318f8d6c7efeb32b3d168_Integration%2520Components-4.png",
    "simpl": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea01246b0a1471b3905f_68531a3c4bc759f61397b7ee_Integration%2520Components-8.png",
    "swift": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea0147a62456be39df29_685319e678b1e1c398d1337c_Integration%2520Components-7.png",
    "wareiq": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea014000abfb56546333_68531ec974b37601139f061a_Integration%2520Components-29.png",
    "zapier": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea03749d147775d915e9_685315e86c1abe3107de1fc2_Integration%2520Components.png",
    "zenoti": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6944f4928539031e970398a9_6858ea025ea41ad531962f15_68531b21a8a4bffb54001a89_Integration%252520Components-11.png-1.svg",
    "zoho crm": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea025ea41ad531962f15_68531b21a8a4bffb54001a89_Integration%2520Components-11.png",
    "zoho desk": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/6858ea027a6448b67d72fdca_68531c07fd8350d571a87f3a_Integration%2520Components-16.png",
    "pabbly": "https://cdn.prod.website-files.com/64a7e03d500c505242d97ef0/686396c74cc1d94e3c2b743e_Integration%20Components%201.svg"
  };

  if (quickReplyLogos[name]) {
    return quickReplyLogos[name];
  }

  // Fallback mappings to Simple Icons:
  const mappings: { [key: string]: string } = {
    "shopify": "shopify",
    "woocommerce": "woocommerce",
    "magento": "magento",
    "recharge": "recharge",
    "whatsapp api": "whatsapp",
    "twilio": "twilio",
    "instagram": "instagram",
    "facebook": "facebook",
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
  };

  const slug = mappings[name];
  if (slug) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;
  }
  return null;
};

export const Stack: React.FC = () => {
  // Map stack categories to HubCategory array
  const categories: HubCategory[] = PORTFOLIO_DATA.stackCategories.map((c) => ({
    id: c.id,
    name: c.name,
    items: c.items,
  }));

  const renderCard = (item: string) => {
    const iconUrl = getStackIcon(item);

    /** On image load failure, swap to the fallback icon */
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const wrap = img.closest(".brand-logo-wrap") as HTMLElement | null;
      if (wrap) {
        img.style.display = "none";
        // Only inject fallback once
        if (!wrap.querySelector("svg")) {
          const ns = "http://www.w3.org/2000/svg";
          const svg = document.createElementNS(ns, "svg");
          svg.setAttribute("width", "20");
          svg.setAttribute("height", "20");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2.5");
          svg.setAttribute("stroke-linecap", "round");
          svg.setAttribute("stroke-linejoin", "round");
          svg.style.color = "var(--accent-green)";
          svg.innerHTML = '<path d="m12 3-10 5 10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>';
          wrap.appendChild(svg);
        }
      }
    };

    return (
      <div className="brand-card">
        <div className="brand-logo-wrap">
          {iconUrl ? (
            <img src={iconUrl} alt={item} className="brand-logo-img" onError={handleImgError} />
          ) : (
            <LayersIcon />
          )}
        </div>
        <span className="brand-name-txt">{item}</span>
      </div>
    );
  };

  return (
    <>
      <FilteredHub
        tagText="Integrations & Tools"
        tagColorClass="green"
        title="The Complete SaaS Toolkit"
        description="Every system and technology I have operated and integrated across SaaS, billing, reviews, analytics, messaging, and commerce systems."
        searchPlaceholder="Search tool name..."
        categories={categories}
        renderCard={renderCard}
      >
        {/* Core highlight badges above the filtered list */}
        <section className="section" style={{ paddingBottom: "10px", paddingTop: "0px" }}>
          <div className="container">
            <div className="stack-highlights reveal active" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "30px" }}>
              {PORTFOLIO_DATA.coreStrengths.map((str, idx) => (
                <div key={idx} className={`highlight-badge ${idx % 2 === 0 ? "blue-theme" : "green-theme"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 700 }}>{str.name}</span>
                    <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{str.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </FilteredHub>

      {/* Customer Logo Banner below the filtered list */}
      <LogoMarquee
        logos={customerBannerLogos}
        title="Trusted by Growth Brands"
        animationDurationSeconds={customerBannerDurationSeconds}
      />

      {/* CTA to view complete customers */}
      <div style={{ textAlign: "center", marginTop: "-10px", marginBottom: "60px" }} className="reveal active">
        <Link to="/customers" className="btn btn-secondary">
          View All Customers
        </Link>
      </div>

      <ContactCTA />
    </>
  );
};
