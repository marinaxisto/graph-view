// Function to parse CSV data into a usable format
function parseCSV(csvText) {
  const lines = csvText.split("\n")
  const result = []
  const headers = lines[0].split(",")

  for (let i = 1; i < lines.length - 1; i++) {
    // -1 to avoid processing an empty line at end if present
    let obj = {}
    let currentline = lines[i].split(",")

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentline[j].trim()
    }
    result.push(obj)
  }
  return result // This result is an array of objects
}

// Main function to render the graph based on the nodes data
function renderGraph(nodes) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.style.position = "absolute"
  svg.style.width = "100%"
  svg.style.height = "100%"
  document.getElementById("graph-container").appendChild(svg)
  nodes.forEach((node) => {
    createNode(node)
    node.connections = node.connections.split(",").map(Number) // Assuming 'connections' are listed as comma-separated in CSV
    node.connections.forEach((connectionId) => {
      const targetNode = nodes.find((n) => n.id === parseInt(connectionId))
      if (!targetNode) {
        console.error(`Node with ID ${connectionId} not found.`)
        return
      }
      svg.appendChild(
        drawLine(
          parseInt(node.x) + 12.5,
          parseInt(node.y) + 12.5,
          targetNode.x + 12.5,
          targetNode.y + 12.5
        )
      )
    })
  })
}

// Fetch CSV data and initiate graph rendering
fetch("") // Replace with the actual URL to your CSV file
  .then((response) => response.text())
  .then((csvText) => {
    const nodes = parseCSV(csvText)
    nodes.forEach((node) => {
      // Convert numerical properties from strings
      node.id = parseInt(node.id)
      node.x = parseInt(node.x)
      node.y = parseInt(node.y)
    })
    renderGraph(nodes)
  })
  .catch((error) => console.error("Error loading data:", error))

// Additional functions like createNode, createCard, showCard, closeCard, etc., remain the same and are not listed here for brevity.
