// src/utils/date.ts
/**
 * 日付文字列を安全にフォーマットする関数
 * @param dateString 日付文字列またはDate型
 * @param fallback 日付が無効な場合の代替テキスト
 * @returns フォーマット済みの日付文字列
 */
export function formatDate(
  dateString: string | Date | null | undefined,
  fallback: string = "投稿日不明"
): string {
  // 日付が未定義または空の場合はフォールバック値を返す
  if (!dateString) {
    return fallback;
  }

  try {
    // 文字列か日付オブジェクトかによって処理を分ける
    const date = dateString instanceof Date ? dateString : new Date(dateString);

    // 無効な日付の場合はフォールバック値を返す
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date value: ${dateString}`);
      return fallback;
    }

    // 日本語形式で日付をフォーマット
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return fallback;
  }
}
