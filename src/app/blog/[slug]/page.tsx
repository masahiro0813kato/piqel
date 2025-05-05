// src/app/blog/[slug]/page.tsx
import "@/app/globals.css";
import { newtClient } from "@/lib/newt";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { notFound } from "next/navigation";

// 型定義
type Author = {
  _id: string;
  name: string;
  // 他の著者関連フィールド
};

type Tag = {
  _id: string;
  name: string;
  // 他のタグ関連フィールド
};

type Image = {
  _id: string;
  src: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  width: number;
  height: number;
  title: string;
  altText: string;
  description: string;
  metadata: Record<string, any>;
};

type BlogArticle = {
  _id: string;
  _sys: {
    createdAt: string;
    updatedAt: string;
    customOrder: number;
    raw: {
      createdAt: string;
      updatedAt: string;
      firstPublishedAt: string;
      publishedAt: string;
    };
  };
  title: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage?: Image;
  };
  body: string;
  coverImage?: Image;
  author: string | Author;
  tags: string[] | Tag[];
};

// メタデータを動的に生成
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const article = await newtClient.getFirstContent<BlogArticle>({
      appUid: "blog",
      modelUid: "article",
      query: {
        slug: params.slug,
      },
    });

    if (!article) {
      return {
        title: "記事が見つかりません",
        description: "お探しの記事は見つかりませんでした。",
      };
    }

    return {
      title: article.meta.title || article.title,
      description: article.meta.description || "",
      openGraph: article.meta.ogImage
        ? {
            images: [
              {
                url: article.meta.ogImage.src,
                width: article.meta.ogImage.width,
                height: article.meta.ogImage.height,
                alt: article.meta.ogImage.altText || article.title,
              },
            ],
          }
        : undefined,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "ブログ記事",
      description: "ブログ記事の詳細ページです。",
    };
  }
}

// ページコンポーネント
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // 特定のスラッグの記事を取得
    const article = await newtClient.getFirstContent<BlogArticle>({
      appUid: "blog",
      modelUid: "article",
      query: {
        slug: params.slug,
      },
    });

    // 記事が見つからない場合は404ページを表示
    if (!article) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 記事ヘッダー */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              ブログ一覧に戻る
            </Link>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="text-gray-600 mb-4">
              {formatDate(article._sys.raw.publishedAt)}
            </div>

            {/* タグ */}
            {Array.isArray(article.tags) && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag: any) => (
                  <span
                    key={typeof tag === "string" ? tag : tag._id}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {typeof tag === "string" ? tag : tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* カバー画像 */}
          {article.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-10">
              <Image
                src={article.coverImage.src}
                alt={article.coverImage.altText || article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* 記事本文 */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* 著者情報（もし著者が参照オブジェクトの場合） */}
          {typeof article.author !== "string" && article.author && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div>
                  <h3 className="font-medium">著者</h3>
                  <p>{article.author.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* 記事フッター */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              ブログ一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-800 dark:text-red-300">
            <h3 className="text-lg font-medium mb-2">エラーが発生しました</h3>
            <p>
              記事の読み込み中にエラーが発生しました。後ほど再度お試しください。
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center text-red-800 dark:text-red-300 hover:underline"
            >
              ブログ一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
