---
title: "Git Commands Every Developer Should Know: From Beginner to Advanced"
slug: "git-commands-every-developer-should-know"
date: "2026-03-15"
description: "Master the Git commands you'll actually use daily. Covers branching, rebasing vs merging, undoing mistakes, stashing, cherry-picking, bisecting, and advanced workflows with practical examples."
tags: ["Git", "Version Control", "Developer Tools", "Tutorial", "Productivity"]
coverImage: "/assets/blog/optimized/git-commands-every-developer-should-know-lg.webp"
readingTime: 15
featured: false
published: true
---

## Beyond `git add` and `git commit`

Most developers learn Git just enough to push code. But Git is the most powerful tool in your workflow—and understanding it deeply will save you hours of pain when things go wrong.

This guide is organized by workflow: daily basics, branching strategies, undoing mistakes, and advanced techniques you'll be glad you learned before you needed them.

## Daily Workflow Commands

### The Basics You Already Know (But Let's Get Right)

```bash
# Stage specific files
git add src/api/routes.js src/api/middleware.js

# Stage all changes in current directory
git add .

# Stage only tracked files (skip new files)
git add -u

# Interactive staging - choose hunks to stage
git add -p
```

The `-p` (patch) flag is criminally underused. It lets you stage individual chunks of a file, so you can split unrelated changes into separate commits:

```bash
git add -p
# Shows each diff hunk with options:
# y - stage this hunk
# n - skip this hunk
# s - split into smaller hunks
# e - manually edit the hunk
# q - quit
```

### Writing Better Commit Messages

```bash
# One-liner for small changes
git commit -m "Fix null check in user validation"

# Open editor for multi-line messages
git commit

# Amend the last commit (message or files)
git add forgotten-file.js
git commit --amend --no-edit

# Amend just the message
git commit --amend -m "Better message for this commit"
```

Conventional commit format:

```
feat: add user avatar upload endpoint
fix: prevent race condition in cart checkout
docs: update API authentication guide
refactor: extract validation into middleware
chore: bump express to 4.19.2
perf: cache database connection pool
test: add integration tests for payment flow
```

## Branching: Your Parallel Universe Machine

### Creating and Switching Branches

```bash
# Create and switch in one command
git switch -c feature/user-auth

# Or the older way (still works)
git checkout -b feature/user-auth

# Switch to existing branch
git switch main

# List all branches (local)
git branch

# List all branches (including remote)
git branch -a

# Delete a merged branch
git branch -d feature/user-auth

# Force delete an unmerged branch
git branch -D experimental-branch
```

### Branch Naming Conventions

```
feature/user-authentication
bugfix/cart-total-calculation
hotfix/security-patch-xss
release/v2.1.0
chore/update-dependencies
refactor/database-layer
```

## Merge vs. Rebase: The Eternal Debate

### Merge (Preserves History)

```bash
git switch main
git merge feature/user-auth

# Creates a merge commit that ties the branches together
# History shows the complete branching structure
```

```
*   Merge branch 'feature/user-auth'
|\
| * Add password hashing
| * Create login endpoint
| * Add JWT middleware
|/
* Previous commit on main
```

### Rebase (Linear History)

```bash
git switch feature/user-auth
git rebase main

# Replays your commits on top of main
# Creates a clean, linear history
```

```
* Add password hashing
* Create login endpoint
* Add JWT middleware
* Previous commit on main
```

### Interactive Rebase: Clean Up Before Merging

```bash
# Rebase last 4 commits interactively
git rebase -i HEAD~4
```

This opens your editor:

```
pick a1b2c3d Add user model
pick e4f5g6h Fix typo in user model
pick i7j8k9l Add user routes
pick m0n1o2p Fix import in routes

# Reword - change commit message
# Edit - stop to amend the commit
# Squash - meld into previous commit
# Fixup - like squash but discard message
# Drop - remove commit entirely
```

Squash the typo fixes:

```
pick a1b2c3d Add user model
fixup e4f5g6h Fix typo in user model
pick i7j8k9l Add user routes
fixup m0n1o2p Fix import in routes
```

Result: 2 clean commits instead of 4.

### The Golden Rule

**Never rebase commits that have been pushed and shared with others.** Rebasing rewrites commit hashes. If someone else has based work on those commits, you'll create a nightmare.

```bash
# Safe: rebase your local feature branch onto updated main
git fetch origin
git rebase origin/main

# Dangerous: rebase a shared branch
git rebase main  # on a branch others are working on
```

## Undoing Mistakes

### Unstage Files

```bash
# Unstage a specific file
git restore --staged src/config.js

# Unstage everything
git restore --staged .
```

### Discard Uncommitted Changes

```bash
# Discard changes in a specific file
git restore src/config.js

# Discard all changes in working directory
git restore .

# Nuclear option: discard everything (tracked + untracked)
git clean -fd
```

### Undo the Last Commit

```bash
# Undo commit but keep changes staged
git reset --soft HEAD~1

# Undo commit and unstage changes
git reset --mixed HEAD~1  # (default)
git reset HEAD~1

# Undo commit and discard all changes (DANGEROUS)
git reset --hard HEAD~1
```

### Revert a Commit (Safe for Shared Branches)

