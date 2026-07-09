# sawcase-css 背景コンテキスト

このドキュメントは、新しいセッションのエージェントが sawcase-css を正しく実装するために必要な背景情報を全て含みます。

---

## 1. sawtooth-css の構造（参照用）

sawcase-css は sawtooth-css と同じアーキテクチャで作る。以下が sawtooth-css の構造：

### ファイル構成
```
sawtooth-css/
├── deno.json         # @kotsumo/sawtooth-css@0.1.3
├── mod.ts            # SawtoothTheme, GenerateOptions 型定義
├── generate.ts       # generateSawtoothCSS() — テーマからCSS生成
├── setup.ts          # セットアップスクリプト
├── src/
│   ├── build.ts      # ローカルビルド (@import 解決 → 1ファイル結合)
│   ├── tokens/       # TypeScript でデザイントークンCSS生成
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shape.ts
│   │   ├── elevation.ts
│   │   └── motion.ts
│   └── css/
│       ├── main.css          # エントリ (@import で全結合)
│       ├── tokens/           # 静的トークンCSS
│       ├── base/             # _reset.css, _global.css
│       ├── components/       # _button.css, _card.css 等 (60+ファイル)
│       └── utilities/        # _layout.css
├── demo/
│   └── server.ts
└── dist/
    └── sawtooth.css
```

### generate.ts の動作
1. トークン CSS を TypeScript で生成（カラー、タイポ、スペーシング等）
2. ベーススタイルを読み込み
3. 指定されたコンポーネントの CSS を読み込み
4. ユーティリティ CSS を読み込み
5. 全て結合して出力

### build.ts の動作
1. main.css の @import を再帰的に解決
2. 1ファイルに結合
3. dist/ に出力

### sawtooth-css のデザイントークン（sawcase-css が参照する）
```css
/* カラー */
--st-sys-color-primary
--st-sys-color-on-primary
--st-sys-color-primary-container
--st-sys-color-surface
--st-sys-color-surface-container-low
--st-sys-color-surface-variant
--st-sys-color-on-surface
--st-sys-color-on-surface-variant
--st-sys-color-outline
--st-sys-color-outline-variant
--st-sys-color-secondary-container
--st-sys-color-on-secondary-container
--st-sys-color-error
--st-sys-color-on-error
--st-sys-color-tertiary
--st-sys-color-on-tertiary

/* タイポグラフィ */
--st-sys-typescale-title-large-size
--st-sys-typescale-title-medium-size
--st-sys-typescale-body-large-size
--st-sys-typescale-body-medium-size
--st-sys-typescale-body-small-size
--st-sys-typescale-label-large-size
--st-sys-typescale-label-small-size

/* スペーシング */
--st-sys-spacing-1 (4px) ~ --st-sys-spacing-12 (48px)

/* シェイプ */
--st-sys-shape-corner-xs ~ --st-sys-shape-corner-full

/* エレベーション */
--st-sys-elevation-level1 ~ --st-sys-elevation-level5

/* モーション */
--st-sys-motion-duration-short1 ~ --st-sys-motion-duration-long4
--st-sys-motion-easing-standard
```

---

## 2. Gagatto のレイアウト（参考設計）

Gagatto は React + Tailwind で管理画面を構築。以下の3層構造：

### レイアウト構造
```
div.h-screen.flex.flex-col.overflow-hidden
├── TopHeader (header — 固定 48px)
│   ├── 左: Org スイッチャー + パンくず
│   ├── 中央: 検索バー (Ctrl+/ ショートカット)
│   └── 右: フィードバック + 通知 + ユーザーメニュー
├── div.flex-1.flex.overflow-hidden
│   ├── GlobalNavBar (左端のアイコンバー)
│   ├── SidebarClient (コンテキストサイドバー — タスクページのみ)
│   └── main.flex-1.overflow-y-auto (メインコンテンツ)
```

### 良い点
- 全画面レイアウト (`h-screen flex flex-col overflow-hidden`)
- ヘッダーは薄い（48px）
- コンテキストに応じたサイドバー表示
- Org スイッチャーがヘッダーに統合
- フィードバックモーダルの統合

