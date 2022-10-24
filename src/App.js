// import Task01 from './Task01_cl';
import Task01 from './Task01';
import Task02 from './Task02';
import Task03 from './Task03';
import Task04 from './Task04';
import Task05 from './Task05';

function App() {

    function tryAuth(login, password) {
        return login.length + password.length >= 6;
    }

    return (
        <div className="App">
            <Task01 tryAuth={ tryAuth } />
            <hr/>
            <Task02 />
            <hr/>
            <Task03 />
            <hr/>
            <Task04 />
            <hr/>
            <Task05 />
        </div>
    );
}

export default App;
