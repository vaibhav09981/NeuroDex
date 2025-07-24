// Router imports
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Component imports
import ToolCard from '../ToolsCard/ToolCard'

// Asset imports
import { TOOLS_DATA } from '../../data/toolsData'

// Styles
import './tools.css'

function Tools() {
  const navigate = useNavigate()
  const titleRef = useRef(null)
  const containerRef = useRef(null)
  const loadMoreRef = useRef(null)
  const [visibleTools, setVisibleTools] = useState(3)
  const [hasMore, setHasMore] = useState(true)


  // Baadme remove krna hai issee

  const [showPopup, setShowPopup] = useState(false)



  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 }
      )
      .fromTo(loadMoreRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      )
  }, [])

  const loadMore = () => {
    const nextVisible = visibleTools + 3
    setVisibleTools(nextVisible)
    setHasMore(nextVisible < TOOLS_DATA.length)
  }

  const navigateToTool = (toolName) => {
    if (toolName.toLowerCase() === 'image app' || toolName.toLowerCase() === 'todo app') {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }
    
    // Simplified route generation
    const toolRoute = toolName.toLowerCase().replace(/\s+/g, '');
    navigate(toolRoute);
  }

  return (

    <div className="tool">
      
      {/* isko bhi remove krna hai baadme */}
      {showPopup && (
        <div className="popup">
          Coming Soon!
        </div>
      )}

      
      <h1 ref={titleRef}>Tools</h1>
      <div className="toolsContainer" ref={containerRef}>
        {TOOLS_DATA.slice(0, visibleTools).map((tool) => (
          <ToolCard
            key={tool.id}
            logo={tool.logo}
            toolName={tool.name}
            toolDesc={tool.description}
            onClick={() => navigateToTool(tool.name)}
          />
        ))}
      </div>
      {hasMore && (
        <div className="loadMore" ref={loadMoreRef}>
          <button className="load" onClick={loadMore}>
            Load More
          </button>    
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Tools