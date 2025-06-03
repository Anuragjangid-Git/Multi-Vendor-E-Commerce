import { Suspense } from "react";
import { footer as Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilter, SerachFilterLoading } from "./search-filter";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
interface prop {
  children: React.ReactNode;
}
const Layout = async ({ children }: prop) => {
  
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SerachFilterLoading/>}>
      <SearchFilter  />
      </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
