const { src, dest, parallel, series, watch } = require('gulp');

const gulpPug = require('gulp-pug');

function pugToHTML(){
    return src("./pug/**/*.pug")
      .pipe(gulpPug({
        pretty: true
      }))
      .pipe(dest('./'))
  }

exports.default = function() {
  pugToHTML()
  watch('./pug/**/*.pug').on('change', pugToHTML)
};