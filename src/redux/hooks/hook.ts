import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>();
export const appDispatch = useDispatch.withTypes<AppDispatch>()