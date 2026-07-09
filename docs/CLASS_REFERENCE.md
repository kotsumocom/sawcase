# Sawcase — クラスリファレンス

## 管理画面 (`sc-admin-*`)

### シェル
| クラス | 説明 |
|--------|------|
| `sc-admin-shell` | 全画面シェル (`100vh`, flex column) |

### ヘッダー
| クラス | 説明 |
|--------|------|
| `sc-admin-header` | 固定ヘッダー (48px, sticky) |
| `sc-admin-header__brand` | ブランド領域 (ロゴ + アプリ名) |
| `sc-admin-header__logo` | ロゴ画像 (24x24) |
| `sc-admin-header__app-name` | アプリ名テキスト |
| `sc-admin-header__breadcrumb` | パンくず領域 |
| `sc-admin-header__actions` | アクション領域 (右端) |
| `sc-admin-header__menu-btn` | ハンバーガーボタン (モバイルのみ表示) |

### ナビゲーション
| クラス | 説明 |
|--------|------|
| `sc-admin-body` | ボディ (サイドナビ + コンテンツの横並び) |
| `sc-admin-nav` | サイドナビゲーション |
| `sc-admin-nav--open` | モバイルドロワー展開 |
| `sc-admin-nav--collapsed` | アイコンのみモード |
| `sc-admin-nav__group` | ナビグループ |
| `sc-admin-nav__group-label` | グループラベル |
| `sc-admin-nav__link` | ナビリンク |
| `sc-admin-nav__link--active` | アクティブ状態 |
| `sc-admin-nav__link--danger` | 危険アクション (ログアウト等) |
| `sc-admin-nav__icon` | ナビアイコン (20x20) |
| `sc-admin-nav__footer` | ナビフッター |
| `sc-admin-content` | メインコンテンツ領域 |

### オーバーレイ
| クラス | 説明 |
|--------|------|
| `sc-admin-overlay` | モバイルオーバーレイ |
| `sc-admin-overlay--visible` | オーバーレイ表示 |

### ページ構造
| クラス | 説明 |
|--------|------|
| `sc-admin-page` | ページコンテナ (max-width: 72rem) |
| `sc-admin-page--narrow` | 狭幅 (max-width: 42rem) — フォーム用 |
| `sc-admin-page--wide` | 広幅 (max-width: 80rem) — テーブル用 |
| `sc-admin-page--full` | 全幅 |
| `sc-admin-page__header` | ページヘッダー (タイトル + アクション) |
| `sc-admin-page__title` | ページタイトル |
| `sc-admin-page__description` | ページ説明 |
| `sc-admin-page__actions` | ページアクション |
| `sc-admin-page__body` | ページボディ |

### Stats カード
| クラス | 説明 |
|--------|------|
| `sc-admin-stats` | Stats カードグリッド |
| `sc-admin-stats__card` | 個別カード |
| `sc-admin-stats__label` | ラベル |
| `sc-admin-stats__value` | 値 |
| `sc-admin-stats__trend` | トレンド |
| `sc-admin-stats__trend--up` | 上昇トレンド (緑) |
| `sc-admin-stats__trend--down` | 下降トレンド (赤) |

---

## ドキュメント (`sc-docs-*`)

### シェル
| クラス | 説明 |
|--------|------|
| `sc-docs-shell` | 全画面シェル |

### ヘッダー
| クラス | 説明 |
|--------|------|
| `sc-docs-header` | 固定ヘッダー |
| `sc-docs-header__brand` | ブランド領域 |
| `sc-docs-header__logo` | ロゴ画像 |
| `sc-docs-header__app-name` | アプリ名 |
| `sc-docs-header__nav` | トップナビ |
| `sc-docs-header__link` | ナビリンク |
| `sc-docs-header__link--active` | アクティブリンク |
| `sc-docs-header__actions` | アクション領域 |
| `sc-docs-header__menu-btn` | ハンバーガーボタン |

### サイドバー
| クラス | 説明 |
|--------|------|
| `sc-docs-body` | ボディ (3カラム構造) |
| `sc-docs-sidebar` | 左サイドバー |
| `sc-docs-sidebar--open` | モバイルドロワー展開 |
| `sc-docs-sidebar__group` | グループ |
| `sc-docs-sidebar__group-label` | グループラベル |
| `sc-docs-sidebar__link` | サイドバーリンク |
| `sc-docs-sidebar__link--active` | アクティブリンク |
| `sc-docs-content` | メインコンテンツ |

### 記事
| クラス | 説明 |
|--------|------|
| `sc-docs-article` | 記事コンテナ |
| `sc-docs-article__title` | 記事タイトル |
| `sc-docs-article__body` | 記事本文 (prose スタイル適用) |
| `sc-docs-article__nav` | 前後ナビ |
| `sc-docs-article__prev` | 前のページリンク |
| `sc-docs-article__next` | 次のページリンク |

