---
title: "Axios NPM Compromise: Anatomy of a Supply Chain Attack on 100M Weekly Downloads"
slug: "axios-npm-supply-chain-attack-analysis"
date: "2026-04-02"
description: "A comprehensive technical analysis of how attackers compromised the Axios npm package through social engineering, injected a cross-platform RAT, and what every JavaScript developer must do to protect their projects."
tags: ["Security", "NPM", "Supply Chain", "JavaScript", "Malware"]
coverImage: "/assets/blog/optimized/axios-npm-supply-chain-attack-analysis-lg.webp"
readingTime: 15
featured: true
published: true
---

## The Day Axios Was Weaponized

On March 31, 2026, the most widely used HTTP client in the JavaScript ecosystem was turned into a malware delivery vehicle. Axios—with over **100 million weekly downloads** on npm—was compromised in a supply chain attack that injected a cross-platform Remote Access Trojan (RAT) capable of infecting Windows, macOS, and Linux machines.

Two malicious versions were published: `axios@1.14.1` and `axios@0.30.4`. Both the current and legacy release branches were poisoned within **39 minutes of each other**, maximizing the blast radius.

Any project using a caret range (`^1.14.0` or `^0.30.0`) would silently pull in the compromised version on its next `npm install`.

## The Attack Timeline

| Time (UTC) | Event |
|---|---|
| March 30, 23:41 | `plain-crypto-js@4.2.0` published (clean typosquat of crypto-js) |
| March 30, 23:59 | `plain-crypto-js@4.2.1` published (malicious payload added) |
| March 31, 00:05 | Socket's scanner flags `plain-crypto-js` as malicious |
| March 31, 00:12 | `axios@1.14.1` published with `plain-crypto-js` dependency |
| March 31, 00:51 | `axios@0.30.4` published (legacy branch poisoned) |
| March 31, ~02:00 | Axios maintainers discover compromise, cannot revoke access |
| March 31, ~04:00 | npm security team intervenes |

The attack was methodical: the malicious dependency was staged 18 hours before activation, with a clean first version to avoid triggering automated scanners.

## How the Compromise Happened

### The Social Engineering Vector

The attack targeted human trust, not technical vulnerabilities. The compromised versions were published by the npm account `jasonsaayman`—an account associated with the Axios project. Early investigation suggests:

1. **Long-lived npm tokens** were still in use alongside trusted publishing
2. The attacker gained access through **social engineering** of a maintainer
3. The attacker's permissions **exceeded other collaborators**, preventing them from revoking access

In a public GitHub issue, an Axios collaborator stated they could not revoke access from the account responsible for the malicious publish.

### The Minimal Diff Strategy

The compromised versions introduced just one change: a new dependency on `plain-crypto-js@4.2.1`. In the real Axios package, there are only three dependencies (`follow-redirects`, `form-data`, `proxy-from-env`). The addition of a fourth was subtle enough to avoid casual review.

## Inside the Malicious Payload

### The Kill Chain

```
npm install axios@1.14.1
  → installs plain-crypto-js@4.2.1
    → postinstall hook runs setup.js
      → detects OS platform
        → downloads platform-specific RAT
          → deletes all evidence
```

### Two-Layer Obfuscation

The malware in `setup.js` uses a custom encoding scheme specifically designed to evade static analysis:

**Layer 1 — Reversed Base64:** The encoded string is reversed, underscores are replaced with `=` padding characters, and the result is base64-decoded.

**Layer 2 — XOR Cipher:** Each decoded character is XORed with a digit from the key `OrDeR_7077` (selected by index `7*i*i % 10`) and the constant `333`.

```javascript
// Reconstructed deobfuscation logic
const _trans_1 = function(x, r) {
  const E = r.split("").map(Number);
  return x.split("").map((x, r) => {
    const S = x.charCodeAt(0), a = E[7 * r * r % 10];
    return String.fromCharCode(S ^ a ^ 333);
  }).join("");
};

const _trans_2 = function(x, r) {
  let E = x.split("").reverse().join("").replaceAll("_", "=");
  let S = Buffer.from(E, "base64").toString("utf8");
  return _trans_1(S, r);
};

const ord = "OrDeR_7077";
```

All 18 obfuscated strings—including module names, C2 URLs, shell commands, and file paths—were hidden behind this encoding.

### Platform-Specific Payloads

The malware deployed different attack vectors for each operating system:

