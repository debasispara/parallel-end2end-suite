#!/usr/bin/env bash

mochawesomeReportDir="results/mochawesome-report"
./node_modules/.bin/mochawesome-merge $mochawesomeReportDir/*.json >$mochawesomeReportDir/index.json && marge $mochawesomeReportDir/index.json --reportDir $mochawesomeReportDir --inline
rm -rf $mochawesomeReportDir/*.json
open $mochawesomeReportDir/index.html
echo "===== D O N E ====="