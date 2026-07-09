# sawcase-css — 最終設計 v3

## コンセプト

**「クラスを書くだけで、洗練された管理画面・ドキュメント・LPができる」**

| 原則 | 内容 |
|------|------|
| **手軽さ最優先** | 各カテゴリ1パターン。選択肢で迷わない |
| **AI エージェント対応** | AGENT.md 同梱。Zag.js + Fresh 向けの具体例 |
| **セマンティックHTML** | `<header>`, `<nav>`, `<main>`, `<section>` を適切に使用 |
| **sawtooth-css 専用** | JSR 依存で統合インストール |

---

## プレフィックス体系

| カテゴリ | プレフィックス | 用途 |
|---------|--------------|------|
| **管理画面** | `sc-admin-` | ダッシュボード、CRUD、設定画面 |
| **ドキュメント** | `sc-docs-` | 技術ドキュメント、ヘルプ、ガイド |
| **ランディングページ** | `sc-lp-` | プロダクトLP、マーケティング [β] |
| **共通** | `sc-` | 認証画面、空状態、ローディング等 |

---

## AI エージェント対応

```
sawcase-css/
├── AGENT.md               # エージェント向けガイド（Zag.js + Fresh 前提）
├── docs/
│   ├── USAGE.md            # Zag.js + Fresh での使い方
│   ├── CLASS_REFERENCE.md  # 全クラス名の一覧
│   └── EXAMPLES.md         # Fresh islands/routes での実践例
```

### AGENT.md の要点

- **対象フレームワーク**: Deno Fresh + Zag.js + Preact
- **前提**: sawtooth-css (`st-*`) と組み合わせて使う
- **ルール**: コンポーネントは `st-*`、レイアウトは `sc-*`
- **コピペ用テンプレート**: Fresh の `routes/` と `islands/` 向けの TSX サンプル

---

## sawtooth-css との関係

```json
// sawcase-css/deno.json
{
  "name": "@kotsumo/sawcase-css",
  "imports": {
    "@kotsumo/sawtooth-css": "jsr:@kotsumo/sawtooth-css@^0.1.3"
  }
}
```

```ts
// 利用側 dev.ts
import { generateSawcaseCSS } from "@kotsumo/sawcase-css/generate";

await generateSawcaseCSS({
  output: "./static/sawcase.css",
  sawtooth: { output: "./static/sawtooth.css" },
  theme: { colors: { primary: "#6750A4" } },
});
```

---

## 1. 管理画面レイアウト (`sc-admin-*`)

Supabase の構造を参考にした、セマンティックな HTML：

```html
<div class="sc-admin-shell">
  <!-- グローバルヘッダー（ロゴ・パンくず・検索・ユーザーメニュー） -->
  <header class="sc-admin-header">
    <div class="sc-admin-header__brand">
      <img src="/logo.svg" class="sc-admin-header__logo" />
      <span class="sc-admin-header__app-name">MyApp</span>
    </div>
    <div class="sc-admin-header__breadcrumb">
      <!-- パンくず（オプション） -->
    </div>
    <div class="sc-admin-header__actions">
      <!-- 検索、通知、ユーザーメニュー等 -->
    </div>
  </header>

  <!-- ボディ（サイドナビ + コンテンツ） -->
  <div class="sc-admin-body">
    <!-- サイドナビゲーション -->
    <nav class="sc-admin-nav" id="admin-nav">
      <div class="sc-admin-nav__group">
        <div class="sc-admin-nav__group-label">台帳</div>
        <a href="/org" class="sc-admin-nav__link sc-admin-nav__link--active">
          <svg class="sc-admin-nav__icon">…</svg>
          <span>政治団体</span>
        </a>
        <a href="/elections" class="sc-admin-nav__link">
          <svg class="sc-admin-nav__icon">…</svg>
          <span>選挙</span>
        </a>
      </div>
      <div class="sc-admin-nav__footer">
        <a href="/settings" class="sc-admin-nav__link">設定</a>
        <a href="/logout" class="sc-admin-nav__link sc-admin-nav__link--danger">ログアウト</a>
      </div>
    </nav>

    <!-- オーバーレイ（モバイル時） -->
    <div class="sc-admin-overlay" id="admin-overlay"></div>

    <!-- メインコンテンツ -->
    <main class="sc-admin-content">
      <!-- ここに sc-admin-page を配置 -->
    </main>
  </div>
</div>
```

**セマンティクスのポイント:**
- `<header>` — グローバルヘッダー（ロゴ＋ブランド＋アクション）
- `<nav>` — ナビゲーション（サイドメニュー）
- `<main>` — メインコンテンツ
- `<div>` — レイアウト用の構造的コンテナ

