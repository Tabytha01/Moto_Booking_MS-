# Git Commands for Codespaces

## Push Changes to GitHub (from Local VS Code)

```bash
# 1. Check what files changed
git status

# 2. Add all changes
git add .

# 3. Commit with a message
git commit -m "Changed currency to RWF and updated fare amounts"

# 4. Push to GitHub
git push origin main
```

## Pull Changes in Codespaces

```bash
# Get latest changes from GitHub
git pull origin main

# Then rebuild Docker containers
docker-compose down
docker-compose up --build
```

## Quick Reference

### Check current branch
```bash
git branch
```

### See commit history
```bash
git log --oneline
```

### Discard local changes (be careful!)
```bash
git reset --hard
```

### Pull latest without rebuilding Docker
```bash
git pull
```

## Workflow Summary

1. **Make changes locally** (in Windows VS Code)
2. **Push to GitHub**: `git add . && git commit -m "message" && git push`
3. **In Codespaces**: `git pull origin main`
4. **Rebuild Docker**: `docker-compose down && docker-compose up --build`
