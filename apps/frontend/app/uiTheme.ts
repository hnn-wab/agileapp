// UIテーマ定義（色・余白・角丸・影などの共通値）
export const uiTheme = {
  color: {
    primary: '#24292f', // GitHubヘッダー/テキスト
    secondary: '#57606a', // GitHubサブテキスト
    accent: '#0969da', // GitHub青リンク
    bg: '#ffffff', // メイン背景
    card: '#ffffff', // カード背景
    header: '#f6f8fa', // ヘッダー背景
    border: '#d0d7de', // 枠線
    text: '#24292f', // メインテキスト
    muted: '#6e7781', // サブテキスト
  },
  radius: {
    sm: '0.375rem', // rounded-md
    md: '0.5rem',   // rounded-lg
    full: '9999px', // rounded-full
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(27,31,35,0.04)',
    md: '0 3px 6px 0 rgba(27,31,35,0.06)',
    lg: '0 8px 24px 0 rgba(27,31,35,0.08)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
  },
  font: {
    heading: '700',
    body: '400',
    mono: 'Menlo, monospace',
  },
};
