/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SmartphoneResponse {
  id: number;
  name: string;
  slug: string;
  color: string;
  capacity: number;
  price: number;
  gallery: string[];
  large_desc?: string;
  small_desc?: string;
  active: boolean;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface SmartphoneListResponse {
  data: SmartphoneResponse[];
  total: number;
  skip: number;
  take: number;
}

export interface FiltersResponse {
  colors: string[];
  capacities: number[];
  minPrice: number;
  maxPrice: number;
}

export interface CreateSmartphoneDto {
  name: string;
  slug: string;
  color: string;
  capacity: number;
  price: number;
  gallery?: object;
  large_desc?: string;
  small_desc?: string;
  active?: string;
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UpdateSmartphoneDto {
  name?: string;
  slug?: string;
  color?: string;
  capacity?: number;
  price?: number;
  gallery?: object;
  large_desc?: string;
  small_desc?: string;
  active?: string;
}

export interface CreateOrderDto {
  email: string;
  phone: string;
  name: string;
  id?: number;
  checked?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  message: string;
  items: string[];
}

export interface OrderItemResponse {
  id: number;
  smartphoneId: number;
  quantity: number;
  orderId: number;
}

export interface OrderResponse {
  id: number;
  email: string;
  phone: string;
  name: string;
  message: string;
  checked: boolean;
  items: OrderItemResponse[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface OrderListResponse {
  data: OrderResponse[];
  total: number;
}

export type RegisterDto = object;

export interface AuthResponse {
  accessToken: string;
}

export type LoginDto = object;

export interface RefreshDto {
  /** Refresh token */
  refreshToken: string;
}

export interface BlogResponse {
  /** ID статьи */
  id: number;
  /** Заголовок статьи */
  title: string;
  /** URL-слаг статьи */
  slug: string;
  /** Содержание статьи */
  content: string;
  /** Краткое описание статьи */
  excerpt: string;
  /** Главное изображение */
  featuredImage?: string;
  /** Теги статьи */
  tags: string[];
  /** Автор статьи */
  author: string;
  /** Опубликована ли статья */
  published: boolean;
  /**
   * Дата публикации
   * @format date-time
   */
  publishedAt?: string;
  /** Количество просмотров */
  viewCount: number;
  /**
   * Дата создания
   * @format date-time
   */
  createdAt: string;
  /**
   * Дата обновления
   * @format date-time
   */
  updatedAt: string;
}

export interface BlogListResponse {
  /** Список статей */
  items: BlogResponse[];
  /** Общее количество статей */
  total: number;
  /** Количество пропущенных статей */
  skip: number;
}

export interface CreateBlogDto {
  /** Заголовок статьи */
  title: string;
  /** URL-слаг статьи */
  slug: string;
  /** Содержание статьи */
  content: string;
  /** Краткое описание статьи */
  excerpt?: string;
  /** Теги статьи */
  tags?: string[];
  /** Автор статьи */
  author?: string;
  /** Опубликована ли статья */
  published?: boolean;
  /** Главное изображение */
  featuredImage?: string;
}

export interface UpdateBlogDto {
  /** Заголовок статьи */
  title?: string;
  /** URL-слаг статьи */
  slug?: string;
  /** Содержание статьи */
  content?: string;
  /** Краткое описание статьи */
  excerpt?: string;
  /** Теги статьи */
  tags?: string[];
  /** Автор статьи */
  author?: string;
  /** Опубликована ли статья */
  published?: boolean;
  /** Главное изображение */
  featuredImage?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title IObchod
 * @version 1.0
 * @contact
 *
 * API documentation for smartphone store
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @summary Get hello message
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  smartphones = {
    /**
     * No description
     *
     * @tags Smartphones
     * @name SmartphoneControllerFindAll
     * @summary Get all smartphones with filters
     * @request GET:/smartphones
     */
    smartphoneControllerFindAll: (
      query: {
        /** Number of items to skip */
        skip?: string;
        /** Number of items to take */
        take?: string;
        /** Filter by color */
        color?: string;
        /** Filter by capacity */
        capacity?: string;
        /** Minimum price filter */
        minPrice?: string;
        /** Maximum price filter */
        maxPrice?: string;
        /** Search term */
        search?: string;
        /** Filter by name */
        name?: string;
        active: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<SmartphoneListResponse, void>({
        path: `/smartphones`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Smartphones
     * @name SmartphoneControllerCreate
     * @summary Create a new smartphone
     * @request POST:/smartphones
     * @secure
     */
    smartphoneControllerCreate: (data: CreateSmartphoneDto, params: RequestParams = {}) =>
      this.request<SmartphoneResponse, void>({
        path: `/smartphones`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Smartphones
     * @name SmartphoneControllerGetBySlug
     * @summary Get smartphone by slug
     * @request GET:/smartphones/slug/{slug}
     */
    smartphoneControllerGetBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<SmartphoneResponse, void>({
        path: `/smartphones/slug/${slug}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Smartphones
     * @name SmartphoneControllerGetRelatedSmartphones
     * @summary Get related smartphones
     * @request GET:/smartphones/related-smartphones/{slug}
     */
    smartphoneControllerGetRelatedSmartphones: (slug: string, params: RequestParams = {}) =>
      this.request<SmartphoneResponse[], void>({
        path: `/smartphones/related-smartphones/${slug}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Smartphones
     * @name SmartphoneControllerGetFilters
     * @summary Get available filters
     * @request GET:/smartphones/filters
     */
    smartphoneControllerGetFilters: (params: RequestParams = {}) =>
      this.request<FiltersResponse, void>({
        path: `/smartphones/filters`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Smartphones
     * @name SmartphoneControllerUpdate
     * @summary Update smartphone by ID
     * @request PATCH:/smartphones/{id}
     * @secure
     */
    smartphoneControllerUpdate: (
      id: string,
      data: UpdateSmartphoneDto,
      params: RequestParams = {}
    ) =>
      this.request<SmartphoneResponse, void>({
        path: `/smartphones/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Smartphones
     * @name SmartphoneControllerDelete
     * @summary Delete smartphone by ID
     * @request DELETE:/smartphones/{id}
     * @secure
     */
    smartphoneControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/smartphones/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  s3 = {
    /**
     * No description
     *
     * @tags S3
     * @name S3ControllerUploadFile
     * @summary Upload file to S3
     * @request POST:/s3/upload
     * @secure
     */
    s3ControllerUploadFile: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/s3/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags S3
     * @name S3ControllerDeleteFile
     * @summary Delete file from S3
     * @request DELETE:/s3/{key}
     * @secure
     */
    s3ControllerDeleteFile: (key: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/s3/${key}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags S3
     * @name S3ControllerGetSignedUrl
     * @summary Get signed URL for file
     * @request GET:/s3/signed-url/{key}
     * @secure
     */
    s3ControllerGetSignedUrl: (key: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/s3/signed-url/${key}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags S3
     * @name S3ControllerGetFileUrl
     * @summary Get public URL for file
     * @request GET:/s3/url/{key}
     */
    s3ControllerGetFileUrl: (key: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/s3/url/${key}`,
        method: 'GET',
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerCreate
     * @summary Create a new order
     * @request POST:/orders
     */
    orderControllerCreate: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<OrderResponse, void>({
        path: `/orders`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerGetAll
     * @summary Get all orders
     * @request GET:/orders
     * @secure
     */
    orderControllerGetAll: (params: RequestParams = {}) =>
      this.request<OrderListResponse, void>({
        path: `/orders`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerGetById
     * @summary Get order by ID
     * @request GET:/orders/{id}
     * @secure
     */
    orderControllerGetById: (id: string, params: RequestParams = {}) =>
      this.request<OrderResponse, void>({
        path: `/orders/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerUpdate
     * @summary Update order by ID
     * @request PATCH:/orders/{id}
     * @secure
     */
    orderControllerUpdate: (id: string, data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<OrderResponse, void>({
        path: `/orders/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerDelete
     * @summary Delete order by ID
     * @request DELETE:/orders/{id}
     * @secure
     */
    orderControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orders/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<AuthResponse, void>({
        path: `/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefresh
     * @summary Refresh access token using refresh token from body
     * @request POST:/auth/refresh
     */
    authControllerRefresh: (data: RefreshDto, params: RequestParams = {}) =>
      this.request<AuthResponse, void>({
        path: `/auth/refresh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @request POST:/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: 'POST',
        ...params,
      }),
  };
  blog = {
    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerFindAll
     * @summary Get all blog posts with filters
     * @request GET:/blog
     */
    blogControllerFindAll: (
      query?: {
        /** Number of items to skip */
        skip?: string;
        /** Number of items to take */
        take?: string;
        /** Search term */
        search?: string;
        /** Filter by tag */
        tag?: string;
        /** Filter by author */
        author?: string;
        /** Filter by published status */
        published?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BlogListResponse, void>({
        path: `/blog`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerCreate
     * @summary Create a new blog post
     * @request POST:/blog
     * @secure
     */
    blogControllerCreate: (data: CreateBlogDto, params: RequestParams = {}) =>
      this.request<BlogResponse, void>({
        path: `/blog`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerGetBySlug
     * @summary Get blog post by slug
     * @request GET:/blog/slug/{slug}
     */
    blogControllerGetBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<BlogResponse, void>({
        path: `/blog/slug/${slug}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerGetPopularPosts
     * @summary Get popular blog posts
     * @request GET:/blog/popular
     */
    blogControllerGetPopularPosts: (
      query?: {
        /** Number of posts to return */
        limit?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BlogResponse[], void>({
        path: `/blog/popular`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerGetRecentPosts
     * @summary Get recent blog posts
     * @request GET:/blog/recent
     */
    blogControllerGetRecentPosts: (
      query?: {
        /** Number of posts to return */
        limit?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BlogResponse[], void>({
        path: `/blog/recent`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerGetTags
     * @summary Get all tags with post counts
     * @request GET:/blog/tags
     */
    blogControllerGetTags: (params: RequestParams = {}) =>
      this.request<
        {
          name?: string;
          count?: number;
        }[],
        void
      >({
        path: `/blog/tags`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerUpdate
     * @summary Update blog post by ID
     * @request PATCH:/blog/{id}
     * @secure
     */
    blogControllerUpdate: (id: string, data: UpdateBlogDto, params: RequestParams = {}) =>
      this.request<BlogResponse, void>({
        path: `/blog/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogControllerDelete
     * @summary Delete blog post by ID
     * @request DELETE:/blog/{id}
     * @secure
     */
    blogControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/blog/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
}
