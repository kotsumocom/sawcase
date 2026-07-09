# Sawcase — AI エージェント向けガイド

## 概要

Sawcase は sawtooth-css (MD3 コンポーネント) の上に載るレイアウト CSS + 軽量 JS ライブラリ。
管理画面・ドキュメントページ・LP の骨格をクラスベースで提供する。

## 前提

- **sawtooth-css (`st-*`)**: コンポーネント（ボタン、入力、カード等）
- **sawcase (`sc-*`)**: レイアウト（シェル、ヘッダー、ナビ、ページ構造等）
- **フレームワーク**: Deno Fresh + Zag.js + Preact

## ルール

1. コンポーネントには `st-*` クラスを使う
2. レイアウトには `sc-*` クラスを使う
3. セマンティック HTML を使う（`<header>`, `<nav>`, `<main>`, `<aside>`）
4. インラインスタイルや `<style>` タグは使わない

## プレフィックス体系

| プレフィックス | 用途 |
|--------------|------|
| `sc-admin-` | 管理画面（ダッシュボード、CRUD、設定） |
| `sc-docs-` | ドキュメント（技術ドキュメント、ヘルプ） |
| `sc-lp-` | LP（プロダクトLP、マーケティング）[β] |
| `sc-` | 共通（認証、空状態、ローディング） |

## 管理画面テンプレート

```tsx
// routes/_layout.tsx (Fresh)
import { type PageProps } from "$fresh/server.ts";

export default function AdminLayout({ Component }: PageProps) {
  return (
    <div class="sc-admin-shell">
      <header class="sc-admin-header">
        <div class="sc-admin-header__brand">
          <img src="/logo.svg" class="sc-admin-header__logo" />
          <span class="sc-admin-header__app-name">MyApp</span>
        </div>
        <div class="sc-admin-header__breadcrumb">
          {/* パンくず */}
        </div>
        <button class="sc-admin-header__menu-btn" aria-label="メニュー">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div class="sc-admin-header__actions">
          {/* 検索、通知、ユーザーメニュー */}
        </div>
      </header>

      <div class="sc-admin-body">
        <nav class="sc-admin-nav" id="admin-nav">
          <div class="sc-admin-nav__group">
            <div class="sc-admin-nav__group-label">メニュー</div>
            <a href="/dashboard" class="sc-admin-nav__link sc-admin-nav__link--active">
              <svg class="sc-admin-nav__icon">...</svg>
              <span>ダッシュボード</span>
            </a>
            <a href="/users" class="sc-admin-nav__link">
              <svg class="sc-admin-nav__icon">...</svg>
              <span>ユーザー</span>
            </a>
          </div>
          <div class="sc-admin-nav__footer">
            <a href="/settings" class="sc-admin-nav__link">設定</a>
          </div>
        </nav>

        <div class="sc-admin-overlay" id="admin-overlay"></div>

        <main class="sc-admin-content">
          <Component />
        </main>
      </div>
    </div>
  );
}
```

## ページテンプレート

```tsx
// routes/users/index.tsx
export default function UsersPage() {
  return (
    <div class="sc-admin-page sc-admin-page--wide">
      <div class="sc-admin-page__header">
        <div>
          <h2 class="sc-admin-page__title">ユーザー一覧</h2>
          <p class="sc-admin-page__description">登録されたユーザーの管理</p>
        </div>
        <div class="sc-admin-page__actions">
          <button class="st-button st-button--filled">新規追加</button>
        </div>
      </div>
      <div class="sc-admin-page__body">
        {/* テーブル等 */}
      </div>
    </div>
  );
}
```

## ドキュメントテンプレート

```tsx
// routes/docs/_layout.tsx
export default function DocsLayout({ Component }: PageProps) {
  return (
    <div class="sc-docs-shell">
      <header class="sc-docs-header">
        <div class="sc-docs-header__brand">
          <span class="sc-docs-header__app-name">MyApp Docs</span>
        </div>
        <nav class="sc-docs-header__nav">
          <a href="/docs" class="sc-docs-header__link sc-docs-header__link--active">ガイド</a>
          <a href="/api" class="sc-docs-header__link">API</a>
        </nav>
      </header>

      <div class="sc-docs-body">
        <nav class="sc-docs-sidebar" id="docs-sidebar">
          <div class="sc-docs-sidebar__group">
            <div class="sc-docs-sidebar__group-label">はじめに</div>
            <a href="/docs/intro" class="sc-docs-sidebar__link sc-docs-sidebar__link--active">導入</a>
            <a href="/docs/install" class="sc-docs-sidebar__link">インストール</a>
          </div>
        </nav>

        <main class="sc-docs-content">
          <Component />
        </main>

        <aside class="sc-docs-toc">
          <div class="sc-docs-toc__title">このページの目次</div>
          {/* TOC リンク */}
        </aside>
      </div>
    </div>
  );
}
```

## 認証画面テンプレート

```tsx
// routes/login.tsx
export default function LoginPage() {
  return (
    <div class="sc-auth">
      <div class="sc-auth__card">
        <div class="sc-auth__header">
          <img src="/logo.svg" class="sc-auth__logo" />
          <h1 class="sc-auth__title">ログイン</h1>
        </div>
        <div class="sc-auth__body">
          <div class="st-input-group">
            <label class="st-input__label">メールアドレス</label>
            <input type="email" class="st-input" />
          </div>
          <div class="st-input-group">
            <label class="st-input__label">パスワード</label>
            <input type="password" class="st-input" />
          </div>
          <button class="st-button st-button--filled" style="width: 100%">ログイン</button>
        </div>
        <div class="sc-auth__footer">
          アカウントをお持ちでない方は <a href="/signup">新規登録</a>
        </div>
      </div>
    </div>
  );
}
```

## JS の使い方

```html
<!-- HTML に追加 -->
<script src="/sawcase.js"></script>
<script>
  // ドロワーナビの初期化
  sawcase.initAdminNav();

  // TOC スクロール追従の初期化
  sawcase.initDocsToc();
</script>
```

または Fresh islands で：

```tsx
// islands/AdminNav.tsx
import { useEffect } from "preact/hooks";
import { initAdminNav } from "@kotsumo/sawcase/js";

export default function AdminNavIsland() {
  useEffect(() => {
    initAdminNav();
  }, []);

  return null;
}
```
