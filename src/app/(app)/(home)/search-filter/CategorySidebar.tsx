import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategorySidebar = ({ open, onOpenChange }: Props) => {
  function normalizeCategory(category: any): any {
    return {
      ...category,
      subcategories: (category.subcategories ?? []).map(normalizeCategory),
    };
  }
  const trpc = useTRPC();
  const { data: rawData } = useQuery(trpc.categories.getMany.queryOptions());
  const data = rawData?.map(normalizeCategory);

  const router = useRouter();
  const [parentCategory, setParentCategory] = useState<
    CategoriesGetManyOutput[number]["subcategories"] | null
  >(null);
  const [selectedCategory, setselectedCategory] = useState<
    CategoriesGetManyOutput[1] | null
  >(null);
  const currentCategory = parentCategory ?? data ?? [];
  const handleOpenChange = (open: boolean) => {
    setParentCategory(null);
    setselectedCategory(null);
    onOpenChange(open);
  };
  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategory(category.subcategories ?? null);
      setselectedCategory(category);
    } else {
      if (parentCategory && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };
  const handleBackClick = () => {
    if (parentCategory) {
      setParentCategory(null);
      setselectedCategory(null);
    }
  };
  const backgroundColor = selectedCategory?.color || "white";
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        className="p-0 transition-0"
        style={{
          backgroundColor,
        }}
        side="left"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategory && (
            <button
              onClick={handleBackClick}
              className="w-full text-left hover:bg-black p-4 hover:text-white flex items-center font-medium text-base cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategory.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left hover:bg-black p-4 hover:text-white flex justify-between items-center font-medium text-base cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
