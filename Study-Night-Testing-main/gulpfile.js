import gulp from "gulp";
import shell from "gulp-shell";

gulp.task("default", shell.task(["npx parcel index.html --open"]));

gulp.task("test", shell.task(["node test/navigation.test.js"]));

gulp.task("test", shell.task(["node test/form.test.js"]));
