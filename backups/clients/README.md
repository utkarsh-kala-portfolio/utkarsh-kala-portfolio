# Restore Instructions for /clients Page, Link, and Logo Marquee

> [!IMPORTANT]
> **Do not delete this `backups/clients/` directory.** This folder contains the backup code and precise step-by-step instructions to restore the clients page, navigation headers, page tracking, and logo marquee instances.

To restore this functionality in the future, follow these steps:

---

## 1. Restore the Clients Page Component
Copy `Clients.tsx` from this folder back to `src/pages/`:
```bash
cp backups/clients/Clients.tsx src/pages/Clients.tsx
```

---

## 2. Re-add Routes to `src/App.tsx`
Open [App.tsx](file:///Users/utkarshkala/Documents/GitHub/utkarsh-portfolio/src/App.tsx) and make the following additions:

1. Import the `Clients` component:
   ```typescript
   import { Clients } from "./pages/Clients";
   ```
2. Add the route components within `<Routes>` (lines ~37–39):
   ```tsx
             <Route path="/clients" element={<Clients />} />
             <Route path="/customers" element={<Clients />} />
   ```

---

## 3. Re-add Header Navigation Link to `src/components/Header.tsx`
Open [Header.tsx](file:///Users/utkarshkala/Documents/GitHub/utkarsh-portfolio/src/components/Header.tsx) and insert the navigation link inside the `<nav>` container (around line 144):
```tsx
          <NavLink
            to="/clients"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => {
              setNavOpen(false);
              trackNavClick("Clients Link");
            }}
          >
            <LetterHop text="Clients" />
          </NavLink>
```

---

## 4. Re-add Page Title Mappings in `src/analytics/usePageTracking.ts`
Open [usePageTracking.ts](file:///Users/utkarshkala/Documents/GitHub/utkarsh-portfolio/src/analytics/usePageTracking.ts) and add these entries back to the `PAGE_TITLES` map:
```typescript
  "/clients": "Clients",
  "/customers": "Clients",
```

---

## 5. Re-add Client Marquee and CTA to `src/pages/Home.tsx`
Open [Home.tsx](file:///Users/utkarshkala/Documents/GitHub/utkarsh-portfolio/src/pages/Home.tsx):

1. Import the logo banner variables at the top of the file:
   ```typescript
   import {
     customerBannerDurationSeconds,
     customerBannerLogos,
     // ... other existing imports ...
   } from "../data/logoBanners";
   ```
2. Re-add the section header, marquee, and CTA inside the "SaaS Toolkit Preview" section container (around line 345):
   ```tsx
          <SectionHeader
            tagText="Trusted by Teams That Scale"
            style={{ marginTop: "56px", marginBottom: "24px" }}
          />

          <LogoMarquee
            logos={customerBannerLogos}
            animationDurationSeconds={customerBannerDurationSeconds}
          />

          <SectionCTA to="/clients" text="View All Clients" />
   ```

---

## 6. Re-add Client Marquee and CTA to `src/pages/SaaSToolkit.tsx`
Open [SaaSToolkit.tsx](file:///Users/utkarshkala/Documents/GitHub/utkarsh-portfolio/src/pages/SaaSToolkit.tsx):

1. Import the logo banner variables at the top of the file:
   ```typescript
   import {
     customerBannerDurationSeconds,
     customerBannerLogos,
     // ... other existing imports ...
   } from "../data/logoBanners";
   ```
2. Re-add the marquee and CTA block at the bottom of the page container, above the `<ContactCTA />` (around line 107):
   ```tsx
      {/* Client Logo Banner below the filtered list */}
      <LogoMarquee
        logos={customerBannerLogos}
        title="Trusted by Growth Brands"
        animationDurationSeconds={customerBannerDurationSeconds}
      />

      {/* CTA to view complete clients */}
      <SectionCTA
        to="/clients"
        text="View All Clients"
        style={{ marginTop: "-10px", marginBottom: "60px" }}
        className="active"
      />
   ```
