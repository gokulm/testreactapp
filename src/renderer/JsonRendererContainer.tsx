import { FormProvider, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import { IComponentAttribute } from "./IComponentAttribute";
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import ComponentFactory from "./ComponentFactory";
import { Form } from "react-bootstrap";

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData })
    const onSubmit = (testData: any) => console.log(testData);
    const componentFactory = new ComponentFactory(methods);
    componentFactory.addComponent("radiobuttonwithlist", (componentProps: any) =>
        radioButtonWithList(componentProps));

    const radioButtonWithList = (componentProps: IComponentAttribute) => {
        return <Form.Group className="mb-3">
            {componentProps.label && <Form.Label>{componentProps.label}</Form.Label>} <br />
            <ul>
                {componentProps.radioButtonChecklist?.map(c => <li>{c}</li>)}
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