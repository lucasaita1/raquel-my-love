export const NAV = {
    root: "site-nav",
    logo: "nav-logo",
    linkHero: "nav-link-hero",
    linkJourney: "nav-link-journey",
    linkMusic: "nav-link-music",
    linkStory: "nav-link-story",
};

export const HERO = {
    section: "hero-section",
    image: "hero-image",
    title: "hero-title",
    subtitle: "hero-subtitle",
    scrollHint: "hero-scroll-hint",
    miniPolaroid: "hero-mini-polaroid",
    adultPolaroid: "hero-adult-polaroid",
    intro: "hero-intro",
};

export const JOURNEY = {
    section: "journey-section",
    title: "journey-title",
    step: (i) => `journey-step-${i}`,
    year: "journey-year",
};

export const MUSIC = {
    section: "music-section",
    title: "music-title",
    gallery: "music-gallery",
    card: (i) => `music-card-${i}`,
    marquee: "music-marquee",
};

export const STORY = {
    section: "story-section",
    title: "story-title",
    letter: "story-letter",
    reveal: "story-lucas-reveal",
    chapter: (i) => `story-chapter-${i}`,
};

export const FOOTER = {
    root: "site-footer",
};

// Kept for backward compatibility
export const HOME = {
    emergentLink: "emergent-link",
};
