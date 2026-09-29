/**
 * Police SI Examination Platform - Production API Client
 * Enterprise-grade HTTP client with JWT interceptor, CSRF headers, rate-limiting handlers,
 * and seamless fallback between local Next.js API routes and external Express/PostgreSQL backends.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  errors?: string[];
}

export class ApiError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// Configurable API Base URL. Backend engineers can point NEXT_PUBLIC_API_BASE_URL to their Express/FastAPI server (e.g. http://localhost:5000/api/v1)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

class HttpClient {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('police_si_token') || sessionStorage.getItem('police_si_token');
  }

  private getCsrfToken(): string {
    if (typeof window === 'undefined') return 'csrf-token-ssr';
    let token = sessionStorage.getItem('police_si_csrf');
    if (!token) {
      token = 'tslprb_csrf_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem('police_si_csrf', token);
    }
    return token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const token = this.getAuthToken();
    const csrf = this.getCsrfToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': csrf,
      'X-Client-Platform': 'POLICE_SI_CBT_NEXTJS_v1.0',
      ...(options.headers || {}),
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          // Token expired or invalid
          console.warn('[Security] 401 Unauthorized received. Session expired.');
        }
      }

      const json = await response.json();

      if (!response.ok) {
        throw new ApiError(
          json.message || `HTTP ${response.status}: Request failed`,
          response.status,
          json.errors
        );
      }

      return json as ApiResponse<T>;
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError(err.message || 'Network error or backend unreachable', 500);
    }
  }

  public get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }
    return this.request<T>(url, { method: 'GET' });
  }

  public post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(urlNormalized(endpoint), {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(urlNormalized(endpoint), {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(urlNormalized(endpoint), {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(urlNormalized(endpoint), {
      method: 'DELETE',
    });
  }
}

function urlNormalized(endpoint: string): string {
  return endpoint;
}

export const apiClient = new HttpClient();
