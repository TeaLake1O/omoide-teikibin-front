export type TabItem<T> = {
    id: T;
    label: string;
};
export type Indicator = {
    width: number;
    left: number;
};

export type UseTabIndicator<T> = {
    activeId: T;
    setActiveId: (id: T) => void;
    indicator: Indicator;

    wrapRef: (el: HTMLDivElement | null) => void;
    tabRef: (id: T) => (el: HTMLButtonElement | null) => void;
    isCalcComplete: boolean;
    update: () => void;
};
