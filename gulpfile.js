const { src, dest, parallel, series, watch } = require('gulp');

const jade = require('gulp-jade');

function jadeToHTML(){
    return src("./jade/**/*.jade")
      .pipe(jade())
      .pipe(dest('./'))
  }

exports.default = function() {
    watch('./jade/**/*.jade').on('change', jadeToHTML)
  };