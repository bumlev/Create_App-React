import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Survey from './pages/Survey';
import { BrowserRouter as  Router , Routes , Route  } from 'react-router-dom'
import Header from './components/Header'
import Error from './components/Error';
import Results from './pages/Results';
import Freelances from './pages/Freelances';
import GlobalStyle  from './utils/style/GlobalStyle';
import { ThemeProvider , SurveyProvider} from './utils/style/context/'
import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle/>
          <Header/>
          <Routes>  
            <Route path="/" element={<Home/>} />
            <Route path="/survey/:questionNumber" element={<Survey/>} />
            <Route path='/results' element={<Results/>} />
            <Route path='/freelances' element={<Freelances/>} />
            <Route path='*' element={<Error/>} />
          </Routes> 
          <Footer/> 
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

