import dynamic from "next/dynamic";

export const DynamicDay = dynamic(() => import("./Day"));
