mv dist/js/app.*.js dist/js/app.js
mv dist/js/app.*.js.map dist/js/app.js.map
mv dist/js/chunk-vendors.*.js dist/js/chunk-vendors.js
mv dist/js/chunk-vendors.*.js.map dist/js/chunk-vendors.js.map
mv dist/css/chunk-vendors.*.css dist/css/chunk-vendors.css

perl -pi -e 's/[0-9a-f]{8}\.(?=(js|css))//g' dist/index.html
