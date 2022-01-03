
export interface IComponentAttribute {
    type: string;
    name: string;
    children: IComponentAttribute[];
    required?: boolean;
    style?: any;
    label?: string;
    format?: string;
    rule?: IRule;
    validation?: any;
    dynamicName?: string;
}

export interface ITextBoxControl extends IComponentAttribute
{
    label: string;
    placeHolder: string;
    required?: boolean;
    validation?: any;
}

export interface IFlexControl extends IComponentAttribute
{
    dynamicIndex?: number;
}

export interface IRadioButtonControl extends IComponentAttribute
{
    labelValues: ILabelValuePair[]
}

export interface IRadioButtonListControl extends IRadioButtonControl
{
    checklist: string[],
}

export interface IDropdownControl extends IComponentAttribute
{
    labelValues: ILabelValuePair[],
    placeHolder: string;
}

export interface ILabelValuePair 
{
    label: string,
    value: string
}

export interface IRule
{
    variable: string,
    logic: any,
    ruleSet?: boolean
}
