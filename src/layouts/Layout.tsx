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
  placeHolder?: string,
  style?: object
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

export const renderElement = (element: IElement) => {
  let jsonString = JSON.parse(JSON.stringify(data));

  switch (element.type) {
    case "div":
      if (element.children.length > 0) {
        return <div className={element.class}>{element.children.map(e => renderElement(e))}</div>
      }
      else if (element.dataKey) {
        return <div className={element.class}>{jsonString[element.dataKey]}</div>
      }
      else {
        return <div className={element.class}>{element.data}</div>
      }
    case "container":
      if (element.children.length > 0) {
        return <div className={element.class}>{element.children.map(e => renderElement(e))}</div>
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
      return <textarea className={element.class}></textarea>
    case "button":
      return <button style={element.style} type="submit">Submit</button>
    case "tabs":
      let tabs = jsonString[element.dataKey] as ITab[];
      return <Tabs tabs={tabs}></Tabs>
    case "tableHeaders":
      let cells = jsonString[element.dataKey] as IElement[];
      // console.log(cells);
      return <div className={element.class}> {cells.map(m => renderElement(m))} </div>;
    case "tableRows":
      let rows = jsonString[element.dataKey] as IElement[];
      return <React.Fragment>{rows.map(m => renderElement(m))} </React.Fragment>
    case "tableHeadersDynamic":
      let headers = data.table.headers;
      let headerElements = new Array<IElement>();
      headers.forEach(h => {
        let headerElement = {} as IElement;
        headerElement.class = "td";
        headerElement.data = h;
        headerElement.type = "div";
        headerElement.children = [];
        headerElements.push(headerElement);
      });
      return <div className={element.class}> {headerElements.map(m => renderElement(m))} </div>;
    case "tableRowsDynamic":
      let rowElements = new Array<IElement>();
      data.table.rows.forEach(h => {
        let rowElement = {} as IElement;
        rowElement.class = "td";
        rowElement.data = h.name;
        rowElement.type = "div";
        rowElement.children = [];
        rowElements.push(rowElement);
      });
      return <div className={element.class}> {rowElements.map(m => renderElement(m))} </div>;
    default:
      return <input type="text" style={{ padding: "1em", marginBottom: "1em" }} id={element.id} placeholder={element.placeHolder} value={element.data} />;
  }
}

const Layout = (props: IProps) => {
  return (
    <>
      {
        (props.schema).map(m =>
          renderElement(m))
      }
    </>
  );
};

export default Layout;
