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
    hoverId: T | null;
    setHover: (id: T | null) => void;

    activeIndicator: Indicator;
    clearHover: () => void;
    hoverIndicator: Indicator | null;

    wrapRef: (el: HTMLDivElement | null) => void;
    tabRef: (id: T) => (el: HTMLButtonElement | null) => void;
    isCalcComplete: boolean;
    updateActive: () => void;
    updateHover: () => void;
};
