#!/bin/bash
java -jar compiler.jar --js=awesome_pass_gen2.js string.js math.js --js_output_file=awesome_pass_gen2-combined.min.js

echo "Compiled javascript.\n";
#php5 url_encode.php;

#echo "Escaped bookmarklet. Complete\n";
