import React from "react";
import qs from "qs";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();
    const prevFiltersRef = React.useRef<string | null>(null)

    React.useEffect(() => {
            const params = {
                ...filters.prices,
                pizzaTypes: Array.from(filters.pizzaTypes),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.selectedIngredients)
            };
            
            const queryString = qs.stringify(params, {
                arrayFormat: 'comma',
            });
    
            if (prevFiltersRef.current !== queryString) {
                prevFiltersRef.current = queryString
                router.push(`?${queryString}`, {
                    scroll: false
                })
            }
    
        }, [filters, router]);
}

