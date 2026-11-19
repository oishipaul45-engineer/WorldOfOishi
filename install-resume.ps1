$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$main = Join-Path $root 'src\main.tsx'
if (!(Test-Path $main)) { throw "Run this inside the WorldOfOishi root (src\main.tsx missing)." }
$source = Get-Content -Raw -LiteralPath $main
if ($source -match 'ResumeFloat') { Write-Host 'ResumeFloat already installed; no changes needed.' -ForegroundColor Green; exit 0 }
$backupDir = Join-Path $root 'backup_resume_install'
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
Copy-Item -LiteralPath $main -Destination (Join-Path $backupDir 'main.tsx') -Force
if ($source -notmatch '<App\s*/>') { throw 'Cannot find <App /> in src/main.tsx. Nothing changed. Ask for a matching patch.' }
$source = 'import ResumeFloat from "./components/ResumeFloat";' + "`r`n" + $source
$source = [regex]::Replace($source, '<App\s*/>', '<><App /><ResumeFloat /></>', 1)
[System.IO.File]::WriteAllText($main,$source,[System.Text.UTF8Encoding]::new($false))
Write-Host 'Resume preview and floating button installed.' -ForegroundColor Green
Write-Host 'Run: npm.cmd run build' -ForegroundColor Cyan
