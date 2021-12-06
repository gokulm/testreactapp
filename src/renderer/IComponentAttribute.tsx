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
}
