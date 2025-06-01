import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface props{
    data:any
};

export const SearchFilter = ({data}:props) => {
  return (
    <div className="px-4 lg:px-12 w-full py-8 border-b flex flex-col gap-4">
        <SearchInput/>
        <Categories data={data}/>
    </div>
  );
};
