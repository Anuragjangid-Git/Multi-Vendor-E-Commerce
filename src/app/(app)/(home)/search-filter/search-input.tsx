import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface props{
    disable?:boolean
}

export const SearchInput = ({disable}:props)=>{
return(
    <div className="w-full flex items-center gap-2">
        <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-neutral-500"/>
        <Input className="pl-8" placeholder="Search products" disabled={disable}/>
        </div>

    </div>
)
}