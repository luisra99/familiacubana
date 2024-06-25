import "./tree.css";

import { Checkbox, SvgIconProps } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Box } from "@mui/system";
import { Tree } from "rsuite";

export const CustomTree = ({
  data,
  parentIcon: ParentIcon,
  childrenIcon: ChildrenIcon,
  multiSelect,
}: {
  data: any;
  parentIcon: FC<SvgIconProps>;
  childrenIcon: FC<SvgIconProps>;
  multiSelect?: boolean;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const handleChecked = (e: any) => {
    if (multiSelect) {
      const selectedIndex = selected.indexOf(e.target.name);
      let newSelected: any[] | ((prevState: never[]) => never[]) = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, e.target.name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    } else setSelected([e.target.name]);
  };
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <Tree
      data={data}
      showIndentLine
      renderTreeNode={(node) => {
        return (
          <Box display={"flex"} alignItems={"center"}>
            {multiSelect && (
              <Checkbox
                checked={selected.indexOf(`${node.value}`) != -1}
                name={`${node.value}`}
                onClick={handleChecked}
              />
            )}
            {node.children ? (
              <ParentIcon sx={{ mr: 1 }} />
            ) : (
              <ChildrenIcon sx={{ mr: 1 }} />
            )}
            {node.label}
          </Box>
        );
      }}
    />
  );
};
