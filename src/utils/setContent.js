import Spinner from '../components/spinner/spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
//
const setContent = (process, Component, data, props) => {
    switch (process) {
        case 'idle':
            return null;        
        case 'loading':
            return <Spinner/>;
        case 'loaded':
            return <Component data={data} {...props}/>;               
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;