---

## 3. Supabase のレイアウト（参考設計）

### 構造（DOMから抽出）
```
div.group/sidebar-wrapper.flex.min-h-svh.w-full
├── div.flex.flex-col.h-screen.w-screen
│   ├── header.h-12 (グローバルヘッダー)
│   │   ├── ロゴ (supabase-logo.svg)
│   │   ├── パンくず: Organization > Project > Branch
│   │   ├── Connect ボタン
│   │   └── 右: Feedback / Search(⌘K) / Help / Advisor / SQL / AI / User
│   └── div.flex.flex-1.overflow-y-hidden (ボディ)
│       ├── div[data-state="collapsed"] (サイドバー — 折り畳み可)
│       │   ├── data-sidebar="menu" (メニューリスト)
│       │   │   ├── Project Overview
│       │   │   ├── Table Editor
│       │   │   ├── SQL Editor
│       │   │   ├── --- separator ---
│       │   │   ├── Database
│       │   │   ├── Authentication
│       │   │   ├── Storage
│       │   │   └── Edge Functions
│       │   └── footer (Settings)
│       └── main (メインコンテンツ)
```

### 良い点
- ヘッダーにパンくず（Organization / Project / Branch のスイッチャー）
- サイドバーの折り畳み（`data-collapsible="icon"` でアイコンのみ）
- `--sidebar-width: 13rem; --sidebar-width-icon: 3rem` で CSS 変数制御
- メニューグループを区切り線で分離
- ⌘K コマンドパレット

### 注意点（真似しない）
- div だらけのマークアップ（セマンティクス不足）
- 大量の Tailwind ユーティリティクラス
- 膨大な data 属性（feature flags が body に埋め込み）

---

## 4. 設計上の意思決定ログ

### Q: パターン A/B の選択肢を用意するか？
**決定: しない。** 各カテゴリ1パターンのみ。手軽さ最優先。

### Q: JS を使うか？checkbox hack で JS なしにするか？
**決定: JS を軽量に使う。** 別モジュールに依存しなければ OK。ドロワーのトグルと TOC のスクロール追従に最小限の JS を同梱。

### Q: sawtooth-css に内包するか別パッケージか？
**決定: 別パッケージ (`@kotsumo/sawcase-css`)** だが、sawtooth-css を JSR 依存する。

### Q: LP レイアウトは v0.1.0 に含めるか？
**決定: 含める。** ただし β マーク付き。

### Q: エージェント向けドキュメントは？
**決定: AGENT.md を同梱。** 開発者のエージェントが読んで即座に正しいコードを生成できるようにする。Zag.js + Fresh 向けの TSX サンプルを含む。

### Q: polimoney_ledger の Layout.tsx を参考にするか？
**決定: しない。** ユーザーから「できが良くない」とのフィードバック。Gagatto と Supabase の管理画面を参考にする。

### Q: プレフィックス体系は？
**決定:**
- `sc-admin-*`: 管理画面
- `sc-docs-*`: ドキュメントページ
- `sc-lp-*`: LP（β）
- `sc-*`: 共通（認証、空状態、ローディング）

---

## 5. polimoney_ledger での使い方（検証用）

sawcase-css が完成したら、polimoney_ledger で以下のように使う：

```ts
// dev.ts
import { generateSawcaseCSS } from "@kotsumo/sawcase-css/generate";

await generateSawcaseCSS({
  output: "./static/sawcase.css",
  sawtooth: { output: "./static/sawtooth.css" },
  theme: { colors: { primary: "#6750A4" } },
});
```

```html
<!-- _app.tsx -->
<link rel="stylesheet" href="/sawtooth.css" />
<link rel="stylesheet" href="/sawcase.css" />
```

Layout.tsx (現在550行) を以下のように書き換え：
- `<div class="sc-admin-shell">` でラップ
- `<header class="sc-admin-header">` でヘッダー
- `<nav class="sc-admin-nav">` でサイドナビ
- `<main class="sc-admin-content">` でコンテンツ
- インラインスタイルと `<style>` タグを全て削除
