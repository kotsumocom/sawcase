# Sawcase

Deno Fresh 専用の統合 UI キット。テーマ設定からレイアウト、UIコンポーネントまでをワンパッケージで提供します。

## 特徴

- **ワンパッケージ** — テーマ・レイアウト・UIコンポーネントを `@kotsumo/sawcase` ひとつで
- **HCT カラー生成** — プライマリカラーを指定するだけで Material Design 3 準拠の配色を自動生成
- **59 種の UI コンポーネント CSS** — Zag.js 対応の `[data-scope]` セレクタ
- **65 の Preact コンポーネント** — Zag.js ラッパー 49 種 + UI 4 種 + レイアウト 12 種
- **ライト/ダークモード** — `data-theme` 属性で切替

## インストール

```bash
deno add @kotsumo/sawcase
```

### AI エージェント向けセットアップ（オプション）

AI エージェント（Gemini, Copilot 等）が sawcase の使い方を認識するようにするには:

```bash
deno run -A jsr:@kotsumo/sawcase/setup
```

`.agents/skills/sawcase/SKILL.md` がプロジェクトにコピーされ、エージェントが sawcase のコンポーネントや CSS の使い方をガイドできるようになります。

## CSS の利用

### デフォルトテーマ（即利用可）

```tsx
// routes/_app.tsx — dist/sawcase.css のパスを取得
import { SAWCASE_CSS_PATH } from "@kotsumo/sawcase/styles";
```

または `deno task build` で生成した `dist/sawcase.css` をコピー:

```html
<link rel="stylesheet" href="/sawcase.css" />
```

### カスタムテーマ

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

### レイアウトコンポーネント (12)

| コンポーネント | 説明 |
|---|---|
| AdminShell | 管理画面シェル（サイドバー＋ヘッダー＋コンテンツ） |
| AdminNav | 管理画面ナビゲーション |
| AdminPage | 管理画面ページラッパー |
| DocsLayout | ドキュメントレイアウト |
| DocsSidebarGroup | ドキュメントサイドバーグループ |
| Markdown | Markdown レンダラー |
| AuthCard | 認証カード |
| LandingPage | ランディングページ |
| LegalPage | 規約ページ |
| ErrorPage | エラーページ |
| PricingPage | 料金ページ |
| BlogLayout | ブログレイアウト |

### インタラクティブコンポーネント — Zag.js (49)

| コンポーネント | 説明 |
|---|---|
| Accordion | アコーディオン |
| AngleSlider | 角度スライダー |
| Avatar | アバター（フォールバック付き） |
| Carousel | カルーセル |
| CascadeSelect | カスケード選択 (Beta) |
| Checkbox | チェックボックス |
| Clipboard | クリップボード |
| Collapsible | 折りたたみ |
| ColorPicker | カラーピッカー |
| Combobox | オートコンプリート |
| DatePicker | 日付選択 |
| Dialog | ダイアログ |
| Drawer | ドロワー (Beta) |
| Editable | インライン編集 |
| FileUpload | ファイルアップロード |
| FloatingPanel | フローティングパネル |
| HoverCard | ホバーカード |
| ImageCropper | 画像クロッピング |
| Listbox | リストボックス |
| Marquee | マーキー |
| Menu | メニュー（ネスト・コンテキスト対応） |
| NavigationMenu | ナビゲーションメニュー |
| NumberInput | 数値入力 |
| Pagination | ページネーション |
| PasswordInput | パスワード入力 |
| PinInput | PIN コード入力 |
| Popover | ポップオーバー |
| Presence | 表示/非表示アニメーション |
| Progress | プログレスバー（Linear/Circular） |
| QrCode | QR コード |
| RadioGroup | ラジオグループ |
| RatingGroup | 評価（星） |
| ScrollArea | カスタムスクロール |
| SegmentedControl | セグメントコントロール |
| Select | セレクト |
| SignaturePad | 電子署名パッド |
| Slider | スライダー（Range 対応） |
| Splitter | パネル分割 |
| Steps | ステップウィザード |
| Switch | スイッチ |
| Tabs | タブ |
| TagsInput | タグ入力 |
| Timer | タイマー |
| Toast | トースト通知 |
| Toggle | トグルボタン |
| ToggleGroup | トグルグループ |
| Tooltip | ツールチップ |
| Tour | プロダクトツアー |
| TreeView | ツリービュー |

### UI コンポーネント (4)

| コンポーネント | 説明 |
|---|---|
| DataTable | データテーブル |
| FormField | フォームフィールドラッパー |
| StatCard | KPI/統計カード |
| EmptyState | 空状態 |

## ディレクトリ構成

```
sawcase/
├── mod.ts                ← 型定義 + エクスポート
├── generate.ts           ← CSS 生成エンジン
├── styles.ts             ← デフォルト CSS パス
├── dist/
│   └── sawcase.css       ← ビルド済みデフォルト CSS
├── src/
│   ├── tokens/           ← デザイントークン生成 TS
│   ├── css/
│   │   ├── base/         ← リセット + グローバル
│   │   ├── components/   ← 59 UI コンポーネント CSS
│   │   ├── layouts/      ← レイアウト CSS
│   │   └── utilities/
│   ├── components/
│   │   ├── admin/        ← 管理画面コンポーネント
│   │   ├── docs/         ← ドキュメントコンポーネント
│   │   ├── auth/         ← 認証コンポーネント
│   │   ├── interactive/  ← Zag.js ラッパー (49)
│   │   └── ui/           ← 独自 UI コンポーネント (4)
│   └── js/               ← 軽量 JS
└── deno.json
```

## ライセンス

MIT
