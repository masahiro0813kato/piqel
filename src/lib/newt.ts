// src/lib/newt.ts
import "server-only"; // サーバー側でのみ実行されるようにする
import { createClient } from "newt-client-js";

// Newtクライアントの作成
export const newtClient = createClient({
  spaceUid: process.env.NEXT_PUBLIC_NEWT_SPACE_UID || "",
  token: process.env.NEXT_PUBLIC_NEWT_CDN_API_TOKEN || "",
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
