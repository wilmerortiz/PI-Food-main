import React, {useMemo, useState} from "react";

const useSorData = (listRecipes, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortItems = [...listRecipes];
        if (sortConfig !== null) {
            sortItems.sort((a, b) => {
                //console.log(a[sortConfig.key], ' < ', b[sortConfig.key])

                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortItems;
    }, [listRecipes, sortConfig]);

    const requestSort = key => { // key = propiedad enviada a ordenar (title, score)
        //console.log(key)
        let direction = "ascending";
        //console.log(sortConfig) // sortConfig = {key: "title", direction: "ascending"} ó {key: "title", direction: "descending"}
        if ( sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export default useSorData