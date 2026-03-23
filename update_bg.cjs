const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace bg-brand-100 with bg-white in section tags
content = content.replace(/<section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-brand-100">/g, '<section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white">');
content = content.replace(/<section className="py-24 bg-brand-100">/g, '<section className="py-24 bg-white">');
content = content.replace(/<section id="tratamentos" className="py-24 bg-brand-100">/g, '<section id="tratamentos" className="py-24 bg-white">');
content = content.replace(/<section id="como-funcionamos" className="py-24 bg-brand-100 relative overflow-hidden">/g, '<section id="como-funcionamos" className="py-24 bg-white relative overflow-hidden">');
content = content.replace(/<section id="resultados" className="py-24 bg-brand-100">/g, '<section id="resultados" className="py-24 bg-white">');

// Also update the main container
content = content.replace(/<div className="min-h-screen bg-brand-100 font-sans/g, '<div className="min-h-screen bg-white font-sans');

fs.writeFileSync('src/App.tsx', content);
console.log('Backgrounds updated.');
