export type UseInfiniteScrollContents<T> = {
    setLastEl: (node: HTMLDivElement | null) => void;
    isNext: boolean;
    contents: T[];
    isLoading: boolean;
    isEmpty: boolean;
};
