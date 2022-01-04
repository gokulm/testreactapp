import { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ComponentFactory from "./ComponentFactory";
import { IComponentAttribute, IFlexControl } from "./IComponentAttribute";

interface IProps {
    component: IComponentAttribute,
    componentFactory: ComponentFactory
}

const DynamicFieldArray = (props: IProps) => {
    const methods = useFormContext();
    const childComponent = props.component.children[0] as IFlexControl;

    const {
        fields,
        append,
        remove
    } = useFieldArray({ control: methods.control, name: props.component.name });

    return (
        <>
            {fields.map((item, index) => {
                // console.log("fieldsarray index: ", index);
                // console.log(childComponent);
                childComponent.dynamicIndex = index;
                return (
                    <Fragment key={index}> <button type="button" onClick={() => remove(index)}>
                        Delete
                    </button>
                        {props.componentFactory.render(childComponent)}</Fragment>
                );
            })}
            <button
                type="button"
                onClick={() => {
                    append({});
                }}
            >
                Add {props.component.label}
            </button>
        </>
    )

}

export default DynamicFieldArray