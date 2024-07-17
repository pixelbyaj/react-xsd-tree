import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import React, { SyntheticEvent, useState } from "react";
import { SchemaElement } from "../models/schema";

const jsonXsdObject = {};

interface XsdJsonProps {
  model: SchemaElement;
  onSelectedItemsChange?: (event: SyntheticEvent<Element, Event>, item: SchemaElement) => void;
}

const copyAndExculdeProperty = (obj: SchemaElement, property:string) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key !== property) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

const getTreeViewBaseItem = (model: SchemaElement[]): TreeViewBaseItem[] => {
  const jsonModel: TreeViewBaseItem[] = [];
  model.forEach((item: SchemaElement) => {
    jsonXsdObject[item.id] = copyAndExculdeProperty(item, 'elements');
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
const ReactXsdTree: React.FC<XsdJsonProps> = ({
  model,
  onSelectedItemsChange
}) => {
  const [xsdJson, setXsdJson] = useState<TreeViewBaseItem[]>([]);
  
  const onSelectedItems = (
    event: SyntheticEvent<Element, Event>,
    item: string | null
  ): void => {
    if (onSelectedItemsChange && typeof onSelectedItemsChange === "function") {
      onSelectedItemsChange(event, jsonXsdObject[item as string]);
    }
  };

  React.useEffect(() => {
    const jsonModel = [structuredClone(model)];
    const jsonTree = getTreeViewBaseItem(jsonModel);
    setXsdJson(jsonTree);
  }, [model]);

  return (
    <>
      <RichTreeView items={xsdJson} onSelectedItemsChange={onSelectedItems} />
    </>
  );
};

export default ReactXsdTree;