#### macOS
- Downloads binary to `/Library/Caches/com.apple.act.mond` (mimicking Apple's naming convention)
- Launched via AppleScript through `nohup osascript`
- The second-stage payload is a **full C++ RAT** that:
  - Fingerprints the system (hostname, username, macOS version, timezone, CPU, installed apps)
  - Beacons to C2 every 60 seconds via HTTP POST
  - Supports `peinject` (deploy additional binaries), `runscript` (execute shell/AppleScript), and `rundir` (enumerate filesystems)

#### Windows
- Copies `powershell.exe` to `%PROGRAMDATA%\wt.exe` (disguised as Windows Terminal to evade EDR)
- VBScript wrapper runs hidden (`window style 0`)
- Downloads `.ps1` script with `-w hidden -ep bypass` flags
- Self-deletes all dropper files

#### Linux
- Downloads Python script to `/tmp/ld.py`
- Runs detached with `nohup python3`
- Simplest payload but equally effective

### C2 Infrastructure Camouflage

The POST bodies sent to the C2 server were designed to look like routine npm traffic:

- macOS: `packages[.]npm[.]org/product0`
- Windows: `packages[.]npm[.]org/product1`
- Linux: `packages[.]npm[.]org/product2`

Note: `npm.org` is **not** the npm registry—it belongs to the National Association of Pastoral Musicians. The real npm registry lives at `registry.npmjs.org`. But network monitoring tools seeing this in HTTP bodies might not flag it.

### Anti-Forensics

After execution, the malware **erases all evidence**:

```javascript
// Delete the malicious script
fs.unlink(__filename, (x => {}));
// Delete package.json with postinstall hook
fs.unlink("package.json", (x => {}));
// Restore clean package.json
fs.rename("package.md", "package.json", (x => {}));
```

Post-cleanup, the `node_modules/plain-crypto-js/` directory looks like a normal copy of `crypto-js`.

## Immediate Response Steps

### Check If You're Affected

```bash
# Search lockfiles for compromised versions
grep -r "axios.*1\\.14\\.1\\|axios.*0\\.30\\.4\\|plain-crypto-js" package-lock.json yarn.lock pnpm-lock.yaml

# Check installed packages
npm ls axios
npm ls plain-crypto-js
```

### Check for Indicators of Compromise

**macOS:**
```bash
ls -la /Library/Caches/com.apple.act.mond
```

**Windows (PowerShell):**
```bash
Test-Path "$env:PROGRAMDATA/wt.exe"
Test-Path "$env:TEMP/6202033.vbs"
Test-Path "$env:TEMP/6202033.ps1"
```

**Linux:**
```bash
ls -la /tmp/ld.py
```

### If Found: Remediation

1. **Isolate the machine** — Disconnect from network immediately
2. **Pin Axios to safe version** — `npm install axios@1.14.0 --save-exact`
3. **Rotate all credentials** — SSH keys, API tokens, npm tokens, cloud credentials
4. **Audit CI/CD pipelines** — Check for compromised builds that may have deployed infected artifacts
5. **Scan for persistence** — Check cron jobs, LaunchAgents, scheduled tasks, and startup items

## Structural Defenses Against Supply Chain Attacks

### Lock Dependencies Properly

```json
{
  "dependencies": {
    "axios": "1.14.0"
  }
}
```

Exact versions prevent silent upgrades. Combine with `npm ci` (not `npm install`) in CI/CD:

```yaml
# GitHub Actions
- run: npm ci
  # Uses exact versions from lockfile, fails if lockfile is outdated
```

### Enable npm Audit in CI

```yaml
- run: npm audit --audit-level=high
  # Fail the build if high/critical vulnerabilities exist
```

### Use Lockfile-Only Installs

```bash
# Prevents modifying lockfile during install
npm ci --ignore-scripts  # Skip postinstall hooks entirely
```

### Monitor with Socket, Snyk, or Similar

Tools like Socket use **behavioral analysis** rather than just CVE databases. Socket flagged `plain-crypto-js` within **6 minutes** of publication—before any CVE was assigned.

## Lessons for the JavaScript Ecosystem

1. **npm tokens are crown jewels** — Rotate regularly, scope narrowly, and enable 2FA on publish
2. **Trusted publishing isn't enough alone** — If legacy tokens remain active alongside OIDC trusted publishing, you have two attack surfaces instead of one
3. **Caret ranges (`^`) are a gamble** — Convenient, but they delegate trust to every future publish
4. **postinstall hooks are a loaded gun** — Consider `--ignore-scripts` by default and explicitly allow trusted packages
5. **A single compromised dependency cascades instantly** — The blast radius of Axios meant millions of projects were potentially exposed within hours

The Axios attack wasn't novel in technique—it was devastating in **scale**. When the most popular HTTP client in JavaScript becomes a malware vector, it underscores that supply chain security isn't optional. It's existential.
