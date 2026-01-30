"use client";

import dateToAge from "../../../util/dateToAge";

type Props = {
    birthday: string;
    className?: string;
};

export default function Age(props: Props) {
    return <span className={props.className}>{dateToAge(props.birthday)}</span>;
}
