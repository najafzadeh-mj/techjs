
/**
 * ----------------------------------------------------------------------------
 * Tech.js Build Script
 * build.mjs
 * ----------------------------------------------------------------------------
 * Generates:
 *   dist/tech.js
 *   dist/tech.min.js
 *   dist/tech.min.js.map
 * ----------------------------------------------------------------------------
 */

import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';

// ----------------------------------------------------------
// Ensure dist folder exists
// ----------------------------------------------------------

mkdirSync('dist', { recursive: true });

// ----------------------------------------------------------
// Source files (order is important)
// ----------------------------------------------------------

const entryPoint = 'src/tech.js';

// ----------------------------------------------------------
// Development bundle
// ----------------------------------------------------------

await build({

    entryPoints: [entryPoint],

    outfile: 'dist/tech.js',

    bundle: true,

    format: 'iife',

    globalName: 'Tech',

    target: ['es2018'],

    sourcemap: true,

    minify: false,

    banner: {
        js: `/*!
 * Tech.js v1.0.0-alpha
 * Copyright (c) 2026
 * Released under the MIT License
 */`
    }

});

// ----------------------------------------------------------
// Production bundle
// ----------------------------------------------------------

await build({

    entryPoints: [entryPoint],

    outfile: 'dist/tech.min.js',

    bundle: true,

    format: 'iife',

    globalName: 'Tech',

    target: ['es2018'],

    sourcemap: true,

    minify: true,

    legalComments: 'none',

    banner: {
        js: `/*! Tech.js v1.0.0-alpha | MIT License */`
    }

});

console.log('✅ Build completed successfully');
console.log('   dist/tech.js');
console.log('   dist/tech.min.js');
console.log('   dist/tech.min.js.map');
