import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './advanced.js',
  dest: './advanced.compiled.js',
  format: 'iife',
  globals: {
    window: 'window'
  },
  external: ['window'],
  plugins: [nodeResolve({ skip: ['window'] }), commonjs({ exclude: ['window'] })]
}
