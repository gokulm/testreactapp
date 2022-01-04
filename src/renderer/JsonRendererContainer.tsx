import { Controller, FormProvider, get, useForm } from "react-hook-form";
import JsonRenderer from "./JsonRenderer"
import { IComponentAttribute, IRadioButtonListControl } from "./IComponentAttribute";
import jsonschema1 from "./jsonschemas/jsonschema1.json";
import apiData from './data.json'
import ComponentFactory from "./ComponentFactory";
import { Form } from "react-bootstrap";
import NumberFormat from "react-number-format";
import ConditionalRender from "./ConditionalRenderer";


// todo: dynamic controls, flex multi col layout, aggregate, validators

const JsonRendererContainer = () => {
    const methods = useForm({ defaultValues: apiData, mode: "onTouched" });
    const onSubmit = (testData: any) => {
        console.log("errors:", methods.formState.errors);

        // if (!isValidEmail(watchEmail)) {
        //     console.log("triggered email validation");
        //     methods.setError("owners.0.email", { type: "manual", message: "invalid email" });
        //     return;
        // }

        let coOwners = methods.getValues("coOwners");
        let ownershipPercentage = 0;
        coOwners.map(m => ownershipPercentage += +m.ownershipPercentage);
        console.log("ownershipPercentage: ", ownershipPercentage);
        if (ownershipPercentage > 100) {
            console.log("triggered ownership validation");
            methods.setError("coOwners", { type: "manual", message: "ownership cannot exceed 100%" });
            return;
        }
        else {
            methods.clearErrors("coOwners");
        }

        console.log("errors:", methods.formState.errors);
        console.log("submitted form: ", testData);
    }

    // const watchEmail = methods.watch("owners.0.email");
    // const watchCoOwners = methods.watch("coOwners");


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
    componentFactory.addComponent("ownershippercentage", (componentProps: any) =>
        renderOwnershipPercentage(componentProps));

  
    const renderOwnershipPercentage = (componentProps: IComponentAttribute) => {
        let error = get(methods.formState.errors, "coOwners");
        return <>{error && <span className="alert">{error.message}</span>}</>
    }

    const renderRadioButtonWithList = (componentProps: IComponentAttribute) => {
        let radioButtonListControl = componentProps as IRadioButtonListControl;
        return <Form.Group className="mb-3">
            {radioButtonListControl.label && <Form.Label>{radioButtonListControl.label}</Form.Label>} <br />
            <ul>
                {radioButtonListControl.checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            {radioButtonListControl.labelValues.map(d => {
                return (
                    <><input type="radio" value={d.value} id={`${radioButtonListControl.name}_${d.value}`}
                        {...(methods as any).register(radioButtonListControl.name, { required: false })}
                        defaultChecked={(methods as any).getValues(radioButtonListControl.name) === d.value}
                    /> <label htmlFor={`${radioButtonListControl.name}_${d.value}`}> {d.label} </label></>
                )
            })}</Form.Group>
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