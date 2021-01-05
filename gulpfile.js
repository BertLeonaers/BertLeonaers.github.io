const { src, dest, parallel, series, watch } = require('gulp');

const gulpPug = require('gulp-pug');

const browserSync = require('browser-sync').create();

const sass        = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

var del = require('del');

function pugToHTML(){
  return src("./pug/**/*.pug")
    .pipe(gulpPug({
      pretty: true,
      title: "Laurelle"
    }))
    .pipe(dest('./generated/'))
}

function sassToCss(){
  return src("./pug/sass/main.sass")
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
      }))
    .pipe(dest('./generated/css'))
    .pipe(browserSync.stream())
}

function js(){
  return src("./pug/js/*.js")
    .pipe(dest('./generated/js'));
}

function pictures(){
  return src("./pug/pictures/*")
    .pipe(dest('./generated/pictures'));
}

function deleteGenerated(){
  return del.sync("./generated");
}

exports.default = function() {
  //deleteGenerated();
  sassToCss();
  pugToHTML();
  js();
  pictures();
  browserSync.init({
    server: {
      baseDir: './generated'
    }
  })
  watch('./pug/**/*.pug').on('change', series(pugToHTML, browserSync.reload))
  watch('./pug/sass/*.sass').on('change', sassToCss, browserSync.reload)
  watch('./pug/js/*.js').on('change', js, browserSync.reload)
  watch('./pug/pictures/**/*').on('change', pictures, browserSync.reload)
};