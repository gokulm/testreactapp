import { Form } from "react-bootstrap";
import { IComponentAttribute } from "./IComponentAttribute";

class ComponentFactory {
    private _componentMapper: { [key: string]: Function } = {}

    constructor(private _methods: any) {
        this._componentMapper = {
            "flex": (componentProps: any) => this.renderFlexContainer(componentProps),
            "text": (componentProps: any) => this.renderTextBox(componentProps),
            "dropdown": (componentProps: any) => this.renderDropDown(componentProps),
            "radiobuttons": (componentProps: any) => this.renderRadioButtons(componentProps),
            "submit": (componentProps: any) => this.renderSubmit(componentProps)
        }
    }

    private renderFlexContainer(componentProps: IComponentAttribute) {
        return <div className="renderer-flex-container" style={componentProps.style}>
            {componentProps.children.map((c, i) => <div className="renderer-flex-item" key={i}> {this._componentMapper[c.type](c)} </div>)}</div>
    }

    private renderTextBox(componentProps: IComponentAttribute) {
        // console.log(componentProps);
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>}
            <Form.Control
                {...this._methods.register(componentProps.name, {  required: componentProps.required, message: componentProps.placeHolder })} placeholder={componentProps.placeHolder} />
            {this._methods.formState.errors[componentProps.name] && this._methods.formState.errors[componentProps.name].type === "required" && (
                <Form.Label>This is required</Form.Label>
            )}
        </Form.Group>
    }

    private renderDropDown(componentProps: IComponentAttribute) {
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>}
            <Form.Select   {...this._methods.register(componentProps.name, { required: componentProps.required })} >
                <option value={undefined}>{componentProps.placeHolder}</option>
                {componentProps.dropdownValues?.map(d => <option value={d}>{d}</option>)}
            </Form.Select></Form.Group>
    }

    private renderRadioButtons(componentProps: IComponentAttribute) {
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>} <br />
            {componentProps.radioButtons?.map(d => {
                return (
                    <><input type="radio" value={d.value} id={`${componentProps.name}_${d.value}`}
                        {...this._methods.register(componentProps.name, { required: componentProps.required })}
                        defaultChecked={this._methods.getValues(componentProps.name) === d.value}
                    /> <label htmlFor={`${componentProps.name}_${d.value}`}> {d.label} </label></>
                )
            })}</Form.Group>
    }

    private renderSubmit(componentProps: IComponentAttribute) {
        return <input type="submit" />
    }

    public addComponent(key: string, rendererFunction: Function): void {
        this._componentMapper[key] = rendererFunction;
    }

    public render(componentProps: IComponentAttribute) {
        return this._componentMapper[componentProps.type](componentProps);
    }
}

export default ComponentFactory;