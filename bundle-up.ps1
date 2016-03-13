$filelist = [string]::Join(" ", (Get-ChildItem .\source\javascripts -Recurse -File | Select-Object | %{ $_.FullName }))
$brify = "browserify -t [ babelify --presets [ react ] ] $filelist -o .\public\js\bundle.js"
Write-Host Running $brify
Invoke-Expression -Command "$brify"