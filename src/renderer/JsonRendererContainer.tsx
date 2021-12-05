import { FormProvider, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import { Form } from "react-bootstrap";

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData })
    const onSubmit = (testData: any) => console.log(testData);

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <JsonRenderer schema={jsonschema1.components} data={apiData} />
                <input type="submit" />
            </form>
        </FormProvider>)
}

export default JsonRendererContainer;