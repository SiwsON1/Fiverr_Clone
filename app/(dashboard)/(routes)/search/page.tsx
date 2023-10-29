import {db} from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { redirect } from "next/navigation";
import { ServicesList } from "@/components/services-list";
import { getServices } from "@/actions/get-services";

interface SearchPageProps {
    searchParams:{
        title: string;
        categoryId: string;
    }
}

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {

const {userId} = auth();

const categories = await db.category.findMany({
    orderBy:{
        name: "asc"
    }
});

if(!userId){
    return redirect("/");
}
const services = await getServices({
    userId,
    ...searchParams,

});
    return (
        <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
        </div>
        <div className="p-6">
            <Categories
            items={categories}
            />
            <ServicesList items={services} />
        </div>
        </>
     );
}

export default SearchPage;