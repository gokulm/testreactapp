import { Suspense } from 'react';
import React from 'react';



// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<div>Loading</div>}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
