import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { IComponentAttribute } from "./JsonRenderer"

const ComponentFactory = (props: any) => {
    const { register } = useFormContext();
    
    const componentMappers: { [key: string]: Function } = {
        "flex": (componentProps: any) => renderFlexContainer(componentProps),
        "text": (componentProps: any) => renderTextBox(componentProps),
        "dropdown": (componentProps: any) => renderDropDown(componentProps)
    }

    const renderFlexContainer = (componentProps: IComponentAttribute) => {
        return <div className="renderer-flex-container" style={componentProps.style}>
            {componentProps.children.map(c => <div> {componentMappers[c.type](c)} </div>)}</div>
    }

    const renderTextBox = (componentProps: IComponentAttribute) => {
        return <input type="text" placeholder={componentProps.placeHolder}
            {...register(componentProps.name, { required: false })}
            defaultValue={componentProps.defaultValue} />
    }

    const renderDropDown = (componentProps: IComponentAttribute) => {
        return <Form.Select   {...register(componentProps.name, { required: false })} >
            <option value={undefined}>{componentProps.placeHolder}</option>
            {componentProps.dropdownValues?.map(d => <option value={d}>{d}</option>)}
        </Form.Select>
    }
}

export default ComponentFactory;