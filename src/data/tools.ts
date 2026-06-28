export interface Tool {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  skillLevel: string;
  pricing: string;
  example: string;
  languages: string[];
  url: string;
  scope: "global" | "local";
}

export const toolCategories = [
  "All Categories",
  "Text & Writing AI",
  "Image Generation AI",
  "Voice & Audio AI",
  "Business & Productivity AI",
  "Content Generation",
];

export const skillLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export const pricingOptions = ["All Pricing", "Free", "Freemium", "Paid"];
