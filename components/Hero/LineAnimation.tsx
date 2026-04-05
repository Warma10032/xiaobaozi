'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

export default function LineAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes: Node[] = []
    const nodeCount = 50
    const connectionDistance = 150

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      })
    }

    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          node.x -= dx * 0.01
          node.y -= dy * 0.01
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fill()
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 * (1 - dist / connectionDistance)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      nodes.forEach((node) => {
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.strokeStyle = `rgba(0, 102, 204, ${0.2 * (1 - dist / 200)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.6,
      }}
    />
  )
}
