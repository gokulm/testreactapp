import data from '../data.json';
import './Layout.css'
import React, { useState } from 'react';

interface IProps {
  schema: IElement[];
}

export interface IElement {
  type: string,
  class: string,
  children: IElement[],
  dataKey: string,
  data?: string,
  for?: string,
  id?: string,
  placeHolder?: string
}

interface ITabProps {
  tabs: ITab[]
}

interface ITab {
  id: number,
  text: string
}

const Tabs = (tabProps: ITabProps) => {

  const [selectedTabId, setSelectedTabId] = useState(1);

  function setActiveTab(id: number) {
    setSelectedTabId(id);
  }

  return (
    <div className="tabs">
      {tabProps.tabs.map(m => <div className={selectedTabId === m.id ? 'tab is-tab-selected' : 'tab'} onClick={() => setActiveTab(m.id)}>{m.text}</div>)}
    </div>
  );
};

export const renderLayout = (element: IElement) => {
  let jsonString = JSON.parse(JSON.stringify(data));

  switch (element.type) {
    case "div":
      if (element.children.length > 0) {
        return <div className={element.class}>{element.children.map(e => renderLayout(e))}</div>
      }
      else if (element.dataKey) {
        return <div className={element.class}>{jsonString[element.dataKey]}</div>
      }
      else {
        return <div className={element.class}>{element.data}</div>
      }
    case "p":
      return <p>{jsonString[element.dataKey]}</p>
    case "label":
      return <label htmlFor={element.for}>{element.data}</label>
    case "textarea":
      return <textarea></textarea>
    case "button":
      return <button type="submit">Submit</button>
    case "tabs":
      let tabs = jsonString[element.dataKey] as ITab[];
      return <Tabs tabs={tabs}></Tabs>
    case "tableHeaders":
      let cells = jsonString[element.dataKey] as IElement[];
      console.log(cells);
      return <div className={element.class}> {cells.map(m => renderLayout(m))} </div>;
    case "tableRows":
      let rows = jsonString[element.dataKey] as IElement[];
      return <React.Fragment>{rows.map(m => renderLayout(m))} </React.Fragment>
    default:
      return <input type="text" id={element.id} placeholder={element.placeHolder} value={element.data} />;
  }
}

const Layout = (props: IProps) => {
  return (
    <>
      {
        (props.schema).map(m =>
          renderLayout(m))
      }
    </>
  );
};

export default Layout;
