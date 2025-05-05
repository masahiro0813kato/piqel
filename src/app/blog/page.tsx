// src/app/blog/page.tsx
import "@/app/globals.css";
import { newtClient } from "@/lib/newt";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/date";

// 型定義は同じなので省略（元のコードから使用）
type Author = {
  _id: string;
  name: string;
};

type Tag = {
  _id: string;
  name: string;
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
  metadata: Record<string, unknown>;
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

export default async function BlogPage() {
  try {
    // ブログ記事を取得
    const response = await newtClient.getContents<BlogArticle>({
      appUid: "blog",
      modelUid: "article",
      query: {
        order: ["-_sys.raw.publishedAt"], // 公開日の新しい順
      },
    });

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          最新の記事や情報をお届けします
        </p>

        {response.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">記事がありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {response.items.map((article) => (
              <Link
                href={`/blog/${article.slug}`}
                key={article._id}
                className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full transform hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage.src}
                      alt={article.coverImage.altText || article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">
                        No image
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    {formatDate(article._sys.raw.publishedAt)}
                  </div>

                  <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {article.meta.description ||
                      article.body.replace(/<[^>]*>/g, "").substring(0, 150)}
                    ...
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                      続きを読む
                    </span>

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex gap-2">
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex gap-2">
                            {Array.isArray(article.tags) &&
                              article.tags
                                .slice(0, 2)
                                .map(
                                  (
                                    tag: { _id: string; name: string } | string
                                  ) => (
                                    <span
                                      key={
                                        typeof tag === "string" ? tag : tag._id
                                      }
                                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                                    >
                                      {typeof tag === "string" ? tag : tag.name}
                                    </span>
                                  )
                                )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ページネーション（元のコードと同じ） */}
        {response.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: response.totalPages }, (_, i) => (
                <Link
                  key={i}
                  href={`/blog?page=${i + 1}`}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    (response.page || 1) === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">ブログ</h1>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-800 dark:text-red-300">
          <h3 className="text-lg font-medium mb-2">エラーが発生しました</h3>
          <p>
            ブログ記事の読み込み中にエラーが発生しました。後ほど再度お試しください。
          </p>
        </div>
      </div>
    );
  }
}
