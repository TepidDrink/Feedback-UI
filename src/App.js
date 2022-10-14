import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router-dom";
import AboutIconLink from "./components/AboutIconLink";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header";
import Card from "./components/shared/Card";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header/>
        <div className='container'>
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm/>
                <FeedbackStats/>
                <FeedbackList/>
              </>
            }></Route>

            <Route path='/about' element={ <AboutPage/> }/>

          </Routes>
        </div>

        <Card>
          <NavLink to='/' activeclassname='active'>
            Home
          </NavLink>
          <> </>
          <NavLink to='/about' activeclassname='active'>
            about
          </NavLink>
        </Card>
        <AboutIconLink/>
      </Router>
    </FeedbackProvider>
  )
}

export default App