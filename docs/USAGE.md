# Sawcase — 使い方

## インストール

```bash
# Deno プロジェクトの場合
deno add jsr:@kotsumo/sawcase
```

または deno.json に直接追記:

```json
{
  "imports": {
    "@kotsumo/sawcase": "jsr:@kotsumo/sawcase@^0.1.0"
  }
}
```

> **Note**: sawcase は sawtooth-css に依存しています。sawcase をインストールすると sawtooth-css も自動的にインストールされます。

## CSS + JS の生成

### dev.ts に組み込む（推奨）

```ts
import { generateSawcaseCSS } from "@kotsumo/sawcase/generate";

await generateSawcaseCSS({
  output: "./static/sawcase.css",
  jsOutput: "./static/sawcase.js",
  sawtooth: { output: "./static/sawtooth.css" },
  theme: { colors: { primary: "#6750A4" } },
});
```

### オプション

| オプション | 型 | 説明 |
|-----------|------|------|
| `output` | `string` | CSS 出力先パス（必須） |
| `jsOutput` | `string?` | JS 出力先パス（省略時は CSS と同ディレクトリに `sawcase.js`） |
| `sawtooth.output` | `string?` | sawtooth CSS を同時生成する場合の出力先 |
| `theme` | `object?` | sawtooth テーマ設定 |
| `layouts` | `SawcaseLayout[]?` | 含めるレイアウト（省略時は全レイアウト） |

### レイアウトの選択

必要なレイアウトだけを含めてファイルサイズを削減できます:

```ts
await generateSawcaseCSS({
  output: "./static/sawcase.css",
  layouts: ["admin", "common"], // docs と landing を除外
});
```

## HTML に読み込む

```html
<head>
  <!-- sawtooth-css（コンポーネント） -->
  <link rel="stylesheet" href="/sawtooth.css" />
  <!-- sawcase（レイアウト） -->
  <link rel="stylesheet" href="/sawcase.css" />
</head>
<body>
  <!-- ... -->

  <!-- sawcase JS（ページ末尾） -->
  <script src="/sawcase.js"></script>
  <script>
    sawcase.initAdminNav();
  </script>
</body>
```

## Fresh (Deno) での使い方

### _app.tsx

```tsx
import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/sawtooth.css" />
        <link rel="stylesheet" href="/sawcase.css" />
      </head>
      <body>
        <Component />
        <script src="/sawcase.js"></script>
      </body>
    </html>
  );
}
```

### Islands での JS 初期化

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
