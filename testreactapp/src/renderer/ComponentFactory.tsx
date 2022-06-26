import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { Controller, get } from "react-hook-form";
import NumberFormat from "react-number-format";
import ConditionalRender from "./ConditionalRenderer";
import DynamicFieldArray from "./DynamicFieldArray";
import { IComponentAttribute, IDropdownControl, IFlexControl, INumericControl, IRadioButtonControl, ITextBoxControl } from "./IComponentAttribute";

class ComponentFactory {
    private _componentMapper: { [key: string]: Function } = {};

    constructor(private _methods: any) {
        this._componentMapper = {
            "flex": (componentProps: any) => this.renderFlexContainer(componentProps),
            "text": (componentProps: any) => this.renderTextBox(componentProps),
            "dropdown": (componentProps: any) => this.renderDropDown(componentProps),
            "radiobuttons": (componentProps: any) => this.renderRadioButtons(componentProps),
            "submit": (componentProps: any) => this.renderSubmit(componentProps),
            "dynamic": (componentProps: any) => this.renderDynamicContainer(componentProps),
            "numeric": (componentProps: any) => this.renderNumeric(componentProps)
        }
    }

    private renderFlexContainer(componentProps: IComponentAttribute) {
        // console.log("rendering type: ", componentProps.type);
        let flex = componentProps as IFlexControl;
        return <div className="renderer-flex-container" style={flex.style}>
            {flex.children.map((c, i) => {
                // console.log(`rendering flex. index: ${i}, type: ${c.type} baseIndex: ${componentProps.baseIndex}`);
                if (flex.dynamicIndex !== undefined && c.dynamicName !== undefined) {
                    c.name = c.dynamicName.replace("[index]", flex.dynamicIndex.toString());
                    // console.log("replaced name ", c.name);
                }
                return <div className="renderer-flex-item" key={i}> {this._componentMapper[c.type](c)} </div>
            })
            }</div>
    }

    private renderTextBox(componentProps: IComponentAttribute) {
        let textBox = componentProps as ITextBoxControl;
        // console.log("rendering type: ", componentProps.type);
        const error = get(this._methods.formState.errors, textBox.name);
        if (textBox.validation && textBox.validation['pattern']) {
            let patternObject = textBox.validation['pattern'];
            console.log("pattern validation:", patternObject);
            patternObject.value = new RegExp(patternObject.regex);
            console.log("validation:", textBox.validation);
        }

        return <Form.Group className="mb-3">
            {textBox.label && <Form.Label>{textBox.label}</Form.Label>}
            <Form.Control
                {...this._methods.register(textBox.name, textBox.validation)}
                placeholder={textBox.placeHolder}
            />
            {error && <span className="alert">{error.message}</span>}
        </Form.Group>
    }

    private renderNumeric(componentProps: IComponentAttribute) {
        let numericControl = componentProps as INumericControl;
        const error = get(this._methods.formState.errors, numericControl.name);
        return <ConditionalRender componentAttr={numericControl}><Controller
            control={this._methods.control}
            name={numericControl.name}
            render={({ field }) =>
                <Form.Group className="mb-3">
                    {numericControl.label && <Form.Label>{numericControl.label}</Form.Label>}
                    <NumberFormat format={numericControl.format} className="form-control" placeholder={numericControl.format}
                        {...this._methods.register(numericControl.name, numericControl.validation)} {...field} />
                    {error && <span className="alert">{error.message}</span>}
                </Form.Group>} />
        </ConditionalRender>
    }

    private renderDropDown(componentProps: IComponentAttribute) {
        // console.log("rendering type: ", componentProps.type);
        let dropdownControl = componentProps as IDropdownControl;
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{dropdownControl.label}</Form.Label>}
            <Form.Select   {...this._methods.register(dropdownControl.name, { required: dropdownControl.required })} >
                <option value={undefined}>{dropdownControl.placeHolder}</option>
                {dropdownControl.labelValues.map((d, i) => <option key={i} value={d.value}>{d.label}</option>)}
            </Form.Select></Form.Group>
    }

    private renderRadioButtons(componentProps: IComponentAttribute) {
        // console.log("rendering type: ", componentProps.type);
        let radioButtonControl = componentProps as IRadioButtonControl;
        return <Form.Group className="mb-3">
            {radioButtonControl.label && <Form.Label>{radioButtonControl.label}</Form.Label>} <br />
            {radioButtonControl.labelValues?.map((d, i) => {
                return (
                    <Fragment key={i}><input type="radio" value={d.value} id={`${radioButtonControl.name}_${d.value}`}
                        {...this._methods.register(componentProps.name, { required: radioButtonControl.required })}
                        defaultChecked={this._methods.getValues(radioButtonControl.name) === d.value}
                    /> <label htmlFor={`${radioButtonControl.name}_${d.value}`}> {d.label} </label></Fragment>
                )
            })}</Form.Group>
    }

    private renderDynamicContainer(componentProps: IComponentAttribute) {
        return <DynamicFieldArray component={componentProps} componentFactory={this} />
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