import { CustomCategory } from "../types";
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


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategorySidebar = ({ open, onOpenChange, data }: Props) => {
  const router = useRouter();
  const [parentCategory, setParentCategory] = useState<CustomCategory[] | null>(
    null
  );
  const [selectedCategory, setselectedCategory] =
    useState<CustomCategory | null>(null);
  const currentCategory = parentCategory ?? data ?? [];
  const handleOpenChange = (open: boolean) => {
    setParentCategory(null);
    setselectedCategory(null);
    onOpenChange(open);
  };
  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategory(category.subcategories as CustomCategory[]);
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
  const handleBackClick = ()=>{
    if(parentCategory){
        setParentCategory(null);
        setselectedCategory(null);
    }
  }
  const backgroundColor = selectedCategory?.color || 'white';
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        className="p-0 transition-0"
        style={{
           backgroundColor
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
