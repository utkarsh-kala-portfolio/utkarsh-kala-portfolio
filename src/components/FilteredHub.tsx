import React, { useState, useEffect } from "react";
import { SectionHeader } from "./SectionHeader";

export interface HubCategory {
  id: string;
  name: string;
  items: string[];
}

interface FilteredHubProps {
  tagText: string;
  title: string;
  subtitle?: string;
  description: string;
  searchPlaceholder: string;
  categories: HubCategory[];
  renderCard: (item: string) => React.ReactNode;
  noteText?: string;
  children?: React.ReactNode;
}

export const FilteredHub: React.FC<FilteredHubProps> = ({
  tagText,
  title,
  subtitle,
  description,
  searchPlaceholder,
  categories,
  renderCard,
  noteText,
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  // Re-run scroll reveals on state updates (search/category changes can add elements)
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [searchQuery, activeCategoryId]);

  // Extract all unique items sorted alphabetically for the "All" view
  const allUniqueItems = Array.from(
    new Set(categories.flatMap((cat) => cat.items))
  ).sort((a, b) => a.localeCompare(b));

  // Determine items based on category selection and search query
  const getFilteredItems = () => {
    let baseItems: string[];
    if (activeCategoryId === "all") {
      baseItems = allUniqueItems;
    } else {
      const activeCat = categories.find((cat) => cat.id === activeCategoryId);
      baseItems = activeCat ? [...activeCat.items].sort((a, b) => a.localeCompare(b)) : [];
    }

    if (!searchQuery.trim()) return baseItems;
    return baseItems.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  };

  const filteredItems = getFilteredItems();

  return (
    <main style={{ paddingTop: "calc(var(--header-height) + 40px)" }}>
      {/* Header Banner */}
      <section className="section" style={{ paddingBottom: "30px" }}>
        <div className="container">
          <SectionHeader
            tagText={tagText}
            title={title}
            subtitle={subtitle}
            description={description}
            isMainHeader={true}
            className="active"
          />
        </div>
      </section>

      {/* Render optional extra content */}
      {children}

      {/* Main Interactive Hub Section */}
      <section className="section" style={{ paddingTop: "0", paddingBottom: "80px" }}>
        <div className="container">
          <div className="hub-container">
            {/* Sidebar Filters */}
            <div className="hub-sidebar reveal active">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hub-search-input"
              />

              <div className="hub-categories-list">
                {/* All category button */}
                <button
                  onClick={() => setActiveCategoryId("all")}
                  className={`hub-category-btn ${activeCategoryId === "all" ? "active" : ""}`}
                >
                  <span>All</span>
                  <span className="hub-category-count">{allUniqueItems.length}</span>
                </button>

                {/* Individual category buttons */}
                {categories.map((cat) => {
                  const catItemCount = cat.items.length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={`hub-category-btn ${activeCategoryId === cat.id ? "active" : ""}`}
                    >
                      <span>{cat.name}</span>
                      <span className="hub-category-count">{catItemCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hub Results Main View */}
            <div className="hub-main reveal active">
              {filteredItems.length > 0 ? (
                <div className="hub-grid">
                  {filteredItems.map((item) => (
                    <React.Fragment key={item}>
                      {renderCard(item)}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="hub-empty">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: "16px", color: "var(--accent-coral)" }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <line x1="8" x2="14" y1="11" y2="11" />
                  </svg>
                  <h4>No matches found</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    Try adjusting your search keywords or choosing a different category.
                  </p>
                </div>
              )}
            </div>
          </div>

          {noteText && (
            <p className="portfolio-note reveal active" style={{ marginTop: "40px" }}>
              {noteText}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};
