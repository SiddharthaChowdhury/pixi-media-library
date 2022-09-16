import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { boxDiam } from "../../../config/dimension";
import { INavigationRow } from "../../../navigation/types";
import { navHomepageObj } from "../Homepage";
import utilNavigation from "../../../navigation/utilNavigation";
import { TypeSvgName } from "../../../assets/svg";
import NavButton from "../../../components/molecules/buttons/navButton/NavButton";

interface ISidenavProps {
  layerId: number;
}

interface ISideNavElemMeta {
  isLogo?: boolean; // for nav logo on the top
  name: string;
  focusable: boolean;
  y: number;
  icon?: TypeSvgName;
  navId?: string;
}

const CONTENT_ID = [-1, 0];
const navElements: ISideNavElemMeta[] = [
  // {icon: },
  { name: "SEARCH", icon: "search", focusable: true, y: 300 },
  { name: "HOME", icon: "home", focusable: true, y: 350 },

  { name: "SETTINGS", focusable: true, y: 600 },
  { name: "LOG OUT", focusable: true, y: 650 },
];
const ACTIVE_PAGE_NAME = navElements[1].name; // "HOME";

const SideNav = ({ layerId }: ISidenavProps) => {
  const [_, setNavCollapse] = useState(true);

  // refs
  const collasedRef = useRef<boolean>(true);
  const navSubscriptionRef = useRef<any>();
  const childrenMetaRef = useRef<ISideNavElemMeta[]>([]);
  const rowDataRef = useRef<INavigationRow>({});

  // Registering to navigation system
  const navToMap = useCallback(() => {
    if (childrenMetaRef.current[0]) return;

    const navRowData: INavigationRow = {};

    let rowIndex = 0;
    navElements.forEach((elem) => {
      const navId = utilNavigation.generateItemId(
        layerId,
        CONTENT_ID,
        rowIndex,
        0
      );

      if (elem.focusable) {
        navRowData[rowIndex] = {
          lastFocusedItemIndex: 0,
          items: [navId],
        };

        childrenMetaRef.current?.push({ ...elem, navId });
        rowIndex += 1;
      } else childrenMetaRef.current?.push({ ...elem });
    });

    rowDataRef.current = navRowData;
  }, [layerId]);

  // Rendering nav elements
  const renderNavItems = (isCollapsed: boolean) => {
    navToMap();

    let focusId = -1;
    return childrenMetaRef.current!.map((item, key) => {
      if (item.isLogo) return <Fragment key={key}></Fragment>;

      let id;
      if (item.focusable) {
        focusId += 1;
        id = utilNavigation.generateItemId(layerId, CONTENT_ID, focusId, 0);
      }

      return (
        <NavButton
          id={id}
          key={key}
          y={item.y}
          name={item.name}
          icon={item.icon}
          isCollapsed={isCollapsed}
          isActive={ACTIVE_PAGE_NAME === item.name}
        />
      );
    });
  };

  // 1. Subscribe to focus change
  useEffect(() => {
    // Using the Rxjs subscription here insteasd of Redux or NavHook is because We dont want to rerender
    // the entire content tree

    // Generate the navigation map
    navHomepageObj.addNewVs(rowDataRef.current, CONTENT_ID, layerId);

    navSubscriptionRef.current = navHomepageObj.activeState$.subscribe(
      (activeFocus) => {
        const { vs, layer } = activeFocus;
        // Only focused Vs is same and layer matches

        if (
          vs[0] === CONTENT_ID[0] &&
          vs[1] === CONTENT_ID[1] &&
          layer === layerId
        ) {
          if (collasedRef.current) {
            collasedRef.current = false;
            setNavCollapse(false);
          }
        } else {
          if (!collasedRef.current) {
            collasedRef.current = true;
            setNavCollapse(true);
          }
        }
      }
    );

    return () => {
      navSubscriptionRef.current.unsubscribe();
    };
  }, []);

  return (
    <Group
      x={0}
      y={0}
      width={
        collasedRef.current
          ? boxDiam.sideNav_collapsed.width
          : boxDiam.sideNav_exapnded.width
      }
      height={boxDiam.sideNav_collapsed.height}
    >
      <Rect
        x={0}
        y={0}
        width={
          collasedRef.current
            ? boxDiam.sideNav_collapsed.width
            : boxDiam.sideNav_exapnded.width
        }
        height={boxDiam.sideNav_collapsed.height}
        fill={"#19191E"}
      />

      {childrenMetaRef.current && renderNavItems(collasedRef.current)}
    </Group>
  );
};

export default SideNav;
