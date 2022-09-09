import { Fragment, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { boxDiam } from "../../../config/dimension";
import { INavigationRow } from "../../../navigation/types";
import { navHomepageObj } from "../Homepage";
import homeIcon from "../../../components/atoms/icon/home.svg";
import searchIcon from "../../../components/atoms/icon/search.svg";
import utilNavigation from "../../../navigation/utilNavigation";
import { Icon } from "../../../components/atoms/icon/Icon";

interface ISidenavProps {
  layerId: number;
}

interface ISideNavElemMeta {
  isLogo?: boolean; // for nav logo on the top
  name: string;
  focusable: boolean;
  y: number;
  icon?: string;
  navId?: string;
}

const CONTENT_ID = [-1, 0];
const navElements: ISideNavElemMeta[] = [
  // {icon: },
  { name: "Home", icon: homeIcon, focusable: true, y: 200 },
  { name: "Search", icon: searchIcon, focusable: true, y: 240 },
  { name: "Settings", focusable: true, y: 280 },
  { name: "Log out", focusable: true, y: 320 },
];

const SideNav = ({ layerId }: ISidenavProps) => {
  const [_, setNavCollapse] = useState(true);
  const collasedRef = useRef<boolean>(true);
  const navSubscriptionRef = useRef<any>();
  const childrenMetaRef = useRef<ISideNavElemMeta[]>([]);
  const rowDataRef = useRef<INavigationRow>({});

  // Registering to navigation system
  const navToMap = () => {
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
  };

  // Rendering nav elements
  const renderCollapsedNavItems = () => {
    navToMap();

    return childrenMetaRef.current!.map((item, key) => {
      if (item.isLogo) return <Fragment key={key}></Fragment>;

      const collapsedBtnHeight = 50;
      return (
        <Group
          x={0}
          y={item.y}
          height={collapsedBtnHeight}
          width={boxDiam.sideNav_collapsed.width}
          key={key}
        >
          {/* <Rect x={0} y={0} /> */}
          {item.icon && (
            <Icon
              x={boxDiam.sideNav_collapsed.width / 2}
              y={collapsedBtnHeight / 2}
              width={20}
              height={20}
              src={item.icon}
            />
          )}
        </Group>
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
        const { row, vs, layer } = activeFocus;
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

      {collasedRef.current &&
        childrenMetaRef.current &&
        renderCollapsedNavItems()}
    </Group>
  );
};

export default SideNav;
