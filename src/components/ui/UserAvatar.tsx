import { User } from "lucide-preact";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface UserAvatarProps {
  /** ユーザー名（フォールバック表示用） */
  name: string;
  /** 画像 URL */
  src?: string;
  /** サイズ（デフォルト: "md"） */
  size?: AvatarSize;
  /** フォールバック時にアイコン表示（デフォルト: true） */
  showIcon?: boolean;
  /** 追加クラス */
  class?: string;
}

const SIZES: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 36,
  lg: 48,
};

const ICON_SIZES: Record<AvatarSize, number> = {
  xs: 14,
  sm: 18,
  md: 20,
  lg: 26,
};

/**
 * ユーザーアバター。画像 / Lucide User アイコン / イニシャルフォールバック。
 *
 * ```tsx
 * <UserAvatar name="田中太郎" size="sm" />
 * <UserAvatar src="/avatar.jpg" name="鈴木花子" />
 * <UserAvatar name="鈴木花子" showIcon={false} /> // イニシャルフォールバック
 * ```
 */
export function UserAvatar({
  name,
  src,
  size = "md",
  showIcon = true,
  class: className,
}: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const px = SIZES[size];

  return (
    <span
      class={`sc-avatar sc-avatar--${size}${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={name}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          class="sc-avatar__img"
          width={px}
          height={px}
        />
      ) : showIcon ? (
        <span class="sc-avatar__fallback sc-avatar__fallback--icon">
          <User size={ICON_SIZES[size]} />
        </span>
      ) : (
        <span class="sc-avatar__fallback">{initial}</span>
      )}
    </span>
  );
}
