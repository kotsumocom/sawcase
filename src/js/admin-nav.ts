/**
 * Admin ナビゲーション — モバイルドロワーのトグル
 *
 * ハンバーガーボタンのクリックでサイドナビをドロワーとして表示/非表示する。
 * オーバーレイのクリックで閉じる。
 */

/**
 * 管理画面のモバイルナビゲーションドロワーを初期化する。
 *
 * @param navId - ナビゲーション要素の ID（デフォルト: "admin-nav"）
 * @param overlayId - オーバーレイ要素の ID（デフォルト: "admin-overlay"）
 */
export function initAdminNav(
  navId: string = "admin-nav",
  overlayId: string = "admin-overlay",
): void {
  const nav = document.getElementById(navId);
  const overlay = document.getElementById(overlayId);

  if (!nav) {
    console.warn(`[sawcase] ナビ要素が見つかりません: #${navId}`);
    return;
  }

  /** ドロワーを開く */
  function open(): void {
    nav!.classList.add("sc-admin-nav--open");
    overlay?.classList.add("sc-admin-overlay--visible");
    document.body.style.overflow = "hidden";
  }

  /** ドロワーを閉じる */
  function close(): void {
    nav!.classList.remove("sc-admin-nav--open");
    overlay?.classList.remove("sc-admin-overlay--visible");
    document.body.style.overflow = "";
  }

  /** トグル */
  function toggle(): void {
    if (nav!.classList.contains("sc-admin-nav--open")) {
      close();
    } else {
      open();
    }
  }

  // ハンバーガーボタンにイベントを設定
  const menuBtn = document.querySelector(".sc-admin-header__menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", toggle);
  }

  // オーバーレイクリックで閉じる
  if (overlay) {
    overlay.addEventListener("click", close);
  }

  // ESC キーで閉じる
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && nav!.classList.contains("sc-admin-nav--open")) {
      close();
    }
  });

  // リサイズ時にデスクトップ幅ならドロワーを閉じる
  globalThis.addEventListener("resize", () => {
    if (globalThis.innerWidth > 768) {
      close();
    }
  });
}
