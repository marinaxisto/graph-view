// Data array containing details of the nodes in the graph, including their connections and content for cards
const nodes = [
  {
    id: 1,
    title: "PeoplePath",
    x: 150,
    y: 100,
    connections: [2],
    description:
      "Yara PeoplePath is a platform to document your core data, contact points and where you will find resources like e-learning. Yara also uses PeoplePath actively as a supporting tool for processes like performance discussions, for making sure that you as an employee receive your entitlements and for identifying talents and opportunities within Yara. Therefore, you should review and update the following in Yara PeoplePath. Your personal details, your emergency contact, Your education, including uploading Diplomas and certificates, your additional skills, like languages and technical experience, your career mobility preferences, your performance goals and development plans, register for e-learnings.",
    moreInfoUrl: "https://example.com/node1",
  },
  {
    id: 2,
    title: "People Connect",
    x: 500,
    y: 90,
    connections: [1, 3],
    description:
      "People Connect is at the core of Yara's people strategy Grow at Yara. As its name suggests, People Connect is a framework that reminds us that it is important for both you and your manager to set goals and have check-ins to monitor the status of your goals and adjust them accordingly throughout the year. In Yara, both employees and managers take accountability in scheduling regular check-ins to communicate on the progress of goals that have been set at the beginning of the year. It is in our own interest as employees to make ourselves familiar with what is expected of us to align our goals in order to meet Yara's strategy and where to document them for further reference. ",
    moreInfoUrl: "https://example.com/node2",
  },
  {
    id: 3,
    title: "Grow@Yara",
    x: 150,
    y: 400,
    connections: [2],
    description: "",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 4,
    title: "Women in Agronomy",
    x: 1200,
    y: 90,
    connections: [10],
    description: "",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 5,
    title: "Leadership Behaviors",
    x: 550,
    y: 300,
    connections: [4, 6],
    description:
      "The Grow@Yara leadership behaviors are based on Yara's Values ​and have Diversity, Equity & Inclusion as a foundation. They were introduced at the global leadership event, Knowledge Exchange.",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 6,
    title: "Change Enablement",
    x: 1300,
    y: 280,
    connections: [6],
    description:
      "As our world continues to experience change at an accelerated pace, we are no longer spectators of change but are very much affected by it, be it personally or professionally. When changes take place, we are often confronted with how we will move through them and how we can cope. Navigating changes well should not just be a matter of survival, but instead, these changes present an opportunity for us to hone our adaptability and resilience skills. This, in turn, will foster a growth mindset.",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 7,
    title: "CoPs",
    x: 650,
    y: 150,
    connections: [5],
    description:
      "By joining a Community of Practice within Yara, you can immediately access a network of fellow colleagues. Within this network colleagues can share Yara resources, ask questions, meet up and seek guidance outside the formal lines of the organizational chart. Yara's Communities of Practice enable colleagues to exchange knowledge and skills outside of their own teams and location. This gives colleagues access to a wider range of expertise that offers help with a variety of challenges (e.g., technical challenges, site logistics, productivity and business problems) and allow for continuous improvement and more meaningful contributions to your team's goals.Your team also benefits from rapid problem-solving, continuous improvement ideas, and solutions trialled elsewhere in Yara.",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 8,
    title: "Radical Collaboration",
    x: 350,
    y: 550,
    connections: [5],
    description:
      "Do you want to learn how to create more collaborative environments, with more openness, accountability and trust? This workshop helps you building and maintaining successful long-term relationships (at work and in life).  It is not a course but rather an experience that increases your self-awareness and the awareness of others.",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 9,
    title: "Fundamentals Collaboration",
    x: 650,
    y: 550,
    connections: [5, 8],
    description:
      "Do you want to learn how to create more collaborative environments, with more openness, accountability and trust? This workshop helps you building and maintaining successful long-term relationships (at work and in life).  It is not a course but rather an experience that increases your self-awareness and the awareness of others.",
    moreInfoUrl: "https://example.com/node3",
  },
  {
    id: 10,
    title: "Global Mentoring Program",
    x: 990,
    y: 480,
    connections: [3, 5],
    description:
      "Do you want to learn how to create more collaborative environments, with more openness, accountability and trust? This workshop helps you building and maintaining successful long-term relationships (at work and in life).  It is not a course but rather an experience that increases your self-awareness and the awareness of others.",
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