```bash
# Create a new commit that undoes a specific commit
git revert abc123

# Revert without auto-committing
git revert --no-commit abc123

# Revert a merge commit (specify which parent to keep)
git revert -m 1 <merge-commit-hash>
```

**Use `revert` on shared branches**, `reset` on local branches.

### Recover "Lost" Commits

Git almost never truly deletes anything. The reflog is your safety net:

```bash
# See everything that happened
git reflog

# Output:
# abc123 HEAD@{0}: reset: moving to HEAD~1
# def456 HEAD@{1}: commit: Add payment integration
# ghi789 HEAD@{2}: checkout: moving from main to feature

# Recover the "lost" commit
git cherry-pick def456

# Or reset back to it
git reset --hard def456
```

## Stashing: Save Work Without Committing

```bash
# Stash current changes
git stash

# Stash with a descriptive message
git stash push -m "WIP: user auth halfway done"

# Stash including untracked files
git stash -u

# List all stashes
git stash list

# Apply the most recent stash (keep in stash list)
git stash apply

# Apply and remove from stash list
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Drop a specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### Stash Specific Files

```bash
# Stash only specific files
git stash push -m "database changes" src/db/*.js

# Interactive stash (choose hunks, like git add -p)
git stash push -p
```

## Cherry-Pick: Steal Commits from Other Branches

```bash
# Apply a specific commit to current branch
git cherry-pick abc123

# Cherry-pick without committing (stage only)
git cherry-pick --no-commit abc123

# Cherry-pick a range of commits
git cherry-pick abc123..def456
```

Common use case: a bug fix on a feature branch that main needs immediately.

## Git Bisect: Find the Bug-Introducing Commit

When something broke and you don't know which commit caused it:

```bash
# Start bisecting
git bisect start

# Mark current state as bad
git bisect bad

# Mark a known good commit
git bisect good v2.0.0

# Git checks out a middle commit
# Test it, then tell Git:
git bisect good  # if the bug isn't present
git bisect bad   # if the bug is present

# Git narrows down and shows the offending commit
# When done:
git bisect reset
```

### Automate Bisect with a Test Script

```bash
# Automatically run a test at each step
git bisect start HEAD v2.0.0
git bisect run npm test

# Git will find the first commit where tests fail
```

## Working with Remotes

```bash
# View remotes
git remote -v

# Add a remote
git remote add upstream https://github.com/original/repo.git

# Fetch all remotes
git fetch --all

# Pull with rebase (avoid merge commits for updates)
git pull --rebase origin main

# Push a new branch and set upstream
git push -u origin feature/user-auth

# Delete a remote branch
git push origin --delete feature/old-branch

# Prune stale remote tracking branches
git remote prune origin
```

## The Log: Understanding Your History

```bash
# Compact one-line log
git log --oneline

# Visual branch graph
git log --oneline --graph --all

# Log with stats (files changed)
git log --stat

# Log for a specific file
git log --oneline -- src/api/auth.js

# Search commit messages
git log --grep="payment"

# Show commits by author
git log --author="Daljeet"

# Show commits in date range
git log --after="2026-01-01" --before="2026-03-01"

# Show what changed in each commit
git log -p

# Show last 5 commits
git log -5
```

## Git Diff: What Changed?

```bash
# Unstaged changes
git diff

# Staged changes (what will be committed)
git diff --staged

# Diff between branches
git diff main..feature/user-auth

# Diff specific file between branches
git diff main..feature/user-auth -- src/api/auth.js

# Just show file names that changed
git diff --name-only main..feature/user-auth

# Word-level diff (useful for prose)
git diff --word-diff
```

## Advanced: Git Worktrees

Work on multiple branches simultaneously without stashing:

```bash
# Create a worktree for a different branch
git worktree add ../project-hotfix hotfix/critical-bug

# Now you have two directories:
# /project         -> main branch
# /project-hotfix  -> hotfix branch

# List worktrees
git worktree list

# Remove when done
git worktree remove ../project-hotfix
```

## Configuration Tips

```bash
# Set default branch name
git config --global init.defaultBranch main

# Enable rebase by default on pull
git config --global pull.rebase true

# Set up useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.unstage "restore --staged"
git config --global alias.last "log -1 HEAD"

# Auto-prune on fetch
git config --global fetch.prune true

# Better diff algorithm
git config --global diff.algorithm histogram
```

## Quick Reference Cheat Sheet

| Situation | Command |
|---|---|
| Undo last commit, keep changes | `git reset --soft HEAD~1` |
| Unstage a file | `git restore --staged file` |
| Discard local changes | `git restore file` |
| Find who changed a line | `git blame file` |
| Find bug-introducing commit | `git bisect start` |
| Save work temporarily | `git stash push -m "message"` |
| Apply a commit from another branch | `git cherry-pick <hash>` |
| See what's on remote | `git fetch --all && git log --oneline origin/main` |
| Clean up local branches | `git branch --merged main \| grep -v main \| xargs git branch -d` |
| Recover deleted commit | `git reflog` then `git cherry-pick <hash>` |

Master these commands and you'll handle any Git situation with confidence. The key is not memorizing everything—it's knowing what's possible so you can look up the exact syntax when you need it.
