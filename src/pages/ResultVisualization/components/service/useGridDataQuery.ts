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