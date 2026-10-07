import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface RouteState {
  path: string;
  params: Record<string, string>;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouteState | null>(null);

function parsePath(): { path: string; params: Record<string, string> } {
  const hash = window.location.hash.slice(1) || '/';
  const [rawPath, queryString] = hash.split('?');
  const params: Record<string, string> = {};
  if (queryString) {
    new URLSearchParams(queryString).forEach((v, k) => { params[k] = v; });
  }
  return { path: decodeURIComponent(rawPath || '/'), params };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(parsePath);

  useEffect(() => {
    const onHashChange = () => {
      setState(parsePath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    const [pathPart, queryPart] = path.split('?');
    const encodedPath = pathPart.split('/').map(segment => encodeURIComponent(segment)).join('/');
    window.location.hash = queryPart ? `${encodedPath}?${queryPart}` : encodedPath;
  }, []);

  return (
    <RouterContext.Provider value={{ ...state, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
