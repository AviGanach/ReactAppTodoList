import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Body from "./components/Body";
import "./App.css";


function App() {
  return (
    <div className="container App">
      <Header imgLogo={
          "https://cdn.pixabay.com/photo/2016/02/18/07/06/social-1206603__340.png"
        }
        title={"Welcome to To Do List App"}/>
      <Body />
    </div>
  );
}

export default App;
