import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const name = 'index'

export default {
  input: 'src/index.js',
  output: [{
    format: 'umd',
    name,
    file: `lib/${name}.umd.js`
  }, {
    format: 'es',
    file: `lib/${name}.es.mjs`
  }, {
    format: 'cjs',
    moduleName: name,
    file: `lib/${name}.js`
  }],
  plugins: [
    nodeResolve({
      main: true,
      jsnext: true,
      browser: true,
    }),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
}
