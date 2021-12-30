import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { get } from "react-hook-form";
import { IComponentAttribute, ITextBoxAttribute } from "./IComponentAttribute";

class ComponentFactory {
    private _componentMapper: { [key: string]: Function } = {}

    constructor(private _methods: any) {
        this._componentMapper = {
            "flex": (componentProps: any) => this.renderFlexContainer(componentProps),
            "text": (componentProps: any) => this.renderTextBox(componentProps),
            "dropdown": (componentProps: any) => this.renderDropDown(componentProps),
            "radiobuttons": (componentProps: any) => this.renderRadioButtons(componentProps),
            "submit": (componentProps: any) => this.renderSubmit(componentProps)
            // "dynamic": (componentProps: any) => this.renderDynamicContainer(componentProps)
        }
    }

    private renderFlexContainer(componentProps: IComponentAttribute) {
        console.log("rendering type: ", componentProps.type);
        return <div className="renderer-flex-container" style={componentProps.style}>
            {componentProps.children.map((c, i) => {
                // console.log(`rendering flex. index: ${i}, type: ${c.type} baseIndex: ${componentProps.baseIndex}`);
                if (componentProps.baseIndex != undefined) {
                    c.name = c.name.replace("[index]", componentProps.baseIndex.toString());
                    console.log("replaced name ", c.name);
                }
                return <div className="renderer-flex-item" key={i}> {this._componentMapper[c.type](c)} </div>
            })
            }</div>
    }

    private renderTextBox(componentProps: IComponentAttribute) {
        // if(componentProps.attributes instanceof ITextBoxAttribute)
        // {
        //     let temp = componentProps.attributes as ITextBoxAttribute;
        // }

        console.log("rendering type: ", componentProps.type);
        const error = get(this._methods.formState.errors, componentProps.name);
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>}
            <Form.Control
                {...this._methods.register(componentProps.name, { required: { value: componentProps.required, message: componentProps.placeHolder } })}
                placeholder={componentProps.placeHolder} />
            {error && <span className="alert">{error.message}</span>}
        </Form.Group>
    }

    private renderDropDown(componentProps: IComponentAttribute) {
        console.log("rendering type: ", componentProps.type);
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>}
            <Form.Select   {...this._methods.register(componentProps.name, { required: componentProps.required })} >
                <option value={undefined}>{componentProps.placeHolder}</option>
                {componentProps.dropdownValues?.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </Form.Select></Form.Group>
    }

    private renderRadioButtons(componentProps: IComponentAttribute) {
        console.log("rendering type: ", componentProps.type);
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>} <br />
            {componentProps.radioButtons?.map((d, i) => {
                return (
                    <Fragment key={i}><input type="radio" value={d.value} id={`${componentProps.name}_${d.value}`}
                        {...this._methods.register(componentProps.name, { required: componentProps.required })}
                        defaultChecked={this._methods.getValues(componentProps.name) === d.value}
                    /> <label htmlFor={`${componentProps.name}_${d.value}`}> {d.label} </label></Fragment>
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