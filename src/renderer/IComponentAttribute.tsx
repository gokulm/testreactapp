import { RulesLogic } from "json-logic-js";

export interface IComponentAttribute {
    type: string;
    class?: string;
    children: IComponentAttribute[];
    id?: string;
    placeHolder?: string;
    style?: any;
    defaultValue?: string;
    name: string;
    dropdownValues?: any[];
    label?: string,
    radioButtons?: IRadioButton[],
    radioButtonChecklist?: string[],
    format?: string,
    rules?: any
}

export interface IRadioButton
{
    value: string,
    label: string
}
