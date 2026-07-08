import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Don't restore scroll — always start at the top of the page
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
