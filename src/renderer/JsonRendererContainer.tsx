import JsonRenderer from "./JsonRenderer"
import jsonschema1 from "./jsonschemas/jsonschema1.json";

const JsonRendererContainer = (props: any) => {
    return <JsonRenderer schema={jsonschema1.components} />
}

export default JsonRendererContainer;