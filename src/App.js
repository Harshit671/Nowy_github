import React, { useState } from 'react'
import Addpage from './components/Addpage';
import Editpage from './components/Editpage';
import Viewpage from './components/Viewpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar';
import ChapterView from './components/ChapterView';
import BookView from './components/BookView';


const App = () => {
  const [data, setData] = useState({
    id: "",
    info: "",
    name: ""
  })
  const [repoName, setRepoName] = useState("")
  const [chapterName, setChapterName] = useState("")
  const getRepoName = (name) => {
    setRepoName(name);
  }

  const getChapterName = (name) => {
    setChapterName(name);
  }

  const getData = (id, data, name) => {
    console.log("hellllooooooo", id)
    setData({
      id: id,
      info: data,
      name: name
    })
  }


  return (
    < >

      <Router >
        <Navbar />
        <div className="container-fluid">
          <Switch>

            <Route exact path="/"  ><BookView getRepoName={getRepoName} /></Route>
            <Route exact path="/chapter"  ><ChapterView getData={getData} repoName={repoName} getChapterName={getChapterName} /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/add"   ><Addpage repoName={repoName} chapterName={chapterName} /></Route>
            <Route exact path="/view" ><Viewpage data={data} repoName={repoName} /></Route>
            <Route exact path="/edit" ><Editpage data={data} repoName={repoName} /></Route>
          </Switch>
        </div>
      </Router>

    </>
  )
}

export default App
