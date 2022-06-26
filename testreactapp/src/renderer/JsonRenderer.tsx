import { useFormContext } from 'react-hook-form'
import ComponentFactory from './ComponentFactory';
import { IComponentAttribute } from './IComponentAttribute';
import './JsonRenderer.scss'

interface IProps {
    schema: IComponentAttribute[],
    data: any,
    componentFactory?: ComponentFactory
}

const JsonRenderer = (props: IProps) => {
    const methods = useFormContext();
    const componentFactory = props.componentFactory ?? new ComponentFactory(methods);

    return (
        <>
            {
                (props.schema).map(m => componentFactory.render(m))
            }
        </>
    );
}

export default JsonRenderer;