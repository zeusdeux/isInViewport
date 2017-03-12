import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './main.js',
  dest: './main.compiled.js',
  format: 'iife',
  globals: {
    window: 'window'
  },
  sourceMap: true,
  external: ['window'],
  plugins: [nodeResolve({ skip: ['window'] }), commonjs({ exclude: ['window'] })]
}
