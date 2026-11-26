/* Shared dark-glass inline-SVG artwork (no external images). Owned by the Team Lead. DO NOT EDIT. */
(function () {
  let n = 0;
  const P = {
    pregnancy: { a: '#0B292A', b: '#17494A', icon: 'heart', label: 'High-risk pregnancy care illustration' },
    delivery: { a: '#061A1B', b: '#1E5C55', icon: 'shield', label: 'Delivery care illustration' },
    pcos: { a: '#0B292A', b: '#2A6F66', icon: 'droplet', label: 'Menstrual and hormonal health illustration' },
    fertility: { a: '#17494A', b: '#0B292A', icon: 'sparkles', label: 'Fertility care illustration' },
    surgery: { a: '#061A1B', b: '#17494A', icon: 'scissors', label: 'Laparoscopic surgery illustration' },
    wellness: { a: '#0B292A', b: '#3E9D8C', icon: 'sun', label: 'Screening and menopause illustration' },
    menopause: { a: '#17494A', b: '#061A1B', icon: 'moon', label: 'Menopause care illustration' }
  };

  function cover(key, cls = 'h-full w-full') {
    const p = P[key] || P.wellness, id = 'ac' + (++n);
    const inner = (window.UI && window.UI.icons[p.icon]) || '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="${cls}" role="img" aria-label="${p.label}">
<defs><linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/></linearGradient>
<radialGradient id="${id}b" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#6BE3B3" stop-opacity=".55"/><stop offset="1" stop-color="#6BE3B3" stop-opacity="0"/></radialGradient>
<pattern id="${id}c" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#B8D2D1" stroke-opacity=".08"/></pattern></defs>
<rect width="800" height="450" fill="url(#${id}a)"/><rect width="800" height="450" fill="url(#${id}c)"/>
<circle cx="400" cy="225" r="210" fill="url(#${id}b)"/>
<circle cx="400" cy="225" r="150" fill="none" stroke="#6BE3B3" stroke-opacity=".35" stroke-dasharray="4 10"/>
<circle cx="400" cy="225" r="108" fill="#ffffff" fill-opacity=".07" stroke="#ffffff" stroke-opacity=".25"/>
<g transform="translate(400 225) scale(5.2) translate(-12 -12)" fill="none" stroke="#6BE3B3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
<path d="M40 380L160 330L260 360L380 300" fill="none" stroke="#6BE3B3" stroke-opacity=".55" stroke-width="2"/>
<path d="M430 150L540 110L640 140L760 80" fill="none" stroke="#3E9D8C" stroke-opacity=".8" stroke-width="2"/>
<circle cx="160" cy="330" r="5" fill="#6BE3B3"/><circle cx="380" cy="300" r="5" fill="#6BE3B3"/><circle cx="540" cy="110" r="5" fill="#9BF0CF"/><circle cx="760" cy="80" r="5" fill="#9BF0CF"/>
<rect x="0" y="0" width="800" height="450" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
</svg>`;
  }

  const CH = {
    banani: { a: '#0B292A', b: '#17494A', label: 'Pinecrest Hospital building' },
    mohammadpur: { a: '#061A1B', b: '#1E5C55', label: 'Meridian Medical Centre building' },
    khulshi: { a: '#17494A', b: '#0B292A', label: 'Harbor Care Hospital building' }
  };

  function chamber(id, cls = 'h-full w-full') {
    const p = CH[id] || CH.banani, g = 'ch' + (++n);
    let win = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) win += `<rect x="${236 + c * 64}" y="${150 + r * 54}" width="38" height="30" rx="4" fill="#6BE3B3" fill-opacity="${(r * 5 + c) % 4 === 0 ? '.85' : '.18'}"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="${cls}" role="img" aria-label="${p.label}">
<defs><linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/></linearGradient>
<linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".18"/><stop offset="1" stop-color="#ffffff" stop-opacity=".05"/></linearGradient></defs>
<rect width="800" height="450" fill="url(#${g}a)"/>
<circle cx="650" cy="90" r="40" fill="#6BE3B3" fill-opacity=".55"/><circle cx="650" cy="90" r="70" fill="none" stroke="#6BE3B3" stroke-opacity=".25"/>
<rect x="40" y="250" width="110" height="200" fill="#ffffff" fill-opacity=".06"/><rect x="660" y="230" width="100" height="220" fill="#ffffff" fill-opacity=".06"/>
<rect x="200" y="110" width="400" height="340" rx="10" fill="url(#${g}b)" stroke="#ffffff" stroke-opacity=".3"/>
${win}
<rect x="372" y="364" width="56" height="86" rx="6" fill="#6BE3B3" fill-opacity=".7"/>
<circle cx="400" cy="80" r="26" fill="#6BE3B3"/><path d="M400 66v28M386 80h28" stroke="#082425" stroke-width="7" stroke-linecap="round"/>
<rect x="0" y="430" width="800" height="20" fill="#6BE3B3" fill-opacity=".25"/>
</svg>`;
  }

  function grid(cls = 'h-full w-full text-white/10') {
    const id = 'gd' + (++n);
    return `<svg class="${cls}" aria-hidden="true"><defs><pattern id="${id}" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
  }

  window.Art = { cover, chamber, grid };
})();
