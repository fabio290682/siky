
import fetch from "node-fetch";

export interface FetchOptions {
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  timeout?: number;
}

export async function fetchData(url: string, options: FetchOptions = {}) {
  const {
    headers = {},
    method = 'GET',
    body,
    timeout = 30000
  } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // @ts-ignore
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'IntegradorAPI/1.0',
        ...headers
      },
      body,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const text = await response.text();
      console.error(`API Error for URL ${url}: ${response.status} - ${text}`);
      throw new Error(`Erro na API (${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Timeout: A requisição demorou mais que o esperado');
    }
    throw error;
  }
}

export async function fetchWithRetry(
  url: string, 
  options: FetchOptions = {}, 
  maxRetries = 3
) {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchData(url, options);
    } catch (error) {
      lastError = error;
      console.log(`Tentativa ${i + 1} falhou para ${url}. Tentando novamente em ${1000 * (i + 1)}ms...`);
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  
  throw lastError;
}
