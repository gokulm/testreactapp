import { Controller, FormProvider, get, useFieldArray, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import { IComponentAttribute } from "./IComponentAttribute";
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import ComponentFactory from "./ComponentFactory";
import { Form } from "react-bootstrap";
import NumberFormat from "react-number-format";
import DynamicFieldArray from "./DynamicFieldArray";
import ConditionalRender from "./ConditionalRenderer";
import { useEffect } from "react";


// todo: dynamic controls, flex multi col layout, aggregate, validators

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData, mode: "onTouched" })
    const onSubmit = (testData: any) => {
        if (!isValidEmail(watchEmail)) {
            console.log("triggered email validation");
            methods.setError("owners.0.email", { type: "manual", message: "invalid email" });
            console.log("errors:", methods.formState.errors);
            return;
        }
        console.log("errors:", methods.formState.errors);
        console.log("submitted form: ", testData);
    }

    const watchEmail = methods.watch("owners.0.email");


    // useEffect(() => {
    //     console.log("triggered email change");
    //     if (!isValidEmail(watchEmail)) {
    //         console.log("triggered email validation");
    //         methods.setError("owners.0.email", { type: "manual", message: "invalid email" });
    //         console.log("errors:", methods.formState.errors);
    //     }
    //     else {
    //         // methods.clearErrors("owners.0.email");
    //     }
    // }, [watchEmail]);

    const rendererOnChange = (e: any) => {
        if (e.target.name === "owners.0.email") {
            console.log("handling on change differently. value: ", e.target.value);
            if (!isValidEmail(e.target.value)) {
                methods.setError("owners.0.email", { type: "manual", message: "invalid email" });
            }
            else {
                methods.clearErrors("owners.0.email");
            }
        }
    }

    const isValidEmail = (email: any) =>
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );

    const componentFactory = new ComponentFactory(methods, rendererOnChange);
    componentFactory.addComponent("radiobuttonwithlist", (componentProps: any) =>
        renderRadioButtonWithList(componentProps));
    componentFactory.addComponent("number", (componentProps: any) =>
        renderNumber(componentProps));
    componentFactory.addComponent("dynamic", (componentProps: any) =>
        renderDynamicContainer(componentProps));
    const dynamicFormDictionary: { [key: string]: IComponentAttribute } = {};

    const renderDynamicContainer = (componentProps: IComponentAttribute) => {

        let count = ((methods as any).getValues(componentProps.name) as []).length;
        // console.log("dynamic prop length: ", count);
        let childComponent = componentProps.children[0];
        dynamicFormDictionary[componentProps.name] = childComponent;

        return (
            <>
                <DynamicFieldArray name={componentProps.name} label={componentProps.label || ""}
                    componentFactory={componentFactory} dynamicFormDictionary={dynamicFormDictionary} />
            </>
        )
    }

    const renderRadioButtonWithList = (componentProps: IComponentAttribute) => {
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>} <br />
            <ul>
                {componentProps.radioButtonChecklist?.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            {componentProps.radioButtons?.map(d => {
                return (
                    <><input type="radio" value={d.value} id={`${componentProps.name}_${d.value}`}
                        {...(methods as any).register(componentProps.name, { required: false })}
                        defaultChecked={(methods as any).getValues(componentProps.name) === d.value}
                    /> <label htmlFor={`${componentProps.name}_${d.value}`}> {d.label} </label></>
                )
            })}</Form.Group>
    }

    const renderNumber = (componentProps: IComponentAttribute) => {

        let number = () => {
            const error = get((methods as any).formState.errors, componentProps.name);

            return <Controller
                control={(methods as any).control}
                name="business.taxId"
                render={({ field }) =>
                    <Form.Group className="mb-3">
                        {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>}
                        <NumberFormat format={componentProps.format} className="form-control" placeholder={componentProps.format}
                            {...(methods as any).register(componentProps.name, { required: { value: componentProps.required, message: "Please enter Business Tax ID" } })} {...field} />
                        {error && <span className="alert">{error.message}</span>}
                    </Form.Group>}
            />
        }

        // console.log("going to render conditional render... ");
        return <ConditionalRender componentAttr={componentProps}>{number()}</ConditionalRender>
    }

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <JsonRenderer schema={jsonschema1.components} data={apiData}
                    componentFactory={componentFactory} />
            </form>
        </FormProvider>)
}

export default JsonRendererContainer;