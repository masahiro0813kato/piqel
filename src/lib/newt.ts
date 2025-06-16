// src/lib/newt.ts
import "server-only"; // サーバー側でのみ実行されるようにする
import { createClient } from "newt-client-js";

// 環境変数がない場合のダミークライアント
class DummyClient {
  async getContents() {
    return { items: [] };
  }

  async getFirstContent() {
    return null;
  }
}

// 環境変数の確認
const spaceUid =
  process.env.NEWT_SPACE_UID || process.env.NEXT_PUBLIC_NEWT_SPACE_UID;
const token =
  process.env.NEWT_CDN_API_TOKEN || process.env.NEXT_PUBLIC_NEWT_CDN_API_TOKEN;

// クライアントの選択
export const newtClient =
  !spaceUid || !token
    ? new DummyClient()
    : createClient({
        spaceUid,
        token,
        apiType: "cdn",
      });

// コンテンツのタイプを定義
export type Work = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  content: string;
  technologies: string[];
  createdAt: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: {
    src: string;
    alt: string;
  };
  excerpt: string;
  tags: string[];
  publishedDate: string;
};

// すべての作品を取得する関数
export async function getWorks() {
  const { items } = await newtClient.getContents({
    appUid: "portfolio", // あなたのアプリUIDに置き換え
    modelUid: "work", // あなたのモデルUIDに置き換え
  });
  return items as Work[];
}

// スラッグで単一の作品を取得する関数
export async function getWorkBySlug(slug: string) {
  const work = await newtClient.getFirstContent({
    appUid: "portfolio",
    modelUid: "work",
    query: {
      slug: slug,
    },
  });
  return work as Work;
}

// カテゴリーで作品を取得する関数
export async function getWorksByCategory(category: string) {
  const { items } = await newtClient.getContents({
    appUid: "portfolio",
    modelUid: "work",
    query: {
      category: category,
    },
  });
  return items as Work[];
}

// ブログ関数
export async function getBlogPosts() {
  const { items } = await newtClient.getContents({
    appUid: "blog",
    modelUid: "article",
  });
  return items as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const post = await newtClient.getFirstContent({
    appUid: "portfolio",
    modelUid: "blog",
    query: {
      slug: slug,
    },
  });
  return post as BlogPost;
}
