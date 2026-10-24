import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { getGlobalStartContext } from "@tanstack/react-start";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  const nonce = getGlobalStartContext()?.cspNonce as string | undefined;

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Don't restore scroll — always start at the top of the page
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
    ssr: nonce ? { nonce } : undefined,
  });

  return router;
};
