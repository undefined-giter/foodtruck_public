import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PhoneNumberProvider } from './contexts/PhoneNumberContext';
import { ContrastProvider } from './contexts/ContrastContext';
import { Menu } from "./components/Menu/Menu"
import { Food } from "./components/Food/Food"
import { Presentation } from "./components/Presentation/Presentation"
import { Gallery } from "./components/Gallery/Gallery"
import { Reviews } from "./components/Reviews/Reviews"
import { CreateReview } from "./components/CreateReview/CreateReview"
import { EditReview } from "./components/EditReview/EditReview"
import { Contact } from "./components/Contact/Contact"
import { NotFound } from "./components/NotFound/NotFound"
import { Landing } from "./components/Landing/Landing"
import { Footer } from "./components/Footer/Footer"

function App() {

  const [footerRendered, setFooterRendered] = useState(false)
  const hideFooter   = () => {setFooterRendered(true)}
  const renderFooter = () => {setFooterRendered(false)}

  return (
    <div className='App' id='app'>
      <BrowserRouter>
        <PhoneNumberProvider>
          <ContrastProvider>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/" element={<Menu />} >
                <Route path="/Menu" element={<Food renderFooter={renderFooter} hideFooter={hideFooter} />} />
                <Route path="/Présentation" element={<Presentation />} />
                <Route path="/Gallerie" element={<Gallery />} />
                <Route path="/Avis" element={<Reviews />} />
                <Route path="/Partager" element={<CreateReview />} />
                <Route path="/Modifier/:encodedEmail" element={<EditReview />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            {!footerRendered && <Footer />} 
          </ContrastProvider>
        </PhoneNumberProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
