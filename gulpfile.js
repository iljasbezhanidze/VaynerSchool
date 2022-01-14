const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

//плагины
const fileInclude = require('gulp-file-include');
const sass = require('gulp-dart-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const mediaQueries = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

//обработка html
const html = () => {
    return src('./src/*.html')
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(fileInclude())
        .pipe(dest('./dist'))
        .pipe(browserSync.stream());
}

//обработка стилей
const styles = () => {
    return src('./src/scss/main.{scss, saas}', {
            sourcemaps: true
        })
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', notify.onError()))
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(mediaQueries())
        .pipe(dest('./dist', {
            sourcemaps: true
        }))
        .pipe(browserSync.stream());
}


//скрипты
const scripts = () => {
    return src('./src/js/main.js', {
            sourcemaps: true
        })
        .pipe(concat('main.min.js'))
        .pipe(dest('./dist', {
            sourcemaps: true
        }))
        .pipe(browserSync.stream());
}

//переносим картинки в dist
const images = () => {
    return src('./src/img/**.*')
        .pipe(dest('./dist/img'))
}

//перезапись папки dist при релоаде
const clear = () => {
    return del('./dist')
}

//live сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

//наблюдение за изменениями в файлах
const watcher = () => {
    watch('./src/**/*.html', html)
    watch(['./src/**/*.scss', './#src/**/*.sass', './#src/**/*.css'], styles)
    watch('./src/js/*.js', scripts)
    watch('./src/img/**.*', images)
}

//задачи
exports.html = html;
exports.watch = watch;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;

//сборка | очередь запуска задач
exports.default = series(
    clear,
    html,
    styles,
    scripts,
    images,
    parallel(watcher, server)
);