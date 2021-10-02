import data from '../data.json';
import './Layout.css'
import React, { useState } from 'react';
import { renderElement } from './Layout';

interface IProps {
  controls: IElement[];
  layouts: ILayout[];
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

export interface ILayout {
  type: string,
  class: string,
  direction: string,
  layouts: ILayout[],
  controls: string[]
}

const BaseLayout = (props: IProps) => {

  const controls: IElement[] = props.controls;

  const renderLayout = (layout: ILayout) => {
    let jsonString = JSON.parse(JSON.stringify(data));

    switch (layout.type) {
      case "flexContainer":
        if (layout.layouts.length > 0) {
          return <div className="flexContainer">{layout.layouts.map(e => renderLayout(e))}</div>
        }
        else {
          return <div className="flexContainer">{layout.controls.map(c => renderControl(c))}</div>
        }
      case "flex1":
        if (layout.layouts.length > 0) {
          return <div className="flex1">{layout.layouts.map(e => renderLayout(e))}</div>
        }
        else {
          return <div className="flex1">{layout.controls.map(c => renderControl(c))}</div>
        }
      default:
        return <div></div>;
    }
  }

  const renderControl = (controlName: string) => {
    let control = controls.filter(f => f.id === controlName)[0];
    return renderElement(control);
  }


  return (
    <>
      {
        (props.layouts).map(m =>
          renderLayout(m))
      }
    </>
  );
};

export default BaseLayout;
