import { header } from "@/data/header";
import Header from "./header/Header";

const App = () => {
  return (
    <div>
      <Header {...header} />
    </div>
  )
}

export default App;