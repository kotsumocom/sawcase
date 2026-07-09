/**
 * Sawcase デモサーバー
 *
 * dist/ の CSS/JS と demo/pages/ の HTML を配信する。
 *
 * 使い方: deno task preview
 */

const PORT = 8080;

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
};

const ROOT_DIR = new URL("..", import.meta.url).pathname.replace(/^\//, "");

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let pathname = url.pathname;

  // ルートはデモ一覧
  if (pathname === "/") {
    const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sawcase デモ</title>
  <style>
    body { font-family: system-ui; max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
    a { display: block; padding: 0.75rem; margin: 0.5rem 0; background: #f3f0ff; border-radius: 8px; text-decoration: none; color: #6750a4; }
    a:hover { background: #e8def8; }
  </style>
</head>
<body>
  <h1>🪚 Sawcase デモ</h1>
  <p>sawcase のレイアウトデモページ：</p>
  <a href="/pages/admin.html">📊 管理画面 (sc-admin-*)</a>
  <a href="/pages/docs.html">📖 ドキュメント (sc-docs-*)</a>
  <a href="/pages/auth.html">🔒 認証画面 (sc-auth)</a>
  <a href="/pages/landing.html">🚀 ランディングページ (sc-lp-*) [β]</a>
</body>
</html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // dist/ ファイルを /dist/ パスで配信
  if (pathname.startsWith("/dist/")) {
    pathname = pathname.replace("/dist/", "dist/");
  }
  // demo/pages/ ファイルを /pages/ パスで配信
  else if (pathname.startsWith("/pages/")) {
    pathname = `demo${pathname}`;
  }

  // ファイルを読み込み
  const filePath = `${ROOT_DIR}${pathname}`;
  try {
    const file = await Deno.readFile(filePath);
    const ext = pathname.substring(pathname.lastIndexOf("."));
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}

console.log(`🪚 Sawcase デモサーバー起動: http://localhost:${PORT}`);
Deno.serve({ port: PORT }, handler);
