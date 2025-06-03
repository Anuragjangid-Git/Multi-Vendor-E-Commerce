"use client"
import { Input } from "@/components/ui/input"
import { ListFilterIcon, SearchIcon } from "lucide-react"
import { CustomCategory } from "../types"
import { CategorySidebar } from "./CategorySidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface props{
    disable?:boolean;
}

export const SearchInput = ({disable}:props)=>{
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);
return(
    <div className="w-full flex items-center gap-2">
        <CategorySidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
        <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-neutral-500"/>
        <Input className="pl-8" placeholder="Search products" disabled={disable}/>
        </div>
        <Button variant={"elevated"} className="size-12 shrink-0 flex lg:hidden" onClick={()=>setIsSidebarOpen(true)}>
        <ListFilterIcon/>
        </Button>
    </div>
)
}