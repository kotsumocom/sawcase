export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface UserAvatarProps {
  /** ユーザー名（フォールバック表示用） */
  name: string;
  /** 画像 URL */
  src?: string;
  /** サイズ（デフォルト: "md"） */
  size?: AvatarSize;
  /** 追加クラス */
  class?: string;
}

const SIZES: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 36,
  lg: 48,
};

/**
 * ユーザーアバター。画像またはイニシャルフォールバック。
 *
 * ```tsx
 * <UserAvatar name="田中太郎" size="sm" />
 * <UserAvatar src="/avatar.jpg" name="鈴木花子" />
 * ```
 */
export function UserAvatar({
  name,
  src,
  size = "md",
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
      ) : (
        <span class="sc-avatar__fallback">{initial}</span>
      )}
    </span>
  );
}
