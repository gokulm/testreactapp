import { RulesLogic } from "json-logic-js";

export interface IComponentAttribute {
    type: string;
    name: string;
    children: IComponentAttribute[];
    required?: boolean;
    class?: string;
    id?: string;
    placeHolder?: string;
    style?: any;
    defaultValue?: string;
    dropdownValues?: any[];
    label?: string,
    radioButtons?: IRadioButton[],
    radioButtonChecklist?: string[],
    format?: string,
    rule?: IRule,
    baseIndex?: number,
    baseProperty?: string
}

export interface IRadioButton
{
    value: string,
    label: string
}

export interface IRule
{
    variable: string,
    logic: any
}
