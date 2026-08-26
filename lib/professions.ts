export type Profession = {
  slug: string;
  name: string;
  service: string;
  unit: string;
  rate: number;
  quantity: number;
};

const professionRows: Array<[string, string, string, string, number, number]> = [
  ["web-developer", "Web Developer", "Responsive website development", "project", 3200, 1],
  ["graphic-designer", "Graphic Designer", "Brand identity design package", "project", 1800, 1],
  ["consultant", "Consultant", "Strategic consulting session", "hours", 175, 8],
  ["photographer", "Photographer", "Commercial photography session", "session", 1450, 1],
  ["copywriter", "Copywriter", "Website copywriting", "pages", 240, 6],
  ["virtual-assistant", "Virtual Assistant", "Executive assistance", "hours", 45, 20],
  ["marketing-consultant", "Marketing Consultant", "Go-to-market strategy", "project", 2800, 1],
  ["social-media-manager", "Social Media Manager", "Monthly social media management", "month", 1500, 1],
  ["video-editor", "Video Editor", "Brand video editing", "video", 850, 2],
  ["ui-ux-designer", "UI/UX Designer", "Product UX and interface design", "project", 4200, 1],
  ["software-engineer", "Software Engineer", "Application engineering", "hours", 150, 40],
  ["mobile-app-developer", "Mobile App Developer", "Mobile application sprint", "sprint", 5000, 1],
  ["seo-specialist", "SEO Specialist", "Technical SEO audit", "audit", 1900, 1],
  ["content-writer", "Content Writer", "Long-form editorial article", "article", 450, 4],
  ["translator", "Translator", "Professional document translation", "words", 0.18, 5000],
  ["illustrator", "Illustrator", "Custom editorial illustration", "illustration", 650, 3],
  ["accountant", "Accountant", "Monthly bookkeeping services", "month", 950, 1],
  ["bookkeeper", "Bookkeeper", "Bookkeeping and reconciliation", "month", 700, 1],
  ["business-coach", "Business Coach", "Business coaching program", "session", 300, 6],
  ["life-coach", "Life Coach", "Private coaching session", "session", 180, 4],
  ["interior-designer", "Interior Designer", "Interior design concept", "project", 3500, 1],
  ["architect", "Architect", "Architectural concept design", "phase", 6500, 1],
  ["lawyer", "Independent Lawyer", "Legal advisory services", "hours", 325, 6],
  ["paralegal", "Freelance Paralegal", "Legal research and drafting", "hours", 85, 12],
  ["recruiter", "Independent Recruiter", "Candidate sourcing engagement", "project", 2400, 1],
  ["hr-consultant", "HR Consultant", "People operations advisory", "hours", 160, 10],
  ["data-analyst", "Data Analyst", "Business intelligence analysis", "project", 2800, 1],
  ["data-scientist", "Data Scientist", "Predictive analytics model", "project", 6500, 1],
  ["cybersecurity-consultant", "Cybersecurity Consultant", "Security assessment", "assessment", 4800, 1],
  ["cloud-consultant", "Cloud Consultant", "Cloud architecture review", "project", 3600, 1],
  ["devops-engineer", "DevOps Engineer", "CI/CD infrastructure setup", "project", 5200, 1],
  ["product-manager", "Fractional Product Manager", "Product strategy sprint", "sprint", 4000, 1],
  ["project-manager", "Freelance Project Manager", "Project delivery management", "week", 1800, 2],
  ["event-planner", "Event Planner", "Event planning and coordination", "event", 3200, 1],
  ["wedding-planner", "Wedding Planner", "Wedding planning package", "event", 4500, 1],
  ["personal-trainer", "Personal Trainer", "Private training session", "session", 95, 10],
  ["yoga-instructor", "Yoga Instructor", "Private yoga class", "class", 120, 8],
  ["music-producer", "Music Producer", "Track production and mixing", "track", 1200, 3],
  ["voice-over-artist", "Voice-over Artist", "Commercial voice-over recording", "project", 900, 1],
  ["podcast-editor", "Podcast Editor", "Podcast editing and mastering", "episode", 280, 4],
  ["3d-artist", "3D Artist", "3D product visualization", "render", 750, 4],
  ["animator", "Animator", "Motion graphics animation", "minute", 1400, 2],
  ["email-marketer", "Email Marketing Specialist", "Email campaign strategy and build", "campaign", 1200, 2],
  ["brand-strategist", "Brand Strategist", "Brand positioning workshop", "project", 3800, 1],
  ["pr-consultant", "PR Consultant", "Public relations campaign", "month", 2600, 1],
  ["sales-consultant", "Sales Consultant", "Sales process optimization", "project", 3000, 1],
  ["financial-consultant", "Financial Consultant", "Financial planning engagement", "project", 2200, 1],
  ["real-estate-photographer", "Real Estate Photographer", "Property photography package", "property", 550, 3],
  ["drone-photographer", "Drone Photographer", "Aerial photography session", "session", 950, 1],
  ["makeup-artist", "Makeup Artist", "Editorial makeup service", "booking", 350, 2],
  ["fashion-designer", "Fashion Designer", "Custom collection design", "project", 4000, 1],
  ["online-tutor", "Online Tutor", "Private online tutoring", "hours", 65, 12],
  ["language-teacher", "Language Teacher", "Private language lessons", "lesson", 55, 10],
  ["researcher", "Independent Researcher", "Market research report", "project", 3400, 1],
  ["grant-writer", "Grant Writer", "Grant proposal development", "proposal", 1800, 1],
  ["technical-writer", "Technical Writer", "Product documentation", "pages", 220, 12],
  ["wordpress-developer", "WordPress Developer", "Custom WordPress website", "project", 2800, 1],
  ["shopify-developer", "Shopify Developer", "Shopify store build", "project", 3500, 1],
  ["no-code-developer", "No-Code Developer", "Business workflow application", "project", 3000, 1],
  ["automation-consultant", "Automation Consultant", "Workflow automation setup", "project", 2600, 1],
];

export const professions: Profession[] = professionRows.map(
  ([slug, name, service, unit, rate, quantity]) => ({ slug, name, service, unit, rate, quantity }),
);

export function getProfession(slug: string) {
  return professions.find((profession) => profession.slug === slug);
}
