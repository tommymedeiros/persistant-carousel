/* gulpfile.js
 * by Tommy Medeiros
 * 2016 */

var concat        = require("gulp-concat"),
    gulp          = require("gulp"),
    gutil         = require("gulp-util"),
    imagemin      = require("gulp-imagemin"),
    haml          = require("gulp-ruby-haml"),
    plumber       = require("gulp-plumber"),
    pngquant      = require("imagemin-pngquant"),
    sass          = require("gulp-ruby-sass"),
    uglify        = require("gulp-uglify"),
    path          = {
            haml: ["haml/**/*"],
            sass: ["sass/**/*"],
          images: ["images/**/*"],
              js: "js/main.js",
           local: "../"
    },
    onError = function(err) {
      gutil.beep();
      console.log(err);
    };

// Compiles Haml
gulp.task("haml", function() {
  return gulp.src(path.haml)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(haml())
    .pipe(gulp.dest(path.local));
});

// Compiles Sass and optimizes the CSS
gulp.task("sass", function() {
  return sass(path.sass)
    // .on("error", sass.logError)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat("main.css"))
    .pipe(gulp.dest(path.local + "css"));
  // return gulp.src(path.sass)
  //   .pipe(plumber({
  //     errorHandler: onError
  //   }))
  //   .pipe(sass({
  //     cacheLocation: "sass_cache",
  //     style: "compressed",
  //     sourcemap: false,
  //     trace: true
  //   }))
  //   .pipe(concat("main.css"))
  //   .pipe(gulp.dest(path.local + "css"));
});

// Optimizes and concats the JavaScript
gulp.task("js", function() {
  return gulp.src(path.js)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(path.local + "js"));
});

// Optimizes the images
gulp.task("images", function() {
  return gulp.src(path.images)
    .pipe(plumber({
      errorHandler: onError
    }))
    // .pipe(cached("gulp_cache"))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.local + "images"));
});

// Watches and run tasks
gulp.task("watch", function() {
    gulp.watch(path.haml, ["haml"]);
    gulp.watch(path.sass, ["sass"]);
    gulp.watch(path.js, ["js"]);
    gulp.watch(path.images, ["images"]);
  }
);

// Default task
gulp.task("default", ["haml",
                      "sass",
                      "js",
                      "images",
                      "watch"]);