**動作:**
- `sc-admin-shell`: `height: 100vh` + `display: flex; flex-direction: column`
- `sc-admin-header`: 固定ヘッダー（48px）、`position: sticky; top: 0`
- `sc-admin-body`: `flex: 1; display: flex; overflow: hidden`
- `sc-admin-nav`: デスクトップ=常時表示 / モバイル=ドロワー（JS でトグル）
  - `sc-admin-nav--open`: モバイル時に表示
  - `sc-admin-nav--collapsed`: アイコンのみモード（オプション）
- `sc-admin-content`: このエリアだけ `overflow-y: auto`

**同梱JS (軽量):**
```ts
// sawcase.js — ハンバーガーメニュー用の最小限JS
export function initAdminNav(navId = "admin-nav", overlayId = "admin-overlay") {
  // モバイルドロワーのトグルロジック（数行）
}
```

### ページ構造プリミティブ

```html
<div class="sc-admin-page">
  <div class="sc-admin-page__header">
    <div>
      <h2 class="sc-admin-page__title">ユーザー一覧</h2>
      <p class="sc-admin-page__description">登録されたユーザーの管理</p>
    </div>
    <div class="sc-admin-page__actions">
      <button class="st-button st-button--filled">新規追加</button>
    </div>
  </div>
  <div class="sc-admin-page__body">…</div>
</div>
```

- `sc-admin-page--narrow` — フォームページ (max-width: 42rem)
- `sc-admin-page--wide` — テーブルページ (max-width: 80rem)
- `sc-admin-page--full` — 全幅

### Stats カード

```html
<div class="sc-admin-stats">
  <div class="sc-admin-stats__card">
    <div class="sc-admin-stats__label">総収入</div>
    <div class="sc-admin-stats__value">¥1,234,567</div>
    <div class="sc-admin-stats__trend sc-admin-stats__trend--up">+12.5%</div>
  </div>
</div>
```

---

## 2. ドキュメントページレイアウト (`sc-docs-*`)

技術ドキュメント、ヘルプページ、ガイドページ用。

```html
<div class="sc-docs-shell">
  <!-- ドキュメントヘッダー -->
  <header class="sc-docs-header">
    <div class="sc-docs-header__brand">
      <img src="/logo.svg" class="sc-docs-header__logo" />
      <span class="sc-docs-header__app-name">MyApp Docs</span>
    </div>
    <nav class="sc-docs-header__nav">
      <a href="/docs" class="sc-docs-header__link sc-docs-header__link--active">ガイド</a>
      <a href="/api" class="sc-docs-header__link">API</a>
      <a href="/changelog" class="sc-docs-header__link">変更履歴</a>
    </nav>
    <div class="sc-docs-header__actions">
      <!-- 検索、GitHub リンク等 -->
    </div>
  </header>

  <div class="sc-docs-body">
    <!-- 左サイドバー：目次ナビ -->
    <nav class="sc-docs-sidebar" id="docs-sidebar">
      <div class="sc-docs-sidebar__group">
        <div class="sc-docs-sidebar__group-label">はじめに</div>
        <a href="/docs/intro" class="sc-docs-sidebar__link sc-docs-sidebar__link--active">導入</a>
        <a href="/docs/install" class="sc-docs-sidebar__link">インストール</a>
      </div>
    </nav>

    <!-- メインコンテンツ -->
    <main class="sc-docs-content">
      <article class="sc-docs-article">
        <h1 class="sc-docs-article__title">導入ガイド</h1>
        <div class="sc-docs-article__body">
          <!-- Markdown レンダリングされたコンテンツ -->
        </div>
        <div class="sc-docs-article__nav">
          <a href="/docs/prev" class="sc-docs-article__prev">← 前のページ</a>
          <a href="/docs/next" class="sc-docs-article__next">次のページ →</a>
        </div>
      </article>
    </main>

    <!-- 右サイドバー：ページ内目次（オプション） -->
    <aside class="sc-docs-toc">
      <div class="sc-docs-toc__title">このページの目次</div>
      <a href="#section-1" class="sc-docs-toc__link">セクション1</a>
      <a href="#section-2" class="sc-docs-toc__link">セクション2</a>
    </aside>
  </div>
</div>
```

**構造:**
- `sc-docs-shell`: 全画面レイアウト
- `sc-docs-header`: 固定ヘッダー + トップナビ（ガイド/API/変更履歴）
- `sc-docs-body`: 3カラム（左サイドバー + コンテンツ + 右TOC）
  - モバイル: 1カラム（サイドバーはドロワー、TOC は非表示）
  - タブレット: 2カラム（左サイドバー + コンテンツ）
  - デスクトップ: 3カラム
