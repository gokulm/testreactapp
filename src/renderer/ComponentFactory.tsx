import { Form } from "react-bootstrap";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IComponentAttribute } from "./IComponentAttribute";

class ComponentFactory {
    private _componentMapper: { [key: string]: Function } = {}

    constructor(private _register: UseFormRegister<FieldValues>) {
        this._componentMapper = {
            "flex": (componentProps: any) => this.renderFlexContainer(componentProps),
            "text": (componentProps: any) => this.renderTextBox(componentProps),
            "dropdown": (componentProps: any) => this.renderDropDown(componentProps)
        }
    }

    private renderFlexContainer(componentProps: IComponentAttribute) {
        return <div className="renderer-flex-container" style={componentProps.style}>
            {componentProps.children.map(c => <div> {this._componentMapper[c.type](c)} </div>)}</div>
    } 

    private renderTextBox(componentProps: IComponentAttribute) {
        return <input type="text" placeholder={componentProps.placeHolder}
            {...this._register(componentProps.name, { required: false })}
            defaultValue={componentProps.defaultValue} />
    }

    private renderDropDown(componentProps: IComponentAttribute) {
        return <Form.Select   {...this._register(componentProps.name, { required: false })} >
            <option value={undefined}>{componentProps.placeHolder}</option>
            {componentProps.dropdownValues?.map(d => <option value={d}>{d}</option>)}
        </Form.Select>
    }

    public addComponent(key: string, rendererFunction: Function): void
    {
        this._componentMapper[key] = rendererFunction;
    }

    public render(componentProps: IComponentAttribute) {
        return this._componentMapper[componentProps.type](componentProps);
    }
}

export default ComponentFactory;