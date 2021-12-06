import { FormProvider, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import { IComponentAttribute } from "./IComponentAttribute";
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import ComponentFactory from "./ComponentFactory";

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData })
    const onSubmit = (testData: any) => console.log(testData);
    const componentFactory = new ComponentFactory(methods.register);
    componentFactory.addComponent("submit", (componentProps: any) =>
        renderSubmit(componentProps))

    const renderSubmit = (componentProps: IComponentAttribute) => {
        return <input type="submit" />
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