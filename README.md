# Sawcase

Deno Fresh 専用の統合 UI キット。テーマ設定からレイアウト、UIコンポーネントまでをワンパッケージで提供します。

## 特徴

- **ワンパッケージ** — テーマ・レイアウト・UIコンポーネントを `@kotsumo/sawcase` ひとつで
- **HCT カラー生成** — プライマリカラーを指定するだけで Material Design 3 準拠の配色を自動生成
- **57 種の UI コンポーネント CSS** — Zag.js 対応の `[data-scope]` セレクタ
- **レイアウト CSS** — 管理画面・ドキュメント・LP・認証・規約・エラー・料金・ブログ
- **Preact コンポーネント** — レイアウト + インタラクティブ UI
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
│   │   ├── components/   ← 57 UI コンポーネント CSS
│   │   ├── layouts/      ← レイアウト CSS
│   │   └── utilities/
│   ├── components/       ← Preact コンポーネント
│   └── js/               ← 軽量 JS
└── deno.json
```

## ライセンス

MIT
