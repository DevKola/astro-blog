import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get("query");

  //Handle if query not present
  if (query === null) {
    return new Response(
      JSON.stringify({
        error: "Query param is missin",
      }),
      {
        status: 400, //Bad request
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const allBlogArticles: CollectionEntry<"blog">[] =
    await getCollection("blog");

  const searchResult = allBlogArticles.filter((article) => {
    const titleMatch = article.data.title
      .toLowerCase()
      .includes(query!.toLowerCase());

    const bodyMatch = article.body.toLowerCase().includes(query!.toLowerCase());

    const slugMatch = article.slug.toLowerCase().includes(query!.toLowerCase());

    return titleMatch || bodyMatch || slugMatch;
  });

  return new Response(
    JSON.stringify({
      searchResult,
    }),
    {
      status: 200, //Bad request
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
