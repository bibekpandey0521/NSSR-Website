import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import path from 'node:path';
import fs from 'node:fs';

const from = path.resolve('assets/css/input.css');
const to   = path.resolve('assets/css/tailwind.css');
const css  = fs.readFileSync(from, 'utf8');
const res  = await postcss([tailwindcss(), autoprefixer()]).process(css, { from, to });
fs.writeFileSync(to, res.css, 'utf8');
console.log('wrote', to, res.css.length, 'bytes');
