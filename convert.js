const fs = require('fs');

const file = 'CSS/style.css';
let css = fs.readFileSync(file, 'utf8');

// Restore manual tweaks from earlier back to standard clean output
css = css.replace(/width:\s*100%;/g, ''); // we don't want html, body width 100% messing with vw if any leftovers
css = css.replace(/font-size:\s*16px\s*!important;/g, '');

css = css.replace(/(-?\d+(?:\.\d+)?)px/g, (match, num) => {
    let val = parseFloat(num);
    if (Math.abs(val) === 0) return '0vw';
    if (val === 1) return '1px'; // borders
    return (val / 19.2).toFixed(4) + 'vw';
});

// clean up html body leftovers
css = css.replace(/body\s*\{[\s\S]*?overflow-x:\s*hidden;\s*\}/g, 'body { overflow-x: hidden; margin: 0; padding: 0; }');
css = css.replace(/\.page-en,\s*html,\s*body\s*\{[^}]+\}/g, '');

fs.writeFileSync(file, css);
console.log('Converted JS script ran successfully.');
