---
name: sawcase
description: |
  Sawcase — Deno Fresh 専用 SaaS スターターキット。
  テーマ設定 → デザイントークン → レイアウト → UI コンポーネント → Preact コンポーネント
  の統合パッケージ。管理画面、ドキュメント、LP、認証、規約、エラー、料金、ブログの
  レイアウトと 57 種の Zag.js UI コンポーネント CSS を提供。
---

# Sawcase コンポーネントガイド

## インストール

```bash
deno add @kotsumo/sawcase
```

## CSS の利用

### 方法 1: import（推奨 — Fresh 2 / Vite）

```tsx
// routes/_app.tsx
import "@kotsumo/sawcase/styles";
```

### 方法 2: デフォルト CSS をコピー

```bash
cp node_modules/.deno/@kotsumo+sawcase@1.0.0/dist/sawcase.css static/
```

### 方法 3: カスタムテーマで生成

```ts
// sawcase.config.ts
import type { SawcaseConfig } from "@kotsumo/sawcase";

export default {
  theme: { colors: { primary: "#2563eb" } },
  output: "./static/sawcase.css",
} satisfies SawcaseConfig;
```

```bash
deno task sawcase:theme
```

## コンポーネント

```tsx
import { AdminShell, AdminPage, Clipboard } from "@kotsumo/sawcase/components";
```

### レイアウト

| コンポーネント | 用途 | CSS プレフィックス |
|-------------|------|----------------|
| `<AdminShell>` | 管理画面のシェル | `sc-admin-*` |
| `<AdminNav>` | サイドナビゲーション | `sc-admin-nav*` |
| `<AdminPage>` | ページコンテナ | `sc-admin-page*` |
| `<DocsLayout>` | ドキュメントサイト | `sc-docs-*` |
| `<Markdown>` | GFM レンダリング | `markdown-body` |
| `<AuthCard>` | 認証カード | `sc-auth*` |
| `<LandingPage>` | LP | `sc-lp-*` |
| `<LegalPage>` | 規約ページ | `sc-legal-*` |
| `<ErrorPage>` | エラーページ | `sc-error-*` |
| `<PricingPage>` | 料金ページ | `sc-pricing-*` |
| `<BlogLayout>` | ブログ | `sc-blog-*` |

### インタラクティブ（Zag.js ベース）

| コンポーネント | 用途 |
|-------------|------|
| `<Clipboard>` | コピーボタン |
| `<Dialog>` | モーダル |
| `<Tabs>` | タブ切り替え |
| `<Toast>` | 通知 |
| `<Menu>` | ドロップダウン |
| `<Tooltip>` | ツールチップ |
| `<Accordion>` | アコーディオン |

## CSS アーキテクチャ

### デザイントークン（--sc-sys-*, --sc-ref-*）

HCT カラースペースで自動生成。ライト/ダークモード対応。

```css
/* 例: ボタンの背景色 */
background-color: var(--sc-sys-color-primary);
color: var(--sc-sys-color-on-primary);
```

### ライト/ダークモード

```html
<!-- ライトモード強制 -->
<html data-theme="light">

<!-- ダークモード強制 -->
<html data-theme="dark">

<!-- OS 設定に従う（デフォルト） -->
<html>
```

### レイアウト CSS クラス

構造はクラス名、状態は data 属性：

```html
<div class="sc-admin-shell" data-sc-sidebar="open">
  <nav class="sc-admin-nav">...</nav>
  <main class="sc-admin-content">...</main>
</div>
```

### UI コンポーネント CSS（Zag.js 対応）

57 種の UI コンポーネント CSS。`[data-scope]` セレクタで Zag.js と自動連携。

## 使用例

### 管理画面

```tsx
import { AdminShell, AdminPage } from "@kotsumo/sawcase/components";
import { LayoutDashboard, Users, Settings } from "lucide-preact";

export default function Dashboard() {
  return (
    <AdminShell brand="My SaaS" nav={[
      { icon: LayoutDashboard, label: "ダッシュボード", href: "/admin", active: true },
      { icon: Users, label: "ユーザー", href: "/admin/users" },
      { icon: Settings, label: "設定", href: "/admin/settings" },
    ]}>
      <AdminPage title="ダッシュボード" description="売上・ユーザー数の概要">
        <p>コンテンツ</p>
      </AdminPage>
    </AdminShell>
  );
}
```

### 認証

```tsx
import { AuthCard } from "@kotsumo/sawcase/components";

export default function LoginPage() {
  return (
    <AuthCard title="ログイン" subtitle="アカウントにログイン">
      <form method="post">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit" data-scope="button" data-part="root">ログイン</button>
      </form>
    </AuthCard>
  );
}
```

## 依存パッケージ

- `@material/material-color-utilities` — HCT カラー生成
- `lucide-preact` — アイコン
- `@deno/gfm` — Markdown レンダリング
- `@zag-js/*` — インタラクティブ UI
- `preact` — コンポーネントランタイム（Fresh が提供）

## ディレクトリ構成

```
sawcase/
├── mod.ts                    ← 型定義 + エクスポート
├── generate.ts               ← CSS 生成エンジン
├── dist/
│   └── sawcase.css           ← ビルド済みデフォルト CSS
├── src/
│   ├── tokens/               ← デザイントークン生成 TS
│   ├── css/
│   │   ├── base/             ← リセット + グローバル
│   │   ├── components/       ← 57 UI コンポーネント CSS
│   │   ├── layouts/          ← レイアウト CSS
│   │   └── utilities/
│   ├── components/           ← Preact コンポーネント
│   └── js/                   ← 軽量 JS
└── deno.json
```
