import { useEffect, useState } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { IComponentAttribute } from "./IComponentAttribute";
import jsonLogic, { RulesLogic } from "json-logic-js"
import ComponentFactory from "./ComponentFactory";
import { Form } from "react-bootstrap";
import NumberFormat from "react-number-format";

interface IProps {
    componentAttr: IComponentAttribute,
    componentFactory: ComponentFactory
}

const ConditionalRender = (props: IProps) => {
    const methods = useFormContext();
    const [conditionalLogicResult, setConditionalLogicResult] = useState<boolean>(false);

    const number = () => {
        const error = get((methods as any).formState.errors, props.componentAttr.name);

        return <Controller
            control={(methods as any).control}
            name="business.taxId"
            render={({ field }) =>
                <Form.Group className="mb-3">
                    {props.componentAttr.label && <Form.Label>{props.componentAttr.label}</Form.Label>}
                    <NumberFormat format={props.componentAttr.format} className="form-control" placeholder={props.componentAttr.format}
                        {...(methods as any).register(props.componentAttr.name, { required: { value: props.componentAttr.required, message: "Please enter Business Tax ID" } })} {...field} />
                    {error && <span className="alert">{error.message}</span>}
                </Form.Group>}
        />
    }



    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            console.log("watch name value type", name, value);

            if (props.componentAttr.rule && props.componentAttr.rule.variable &&
                props.componentAttr.rule.variable === name) {
                console.log("componentAttr.rule.variable: ", name);
                let result = jsonLogic.apply(props.componentAttr.rule.logic as RulesLogic, methods.getValues()) as boolean;
                console.log("componentAttr.rule.variable result: ", result);
                setConditionalLogicResult(result);
                props.componentAttr.rule.ruleSet = true;
            }
        });


        return () => subscription.unsubscribe();
    }, [methods.watch]);

    return <>{conditionalLogicResult && number()}</>

}

export default ConditionalRender;