import { useState } from 'react';
import './hello.css'
const Hello = () => {
  const [value, setvalue] = useState(false);
  return (
    <>
      <h1 className='hello'>
        wello come
      </h1>
      <button onClick={() => setvalue(!value)}>click</button>
      <h3>
        {value &&
          <>
            <h2>do yo have a account </h2>
          </>
          }
      </h3>
    </>
  );
}
export default Hello;