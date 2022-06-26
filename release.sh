mv dist original_dist
mv public/build-stats.json original_build-stats.json
mv public/statoscope-report.html original_statoscope-report.html
cp .patch-version original_patch-version

rm -rf dist/ && APP_VERSION=$(npm run inc_version --silent) APP_ENV=production npm run build && ./deploy/copy_to_dist.sh
rm -rf docs
mv dist docs
cp CNAME docs
cp docs/index.html docs/404.html

mv original_dist dist
mv original_build-stats.json public/build-stats.json
mv original_statoscope-report.html public/statoscope-report.html
mv original_patch-version .patch-version
