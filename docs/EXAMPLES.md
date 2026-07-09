# Sawcase — 実践例

## 1. 管理画面 — ユーザー一覧 CRUD

```tsx
// routes/users/index.tsx
import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    // ユーザー一覧を取得
    const users: User[] = await fetchUsers();
    return ctx.render({ users });
  },
};

export default function UsersPage({ data }: PageProps<{ users: User[] }>) {
  return (
    <div class="sc-admin-page sc-admin-page--wide">
      <div class="sc-admin-page__header">
        <div>
          <h2 class="sc-admin-page__title">ユーザー一覧</h2>
          <p class="sc-admin-page__description">
            {data.users.length} 件のユーザーが登録されています
          </p>
        </div>
        <div class="sc-admin-page__actions">
          <a href="/users/new" class="st-button st-button--filled">新規追加</a>
        </div>
      </div>

      <div class="sc-admin-page__body">
        {data.users.length === 0
          ? (
            <div class="sc-empty">
              <div class="sc-empty__icon">👤</div>
              <h3 class="sc-empty__title">ユーザーがいません</h3>
              <p class="sc-empty__description">
                「新規追加」ボタンからユーザーを登録してください
              </p>
            </div>
          )
          : (
            <table class="st-table">
              <thead>
                <tr>
                  <th>名前</th>
                  <th>メールアドレス</th>
                  <th>ロール</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span class="st-badge">{user.role}</span>
                    </td>
                    <td>
                      <a href={`/users/${user.id}`} class="st-button st-button--text">
                        編集
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}
```

## 2. 管理画面 — ダッシュボード

```tsx
// routes/dashboard.tsx
export default function DashboardPage() {
  return (
    <div class="sc-admin-page">
      <div class="sc-admin-page__header">
        <div>
          <h2 class="sc-admin-page__title">ダッシュボード</h2>
        </div>
      </div>

      <div class="sc-admin-stats">
        <div class="sc-admin-stats__card">
          <div class="sc-admin-stats__label">総収入</div>
          <div class="sc-admin-stats__value">¥1,234,567</div>
          <div class="sc-admin-stats__trend sc-admin-stats__trend--up">
            +12.5%
          </div>
        </div>
        <div class="sc-admin-stats__card">
          <div class="sc-admin-stats__label">ユーザー数</div>
          <div class="sc-admin-stats__value">1,234</div>
          <div class="sc-admin-stats__trend sc-admin-stats__trend--up">
            +5.2%
          </div>
        </div>
        <div class="sc-admin-stats__card">
          <div class="sc-admin-stats__label">エラー率</div>
          <div class="sc-admin-stats__value">0.3%</div>
          <div class="sc-admin-stats__trend sc-admin-stats__trend--down">
            -2.1%
          </div>
        </div>
      </div>

      <div class="sc-admin-page__body">
        {/* グラフ等 */}
      </div>
    </div>
  );
}
```

## 3. ドキュメントページ — 記事

```tsx
// routes/docs/[slug].tsx
export default function DocsArticlePage({ data }: PageProps) {
  return (
    <article class="sc-docs-article">
      <h1 class="sc-docs-article__title">導入ガイド</h1>
      <div class="sc-docs-article__body">
        <h2 id="install">インストール</h2>
        <p>以下のコマンドでインストールできます：</p>
        <pre><code>deno add jsr:@kotsumo/sawcase</code></pre>

        <h2 id="usage">使い方</h2>
        <p>CSS と JS を HTML に読み込みます：</p>
        <pre><code>{`<link rel="stylesheet" href="/sawcase.css" />
<script src="/sawcase.js"></script>`}</code></pre>

        <h3 id="admin">管理画面</h3>
        <p>管理画面のレイアウトは以下のクラスを使います：</p>

        <table>
          <thead>
            <tr>
              <th>クラス</th>
              <th>説明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>sc-admin-shell</code></td>
              <td>全画面シェル</td>
            </tr>
            <tr>
              <td><code>sc-admin-header</code></td>
              <td>ヘッダー</td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          <p>sawcase は sawtooth-css のコンポーネントと組み合わせて使います。</p>
        </blockquote>
      </div>

      <div class="sc-docs-article__nav">
        <a href="/docs/intro" class="sc-docs-article__prev">← はじめに</a>
        <a href="/docs/api" class="sc-docs-article__next">API リファレンス →</a>
      </div>
    </article>
  );
}
```

## 4. 認証画面 — サインアップ

```tsx
// routes/signup.tsx
export default function SignupPage() {
  return (
    <div class="sc-auth">
      <div class="sc-auth__card">
        <div class="sc-auth__header">
          <img src="/logo.svg" class="sc-auth__logo" />
          <h1 class="sc-auth__title">アカウント作成</h1>
        </div>
        <div class="sc-auth__body">
          <form method="POST">
            <div class="st-input-group">
              <label class="st-input__label">名前</label>
              <input type="text" name="name" class="st-input" required />
            </div>
            <div class="st-input-group">
              <label class="st-input__label">メールアドレス</label>
              <input type="email" name="email" class="st-input" required />
            </div>
            <div class="st-input-group">
              <label class="st-input__label">パスワード</label>
              <input type="password" name="password" class="st-input" required />
            </div>
            <button type="submit" class="st-button st-button--filled" style="width: 100%; margin-top: 16px;">
              アカウント作成
            </button>
          </form>
        </div>
        <div class="sc-auth__footer">
          すでにアカウントをお持ちの方は <a href="/login">ログイン</a>
        </div>
      </div>
    </div>
  );
}
```

## 5. Islands — Admin ナビ初期化

```tsx
// islands/AdminNav.tsx
import { useEffect } from "preact/hooks";
import { initAdminNav } from "@kotsumo/sawcase/js";

export default function AdminNavIsland() {
  useEffect(() => {
    initAdminNav("admin-nav", "admin-overlay");
  }, []);

  return null; // このコンポーネントは UI を描画しない
}
```

使い方:

```tsx
// routes/_layout.tsx
import AdminNavIsland from "../islands/AdminNav.tsx";

export default function AdminLayout({ Component }: PageProps) {
  return (
    <div class="sc-admin-shell">
      {/* ... レイアウト ... */}
      <AdminNavIsland />
    </div>
  );
}
```
