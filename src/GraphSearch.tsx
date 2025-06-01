import { useState } from "react"

interface SearchParams {
  source: number
  destination: number
  search: "bfs" | "dfs"
}

const GraphSearch = () => {
  const [searchParams, setSearchParams]: [
    SearchParams,
    React.Dispatch<React.SetStateAction<SearchParams>>
  ] = useState<SearchParams>({
    source: 44,
    destination: 8,
    search: "bfs",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  const handleSearch = () => {
    const { source, destination, search } = searchParams
    if (
      source &&
      destination &&
      source >= 0 &&
      source < 100 &&
      destination >= 0 &&
      destination < 100
    ) {
      bfs(source, destination)
      console.log(`${source} - ${destination}`)
    } else {
      console.error("Invalid source or destination")
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <label htmlFor="source">Source </label>
      <input
        type="text"
        id="source"
        name="source"
        value={searchParams.source}
        onChange={handleInputChange}
      />

      <label htmlFor="destination">Destination </label>
      <input
        type="text"
        id="destination"
        name="destination"
        value={searchParams.destination}
        onChange={handleInputChange}
      />

      <button onClick={handleSearch}>Search</button>
      {searchParams.source &&
      searchParams.destination &&
      searchParams.source >= 0 &&
      searchParams.source < 100 &&
      searchParams.destination >= 0 &&
      searchParams.destination < 100 ? (
        <></>
      ) : (
        <div style={{ color: "red" }}>Invalid Input</div>
      )}

      <div>
        <label htmlFor="bfsradio">BFS</label>
        <input
          type="radio"
          name="search"
          id="bfsradio"
          value="bfs"
          checked={searchParams.search === "bfs"}
          onChange={() => {
            setSearchParams((prev) => ({ ...prev, search: "bfs" }))
          }}
        />
        <label htmlFor="dfsradio">DFS</label>
        <input
          type="radio"
          name="search"
          id="dfsradio"
          value="dfs"
          checked={searchParams.search === "dfs"}
          onChange={() => {
            setSearchParams((prev) => ({ ...prev, search: "dfs" }))
          }}
        />
      </div>
      <GraphGrid />
    </div>
  )
}

const GraphGrid = () => {
  const GraphCols = (startnumber: number, colcount: number) => {
    return [...Array(colcount)].map((_, index) => (
      <div
        key={startnumber + index}
        id={`grid${startnumber + index}`}
        style={{
          width: "50px",
          height: "50px",
          border: "1px solid black",
          margin: "5px 0",
          display: "inline-block",
          textAlign: "center",
          placeContent: "center",
          fontWeight: "bold",
        }}
      >
        {startnumber + index}
      </div>
    ))
  }

  const GraphRows = (rowcount: number) => {
    return [...Array(rowcount)].map((_, index) => (
      <div>{GraphCols(index * 10, 10)}</div>
    ))
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>my grid</div>
      <div>{GraphRows(10)}</div>
    </div>
  )
}

function paintN(n: number, c: string = "red") {
  const grid = document.getElementById("grid" + String(n))
  if (grid) {
    grid.style.backgroundColor = c
  }
}

async function bfs(source: number, destination: number) {
  const dir = [
    { i: -1, j: 0 }, // Up
    { i: 1, j: 0 }, // Down
    { i: 0, j: -1 }, // Left
    { i: 0, j: 1 }, // Right
  ]

  const visit: number[] = [source]
  const seen = new Set<number>([]) 
  paintN(source, "blue")

  while (visit.length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    let visitCount:number = visit.length
    for (let i = 0; i < visitCount; i++) {
      const current = visit.shift()
      let curI = Math.floor(current! / 10)
      let curJ = current! % 10
      for (let d of dir) {
        let newI = curI + d.i
        let newJ = curJ + d.j
        if (newI < 0 || newI >= 10 || newJ < 0 || newJ >= 10) continue

        let newN = newI * 10 + newJ
        if (seen.has(newN)) continue

        seen.add(newN) 
        if (newN != source && newN != destination) {
          paintN(newN, "red")
        }

        if (newN === destination) {
          console.log(`Found destination ${destination} from ${source}`)
          paintN(newN, "green")
          return
        }
        visit.push(newN)
      }
    }
  }
}



export default GraphSearch
