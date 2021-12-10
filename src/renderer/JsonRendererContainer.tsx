import { Controller, FormProvider, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import { IComponentAttribute } from "./IComponentAttribute";
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import ComponentFactory from "./ComponentFactory";
import { Form } from "react-bootstrap";
import jsonLogic, { RulesLogic } from "json-logic-js"
import NumberFormat from "react-number-format";
import { useEffect, useState } from "react";

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData })
    const onSubmit = (testData: any) => {
        console.log("errors:", methods.formState.errors);
        console.log("submitted form: ", testData);
    }
    const componentFactory = new ComponentFactory(methods);
    componentFactory.addComponent("radiobuttonwithlist", (componentProps: any) =>
        renderRadioButtonWithList(componentProps));
    componentFactory.addComponent("number", (componentProps: any) =>
        renderNumber(componentProps));
    const rulesDictionary: { [key: string]: Function } = {};
    const [stateDictionaryResult, setstateDictionaryResult] = useState<{ [key: string]: boolean }>({});

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
            return <Controller
                control={(methods as any).control}
                name="business.taxId"
                render={({ field }) =>
                    <Form.Group className="mb-3">
                        {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>}
                        <NumberFormat format={componentProps.format} className="form-control" placeholder={componentProps.format}
                            {...(methods as any).register(componentProps.name, { required: componentProps.required })} {...field} />
                        {(methods as any).formState.errors[componentProps.name] && (methods as any).formState.errors[componentProps.name].type === "required" && (
                            <Form.Label>This is required</Form.Label>
                        )}
                    </Form.Group>}
            />
        }

        if (componentProps.rule) {
            rulesDictionary[componentProps.rule.variable] = () => {
                if (componentProps.rule) {
                    let result = jsonLogic.apply(componentProps.rule.logic as RulesLogic, methods.getValues());
                    console.log("renderNumber result", result);
                    return result as boolean;
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