### TOC (目次)
| クラス | 説明 |
|--------|------|
| `sc-docs-toc` | 右サイドバー目次 (デスクトップのみ表示) |
| `sc-docs-toc__title` | 目次タイトル |
| `sc-docs-toc__link` | 目次リンク |
| `sc-docs-toc__link--active` | アクティブリンク (スクロール追従) |

---

## 共通 (`sc-*`)

### 認証
| クラス | 説明 |
|--------|------|
| `sc-auth` | 認証画面 (中央配置) |
| `sc-auth__card` | 認証カード |
| `sc-auth__header` | カードヘッダー |
| `sc-auth__logo` | ロゴ (48x48) |
| `sc-auth__title` | タイトル |
| `sc-auth__body` | カードボディ |
| `sc-auth__footer` | カードフッター |

### 空状態
| クラス | 説明 |
|--------|------|
| `sc-empty` | 空状態コンテナ |
| `sc-empty__icon` | アイコン |
| `sc-empty__title` | タイトル |
| `sc-empty__description` | 説明テキスト |

### ローディング
| クラス | 説明 |
|--------|------|
| `sc-loading` | ローディングコンテナ |
| `sc-loading--fullscreen` | 全画面ローディング |
| `sc-loading__spinner` | スピナー (デフォルト 40px) |
| `sc-loading__spinner--sm` | 小スピナー (24px) |
| `sc-loading__spinner--lg` | 大スピナー (56px) |

---

## LP (`sc-lp-*`) [β]

### ヘッダー
| クラス | 説明 |
|--------|------|
| `sc-lp-header` | LP ヘッダー (sticky + backdrop-filter) |
| `sc-lp-header__inner` | 内部コンテナ |
| `sc-lp-header__brand` | ブランド |
| `sc-lp-header__nav` | ナビゲーション |
| `sc-lp-header__cta` | CTA ボタン領域 |

### ヒーロー
| クラス | 説明 |
|--------|------|
| `sc-lp-hero` | ヒーローセクション |
| `sc-lp-hero__inner` | 内部コンテナ |
| `sc-lp-hero__headline` | 大見出し |
| `sc-lp-hero__subhead` | サブヘッド |
| `sc-lp-hero__actions` | CTA ボタン群 |

### セクション
| クラス | 説明 |
|--------|------|
| `sc-lp-section` | 汎用セクション (交互背景色) |
| `sc-lp-section__inner` | 内部コンテナ |
| `sc-lp-section__title` | セクションタイトル |
| `sc-lp-section__subtitle` | サブタイトル |

### フィーチャー
| クラス | 説明 |
|--------|------|
| `sc-lp-features` | フィーチャーセクション |
| `sc-lp-features__grid` | カードグリッド |
| `sc-lp-features__card` | フィーチャーカード |
| `sc-lp-features__card-icon` | アイコン |
| `sc-lp-features__card-title` | タイトル |
| `sc-lp-features__card-description` | 説明 |

### フッター
| クラス | 説明 |
|--------|------|
| `sc-lp-footer` | フッター |
| `sc-lp-footer__inner` | 内部コンテナ |
| `sc-lp-footer__group` | リンクグループ |
| `sc-lp-footer__group-title` | グループタイトル |
| `sc-lp-footer__link` | フッターリンク |
| `sc-lp-footer__copyright` | コピーライト |

---

## CSS カスタムプロパティ

| プロパティ | デフォルト | 説明 |
|-----------|-----------|------|
| `--sc-admin-header-height` | `48px` | 管理画面ヘッダー高さ |
| `--sc-admin-nav-width` | `13rem` | サイドナビ幅 |
| `--sc-admin-nav-width-collapsed` | `3rem` | 折り畳みナビ幅 |
| `--sc-docs-header-height` | `48px` | ドキュメントヘッダー高さ |
| `--sc-docs-sidebar-width` | `15rem` | サイドバー幅 |
| `--sc-docs-toc-width` | `12rem` | TOC 幅 |
| `--sc-docs-content-max-width` | `50rem` | コンテンツ最大幅 |
| `--sc-auth-card-width` | `24rem` | 認証カード幅 |
| `--sc-lp-content-max-width` | `72rem` | LP コンテンツ最大幅 |

## JS API

| 関数 | 説明 |
|------|------|
| `sawcase.initAdminNav(navId?, overlayId?)` | モバイルドロワーナビの初期化 |
| `sawcase.initDocsToc(tocSelector?, headingSelector?)` | TOC スクロール追従の初期化 |
