// src/lib/newt.ts
import { createClient } from 'newt-client-js';

// Newtクライアントの作成
export const newtClient = createClient({
  spaceUid: process.env.NEXT_PUBLIC_NEWT_SPACE_UID || '',
  token: process.env.NEXT_PUBLIC_NEWT_CDN_API_TOKEN || '',
  apiType: 'cdn',
});

// 各種データ取得関数をここに追加していきます