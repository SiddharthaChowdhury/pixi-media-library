import { useEffect } from "react";
import { INavigationMapInst } from "./NavigationMap";

interface INavigableProps {
  navObj: INavigationMapInst;
  itemId: string;
  children?: React.ReactNode;
}

const Navigable = ({ children, navObj, itemId }: INavigableProps) => {
  useEffect(() => {
    console.log(">>>>> registered");
    navObj.createMapFromItemId(itemId);
  }, [itemId, navObj]);

  return <>{children}</>;
};

export default Navigable;
