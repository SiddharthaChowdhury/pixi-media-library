import { Group, Rect, Text } from "react-konva";
import { useSelector } from "react-redux";
import { Icon } from "../../../../assets/Icon";
import { TypeSvgName } from "../../../../assets/svg";
import { boxDiam } from "../../../../config/dimension";
import { selectNavigationFocusedItem } from "../../../../redux/selectors/selectNavigation";

interface INavBtnProps {
  id?: string;
  icon?: TypeSvgName;
  name: string;
  y: number;
  isCollapsed: boolean;
  isActive?: boolean;
}

const BTN_HEIGHT = 50;
const NavButton = (props: INavBtnProps) => {
  const focusedItemName = useSelector(
    selectNavigationFocusedItem,
    (prevFId, currFId) => {
      // neither the previous and nor the current is Non-Equal to the itemId
      return currFId !== props.id && prevFId !== props.id;
    }
  );
  const isFocused = focusedItemName === props.id;
  const btnWidth = props.isCollapsed
    ? boxDiam.sideNav_collapsed.width
    : boxDiam.sideNav_exapnded.width;

  return (
    <Group x={0} y={props.y} height={BTN_HEIGHT} width={btnWidth}>
      {(isFocused || props.isActive) && (
        <Rect
          x={0}
          y={0}
          height={BTN_HEIGHT}
          width={btnWidth}
          fill={isFocused ? "#a1a1a1" : props.isActive ? "#383838" : undefined}
          shadowForStrokeEnabled={false} // performance optimisation
          hitStrokeWidth={0} // performance optimisation
        />
      )}
      {!props.isCollapsed && (
        <>
          {props.icon ? (
            <>
              <Icon
                x={50}
                y={BTN_HEIGHT / 2}
                width={20}
                height={20}
                svgName={props.icon}
              />
              <Text
                text={props.name}
                x={70}
                y={18}
                fontSize={20}
                fill={"#fff"}
                fontStyle={"900"}
              />
            </>
          ) : (
            <Text
              text={props.name}
              x={20}
              y={15}
              fontSize={20}
              fontStyle={"900"}
              fill={"#fff"}
            />
          )}
        </>
      )}

      {props.isCollapsed && (
        <>
          {props.icon && (
            <Icon
              x={boxDiam.sideNav_collapsed.width / 2}
              y={BTN_HEIGHT / 2}
              width={20}
              height={20}
              svgName={props.icon}
            />
          )}
        </>
      )}
    </Group>
  );
};

export default NavButton;
