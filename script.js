// Data array containing details of the nodes in the graph, including their connections and content for cards
const nodes = [
  {
    id: 1,
    title: "Node 1",
    x: 50,
    y: 100,
    connections: [2],
    description: "This is node 1.",
    imageUrl: "img/node1.jpg",
    videoUrl: "video/node1.mp4",
    moreInfoUrl: "https://example.com/node1",
  },
  {
    id: 2,
    title: "Node 2",
    x: 200,
    y: 200,
    connections: [1, 3],
    description: "This is node 2.",
    imageUrl: "img/node2.jpg",
    videoUrl: "video/node2.mp4",
    moreInfoUrl: "https://example.com/node2",
  },
  {
    id: 3,
    title: "Node 3",
    x: 350,
    y: 100,
    connections: [2],
    description: "This is node 3.",
    imageUrl: "img/node3.jpg",
    videoUrl: "video/node3.mp4",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 4,
    title: "Node 4",
    x: 150,
    y: 350,
    connections: [2],
    description: "This is node 4.",
    imageUrl: "img/node3.jpg",
    videoUrl: "video/node3.mp4",
    moreInfoUrl: "https://example.com/node3",
  },
]

// Function to create and append a node element to the graph container
function createNode(node) {
  // Create a div element for the node
  const nodeElement = document.createElement("div")
  // Set absolute positioning to place the node at specific coordinates
  nodeElement.style.position = "absolute"
  nodeElement.style.left = `${node.x}px`
  nodeElement.style.top = `${node.y}px`
  // Set the HTML content inside the node, including a clickable dot and the node title
  nodeElement.innerHTML = `<span class="dot" onclick="showCard(${node.id})"></span><p>${node.title}</p>`
  // Assign class for styling
  nodeElement.className = "item"
  // Append the node element to the graph container in the DOM
  document.getElementById("graph-container").appendChild(nodeElement)
  // Create a corresponding card for the node
  createCard(node)
}

// Function to draw a line (SVG element) between two nodes
function drawLine(x1, y1, x2, y2) {
  // Create an SVG line element
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
  // Set the starting and ending points of the line
  line.setAttribute("x1", x1)
  line.setAttribute("y1", y1)
  line.setAttribute("x2", x2)
  line.setAttribute("y2", y2)
  // Set the line color
  line.setAttribute("stroke", "black")
  // Return the created line element
  return line
}

// Main function to render the graph based on the nodes data
function renderGraph(nodes) {
  // Create an SVG container for the lines
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.style.position = "absolute"
  svg.style.width = "100%"
  svg.style.height = "100%"
  // Append the SVG container to the graph container
  document.getElementById("graph-container").appendChild(svg)
  // Iterate over each node to create and place it
  nodes.forEach((node) => {
    createNode(node)
    // Draw lines to each connected node
    node.connections.forEach((connectionId) => {
      const targetNode = nodes.find((n) => n.id === connectionId)
      if (!targetNode) {
        console.error(`Node with ID ${connectionId} not found.`)
        return
      }
      svg.appendChild(
        drawLine(
          node.x + 12.5,
          node.y + 12.5,
          targetNode.x + 12.5,
          targetNode.y + 12.5
        )
      )
    })
  })
}

// Add an event listener to render the graph once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => renderGraph(nodes))

// Function to create an information card for each node
function createCard(node) {
  const card = document.createElement("div")
  card.id = `card-${node.id}`
  card.className = "card"
  // Set the inner HTML of the card, including close button, content, and additional elements like images and links
  card.innerHTML = `
    <span class="close-btn" onclick="closeCard(${node.id})">&times;</span>
    <div class="card-content">
        <h2>${node.title}</h2>
        <p>${node.description}</p>
        <img src="${node.imageUrl}" alt="${node.title}">
        <video controls>
            <source src="${node.videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <a href="${node.moreInfoUrl}">Learn more</a>
    </div>
  `
  // Append the card to the body of the document
  document.body.appendChild(card)
}

// Function to display a card
function showCard(nodeId) {
  document.getElementById(`card-${nodeId}`).style.display = "block"
  document.getElementById("backdrop").style.display = "block"
}

// Function to close the displayed card
function closeCard(nodeId) {
  document.getElementById(`card-${nodeId}`).style.display = "none"
  document.getElementById("backdrop").style.display = "none"
}

// Create and append a backdrop element to the body for when cards are displayed
const backdrop = document.createElement("div")
backdrop.id = "backdrop"
backdrop.className = "backdrop"
backdrop.onclick = () => {
  // Close all cards when the backdrop is clicked
  nodes.forEach((node) => closeCard(node.id))
}
document.body.appendChild(backdrop)
