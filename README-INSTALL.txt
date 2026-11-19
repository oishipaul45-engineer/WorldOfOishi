OISHI — Cinematic Portfolio Extensions
======================================
This ZIP contains only src/App.tsx and src/App.css and src/index.css, preserving the six 3D sculptures and adding:
- Project-linked toolbox
- Public GitHub activity and recently pushed repositories (live API)
- Drag-and-drop idea pinboard
- Writing/Medium integration slot (no account supplied)
- Résumé placeholder (no PDF supplied)

Install in PowerShell from the existing WorldOfOishi folder:
  mkdir backup_before_extensions -Force
  Copy-Item src\App.tsx backup_before_extensions\App.tsx -Force
  Copy-Item src\App.css backup_before_extensions\App.css -Force
  Expand-Archive -LiteralPath "$HOME\Downloads\Oishi-Portfolio-Extensions.zip" -DestinationPath . -Force
  npm.cmd install motion
  npm.cmd run build
  npm.cmd run dev

The ZIP is not a complete Vite project; apply it to the existing WorldOfOishi app.
Public GitHub API may rate-limit unauthenticated visitors. No API token used.
To enable Medium, set mediumHandle in ExtendedSections to your own handle.
To enable resume download, add your own PDF in public/ and replace its placeholder link.
