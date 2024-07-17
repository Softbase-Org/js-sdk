import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default [
  // ESM and CommonJS bundles
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/softbase.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/softbase.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
  },
  // UMD bundle for browsers
  {
    input: 'src/index.js',
    output: {
      name: 'softbase',
      file: 'dist/softbase.umd.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
  },
];
