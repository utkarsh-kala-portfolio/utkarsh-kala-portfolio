import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const tsFilePath = path.join(__dirname, "../src/data/portfolioData.ts");
const tempJsPath = path.join(__dirname, "temp-portfolio-data.js");
const outputPath = path.join(__dirname, "../portfolio_export.md");

// Read TS file
let tsContent = fs.readFileSync(tsFilePath, "utf8");

// Extract PORTFOLIO_DATA object
const startIdx = tsContent.indexOf("export const PORTFOLIO_DATA");
if (startIdx === -1) {
  console.error("Could not find PORTFOLIO_DATA in portfolioData.ts");
  process.exit(1);
}

let jsDataPart = tsContent.slice(startIdx);
// Remove type annotation ': PortfolioData'
jsDataPart = jsDataPart.replace(": PortfolioData", "");

// Write temp file
fs.writeFileSync(tempJsPath, jsDataPart + "\nexport default PORTFOLIO_DATA;");

try {
  // Import dynamically
  const { default: PORTFOLIO_DATA } = await import("./temp-portfolio-data.js");

  // Build Markdown
  let md = `# Utkarsh Kala - Portfolio & Professional Background Export\n\n`;
  md += `This document compiles Utkarsh Kala's professional background, experience, technical stack, case studies, and recommendations into a single, cohesive file optimized for LLM (ChatGPT) ingestion.\n\n`;

  md += `## 1. Professional Overview\n\n`;
  md += `- **Name**: Utkarsh Kala\n`;
  md += `- **Title**: Business Systems Architect | Product Adoption | AI Workflow Automation | Revenue Strategy\n`;
  md += `- **Bio**: I help SaaS companies convert customer signals into workflows, integrations, AI systems, and measurable revenue outcomes — by bridging business strategy, product thinking, technical execution, and customer intelligence.\n`;
  md += `- **Key Metrics**:\n`;
  md += `  - **ARR Influenced**: $2.5M+\n`;
  md += `  - **Average NRR**: 120%\n`;
  md += `  - **Gross Churn**: <2%\n`;
  md += `  - **MRR Expansion**: $50K+\n`;
  md += `  - **Accounts Overseen**: 900+\n`;
  md += `  - **Support Operations Efficiency**: +40% increase\n`;
  md += `- **Core Methodology (The "Kala Jaadu" Effect)**:\n`;
  md += `  - Teammates nicknamed him "Kala Jaadugar" (The Black Magician) because complex business, integration, and operational challenges had a pattern: they would turn into scalable systems, automated workflows, and measurable revenue outcomes.\n`;
  md += `  1. *Diagnose Before Designing*: Understand the business problem, broken workflow, stakeholder pain, APIs, data movement, ownership gaps, and measurable outcome before building.\n`;
  md += `  2. *Translate Business Into Workflows*: Convert customer requirements into product opportunities, technical workflows, integration logic, adoption journeys, or operating models.\n`;
  md += `  3. *Automate What Doesn't Scale*: Build repeatable triggers, dashboards, health scores, recovery workflows, SLA systems, playbooks, and AI-assisted processes.\n`;
  md += `  4. *Own Outcomes End-to-End*: Operate across Product, Engineering, Revenue, CS, Support, and enterprise stakeholders until the solution creates measurable business impact.\n`;
  md += `  5. *Scale the System*: Turn one-off fixes into reusable frameworks, product feedback loops, onboarding models, customer intelligence systems, and revenue workflows.\n\n`;

  md += `## 2. Professional Journey & Timeline\n\n`;
  PORTFOLIO_DATA.journeyItems.forEach((item) => {
    md += `### ${item.title} (${item.date})\n`;
    md += `- **Location**: ${item.location}\n`;
    md += `- **Description**: ${item.description}\n\n`;
  });

  md += `## 3. Systems I've Built\n\n`;
  PORTFOLIO_DATA.automations.forEach((item) => {
    md += `### ${item.title}\n`;
    md += `- **Challenge**: ${item.problem}\n`;
    md += `- **Solution/System**: ${item.system}\n`;
    md += `- **Impact**:\n`;
    item.impact.forEach((imp) => {
      md += `  - ${imp.replace(/\*\*/g, "")}\n`;
    });
    md += `- **Tags**: ${item.tags.join(", ")}\n\n`;
  });

  md += `## 4. SaaS & Technology Toolkit\n\n`;
  md += `Utkarsh has hands-on experience in operating, configuring, and integrating the following systems:\n\n`;
  PORTFOLIO_DATA.stackCategories.forEach((cat) => {
    md += `### ${cat.name}\n`;
    md += `${cat.items.join(", ")}\n\n`;
  });

  md += `## 5. Client Portfolio & Brand Experience\n\n`;
  md += `Below is a representation of brands and industries supported:\n\n`;
  PORTFOLIO_DATA.clientPortfolio.forEach((cat) => {
    md += `### ${cat.industry}\n`;
    md += `${cat.brands.join(", ")}\n\n`;
  });

  md += `## 6. Recommendations & Testimonials\n\n`;
  md += `### LinkedIn Recommendations\n\n`;
  PORTFOLIO_DATA.recommendations.forEach((item) => {
    const cleanQuote = item.quote.replace(/<br\s*\/?>/gi, "\n").replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
    md += `**${item.author}** - *${item.role}*\n`;
    md += `> "${cleanQuote}"\n\n`;
  });

  md += `### Shopify App Store Testimonials\n\n`;
  PORTFOLIO_DATA.testimonials.forEach((item) => {
    const cleanQuote = item.quote.replace(/<br\s*\/?>/gi, "\n").replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
    md += `**${item.client}** (${item.country}) - ${"★".repeat(item.rating)}\n`;
    md += `> "${cleanQuote}"\n\n`;
  });

  md += `## 7. Contact & Reference Links\n\n`;
  md += `- **Email**: utkarsh.kala.9@gmail.com\n`;
  md += `- **LinkedIn**: [utkarshkala](https://www.linkedin.com/in/utkarshkala/)\n`;
  md += `- **WhatsApp**: [+91 9634687270](https://wa.me/919634687270)\n`;
  md += `- **Website**: [utkarshkala.in](https://utkarshkala.in)\n`;
  md += `- **PDF CV**: [Download CV (PDF)](https://utkarshkala.in/Utkarsh_Kala_CV.pdf)\n`;

  fs.writeFileSync(outputPath, md);
  console.log("Successfully generated portfolio_export.md!");
} catch (err) {
  console.error("Error during generation:", err);
} finally {
  // Clean up
  if (fs.existsSync(tempJsPath)) {
    fs.unlinkSync(tempJsPath);
  }
}
