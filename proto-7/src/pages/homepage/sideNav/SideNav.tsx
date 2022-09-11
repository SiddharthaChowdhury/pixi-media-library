import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { boxDiam } from "../../../config/dimension";
import { INavigationRow } from "../../../navigation/types";
import { navHomepageObj } from "../Homepage";
import utilNavigation from "../../../navigation/utilNavigation";
import { Icon } from "../../../assets/Icon";
import { TypeSvgName } from "../../../assets/svg";

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

const SideNav = ({ layerId }: ISidenavProps) => {
  const [_, setNavCollapse] = useState(true);
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
  const renderCollapsedNavItems = () => {
    navToMap();

    const collapsedBtnHeight = 50;
    return childrenMetaRef.current!.map((item, key) => {
      if (item.isLogo) return <Fragment key={key}></Fragment>;

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
              svgName={item.icon}
            />
          )}
        </Group>
      );
    });
  };

  // Render expanded Nav
  const renderExpandedNavItems = () => {
    navToMap();

    const collapsedBtnHeight = 50;
    return childrenMetaRef.current!.map((item, key) => {
      if (item.isLogo) return <Fragment key={key}></Fragment>;

      return (
        <Group
          x={0}
          y={item.y}
          height={collapsedBtnHeight}
          width={boxDiam.sideNav_collapsed.width}
          key={key}
        >
          {item.icon ? (
            <>
              <Icon
                x={50}
                y={collapsedBtnHeight / 2}
                width={20}
                height={20}
                svgName={item.icon}
              />
              <Text
                text={item.name}
                x={70}
                y={18}
                fontSize={20}
                fill={"#fff"}
              />
            </>
          ) : (
            <Text text={item.name} x={20} fontSize={20} fill={"#fff"} />
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

      {collasedRef.current &&
        childrenMetaRef.current &&
        renderCollapsedNavItems()}

      {!collasedRef.current &&
        childrenMetaRef.current &&
        renderExpandedNavItems()}
    </Group>
  );
};

export default SideNav;
