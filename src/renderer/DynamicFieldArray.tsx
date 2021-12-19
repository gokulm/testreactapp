import { cloneDeep } from "lodash";
import { useFieldArray, useFormContext } from "react-hook-form";
import ComponentFactory from "./ComponentFactory";
import { IComponentAttribute } from "./IComponentAttribute";

interface IProps {
    name: string,
    componentFactory: ComponentFactory,
    dynamicFormDictionary: { [key: string]: IComponentAttribute }
}

const DynamicFieldArray = (props: IProps) => {
    const methods = useFormContext();

    const {
        fields,
        append,
        remove
    } = useFieldArray({ control: methods.control, name: props.name });

    return (
        <>
            {fields.map((item, index) => {
                console.log("fieldsarray index: ", index);
                let childComponent = cloneDeep(props.dynamicFormDictionary[props.name]);
                console.log(childComponent);
                childComponent.baseIndex = index;
                return (
                    <> <button type="button" onClick={() => remove(index)}>
                        Delete
                    </button>
                        {props.componentFactory.render(childComponent)}</>
                );
            })}
            <button
                type="button"
                onClick={() => {
                    append({});
                }}
            >
                Add CoOwner
            </button>
        </>
    )

}

export default DynamicFieldArray