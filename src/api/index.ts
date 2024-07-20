import { useRef } from "react";
import { ReactXsdTreeApiRef } from "../components/ReactXsdTree";

export const useReactXsdTreeViewApiRef = () => { 
    return useRef<ReactXsdTreeApiRef>(null)
}