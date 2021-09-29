import schema1 from '../schemas/schema1.json';
import data from '../data.json';
import './Layout.css'
import { useState } from 'react';

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
  id?: string
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
      {tabProps.tabs.map(m => <div className={ selectedTabId === m.id ? 'tab is-tab-selected': 'tab'} onClick={() => setActiveTab(m.id)}>{m.text}</div>)}
    </div>
  );
};

export const renderLayout = (element: IElement) => {
  // console.log(element);
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
    default:
      return <input type="text" id={element.id} />;
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
