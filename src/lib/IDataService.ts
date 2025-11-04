export interface IDataService {
	get<T>(endpoint: string, options?: any): Promise<T>;
	post<T>(endpoint: string, body: any, options?: any): Promise<T>;
	put<T>(endpoint: string, body: any, options?: any): Promise<T>;
	patch<T>(endpoint: string, body: any, options?: any): Promise<T>;
	delete<T>(endpoint: string, options?: any): Promise<T>;
}