- `sc-docs-article`: 記事本文のタイポグラフィ（prose スタイル）
  - コードブロック、テーブル、引用のスタイリング
  - 前後ナビゲーション
- `sc-docs-toc`: スクロール追従する目次（`position: sticky`）

**同梱JS:**
```ts
// ドキュメント用JS
export function initDocsToc() {
  // IntersectionObserver でスクロール位置に応じた TOC ハイライト
}
export function initDocsSearch() {
  // ⌘K 検索パレット（オプション）
}
```

---

## 3. LP レイアウト (`sc-lp-*`) [β]

```html
<header class="sc-lp-header">
  <div class="sc-lp-header__inner">
    <div class="sc-lp-header__brand">…</div>
    <nav class="sc-lp-header__nav">…</nav>
    <div class="sc-lp-header__cta">…</div>
  </div>
</header>

<section class="sc-lp-hero">
  <div class="sc-lp-hero__inner">
    <h1 class="sc-lp-hero__headline">…</h1>
    <p class="sc-lp-hero__subhead">…</p>
    <div class="sc-lp-hero__actions">…</div>
  </div>
</section>

<section class="sc-lp-section">
  <div class="sc-lp-section__inner">…</div>
</section>

<section class="sc-lp-features">
  <div class="sc-lp-features__grid">
    <div class="sc-lp-features__card">…</div>
  </div>
</section>

<footer class="sc-lp-footer">
  <div class="sc-lp-footer__inner">…</div>
</footer>
```

---

## 4. 共通パターン (`sc-*`)

カテゴリを問わず使える汎用レイアウト：

### 認証画面

```html
<div class="sc-auth">
  <div class="sc-auth__card">
    <div class="sc-auth__header">
      <img src="/logo.svg" class="sc-auth__logo" />
      <h1 class="sc-auth__title">ログイン</h1>
    </div>
    <div class="sc-auth__body">…</div>
    <div class="sc-auth__footer">…</div>
  </div>
</div>
```

### 空状態 / ローディング

```html
<div class="sc-empty">
  <div class="sc-empty__icon">📋</div>
  <h3 class="sc-empty__title">データがありません</h3>
  <p class="sc-empty__description">新しい項目を追加してください</p>
</div>

<div class="sc-loading">
  <div class="sc-loading__spinner"></div>
</div>
```

---

## プロジェクト構成

```
sawcase-css/
├── deno.json
├── mod.ts
├── generate.ts
├── AGENT.md                    # AI エージェント向け (Zag.js + Fresh)
├── docs/
│   ├── USAGE.md                # Zag.js + Fresh での使い方
│   ├── CLASS_REFERENCE.md
│   └── EXAMPLES.md             # Fresh routes/islands の TSX 例
├── src/
│   ├── build.ts
│   ├── js/
│   │   ├── admin-nav.ts        # ドロワートグル
│   │   ├── docs-toc.ts         # TOC スクロール追従
│   │   └── mod.ts              # JS エントリポイント
│   └── css/
│       ├── main.css
│       ├── _variables.css
│       ├── admin/              # sc-admin-*
│       │   ├── _shell.css
│       │   ├── _header.css
│       │   ├── _nav.css
│       │   ├── _page.css
│       │   ├── _stats.css
│       │   └── _overlay.css
│       ├── docs/               # sc-docs-*
│       │   ├── _shell.css
│       │   ├── _header.css
│       │   ├── _sidebar.css
│       │   ├── _article.css
│       │   └── _toc.css
│       ├── landing/            # sc-lp-* [β]
│       │   ├── _header.css
│       │   ├── _hero.css
│       │   ├── _section.css
│       │   ├── _features.css
│       │   └── _footer.css
│       └── common/             # sc-*
│           ├── _auth.css
│           ├── _empty.css
│           └── _loading.css
├── demo/
│   ├── server.ts
│   └── pages/
│       ├── admin.html
│       ├── docs.html
│       ├── auth.html
│       └── landing.html
├── dist/
│   ├── sawcase.css
│   └── sawcase.js
└── README.md
```

---

## 実装手順

1. リポジトリ作成 (`sawcase-css/`)
2. deno.json + mod.ts + generate.ts (sawtooth JSR 依存)
3. CSS: admin → docs → common → landing[β]
4. JS: admin-nav → docs-toc
5. AGENT.md + docs/ (Zag.js + Fresh 向け)
6. demo/ ページ
7. ビルド + テスト
8. JSR 公開 `@kotsumo/sawcase-css@0.1.0`

## 検証計画

1. `deno task build` → `dist/sawcase.css` + `dist/sawcase.js`
2. デモページで admin / docs / auth / landing[β] を確認
3. polimoney_ledger の Layout.tsx を sawcase で書き換え（550行 → ~80行）
