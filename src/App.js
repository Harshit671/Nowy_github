import React, { useState } from 'react'
import Addpage from './components/Addpage';
import Mainpage from './components/Mainpage';
import Editpage from './components/Editpage';
import Viewpage from './components/Viewpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [data, setData] = useState({
    id: "",
    info: ""
  })
  const getData = (id, data, name) => {
    setData({
      id: id,
      info: data,
      name: name
    })
  }
  return (
    < >
      <Router >
        <Switch>
          <Route exact path="/"  ><Mainpage getData={getData} /></Route>
          <Route exact path="/add" component={Addpage} />
          <Route exact path="/view" ><Viewpage data={data} /></Route>
          <Route exact path="/edit" ><Editpage data={data} /></Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
