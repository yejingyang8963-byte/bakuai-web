#!/bin/bash
# Verify design handoff: yml integrity, component dependencies, illustration assets.
# Usage: bash scripts/verify_design_handoff.sh
# Exit 0 = all green; non-zero = problems found.

set -e

REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"

PASS=0
FAIL=0
WARN=0

ok()    { echo "  ✅ $*"; PASS=$((PASS+1)); }
fail()  { echo "  ❌ $*"; FAIL=$((FAIL+1)); }
warn()  { echo "  ⚠️  $*"; WARN=$((WARN+1)); }
section() { echo ""; echo "━━━ $* ━━━"; }

# ── 1. YAML syntax + non-empty ──────────────────────────
section "1. YAML syntax + content"
LANGS=("en" "zh" "es")
SLUGS=("meta" "hero" "answer" "why" "how" "story-preview" "inside" "comparison" "founder" "faq" "footer")

for lang in "${LANGS[@]}"; do
    for slug in "${SLUGS[@]}"; do
        f="src/content/$lang/$slug.yml"
        if [ ! -f "$f" ]; then
            fail "missing: $f"
            continue
        fi
        if [ ! -s "$f" ]; then
            fail "empty: $f"
            continue
        fi
        # Validate YAML via node + project's own yaml package (after npm install)
        if node -e "require('yaml').parse(require('fs').readFileSync('$f','utf8'))" 2>/dev/null; then
            ok "$lang/$slug.yml"
        else
            fail "yaml syntax: $f"
        fi
    done
done

# ── 2. Astro components exist + reference yml slugs ─────
section "2. Astro components"
COMPONENTS=("Nav" "Hero" "AnswerBlock" "Why" "HowItWorks" "StoryPreview" "Inside" "Comparison" "Founder" "FAQ" "Footer" "StarField")
for c in "${COMPONENTS[@]}"; do
    f="src/components/$c.astro"
    if [ ! -f "$f" ]; then
        fail "missing component: $f"
    else
        ok "$c.astro"
    fi
done

# ── 3. i18n loader + layout + pages ─────────────────────
section "3. Infrastructure files"
[ -f "src/lib/i18n.ts" ] && ok "src/lib/i18n.ts" || fail "missing src/lib/i18n.ts"
[ -f "src/layouts/BaseLayout.astro" ] && ok "src/layouts/BaseLayout.astro" || fail "missing BaseLayout"
for lang in "en" "zh" "es"; do
    if [ "$lang" = "en" ]; then
        f="src/pages/index.astro"
    else
        f="src/pages/$lang/index.astro"
    fi
    [ -f "$f" ] && ok "$f" || fail "missing page: $f"
done

# ── 4. Illustration assets referenced from yml ──────────
section "4. Illustration assets (public/illustrations/)"
# Extract all "illustration: ..." values from yml (handles "- illustration:" array entries too)
# Use BSD-sed-compatible patterns ([[:space:]] instead of \s) for macOS.
# Also pick up anchorIllustration: too.
referenced=$(grep -h -E "^[[:space:]]*-?[[:space:]]*(anchorI|i)llustration:[[:space:]]*\"" src/content/*/*.yml 2>/dev/null | \
             sed -E 's/^[[:space:]]*-?[[:space:]]*(anchorI|i)llustration:[[:space:]]*"([^"]+)".*/\2/' | sort -u)
if [ -z "$referenced" ]; then
    warn "no illustration references found in yml"
else
    while IFS= read -r ref; do
        [ -z "$ref" ] && continue
        # Try .webp first, then .png
        if [ -f "public/illustrations/${ref}.webp" ] || [ -f "public/illustrations/${ref}.png" ]; then
            ok "illustration: $ref"
        else
            warn "missing illustration: $ref (referenced in yml)"
        fi
    done <<< "$referenced"
fi

# ── 5. Mist css integration ─────────────────────────────
section "5. Mist CSS (Hero v3 mist drift)"
if grep -q "_mist-append" src/styles/global.css 2>/dev/null; then
    ok "global.css imports _mist-append.css"
else
    fail "global.css does NOT import _mist-append.css (Hero mist won't render)"
fi
if [ -f "src/styles/_mist-append.css" ]; then
    ok "_mist-append.css present"
else
    fail "missing src/styles/_mist-append.css"
fi

# ── 6. Hero yml structure (titleLine1/2/3) ──────────────
section "6. Hero yml v3 structure (titleLine1/2/3)"
for lang in "${LANGS[@]}"; do
    if grep -q "titleLine1" src/content/$lang/hero.yml 2>/dev/null; then
        ok "$lang/hero.yml has titleLine1/2/3 (v3)"
    else
        warn "$lang/hero.yml may still use old title format"
    fi
done

# ── Pricing consistency (v1.1: $5.99 lifetime / $0.99/mo) ──
section "Pricing consistency (v1.1: \$5.99 / \$0.99)"
STALE_PRICES="\\\$9\\.99|\\\$19\\.99|\\\$2\\.99|\\\$3\\.99"
for lang in "${LANGS[@]}"; do
    hits=$(grep -hE "$STALE_PRICES" src/content/$lang/*.yml 2>/dev/null | head -3)
    if [ -n "$hits" ]; then
        fail "$lang: stale pricing detected"
        echo "$hits" | sed 's/^/      /'
    else
        ok "$lang: pricing clean (no stale \$9.99/\$19.99/\$2.99/\$3.99)"
    fi
done

# ── 7. Founder name updated to Jingyang Ye ──────────────
section "7. Founder name (Jacob Ye → Jingyang Ye)"
for lang in "${LANGS[@]}"; do
    if grep -qi "Jacob Ye" src/content/$lang/founder.yml 2>/dev/null; then
        warn "$lang/founder.yml still mentions Jacob Ye"
    else
        ok "$lang/founder.yml: no stale Jacob reference"
    fi
done

# ── Summary ──────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════"
echo "✅ Pass: $PASS    ❌ Fail: $FAIL    ⚠️  Warn: $WARN"
echo "═══════════════════════════════════════"

[ "$FAIL" -gt 0 ] && exit 1
[ "$WARN" -gt 0 ] && exit 2
exit 0
