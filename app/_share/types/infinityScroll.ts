export type UseInfiniteScrollContents<T> = {
    setLastEl: (node: HTMLDivElement | HTMLAnchorElement | null) => void;
    isNext: boolean;
    contents: T[];
    isLoading: boolean;
    isEmpty: boolean;
};
