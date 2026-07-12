export interface DangerZoneProps {
  /** タイトル */
  title: string;
  /** 説明 */
  description: string;
  /** ボタンラベル */
  buttonLabel: string;
  /** アクション */
  onAction?: () => void;
}

/**
 * 危険ゾーン。破壊的操作の確認 UI。
 *
 * ```tsx
 * <DangerZone
 *   title="組織を削除"
 *   description="すべてのデータが完全に削除されます"
 *   buttonLabel="組織を削除"
 *   onAction={() => ...}
 * />
 * ```
 */
export function DangerZone({
  title,
  description,
  buttonLabel,
  onAction,
}: DangerZoneProps) {
  return (
    <div class="sc-danger-zone" role="alert">
      <div class="sc-danger-zone__content">
        <div>
          <div class="sc-danger-zone__label">{title}</div>
          <div class="sc-danger-zone__desc">{description}</div>
        </div>
        <button
          class="sc-ui-button sc-ui-button--outlined sc-danger-zone__btn"
          type="button"
          onClick={onAction}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
