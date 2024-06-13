const { src, dest, parallel, series, watch } = require('gulp');

const gulpPug = require('gulp-pug');

const browserSync = require('browser-sync').create();

const sass        = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

var del = require('del');

var sitemap = require('gulp-sitemap');

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

function pugToHTML(){
  return src(["./pug/**/*.pug", "!./pug/template/*.pug", "!./pug/icons/*.pug", "!./pug/wimpers.pug"])
    .pipe(gulpPug({
      pretty: true,
      title: "Laurelle"
    }))
    .pipe(dest('./generated/'));
}

function sassToCss(cb){
  return src("./pug/sass/main.sass")
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
      }))
    .pipe(dest('./generated/css'))
    .pipe(browserSync.stream());
    cb();
}
function js(){
  return src("./pug/js/*.js")
    .pipe(dest('./generated/js'));
}

function pictures(){
  return src("./pug/pictures/**/*")
    .pipe(dest('./generated/pictures'));
}

function generateSitemap(){
  return src('generated/**/*.html', {
    read: false
})
.pipe(sitemap({
    siteUrl: 'bertleonaers.github.io'
}))
.pipe(dest('./generated'));
}

function doBrowsersync(){
  browserSync.init({
    server: {
      baseDir: './generated'
    }
  })
}

function watchFiles(){
  watch('./pug/**/*.pug').on('change', series(pugToHTML, browserSync.reload))
  watch('./pug/sass/*.sass').on('change', sassToCss, browserSync.reload)
  watch('./pug/js/*.js').on('change', js, browserSync.reload)
  watch('./pug/pictures/**/*').on('change', pictures, browserSync.reload)
}

exports.default = series(parallel(pugToHTML, sassToCss, js, pictures), generateSitemap, parallel(watchFiles, doBrowsersync))