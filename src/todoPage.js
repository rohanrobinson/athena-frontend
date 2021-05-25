import React, {useState, useEffect} from 'react';
import { Card } from './card';
function TodoPage() {

  const [placeholder, setPlaceholder] = useState('goodbye')

    useEffect(() => {
      fetch('/users').then(res => res.json()).then(data => {
        console.log(data);
      });
    }, []);


  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Explore some Philosophy</h1>
            < Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;