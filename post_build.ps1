Remove-Item "C:\utv\workspace-2014\musikkjulekalender\src\main\resources\resources\static\admin\js\*" -Recurse -force
Remove-Item "C:\utv\workspace-2014\musikkjulekalender\target\classes\resources\static\admin\js\*" -Recurse -force
mv "build/static/css/404.*.chunk.css" "build/static/css/404.min.css"
mv "build/static/js/main*.js" "build/static/js/main.admin.min.js"
mv "build/static/js/runtime-main*.js" "build/static/js/runtime-admin.main.min.js"
mv "build/static/js/404*.js" "build/static/js/404.admin.min.js"
Copy-Item "./build/*" -Destination "C:\utv\workspace-2014\musikkjulekalender\src\main\resources\resources\static\admin\js" -Recurse -force
Copy-Item "./build/*" -Destination "C:\utv\workspace-2014\musikkjulekalender\target\classes\resources\static\admin\js" -Recurse -force

