export interface IComponentAttribute {
    type: string;
    name: string;
    children: IComponentAttribute[];
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
}

export interface INumericControl extends ITextBoxControl
{
    format?: string;
}

export interface IFlexControl extends IComponentAttribute
{
    dynamicIndex?: number;
}

export interface IRadioButtonControl extends IComponentAttribute
{
    required?: boolean;
    labelValues: ILabelValuePair[]
}

export interface IRadioButtonListControl extends IRadioButtonControl
{
    checklist: string[],
}

export interface IDropdownControl extends IComponentAttribute
{
    required?: boolean;
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
