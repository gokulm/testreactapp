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
    baseIndex?: number
    attributes?: any,
    enableOnChange?: boolean
}

export interface ITextBoxAttribute
{
    label: string;
    placeHolder: string;
    required?: boolean;
}

export interface IRadioButton
{
    value: string,
    label: string
}

export interface IRule
{
    variable: string,
    logic: any,
    ruleSet?: boolean
}
