import './JsonRenderer.scss'

const componentMappers: { [key: string]: Function; } = {
    "flex": (componentProps: any) => renderFlexContainer(componentProps),
    "text": (componentProps: any) => renderTextBox(componentProps)
}

const renderFlexContainer = (componentProps: IComponentAttribute) => {
    return <div className="flexContainer" {...componentProps}>
        {componentProps.children.map(c => componentMappers[c.type](c))}</div>
}

const renderTextBox = (componentProps: IComponentAttribute) => {
    return <input type="text" />
}

interface IProps {
    schema: IComponentAttribute[]
}

interface IComponentAttribute {
    type: string,
    class?: string,
    children: IComponentAttribute[],
    dataKey: string,
    id?: string,
    placeHolder?: string,
    style?: any
}

const JsonRenderer = (props: IProps) => {
    return (
        <>
            {
                (props.schema).map(m => componentMappers[m.type](m))
            }
        </>
    );
}

export default JsonRenderer;