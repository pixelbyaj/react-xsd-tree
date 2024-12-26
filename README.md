# ReactXsdTree

This form is used to design React Material Tree using any given XSD/ISO 20022 Json object. .

![npm](https://img.shields.io/npm/v/react-xsd-tree)
![NPM](https://img.shields.io/npm/l/react-xsd-tree)
[![npm](https://img.shields.io/npm/dm/react-xsd-tree)](https://npmjs.org/package/react-xsd-tree)

## [DEMO](https://stackblitz.com/edit/reactxsdtree?file=README.md)

## Features

- 🔥 Automatic tree generation from the given XSD Json
- ⚡️ Supports ISO 20022 messages:

## How to consume

1. Install npm package ngx-xml-message.

```console
    npm i react-xsd-tree
```

```tsx
import React from "react";
import { camt53 } from "./models/model"; // model
import ReactXsdTree from "./components/ReactXsdTree";
import { ReactXsdTree, SchemaElement, useReactXsdTreeViewApiRef } from "react-xsd-tree";

const App: React.FC = () => {
  const reactXsdTreeApiRef = useReactXsdTreeViewApiRef();
  
  const onSelect = (event, item: SchemaElement) => {
    console.log(item);
  };

  const handleClick = (event) => {
    reactXsdTreeApiRef.current?.selectItem(
      event,
      "document_bktocstmrstmt_grphdr_credttm"
    );
  };
  return (
    <>
      <button onClick={handleClick}>Click Me</button>

      <ReactXsdTree
        ref={reactXsdTreeApiRef}
        model={camt53}
        onSelectedItemsChange={onSelect}
      ></ReactXsdTree>
    </>
  );
};

export default App;

```

## Convert XSD to JSON

1. Install npm package xsd-json-converter.

```console
    npm i xsd-json-converter
```

## How to Use

```console
  xjc <source-path> <output-path>
```

### Example
#### Linux

```console
  xjc /mnt/c/source/xsd/camt.053.001.10.xsd /mnt/c/source/xsd/camt.053.json 
```

#### Windows
```console
  xjc C:/source/xsd/camt.053.001.10.xsd C:/source/xsd/camt.053.json 
```