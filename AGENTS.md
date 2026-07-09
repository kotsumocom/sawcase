# AI エージェントへの指示書

このファイルは、AI アシスタントが sawcase-css プロジェクトで作業する上での中心的なコンテキストを定義します。

## プロジェクト概要

sawcase-css は、**sawtooth-css (MD3 コンポーネント CSS)** の上に載る**レイアウト CSS ライブラリ**です。
管理画面・ドキュメントページ・LP の骨格を CSS クラスとして提供します。

## 技術スタック

- **言語/ランタイム**: Deno (TypeScript)
- **ビルド**: Deno スクリプト (CSS ファイル結合 + 出力)
- **配布**: JSR (`@kotsumo/sawcase-css`)
- **依存**: `@kotsumo/sawtooth-css` (JSR 依存)
- **対象フレームワーク**: Deno Fresh + Zag.js + Preact

## 設計方針

1. **手軽さ最優先**: カスタマイズ性とのトレードオフでは手軽さを選ぶ
2. **AI エージェント対応**: AGENT.md を同梱し、LLM が正しいコードを即座に生成できる
3. **セマンティック HTML**: `<header>`, `<nav>`, `<main>`, `<aside>` を適切に使用
4. **選択肢を増やさない**: 各カテゴリ1パターンのみ
5. **sawtooth-css 専用**: 他の CSS フレームワークに依存しない

## 実装計画

詳細は `IMPLEMENTATION_PLAN.md` を参照してください。
実装手順2（deno.json は作成済み）から開始します。

## 参照すべきリポジトリ

### sawtooth-css（姉妹プロジェクト）
- パス: `C:\Users\oscar\Documents\work\kotsumo\github\sawtooth-css`
- JSR: `@kotsumo/sawtooth-css@0.1.3`
- 構造: `src/css/` に CSS モジュール、`src/tokens/` にデザイントークン生成
- ビルド: `src/build.ts` で @import を解決して1ファイルに結合
- generate.ts: テーマ設定に基づいてカスタム CSS 生成

### polimoney_ledger（最初の利用プロジェクト）
- パス: `C:\Users\oscar\Documents\work\dd2030\github\polimoney_ledger`
- 現在 sawtooth-css を使用中
- Layout.tsx (550行) を sawcase-css で書き換えることが検証目標

## 背景コンテキスト

詳細は `CONTEXT.md` を参照してください。
