import React from "react";
import { ContactCTA } from "../components/ContactCTA";

export const Connect: React.FC = () => {
  return (
    <main style={{ paddingTop: "calc(var(--header-height) + 40px)" }}>
      <ContactCTA />
    </main>
  );
};
