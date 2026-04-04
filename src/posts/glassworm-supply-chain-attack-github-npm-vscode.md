---
title: "GlassWorm: How One Campaign Compromised 400+ Repos Across GitHub, npm, and VSCode"
slug: "glassworm-supply-chain-attack-github-npm-vscode"
date: "2026-04-01"
description: "The GlassWorm malware campaign contaminated 433 components across GitHub, npm, and VSCode/OpenVSX using invisible Unicode obfuscation and blockchain-based C2. Here's the full technical breakdown."
tags: ["Security", "Supply Chain", "Malware", "GitHub", "VSCode"]
coverImage: "/assets/blog/optimized/glassworm-supply-chain-attack-github-npm-vscode-lg.webp"
readingTime: 13
featured: false
published: true
---

## A Coordinated Multi-Platform Attack

In March 2026, security researchers from Aikido, Socket, Step Security, and the OpenSourceMalware community collectively identified **433 compromised components** in what is now the most extensive coordinated supply chain campaign of the year: **GlassWorm**.

The attack spread across four different platforms simultaneously:

- **200** GitHub Python repositories
- **151** GitHub JavaScript/TypeScript repositories
- **72** VSCode/OpenVSX extensions
- **10** npm packages

What connects them all: the same **Solana blockchain address** for command-and-control, identical or functionally similar payloads, and shared infrastructure.

## Origins and Evolution

GlassWorm was first observed in **October 2025**, when attackers used invisible Unicode characters to hide malicious code that harvested cryptocurrency wallet data and developer credentials from VSCode extensions.

### Timeline of the Campaign

| Wave | Date | Targets | Platforms |
|---|---|---|---|
| Wave 1 | Oct 2025 | ~20 extensions | OpenVSX |
| Wave 2 | Nov 2025 | ~35 extensions | VSCode Marketplace + OpenVSX |
| Wave 3 | Dec 2025 | ~50 extensions + macOS wallets | VSCode + OpenVSX |
| Wave 4 | Jan 2026 | ~60 extensions + macOS | OpenVSX |
| **Wave 5** | **Mar 2026** | **433 components** | **GitHub + npm + VSCode + OpenVSX** |

The March 2026 wave represented a dramatic escalation—moving beyond IDE extensions to compromise GitHub repositories directly and plant malicious npm packages.

## The Invisible Code Technique

GlassWorm's signature technique uses **invisible Unicode characters** to encode malicious payloads that pass visual code review completely undetected.

### How Unicode Obfuscation Works

Standard code review—whether manual or automated—focuses on visible characters. GlassWorm exploits Unicode code points that render as zero-width or invisible characters:

```javascript
// This looks empty or like whitespace to human eyes:
const config = "​‌​‌‌​​​​‌​​‌‌​‌​​‌​​​​​‌​‌​​​​​​‌​​‌​‌​​";

// But it actually encodes a malicious URL using
// zero-width characters (U+200B, U+200C, U+200D)
// Binary: 0 = U+200B (zero-width space), 1 = U+200C (zero-width non-joiner)
```

The decoder extracts each invisible character, maps it to binary (0 or 1), groups them into bytes, and reconstructs the plaintext—which could be a C2 URL, a shell command, or an entire JavaScript payload.

### Why This Evades Detection

1. **Manual review** — The code looks like empty strings or comments
2. **Basic regex scanners** — No suspicious keywords like `eval`, `exec`, or URLs
3. **Linters** — ESLint and similar tools don't flag Unicode content
4. **GitHub diff view** — The malicious additions appear as blank lines

## Blockchain as C2 Infrastructure

The most innovative aspect of GlassWorm is its use of the **Solana blockchain** for command-and-control:

```
1. Malware queries a specific Solana wallet address every 5 seconds
2. Attacker sends a small transaction to that wallet
3. The transaction memo field contains an encrypted payload URL
4. Malware decodes the memo → downloads new instructions
```

### Why Blockchain C2 Is Dangerous

