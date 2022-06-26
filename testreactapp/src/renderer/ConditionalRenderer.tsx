import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IComponentAttribute } from "./IComponentAttribute";
import jsonLogic, { RulesLogic } from "json-logic-js"

interface IProps {
    componentAttr: IComponentAttribute
    children: JSX.Element
}

const ConditionalRender = (props: IProps) => {
    const methods = useFormContext();
    const [conditionalLogicResult, setConditionalLogicResult] = useState<boolean>(false);

    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            console.log("watch name value type", name, value);

            if (props.componentAttr.rule && props.componentAttr.rule.variable &&
                props.componentAttr.rule.variable === name) {
                console.log("componentAttr.rule.variable: ", name);
                let result = jsonLogic.apply(props.componentAttr.rule.logic as RulesLogic, methods.getValues()) as boolean;
                console.log("componentAttr.rule.variable result: ", result);
                setConditionalLogicResult(result);
                // props.componentAttr.rule.ruleSet = true;
            }
        });


        return () => subscription.unsubscribe();
    }, [methods.watch]);

    return <>{conditionalLogicResult && props.children}</>

}

export default ConditionalRender;