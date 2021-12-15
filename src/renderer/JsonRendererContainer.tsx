import { Controller, FormProvider, get, useFieldArray, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import { IComponentAttribute } from "./IComponentAttribute";
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import ComponentFactory from "./ComponentFactory";
import { Form } from "react-bootstrap";
import jsonLogic, { RulesLogic } from "json-logic-js"
import NumberFormat from "react-number-format";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

// todo: dynamic controls, flex multi col layout, aggregate, validators

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData, mode: "onTouched" })
    const onSubmit = (testData: any) => {
        console.log("errors:", methods.formState.errors);
        console.log("submitted form: ", testData);
    }
    const componentFactory = new ComponentFactory(methods);
    componentFactory.addComponent("radiobuttonwithlist", (componentProps: any) =>
        renderRadioButtonWithList(componentProps));
    componentFactory.addComponent("number", (componentProps: any) =>
        renderNumber(componentProps));
    componentFactory.addComponent("addbutton", (componentProps: any) =>
        renderAddButton(componentProps));
    componentFactory.addComponent("dynamic", (componentProps: any) =>
        renderDynamicContainer(componentProps));
    componentFactory.addComponent("fieldarray", (componentProps: any) =>
        renderUseFieldArray(componentProps));
    const rulesDictionary: { [key: string]: Function } = {};
    const dynamicFormDictionary: { [key: string]: IComponentAttribute } = {};
    const [stateDictionaryResult, setstateDictionaryResult] = useState<{ [key: string]: boolean }>({});

    const {
        fields: foodFields,
        append: foodAppend,
        remove: foodRemove
    } = useFieldArray({ control: methods.control, name: "coOwners" });

    useEffect(() => {
        const subscription = methods.watch((value, { name, type }) => {
            if (name && rulesDictionary[name]) {
                console.log("rulesDictionary hit", name, type)
                setstateDictionaryResult(prevState => ({
                    ...prevState,
                    [name]: rulesDictionary[name]()
                }));
                console.log("state dictionary", stateDictionaryResult);
            }
            console.log("errors: ", methods.formState.errors);
        });


        return () => subscription.unsubscribe();
    }, [methods.watch]);

    const add = () => {
        // let temp = methods.getValues("coOwners");
        // console.log("coOwners", temp);
        // if (temp) {
        //     let tempCoOwner = temp[0];
        //     let newCoOwner = Object.assign({}, tempCoOwner);
        //     console.log("newCoOwner", newCoOwner);
        //     temp.push(newCoOwner);
        //     methods.setValue("coOwners", temp);
        // }
        let childComponent = dynamicFormDictionary["coOwners"];
        renderDynamicContainer(childComponent);
    }

    const renderAddButton = (componentProps: IComponentAttribute) => {
        return <input type="button" value="Add" onClick={add} />
    }

    const renderDynamicContainer = (componentProps: IComponentAttribute) => {

        if (componentProps.baseProperty) {
            let count = ((methods as any).getValues(componentProps.baseProperty) as []).length;
            console.log("dynamic prop length: ", count);
            let childComponent = componentProps.children[0];
            dynamicFormDictionary[componentProps.baseProperty] = childComponent;

            // for (let index = 0; index < count; index++) {
            //     childComponent.baseIndex = 0;
            //     return componentFactory.render(childComponent);
            // }
        }

        return null;
    }

    const renderUseFieldArray = (componentProps: IComponentAttribute) => {
        return (
            <>

                {foodFields.map((item, index) => {
                    console.log("fieldsarray index: ", index);
                    let childComponent = cloneDeep(dynamicFormDictionary[componentProps.name]);
                    console.log(childComponent);
                    childComponent.baseIndex = index;
                    return (
                        // <li key={item.id}>
                        //     {item.firstName} {item.lastName}

                        //     <button type="button" onClick={() => foodRemove(index)}>
                        //         Delete
                        //     </button>
                        // </li>
                        componentFactory.render(childComponent)
                    );
                })}
                <button
                    type="button"
                    onClick={() => {
                        foodAppend({});
                    }}
                >
                    Add CoOwner
                </button>
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

        if (componentProps.rule) {
            rulesDictionary[componentProps.rule.variable] = () => {
                if (componentProps.rule) {
                    return jsonLogic.apply(componentProps.rule.logic as RulesLogic, methods.getValues()) as boolean;
                }
                return false;
            }

            return <>{stateDictionaryResult[componentProps.rule.variable] && number()}</>
        }

        return number();
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