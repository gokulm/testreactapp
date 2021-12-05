import { useFormContext } from 'react-hook-form'
import { ComponentFactory } from './ComponentFactory';
import './JsonRenderer.scss'

interface IProps {
    schema: IComponentAttribute[],
    data: any
}

export interface IComponentAttribute {
    type: string,
    class?: string,
    children: IComponentAttribute[],
    id?: string,
    placeHolder?: string,
    style?: any,
    defaultValue?: string,
    name: string,
    dropdownValues?: any[]
}

const JsonRenderer = (props: IProps) => {
    const { register } = useFormContext();
    const componentFactory = new ComponentFactory(register);

    // const componentMappers: { [key: string]: Function } = {
    //     "flex": (componentProps: any) => renderFlexContainer(componentProps),
    //     "text": (componentProps: any) => renderTextBox(componentProps),
    //     "dropdown": (componentProps: any) => renderDropDown(componentProps)
    // }

    // const renderFlexContainer = (componentProps: IComponentAttribute) => {
    //     return <div className="renderer-flex-container" style={componentProps.style}>
    //         {componentProps.children.map(c => <div> {componentMappers[c.type](c)} </div>)}</div>
    // }

    // const renderTextBox = (componentProps: IComponentAttribute) => {
    //     return <input type="text" placeholder={componentProps.placeHolder}
    //         {...register(componentProps.name, { required: false })}
    //         defaultValue={componentProps.defaultValue} />
    // }

    // const renderDropDown = (componentProps: IComponentAttribute) => {
    //     return <Form.Select   {...register(componentProps.name, { required: false })} >
    //         <option value={undefined}>{componentProps.placeHolder}</option>
    //         {componentProps.dropdownValues?.map(d => <option value={d}>{d}</option>)}
    //     </Form.Select>
    // }

    return (
        <>
            {
                // (props.schema).map(m => componentMappers[m.type](m))
                (props.schema).map(m => componentFactory.render(m))
            }
        </>
    );
}

export default JsonRenderer;