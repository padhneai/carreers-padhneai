// utils/formatPosition.ts
export function formatPosition(slug: string) {
  if (!slug) return "";
  // Replace dashes/underscores with space, capitalize each word
  return slug
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Example
// console.log(formatPosition("frontend-developer-intern")); 
// Output: "Frontend Developer Intern"
