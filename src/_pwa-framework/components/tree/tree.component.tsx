import "./tree.css";

import { Checkbox, SvgIconProps } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Add } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Remove } from "@mui/icons-material";
import { Tree } from "rsuite";

export const CustomTree = ({
  data,
  parentIcon: ParentIcon,
  childrenIcon: ChildrenIcon,
  multiSelect,
  name,
  setFieldValue,
  defaultValues,
}: {
  data: any;
  parentIcon: FC<SvgIconProps>;
  childrenIcon: FC<SvgIconProps>;
  defaultValues?: any[];
  multiSelect?: boolean;
  name?: string;
  setFieldValue?: any;
}) => {
  const [selected, setSelected] = useState<any[]>(defaultValues ?? []);

  useEffect(() => {
    if (Array.isArray(defaultValues)) setSelected(defaultValues);
  }, [defaultValues]);

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
      setFieldValue?.(name ?? "tree", newSelected, false);
    } else {
      setFieldValue?.(name ?? "tree", e.target.name, false);
      setSelected([e.target.name]);
    }
  };

  useEffect(() => {}, [selected]);

  return (
    <Tree
      data={data}
      showIndentLine
      renderTreeIcon={(treeNode, expanded) => {
        if (treeNode.children) {
          return expanded ? <Remove /> : <Add />;
        }
        return null;
      }}
      renderTreeNode={(node) => {
        return (
          <Box
            display={"flex"}
            alignItems={"center"}
            onClick={() => {
              if (!multiSelect)
                handleChecked({ target: { name: `${node.value}` } });
            }}
          >
            {multiSelect && !node.children && (
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
