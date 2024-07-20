import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import React, { PropsWithoutRef, RefAttributes, SyntheticEvent, useImperativeHandle, useState } from "react";
import { SchemaElement } from "../models";
import { useTreeViewApiRef } from "@mui/x-tree-view";

const jsonXsdObject = {};
export interface ReactXsdTreeApiRef {
  selectItem: (event: React.SyntheticEvent, itemId: string) => void;
}
interface ReactXsdTreeProps {
  model: SchemaElement;
  onSelectedItemsChange?: (
    event: SyntheticEvent<Element, Event>,
    item: SchemaElement
  ) => void;
}

const copyAndExculdeProperty = (obj: SchemaElement, property: string) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key !== property) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

const getTreeViewBaseItem = (model: SchemaElement[]): TreeViewBaseItem[] => {
  const jsonModel: TreeViewBaseItem[] = [];
  model.forEach((item: SchemaElement) => {
    jsonXsdObject[item.id] = copyAndExculdeProperty(item, "elements");
    if (item.elements.length > 0) {
      const treeViewBaseItem: TreeViewBaseItem = {
        id: item.id,
        label: item.name,
        children: getTreeViewBaseItem(item.elements),
      };
      jsonModel.push(treeViewBaseItem);
    } else {
      const treeViewBaseItem: TreeViewBaseItem = {
        id: item.id,
        label: item.name,
        children: getObjectProperties(item),
      };
      jsonModel.push(treeViewBaseItem);
    }
  });

  return jsonModel;
};

const getObjectProperties = (model: SchemaElement): TreeViewBaseItem[] => {
  const jsonModel: TreeViewBaseItem[] = [];
  const keys = Object.keys(model);
  keys.forEach((key: string) => {
    const treeViewBaseItem: TreeViewBaseItem = {
      id: `${model.id}_${key}`,
      label: `${key} : ${model[key]}`,
      children: [],
    };
    jsonModel.push(treeViewBaseItem);
  });

  return jsonModel;
};

//React Component
const ReactXsdTree: React.ForwardRefExoticComponent<PropsWithoutRef<ReactXsdTreeProps> & RefAttributes<ReactXsdTreeApiRef>> = React.forwardRef<ReactXsdTreeApiRef, ReactXsdTreeProps>(
  ({ model, onSelectedItemsChange }, ref) => {
    const [xsdJson, setXsdJson] = useState<TreeViewBaseItem[]>([]);
    const apiRef = useTreeViewApiRef();

    useImperativeHandle(ref, () => ({
      selectItem: (event: React.SyntheticEvent, itemId: string) => {
        if (apiRef.current) {
          apiRef.current.selectItem({ event, itemId });
          apiRef.current.setItemExpansion(event, itemId, true);
        }
      },
    }));

    const onSelectedItems = (
      event: SyntheticEvent<Element, Event>,
      item: string | null
    ): void => {
      if (
        onSelectedItemsChange &&
        typeof onSelectedItemsChange === "function"
      ) {
        onSelectedItemsChange(event, jsonXsdObject[item as string]);
      }
    };

    React.useEffect(() => {
      const jsonModel = [model];
      const jsonTree = getTreeViewBaseItem(jsonModel);
      setXsdJson(jsonTree);
    }, [model]);

    return (
      <>
        <RichTreeView
          apiRef={apiRef}
          items={xsdJson}
          onSelectedItemsChange={onSelectedItems}
          expansionTrigger="iconContainer"
        />
      </>
    );
  }
);

export default ReactXsdTree;
