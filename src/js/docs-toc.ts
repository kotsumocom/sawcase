/**
 * ドキュメント TOC — スクロール追従ハイライト
 *
 * IntersectionObserver でスクロール位置を監視し、
 * 現在表示中のセクションに対応する TOC リンクをハイライトする。
 */

/**
 * ドキュメント TOC のスクロール追従を初期化する。
 *
 * @param tocSelector - TOC コンテナのセレクタ（デフォルト: ".sc-docs-toc"）
 * @param headingSelector - 監視する見出しのセレクタ（デフォルト: "h2, h3"）
 */
export function initDocsToc(
  tocSelector: string = ".sc-docs-toc",
  headingSelector: string = "h2, h3",
): void {
  const toc = document.querySelector(tocSelector);
  if (!toc) return;

  const tocLinks = toc.querySelectorAll(".sc-docs-toc__link");
  if (tocLinks.length === 0) return;

  // 記事内の見出し要素を取得
  const article = document.querySelector(".sc-docs-article__body");
  if (!article) return;

  const headings = article.querySelectorAll(headingSelector);
  if (headings.length === 0) return;

  // IntersectionObserver でスクロール位置を監視
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (!id) continue;

          // 全リンクから active を除去
          tocLinks.forEach((link) => {
            link.classList.remove("sc-docs-toc__link--active");
          });

          // 対応するリンクに active を追加
          const activeLink = toc.querySelector(
            `.sc-docs-toc__link[href="#${id}"]`,
          );
          if (activeLink) {
            activeLink.classList.add("sc-docs-toc__link--active");
          }
        }
      }
    },
    {
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    },
  );

  headings.forEach((heading) => {
    if (heading.id) {
      observer.observe(heading);
    }
  });
}
