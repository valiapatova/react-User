import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import UserList from './components/UserList.jsx'
import './styles.css'


function App() {

  return (
    <>
      <Header />

      {/* <!-- Main component  --> */}
      
      <main className="main">
        <UserList />
      </main>

      <Footer />
    </>
  )
}

export default App
