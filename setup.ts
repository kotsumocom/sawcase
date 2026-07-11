/**
 * @module
 * Sawcase — AI エージェント向けスキルセットアップ
 *
 * プロジェクトの .agents/skills/sawcase/ に SKILL.md をコピーして、
 * AI エージェント（Gemini, Copilot 等）が sawcase の使い方を認識できるようにする。
 *
 * @example
 * ```bash
 * deno run -A jsr:@kotsumo/sawcase/setup
 * ```
 */

import * as path from "@std/path";

const SKILL_SOURCE = new URL(
  "./.agents/skills/sawcase/SKILL.md",
  import.meta.url,
);

async function setup() {
  const cwd = Deno.cwd();
  const targetDir = path.join(cwd, ".agents", "skills", "sawcase");
  const targetFile = path.join(targetDir, "SKILL.md");

  // 既に存在するか確認
  try {
    await Deno.stat(targetFile);
    console.log("ℹ️  .agents/skills/sawcase/SKILL.md は既に存在します。");

    const answer = prompt("上書きしますか？ (y/N)");
    if (answer?.toLowerCase() !== "y") {
      console.log("⏭️  スキップしました。");
      return;
    }
  } catch {
    // ファイルが存在しない → 続行
  }

  // SKILL.md を読み込み
  let skillContent: string;
  try {
    skillContent = await (await fetch(SKILL_SOURCE)).text();
  } catch {
    // fetch できない場合はローカルファイルから読む
    const moduleDir = path.dirname(path.fromFileUrl(import.meta.url));
    const localPath = path.join(
      moduleDir,
      ".agents",
      "skills",
      "sawcase",
      "SKILL.md",
    );
    skillContent = await Deno.readTextFile(localPath);
  }

  // ディレクトリ作成 + ファイル書き込み
  await Deno.mkdir(targetDir, { recursive: true });
  await Deno.writeTextFile(targetFile, skillContent);

  console.log("✅ AI エージェント用スキルをセットアップしました！");
  console.log(`   📄 ${path.relative(cwd, targetFile)}`);
  console.log("");
  console.log(
    "   → AI エージェントが sawcase の使い方を認識するようになります。",
  );
}

setup();
