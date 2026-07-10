---
name: sawcase
description: |
  Sawcase — Deno Fresh 専用 SaaS スターターキットのコンポーネントガイド。
  管理画面、ドキュメント、LP、認証、規約、エラー、料金、ブログの
  レイアウトと Zag.js ベースのインタラクティブコンポーネントの使い方。
---

# Sawcase コンポーネントガイド

## インストール

```bash
deno add @kotsumo/sawcase
```

依存パッケージ（sawtooth-css, @deno/gfm, Zag.js, lucide-preact）は自動解決されます。

## インポート

```tsx
import { AdminShell, AdminPage, Clipboard } from "@kotsumo/sawcase/components";
```

## コンポーネント一覧

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

### ドキュメント

```tsx
import { DocsLayout, Markdown } from "@kotsumo/sawcase/components";

export default async function DocsPage({ params }) {
  const md = await Deno.readTextFile(`docs/${params.slug}.md`);
  return (
    <DocsLayout
      brand="My SaaS"
      sidebarGroups={[
        { label: "はじめに", items: [
          { label: "概要", href: "/docs", active: true },
          { label: "インストール", href: "/docs/install" },
        ]},
      ]}
    >
      <Markdown content={md} />
    </DocsLayout>
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
        <button type="submit" class="st-button st-button--filled">ログイン</button>
      </form>
    </AuthCard>
  );
}
```

### 規約ページ

```tsx
import { LegalPage } from "@kotsumo/sawcase/components";

export default async function Terms() {
  const md = await Deno.readTextFile("legal/terms.md");
  return (
    <LegalPage
      brand="My SaaS"
      title="利用規約"
      lastUpdated="2026年1月1日"
      content={md}
      nav={[
        { label: "利用規約", href: "/legal/terms", active: true },
        { label: "プライバシーポリシー", href: "/legal/privacy" },
      ]}
    />
  );
}
```

### エラーページ

```tsx
import { ErrorPage } from "@kotsumo/sawcase/components";
import { FileQuestion } from "lucide-preact";

export default function NotFound() {
  return (
    <ErrorPage
      code={404}
      title="ページが見つかりません"
      message="お探しのページは存在しないか、移動した可能性があります。"
      icon={FileQuestion}
    />
  );
}
```

### 料金ページ

```tsx
import { PricingPage } from "@kotsumo/sawcase/components";

export default function Pricing() {
  return (
    <PricingPage
      brand="My SaaS"
      title="料金プラン"
      subtitle="あなたに最適なプランを選択"
      plans={[
        { name: "Free", price: "¥0/月", features: ["機能A", "機能B"], ctaHref: "/signup" },
        { name: "Pro", price: "¥980/月", features: ["全機能", "優先サポート"], recommended: true, ctaHref: "/signup?plan=pro" },
      ]}
    />
  );
}
```

### コピーボタン（Island として使用）

```tsx
// islands/CopyInstall.tsx
import { Clipboard } from "@kotsumo/sawcase/components";

export default function CopyInstall() {
  return <Clipboard value="deno add @kotsumo/sawcase" />;
}
```

## CSS

内部で sawtooth-css のデザイントークンを使用。
CSS は `sawcase.css` としてビルド可能：

```bash
deno task build
```

## 依存パッケージ

- `@kotsumo/sawtooth-css` — デザイントークン + コンポーネント CSS
- `lucide-preact` — アイコン
- `@deno/gfm` — Markdown レンダリング
- `@zag-js/*` — インタラクティブ UI（clipboard, dialog, tabs, toast, menu, tooltip, accordion）
- `preact` — コンポーネントランタイム（Fresh が提供）

## ディレクトリ構成

```
sawcase/
├── src/
│   ├── components/         ← Preact コンポーネント
│   │   ├── admin/         AdminShell, AdminNav, AdminPage
│   │   ├── auth/          AuthCard
│   │   ├── blog/          BlogLayout
│   │   ├── docs/          DocsLayout, Markdown
│   │   ├── error/         ErrorPage
│   │   ├── interactive/   Clipboard, Dialog, Tabs, Toast, Menu, Tooltip, Accordion
│   │   ├── landing/       LandingPage
│   │   ├── legal/         LegalPage
│   │   ├── pricing/       PricingPage
│   │   └── mod.ts         バレルエクスポート
│   ├── css/               ← CSS ソース
│   └── js/                ← JS ソース
├── mod.ts                 ← パッケージエントリ
└── deno.json
```
