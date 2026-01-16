import { QueryResult, QueryResultTanstack } from "../app/_share/types/fetch";
import { Me } from "./Me";
import { Groups } from "./group";

export type CurrentUserFetchResult = QueryResult<Me>;
export type GroupsFetchResult = QueryResultTanstack<Groups[]>;
