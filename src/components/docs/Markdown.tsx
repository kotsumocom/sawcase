import { CSS, render } from "@deno/gfm";

/** Markdown の props */
export interface MarkdownProps {
  /** Markdown テキスト */
  content: string;
  /** data-color-mode（デフォルト: "light"） */
  colorMode?: "light" | "dark" | "auto";
}

/**
 * Markdown テキストを GFM で HTML レンダリングするコンポーネント。
 * @deno/gfm を内部で使用。ユーザーは Markdown テキストを渡すだけ。
 */
export function Markdown({ content, colorMode = "light" }: MarkdownProps) {
  const html = render(content);

  return (
    <article class="sc-docs-article">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        class="markdown-body"
        data-color-mode={colorMode}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
