import React from 'react';

class MicroFrontend extends React.Component {
    componentDidMount() {
        const { name, host, document, isSpeciality } = this.props;
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            this.renderMicroFrontend();
            return;
        }

        fetch(`${host}/asset-manifest.json`)
            .then(res => res.json())
            .then(manifest => {
                const script = document.createElement('script');
                script.id = scriptId;
                script.crossOrigin = '';
                script.src = `${host}${manifest['main.js']}`;
                script.onload = this.renderMicroFrontend;
                document.head.appendChild(script);
            });

        if (name === "Browse2") {
            fetch(`${host}/asset-manifest.json`)
                .then(res => res.json())
                .then(manifest => {
                    const script = document.createElement('script');
                    script.id = scriptId;
                    script.crossOrigin = '';
                    script.src = `${host}${manifest['browse2.js']}`;
                    script.onload = this.renderMicroFrontend;
                    document.head.appendChild(script);
                });
        }

        if (isSpeciality) {
            // console.log("loading speciality name: ", name);
            // console.log("loading speciality host: ", host);
            fetch(`${host}/asset-manifest.json`)
                .then(res => res.json())
                .then(manifest => {
                    // console.log("manifest: ", manifest);
                    const script = document.createElement('script');
                    script.id = scriptId;
                    script.crossOrigin = '';
                    let manifestName = `${name}.js`
                        // console.log("manifestName: ", manifestName);
                    let scriptSrc = `${host}${manifest[manifestName]}`;
                    console.log("scriptSrc: ", scriptSrc);
                    script.src = scriptSrc;
                    script.onload = this.renderMicroFrontend;
                    document.head.appendChild(script);
                });
        }
    }

    componentWillUnmount() {
        const { name, window } = this.props;

        window[`unmount${name}`](`${name}-container`);
    }

    renderMicroFrontend = () => {
        const { name, window, history } = this.props;
        console.log("renderMicroFrontend. name: ", name);

        window[`render${name}`](`${name}-container`, history);
    };

    render() {
        return <main id = { `${this.props.name}-container` }
        />;
    }
}

MicroFrontend.defaultProps = {
    document,
    window,
};

export default MicroFrontend;