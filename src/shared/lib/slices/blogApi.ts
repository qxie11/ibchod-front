import { baseApi } from './baseApi';

export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  publishedAt: string;
  tags: string[];
  featuredImage: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  items: BlogArticle[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateBlogArticleRequest {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  published: boolean;
  featuredImage?: File;
}

export interface UpdateBlogArticleRequest {
  id: number;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  published?: boolean;
  featuredImage?: File;
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogArticles: builder.query<
      BlogResponse,
      { page?: number; limit?: number; published?: boolean }
    >({
      query: ({ page = 1, limit = 10, published }) => ({
        url: '/blog',
        params: {
          page,
          limit,
          ...(published !== undefined && { published }),
        },
      }),
      providesTags: ['Blog'],
    }),

    getBlogArticleBySlug: builder.query<BlogArticle, string>({
      query: (slug) => `/blog/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Blog', id: slug }],
    }),

    createBlogArticle: builder.mutation<BlogArticle, FormData>({
      query: (body) => ({
        url: '/blog',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),

    updateBlogArticle: builder.mutation<BlogArticle, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/blog/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => ['Blog', { type: 'Blog', id }],
    }),

    deleteBlogArticle: builder.mutation<void, number>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogArticlesQuery,
  useGetBlogArticleBySlugQuery,
  useCreateBlogArticleMutation,
  useUpdateBlogArticleMutation,
  useDeleteBlogArticleMutation,
} = blogApi;
