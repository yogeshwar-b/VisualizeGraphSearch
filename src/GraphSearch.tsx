import { useEffect, useState } from 'react'

interface SearchParams {
  source: number
  destination: number
  search: 'bfs' | 'dfs'
}

const GraphSearch = () => {
  useEffect(() => {
    handleSearch();
  }, [])

  const [searchParams, setSearchParams]: [
    SearchParams,
    React.Dispatch<React.SetStateAction<SearchParams>>
  ] = useState<SearchParams>({
    source: 44,
    destination: 8,
    search: 'bfs'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  const handleSearch = () => {
    const { source, destination, search } = searchParams
    if (
      source !== null &&
      source !== undefined &&
      destination !== null &&
      destination !== undefined &&
      source >= 0 &&
      source < 100 &&
      destination >= 0 &&
      destination < 100
    ) {
      for (let i = 0; i < 100; i++) {
        paintN(i, '')
      }
      if (search === 'bfs') {
        bfs(source, destination)
      } else if (search === 'dfs') {
        handleDFS(source, destination)
      }
      console.log(`${source} - ${destination}`)
    } else {
      console.error('Invalid source or destination')
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', placeItems: 'center' }}>
      <div>
        <label htmlFor='source'>
          Source{' '}
          <input
            type='text'
            id='source'
            name='source'
            value={searchParams.source}
            onChange={handleInputChange}
            style={{
              width: '2em',
              textAlign: 'center',
              marginRight: '10px'
            }}
          />
        </label>

        <label htmlFor='destination'>
          Destination{' '}
          <input
            type='text'
            id='destination'
            name='destination'
            value={searchParams.destination}
            onChange={handleInputChange}
            style={{ width: '2em', textAlign: 'center', marginRight: '10px' }}
          />
        </label>

        <button onClick={handleSearch}>Search</button>
        {searchParams.source &&
        searchParams.destination &&
        searchParams.source >= 0 &&
        searchParams.source < 100 &&
        searchParams.destination >= 0 &&
        searchParams.destination < 100 ? (
          <></>
        ) : (
          <div style={{ color: 'red' }}>Invalid Input</div>
        )}
      </div>

      <div>
        <input
          type='radio'
          name='search'
          id='bfsradio'
          value='bfs'
          checked={searchParams.search === 'bfs'}
          onChange={() => {
            for (let i = 0; i < 100; i++) {
              paintN(i, '')
            }
            setSearchParams((prev) => ({ ...prev, search: 'bfs' }))
          }}
        />
        <label htmlFor='bfsradio'>BFS</label>

        <input
          type='radio'
          name='search'
          id='dfsradio'
          value='dfs'
          checked={searchParams.search === 'dfs'}
          onChange={() => {
            for (let i = 0; i < 100; i++) {
              paintN(i, '')
            }
            setSearchParams((prev) => ({ ...prev, search: 'dfs' }))
          }}
        />
        <label htmlFor='dfsradio'>DFS</label>
      </div>
      <div>
        {searchParams.search === 'bfs' ? (
          <div>
            <span style={{ color: 'blue' }}>
              <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                <rect width='10' height='10' x='10' y='10' fill='blue' />
              </svg>
              <span> Source</span>
            </span>
            <span style={{ color: 'red' }}>
              <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                <rect width='10' height='10' x='10' y='10' fill='red' />
              </svg>
              <span> Visited</span>
            </span>
            <span style={{ color: 'green' }}>
              <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                <rect width='10' height='10' x='10' y='10' fill='green' />
              </svg>
              <span> Destination</span>
            </span>
          </div>
        ) : (
          <div>
            <span style={{ color: 'blue' }}>
              <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                <rect width='10' height='10' x='10' y='10' fill='blue' />
              </svg>
              <span> Source</span>
            </span>
            <span style={{ color: 'red' }}>
              <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                <rect width='10' height='10' x='10' y='10' fill='red' />
              </svg>
              <span> Visited</span>
            </span>
            <span style={{ color: 'green' }}>
              <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                <rect width='10' height='10' x='10' y='10' fill='green' />
              </svg>
              <span> Destination</span>
            </span>
            <span style={{ color: 'orange' }}>
              <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                <rect width='10' height='10' x='10' y='10' fill='orange' />
              </svg>
              <span> Backtracking/Seen</span>
            </span>
            
          </div>
        )}
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
          width: '9%',
          maxWidth: '40px',
          aspectRatio: '1/1',
          border: '2px solid black',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          borderRadius: '5px',
          margin: '1px',
          display: 'inline-block',
          textAlign: 'center',
          placeContent: 'center',
          fontWeight: 'bold',

          transition: 'background-color 0.3s ease'
        }}
      >
        {startnumber + index}
      </div>
    ))
  }

  const GraphRows = (rowcount: number) => {
    return [...Array(rowcount)].map((_, index) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {GraphCols(index * 10, 10)}
      </div>
    ))
  }
  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', placeItems: 'center' }}>{GraphRows(10)}</div>
    </div>
  )
}

function paintN(n: number, c: string = 'red') {
  const grid = document.getElementById('grid' + String(n))
  if (grid) {
    grid.style.backgroundColor = c
  }
}

async function bfs(source: number, destination: number) {
  const dir = [
    { i: -1, j: 0 }, // Up
    { i: 1, j: 0 }, // Down
    { i: 0, j: -1 }, // Left
    { i: 0, j: 1 } // Right
  ]

  const visit: number[] = [source]
  const seen = new Set<number>([])
  paintN(source, 'blue')

  while (visit.length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    let visitCount: number = visit.length
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
          paintN(newN, 'red')
        }

        if (newN === destination) {
          console.log(`Found destination ${destination} from ${source}`)
          paintN(newN, 'green')
          return
        }
        visit.push(newN)
      }
    }
  }
}

var DestinationFound = false
var seenSet = new Set<number>()
const dir = [
  { i: -1, j: 0 },
  { i: 1, j: 0 },
  { i: 0, j: -1 },
  { i: 0, j: 1 }
]
var seenDelay = 100
var paintDelay = 100
var sourceNode = -1
function handleDFS(source: number, destination: number) {
  DestinationFound = false
  sourceNode = source
  seenSet.clear()
  recursiveDfs(source, destination)
}
async function recursiveDfs(curr: number, destination: number) {
  if (curr === destination) {
    console.log(`Found destination ${destination} from ${curr}`)
    DestinationFound = true
    paintN(destination, 'green')
    return
  }
  if (seenSet.has(curr)) {
    paintN(curr, 'violet')
    await new Promise((resolve) => setTimeout(resolve, seenDelay))
    paintN(curr, 'red')
    return
  }
  if (curr == sourceNode) {
    paintN(curr, 'blue')
  } else {
    paintN(curr, 'red')
  }
  seenSet.add(curr)

  // console.log(`Visiting ${curr}`)
  await new Promise((resolve) => setTimeout(resolve, paintDelay))
  const curI = Math.floor(curr / 10)
  const curJ = curr % 10

  for (const d of dir) {
    const newI = curI + d.i
    const newJ = curJ + d.j
    if (newI < 0 || newI >= 10 || newJ < 0 || newJ >= 10) continue

    const newN = newI * 10 + newJ
    if (!seenSet.has(newN) && !DestinationFound) {
      await recursiveDfs(newN, destination)
      if (DestinationFound) {
        return
      }
    }
  }
  await new Promise((resolve) => setTimeout(resolve, paintDelay))
  paintN(curr, 'orange')
}

export default GraphSearch
