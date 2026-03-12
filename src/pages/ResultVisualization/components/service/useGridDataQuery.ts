import {useQuery} from "@tanstack/react-query";

export function useGridDataQuery() {
    return useQuery({
        queryKey: ['gridData'],
        queryFn: fetchGridData,
        staleTime: 5000,
    })
}

const fetchGridData = async () => {
    const allDataResponse = await fetch(
        "http://localhost:5001/api/iterations"
    );

    if(!allDataResponse.ok) {
        throw new Error('Failed to fetch data');
    }
    console.log(allDataResponse);
    return await allDataResponse.json();
};

export function useGridQuery() {
    return useQuery({
        queryKey: ['grid'],
        queryFn: fetchGrid,
        staleTime: 5000,
    })
}

const fetchGrid = async () => {
    const allDataResponse = await fetch(
        "http://localhost:5001/api/grid"
    );

    if(!allDataResponse.ok) {
        throw new Error('Failed to fetch grid');
    }
    console.log(allDataResponse);
    return await allDataResponse.json();
};