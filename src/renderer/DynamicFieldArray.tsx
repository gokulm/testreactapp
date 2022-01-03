import { useFieldArray, useFormContext } from "react-hook-form";
import ComponentFactory from "./ComponentFactory";
import { IComponentAttribute } from "./IComponentAttribute";

interface IProps {
    componentAttribute: IComponentAttribute,
    componentFactory: ComponentFactory
}

const DynamicFieldArray = (props: IProps) => {
    const methods = useFormContext();
    const childComponent = props.componentAttribute.children[0];
    // const emptyObject = () => {
    //     let test = methods.getValues(props.name)[0] ?? {}
    //     console.log("test coowners", test);
    //     return test;
    // };

    // const Input = ({ name, control, register, index }: any) => {
    //     const test = useFormContext();
    //     const value = useWatch({
    //       control,
    //       name
    //     });
    //     return <input {...register(`test.${index}.age`)} defaultValue={value} />;
    //   };

    const {
        fields,
        append,
        remove
    } = useFieldArray({ control: methods.control, name: props.componentAttribute.name });

    return (
        <>
            {fields.map((item, index) => {
                console.log("fieldsarray index: ", index);
                // let childComponent = cloneDeep(props.dynamicFormDictionary[props.name]);
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
                Add {props.componentAttribute.label}
            </button>
        </>
    )

}

export default DynamicFieldArray