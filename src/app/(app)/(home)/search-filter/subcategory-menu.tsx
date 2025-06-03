import { Category } from "@/payload-types";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
interface props {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0)
    return null;

  const backgroundColor = category.color || "#F5F5F5";
  return (
    <div
      className="fixed z-100"
      style={{
        top: position.top + 45,
        left: position.left,
      }}
    >
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="rounded-md w-60 text-black overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px] "
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link key={subcategory.slug} href={`/${category.slug}/${subcategory.slug}`}  
             className="w-full flex justify-between text-left p-4 hover:bg-black hover:text-white items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
