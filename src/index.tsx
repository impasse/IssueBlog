import 'es6-promise/auto'
import { h, render } from 'preact'
import Router from 'preact-router'
import { Header, Posts, Footer, Post, NotFound, Page } from './components'

//import 'preact/devtools'

import './style/main.styl'

const Main = () => {
  return (
    <div>
      <Header />
      <Router>
        <Posts path="/" />
        <Post path="/post/:id" />
        <Page path="/page/:id" />
        <NotFound default />
      </Router>
      <Footer />
    </div>
  )
}

render(<Main />, document.getElementById('app'));
