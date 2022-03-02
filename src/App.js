import logo from './logo.svg';
import './App.css';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Article from './components/article/Article';
function App() {
  return (
<>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
        Acoustic Content Demo
        </Navbar.Brand>
      </Container>
    </Navbar>
    <Article></Article>
</>
  );
}

export default App;
