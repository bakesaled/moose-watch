import localResolve from 'rollup-plugin-local-resolve';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'dist-lib/public-api.js',
  output: {
    file: 'dist-lib/bundles/index.umd.js',
    format: 'umd',
    sourcemap: true,
    name: 'moose-watch',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      '@angular/platform-browser': 'ng.platform-browser',
      '@angular/flex-layout': 'ng.flex-layout',
      'rxjs/Observable': 'Rx',
      'rxjs/ReplaySubject': 'Rx',
      'rxjs/add/operator/map': 'Rx.Observable.prototype',
      'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
      'rxjs/add/observable/fromEvent': 'Rx.Observable',
      'rxjs/add/observable/of': 'Rx.Observable'
    },
  },
  external: [ '@angular/core', 'rxjs', '@angular/common', '@angular/platform-browser', '@angular/flex-layout'],
  plugins: [
    localResolve(),
    nodeResolve({ jsnext: true, main: true })
  ]
}
