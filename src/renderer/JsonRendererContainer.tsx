import { Controller, FormProvider, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import { IComponentAttribute } from "./IComponentAttribute";
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import ComponentFactory from "./ComponentFactory";
import { Form } from "react-bootstrap";
import jsonLogic, { RulesLogic } from "json-logic-js"
import NumberFormat from "react-number-format";

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData })
    const onSubmit = (testData: any) => console.log(testData);
    const componentFactory = new ComponentFactory(methods);
    componentFactory.addComponent("radiobuttonwithlist", (componentProps: any) =>
        renderRadioButtonWithList(componentProps));
    componentFactory.addComponent("number", (componentProps: any) =>
        renderNumber(componentProps));

    const result = jsonLogic.apply(apiData.rules as RulesLogic, apiData.rulesData);

    const getJsonLogicResult = (logic: any): boolean => {
        if (logic) {
            let result = jsonLogic.apply(logic as RulesLogic, methods.getValues());
            console.log("jsonLogic: ", result);
            return result as boolean;
        }
        return false;
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
        return <>{getJsonLogicResult(componentProps.rules) && <Controller
            control={(methods as any).control}
            name="business.taxId"
            render={({ field }) =>
                <Form.Group className="mb-3">
                    {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>}
                    <NumberFormat format={componentProps.format} className="form-control" placeholder={componentProps.format}
                        {...(methods as any).register(componentProps.name, { required: false })} {...field} />
                </Form.Group>}
        />}</>
    }

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <JsonRenderer schema={jsonschema1.components} data={apiData}
                    componentFactory={componentFactory} />
                {/* <input type="submit" /> */}
            </form>
        </FormProvider>)
}

export default JsonRendererContainer;