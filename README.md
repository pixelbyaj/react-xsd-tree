
![npm](https://img.shields.io/npm/v/react-xsd-tree)
![NPM](https://img.shields.io/npm/l/react-xsd-tree)
[![npm](https://img.shields.io/npm/dm/react-xsd-tree)](https://npmjs.org/package/react-xsd-tree)

## [DEMO](https://stackblitz.com/edit/reactxmlui?file=README.md)

# ReactXmlUI

This form is used to design React Material Tree using any given XSD/ISO 20022 Json object. .

## Features

- 🔥 Automatic tree generation from the given XSD Json
- ⚡️ Supports ISO 20022 messages:

## How to consume

1. Install npm package ngx-xml-message.

```console
    npm i react-xsd-tree
```

```ts
import { ReactXmlUI } from 'react-xsd-tree';

function App() {
  const [xsdJson, setXsdJson] = useState()
  const onSelect = (event: React.SyntheticEvent<Element, Event>, item:SchemaElement)=>{
    console.log(item);
  }
  useEffect(()=>{
    setXsdJson(message);
  },[setXsdJson])
  return (
    <>
        <ReactXsdTree model={xsdJson} onSelectedItemsChange={onSelect}/>
    </>
  )
}

export default App