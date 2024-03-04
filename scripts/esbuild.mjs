import {build} from 'esbuild';
import {lessLoader} from 'esbuild-plugin-less';

build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
  format: 'esm',
  bundle: true,
  minify: true,
  sourcemap: false,
  plugins: [lessLoader()],
  external: ['ahooks', 'react', '@tarojs/components', '@tarojs/react', '@tarojs/taro'],
});
