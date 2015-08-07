!function(){"use strict";function t(t){return function(){return s.src(["./package.json","./bower.json"]).pipe(g({type:t})).pipe(s.dest("./"))}}function e(){return JSON.parse(f.readFileSync("package.json","utf8")).version}var s=require("gulp"),r=require("gulp-less"),i=require("gulp-sourcemaps"),p=require("gulp-uglify"),u=require("gulp-csso"),a=require("gulp-jshint"),n=require("jshint-stylish"),c=require("gulp-jscs"),o=require("gulp-spawn-mocha"),l=require("gulp-tar"),m=require("gulp-gzip"),g=require("gulp-bump"),d=require("gulp-git"),h=require("gulp-shell"),f=require("fs"),j=require("gulp-sequence");s.task("less",function(){return s.src("./*.less").pipe(i.init()).pipe(r()).pipe(u()).pipe(i.write("./")).pipe(s.dest("./dist"))}),s.task("lint",function(){return s.src("**/*.js").pipe(a()).pipe(a.reporter(n))}),s.task("jscs",function(){return s.src("**/*.js").pipe(c())}),s.task("test",function(){return s.src("test/*.js",{read:!1}).pipe(o({reporter:"list",timeout:1e4,require:"test/support/setup.js"}))}),s.task("bump-patch",t("patch")),s.task("bump-minor",t("minor")),s.task("bump-major",t("major")),s.task("js",["lint","jscs"],function(){return s.src("./angular-chart.js").pipe(i.init()).pipe(p()).pipe(i.write("./")).pipe(s.dest("./dist"))}),s.task("build",function(){return s.src(["dist/*","!./dist/*.tar.gz"]).pipe(l("angular-chart.js.tar")).pipe(m({gzipOptions:{level:9}})).pipe(s.dest("dist/"))}),s.task("update",function(t){f.readFile("./examples/charts.template.html","utf8",function(s,r){return s?t(s):(r=r.replace("<!-- version -->",e()),void f.writeFile("./examples/charts.html",r,t))})}),s.task("git-commit",function(){var t=e();s.src(["./dist/*","./package.json","./bower.json","./examples/charts.html"]).pipe(d.add()).pipe(d.commit(t))}),s.task("git-push",function(t){var s=e();d.push("origin","master",function(e){return e?t(e):void d.tag(s,s,function(e){return e?t(e):void d.push("origin","master",{args:"--tags"},t)})})}),s.task("npm",h.task(["npm publish"])),s.task("watch",function(){return s.watch("./*.js",["js"]),s.watch("./*.less",["less"]),!0}),s.task("default",j(["less","js"],"test","build")),s.task("check",j(["lint","jscs"],"test")),s.task("deploy-patch",j("default","bump-patch","update","git-commit","git-push","npm")),s.task("deploy-minor",j("default","bump-minor","update","git-commit","git-push","npm")),s.task("deploy-major",j("default","bump-patch","update","git-commit","git-push","npm"))}();