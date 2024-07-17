import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'
import ReactXsdTree from './components/ReactXsdTree';
import { camt53 } from './models/model';
import { SchemaElement } from './models/schema';
const onSelect = (event: React.SyntheticEvent<Element, Event>, item:SchemaElement)=>{
  console.log(item);
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactXsdTree model={camt53} onSelectedItemsChange={onSelect}/>
  </React.StrictMode>
)
