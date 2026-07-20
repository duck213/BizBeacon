export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

// Fallback Mock Data for Vercel when Backend is not accessible
const DEFAULT_MOCK_DATA: Record<string, any> = {
  '/api/v1/search/history': [
    { id: "1", keyword: "Q1 Tech Trends", date: "2024-03-01" },
    { id: "2", keyword: "Retail Growth", date: "2024-03-02" },
    { id: "3", keyword: "SaaS Analysis", date: "2024-03-05" }
  ],
  '/api/v1/dashboard/summary': {
    trendAlert: { title: "AI Adoption in Retail", description: "Analysis indicates a 45% surge in automated inventory management." },
    competitorIntel: { title: "Acme Corp Shift", description: "Recent job postings suggest a pivot to decentralized cloud." },
    marketSentiment: { title: "Consumer Confidence", description: "Optimistic outlook for Q3 IT spending.", value: "68%" }
  },
  '/api/v1/reports/1': {
    title: "Q1 Tech Trends Analysis",
    impactScore: 9.2,
    summary: "The landscape of mid-market retail is experiencing a rapid shift towards AI-driven automation. Our analysis indicates a 45% surge in adoption over the last quarter...",
    chartData: [10, 20, 30, 45, 60],
    competitors: ["Acme Corp", "Globex"]
  }
};

const getLocalStorageData = () => {
  if (typeof window === 'undefined') return DEFAULT_MOCK_DATA;
  const stored = localStorage.getItem('bizbeacon_mock_data');
  return stored ? JSON.parse(stored) : DEFAULT_MOCK_DATA;
};

const setLocalStorageData = (data: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bizbeacon_mock_data', JSON.stringify(data));
  }
};

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[Fallback Mode] Failed to fetch ${endpoint}, returning mock data. Error:`, error);
    
    const mockData = getLocalStorageData();

    if (endpoint === '/api/v1/reports/generate' && options?.method === 'POST') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const newId = `mock_${Date.now()}`;
      
      mockData[`/api/v1/reports/${newId}`] = {
        title: `${body.keyword} - View: ${body.role || '전략기획'}`,
        impactScore: parseFloat((Math.random() * (10 - 6) + 6).toFixed(1)),
        summary: `This is a locally generated fallback report for "${body.keyword}" tailored for ${body.role}. The backend API might be offline, so this is saved in your browser's local storage.`,
        chartData: [15, 25, 45, 60, 85],
        competitors: ["Local Competitor A", "Local Competitor B"]
      };
      
      const currentHistory = mockData['/api/v1/search/history'] || [];
      mockData['/api/v1/search/history'] = [
        { id: newId, keyword: body.keyword, date: new Date().toISOString().split('T')[0] },
        ...currentHistory
      ];
      
      setLocalStorageData(mockData);
      return { id: newId } as unknown as T;
    }

    if (mockData[endpoint]) {
      return mockData[endpoint] as T;
    }
    
    throw error;
  }
}
