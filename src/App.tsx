import mazeicon from "/maze.svg"
import GraphSearch from "./GraphSearch";

function App() {

  return (
    <>
      <div style={{ height: "100px", alignContent: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={mazeicon} width={50} height={50} alt="Maze Icon" />
          <h3>Visualize Graph Search</h3>
        </div>
      </div>
      <GraphSearch/>

    </>
  )
}

export default App
