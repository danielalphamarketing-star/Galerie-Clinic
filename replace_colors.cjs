const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  // Backgrounds
  [/bg-white/g, 'bg-brand-100'],
  [/bg-brand-50\b/g, 'bg-brand-100'],
  [/bg-slate-50\b/g, 'bg-brand-100'],
  [/bg-slate-100\b/g, 'bg-brand-100'],
  [/bg-slate-200\b/g, 'bg-neutral-beige'],
  [/bg-slate-800\b/g, 'bg-secondary-green'],
  [/bg-slate-900\b/g, 'bg-secondary-green'],
  [/bg-black/g, 'bg-secondary-green'],
  [/bg-brand-600\b/g, 'bg-brand-500'],
  [/bg-brand-400\b/g, 'bg-brand-500'],
  [/bg-brand-900\b/g, 'bg-secondary-green'],
  
  // Text
  [/text-white/g, 'text-brand-100'],
  [/text-slate-400\b/g, 'text-secondary-blue'],
  [/text-slate-500\b/g, 'text-neutral-beige'],
  [/text-slate-600\b/g, 'text-neutral-beige'],
  [/text-slate-700\b/g, 'text-secondary-green'],
  [/text-slate-800\b/g, 'text-secondary-green'],
  [/text-slate-900\b/g, 'text-secondary-green'],
  [/text-black/g, 'text-secondary-green'],
  [/text-brand-900\b/g, 'text-secondary-green'],
  [/text-brand-600\b/g, 'text-brand-500'],
  
  // Borders
  [/border-white/g, 'border-brand-100'],
  [/border-slate-50\b/g, 'border-brand-100'],
  [/border-slate-100\b/g, 'border-neutral-beige\/20'],
  [/border-slate-200\b/g, 'border-neutral-beige\/30'],
  [/border-slate-800\b/g, 'border-secondary-green'],
  [/border-slate-900\b/g, 'border-secondary-green'],
  
  // Shadows
  [/shadow-slate-900/g, 'shadow-secondary-green'],
  [/shadow-black/g, 'shadow-secondary-green'],
  
  // WhatsApp Button
  [/bg-\[\#25D366\]/g, 'bg-secondary-green'],
  [/hover:bg-\[\#20bd5a\]/g, 'hover:bg-neutral-beige'],
];

replacements.forEach(([regex, replacement]) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync('src/App.tsx', content);
console.log('Colors replaced successfully.');
