import { IDataService } from "./IDataService";

type RequestOptions = RequestInit & { body?: any };

export class ApiError extends Error {
	public readonly status: number;
	public readonly payload: any | null;
	constructor(status: number, message?: string, payload?: any) {
		super(message || `HTTP ${status}`);
		this.name = "ApiError";
		this.status = status;
		this.payload = payload ?? null;
	}
}

class ApiService implements IDataService {
	private readonly baseUrl: string;

	constructor() {
		this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
	}

	private async request<T>(
		endpoint: string,
		options: RequestOptions = {}
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;

		const config: RequestInit = {
			...options,
			headers: {
				...((options && (options as any).headers) || {}),
			},
		};

		// Serializar body sólo si no es FormData y existe
		if (options.body && !(options.body instanceof FormData)) {
			config.body = JSON.stringify(options.body);
			(config.headers as Record<string, string>)["Content-Type"] =
				"application/json";
		} else if (options.body instanceof FormData) {
			config.body = options.body;
			// no setear content-type para FormData
		}

		const response = await fetch(url, config);

		// No content
		if (response.status === 204) {
			// devolver un objeto vacío tipado
			return {} as T;
		}

		// leer texto primero para manejar JSON inválido
		const text = await response.text();

		let data: any = null;
		if (text) {
			try {
				data = JSON.parse(text);
			} catch {
				// si no es JSON, dejar el texto crudo
				data = text;
			}
		}

		// Si no fue OK, lanzar un ApiError con payload para que el componente lo maneje
		if (!response.ok) {
			throw new ApiError(
				response.status,
				(data && data.message) || response.statusText,
				data
			);
		}

		return data as T;
	}

	public get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "GET" });
	}
	public post<T>(
		endpoint: string,
		body: any,
		options?: RequestOptions
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "POST", body });
	}
	public put<T>(
		endpoint: string,
		body: any,
		options?: RequestOptions
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "PUT", body });
	}
	public patch<T>(
		endpoint: string,
		body: any,
		options?: RequestOptions
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "PATCH", body });
	}
	public delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "DELETE" });
	}
}

export const dataService: IDataService = new ApiService();
export type { RequestOptions };
