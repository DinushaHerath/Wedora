# 🔧 Git Cleanup Script
# Run this to remove all tracked files and re-add only what should be committed

Write-Host "🧹 Cleaning Git cache..." -ForegroundColor Yellow

# Remove all files from Git tracking (doesn't delete from disk)
git rm -r --cached .

Write-Host "✅ Cache cleared" -ForegroundColor Green
Write-Host ""

# Re-add files (now .gitignore will be respected)
Write-Host "📦 Re-adding files (respecting .gitignore)..." -ForegroundColor Yellow
git add .

Write-Host "✅ Files re-added" -ForegroundColor Green
Write-Host ""

# Show what will be committed
Write-Host "📊 Files ready to commit:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "✅ Done! Now run:" -ForegroundColor Green
Write-Host "   git commit -m 'Fix gitignore and remove unnecessary files'" -ForegroundColor White
Write-Host "   git push" -ForegroundColor White