- **Cannot be taken down** — Unlike a traditional C2 domain, blockchain transactions are immutable
- **No DNS to sinkhole** — Security teams can't redirect traffic by seizing a domain
- **Publicly readable** — Any node can read transaction memos, making the C2 channel accessible from anywhere
- **Plausible deniability** — Blockchain reads look like legitimate cryptocurrency API calls

Between November 2025 and March 2026, researchers observed **50 new transactions** updating the payload URL through memo fields—showing active, ongoing operation of the campaign.

## The Attack Chain

### Step 1: Account Compromise on GitHub

The initial compromise vector targets GitHub accounts through credential stuffing, phishing, or session hijacking. Once an account is compromised, attackers **force-push** malicious commits to repositories they maintain.

### Step 2: Malicious Code Injection

A file named `i.js` (or similar) is added containing the invisible Unicode payload. The file appears nearly empty on casual inspection.

### Step 3: Package and Extension Publishing

With access to maintainer accounts, the attackers publish:
- **npm packages** with the hidden payload in install scripts
- **VSCode/OpenVSX extensions** with activation-triggered payloads

### Step 4: Payload Execution

When installed, the malware:

1. Queries the Solana blockchain for the current C2 URL
2. Downloads the Node.js runtime (if not present)
3. Executes a JavaScript-based **information stealer** targeting:
   - Cryptocurrency wallet seed phrases and keys
   - SSH keys and GPG keys
   - Browser credentials and session tokens
   - Developer environment variables (API keys, cloud credentials)
   - Git credentials and access tokens

### Step 5: Persistence

The malware creates `~/init.json` for persistence and installs an unexpected Node.js runtime in the home directory (`~/node-v22*`).

## Attribution Signals

Analysis of code comments within the malware indicates **Russian-speaking threat actors**. Additionally, the malware skips execution when a Russian locale is detected on the system—a common evasion technique used by threat actors to avoid compromising systems in their home country and attracting domestic law enforcement attention.

However, researchers emphasize this is insufficient for confident attribution, as these indicators can be planted as false flags.

## Detection and Remediation

### Indicators of Compromise

Search your systems for these markers:

```bash
# Check for the GlassWorm marker variable
grep -r "lzcdrtfxyqiplpd" ~/projects/ ~/code/

# Check for persistence mechanisms
ls -la ~/init.json

# Check for unexpected Node.js installations
ls -d ~/node-v22* 2>/dev/null

# Check for suspicious i.js files in recent clones
find ~/projects -name "i.js" -newer /tmp/reference_date -type f
```

### Git History Forensics

Look for commits where the **committer date is significantly newer than the author date**:

```bash
git log --format='%H author:%ai committer:%ci' | while read hash author committer; do
  # Flag commits where dates diverge significantly
  echo "$hash $author $committer"
done
```

Force-pushed compromised commits often have author dates matching the original commit but committer dates reflecting the actual push time.

### Protecting Your Extensions

If you publish VSCode extensions:

1. **Enable 2FA** on your marketplace publisher account
2. **Review your PAT (Personal Access Token) scopes** — Use minimum required permissions
3. **Audit extension dependencies** — Check for invisible characters in source files
4. **Use `vsce` with `--no-dependencies`** when publishing, then verify bundled content

### Protecting Your npm Packages

```bash
# Scan for hidden Unicode characters in your source tree
npx unicode-hidden-characters-check ./src

# Or audit with git: show any commit that touched an affected file
git log --all --oneline -- "*.js" "*.ts"
```

## The Evolving Threat Landscape

GlassWorm represents a new class of supply chain attack that combines:

1. **Multi-platform targeting** — GitHub, npm, VSCode, OpenVSX simultaneously
2. **Steganographic obfuscation** — Invisible to human review
3. **Decentralized C2** — Blockchain-based infrastructure that can't be taken down
4. **Developer-targeted payloads** — Specifically designed to steal code signing keys, deploy tokens, and cloud credentials

The progression from 20 extensions in October 2025 to 433 components in March 2026 shows a threat actor that is **scaling operations** and adapting techniques. Every developer who installs packages from npm or extensions from marketplaces needs to treat dependency management as a security-critical operation.

The age of "install and trust" is over.
