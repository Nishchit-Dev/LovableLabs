import { DocContent } from '../../types'
import { BuildPreivewDraggableContainer } from '../Builds/BuildPreviewDragableContainer'

export const draggableContainerContent: DocContent = {
    title: 'Draggable Container',
    description: 'Create elegant square grid backgrounds with lovablelabs UI',
    preview: BuildPreivewDraggableContainer(),
    sections: [
        {
            title: 'Install DragableContainer',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add DragableContainer`,
            isLiveDemo: false,
        },
        {
            title: 'Install Depsendencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge`,
            isLiveDemo: false,
        },
        {
            title: 'Add util file ',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            isLiveDemo: false,
        },
        {
            title: 'Draggable Container',
            codeSrc: 'components/DraggableContainer.tsx',
            code: `
'use client'
import clsx from 'clsx'
import React, {
    useRef,
    useState,
    ReactNode,
    MouseEvent,
    useCallback,
    useEffect,
} from 'react'

type DragableItemProps = {
    children: ReactNode
    initialPosition?: { x: number; y: number }
    style?: React.CSSProperties
    className?: string
    bounds?: { left: number; top: number; right: number; bottom: number }
    friction?: number
    bounciness?: number
    snapToGrid?: number
}

export const DragableItem: React.FC<DragableItemProps> = ({
    children,
    initialPosition = { x: 0, y: 0 },
    style,
    className = '',
    bounds,
    friction = 0.0,
    bounciness = 0.7,
    snapToGrid,
}) => {
    const [position, setPosition] = useState(initialPosition)
    const [dragging, setDragging] = useState(false)
    const [scale, setScale] = useState(1)

    const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const lastPos = useRef<{ x: number; y: number; time: number }>({
        x: 0,
        y: 0,
        time: 0,
    })
    const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const momentumFrame = useRef<number | null>(null)
    const elementRef = useRef<HTMLDivElement>(null)

    const applyBounds = useCallback(
        (pos: { x: number; y: number }) => {
            if (!bounds || !elementRef.current) return pos

            const rect = elementRef.current.getBoundingClientRect()
            const newPos = { ...pos }

            // Check boundaries and apply bounce
            if (newPos.x < bounds.left) {
                newPos.x = bounds.left
                velocity.current.x = Math.abs(velocity.current.x) * bounciness
            } else if (newPos.x + rect.width > bounds.right) {
                newPos.x = bounds.right - rect.width
                velocity.current.x = -Math.abs(velocity.current.x) * bounciness
            }

            if (newPos.y < bounds.top) {
                newPos.y = bounds.top
                velocity.current.y = Math.abs(velocity.current.y) * bounciness
            } else if (newPos.y + rect.height > bounds.bottom) {
                newPos.y = bounds.bottom - rect.height
                velocity.current.y = -Math.abs(velocity.current.y) * bounciness
            }

            return newPos
        },
        [bounds, bounciness]
    )

    const applySnapToGrid = useCallback(
        (pos: { x: number; y: number }) => {
            if (!snapToGrid) return pos
            return {
                x: Math.round(pos.x / snapToGrid) * snapToGrid,
                y: Math.round(pos.y / snapToGrid) * snapToGrid,
            }
        },
        [snapToGrid]
    )

    const onMouseMove = useCallback(
        (e: globalThis.MouseEvent) => {
            const now = performance.now()
            const newX = e.clientX - offset.current.x
            const newY = e.clientY - offset.current.y

            const newPos = applyBounds({ x: newX, y: newY })
            setPosition(newPos)

            // Calculate velocity with smoothing
            const dt = Math.max(now - lastPos.current.time, 1)
            const rawVelX = (newPos.x - lastPos.current.x) / dt
            const rawVelY = (newPos.y - lastPos.current.y) / dt

            // Smooth velocity calculation
            velocity.current.x = velocity.current.x * 0.8 + rawVelX * 0.2
            velocity.current.y = velocity.current.y * 0.8 + rawVelY * 0.2

            lastPos.current = { x: newPos.x, y: newPos.y, time: now }
        },
        [applyBounds]
    )

    const applyMomentum = useCallback(() => {
        if (!momentumFrame.current) return

        // Apply friction
        velocity.current.x *= friction
        velocity.current.y *= friction

        setPosition((pos) => {
            const next = {
                x: pos.x + velocity.current.x * 16,
                y: pos.y + velocity.current.y * 16,
            }

            const boundedNext = applyBounds(next)

            // Stop if velocity is very low
            const speed = Math.sqrt(
                velocity.current.x ** 2 + velocity.current.y ** 2
            )
            if (speed < 0.01) {
                const snappedPos = applySnapToGrid(boundedNext)
                if (
                    snappedPos.x !== boundedNext.x ||
                    snappedPos.y !== boundedNext.y
                ) {
                    return snappedPos
                }
                return boundedNext
            }

            momentumFrame.current = requestAnimationFrame(applyMomentum)
            return boundedNext
        })
    }, [friction, applyBounds, applySnapToGrid])

    const onMouseUp = useCallback(() => {
        setDragging(false)
        setScale(1)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)

        // Start momentum with enhanced initial velocity
        const speed = Math.sqrt(
            velocity.current.x ** 2 + velocity.current.y ** 2
        )
        if (speed > 0.1) {
            momentumFrame.current = requestAnimationFrame(applyMomentum)
        } else {
            // Apply snap to grid if no momentum
            setPosition((pos) => applySnapToGrid(pos))
        }
    }, [onMouseMove, applyMomentum, applySnapToGrid])

    const onMouseDown = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault()
            setDragging(true)
            setScale(1.05)

            offset.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            }
            lastPos.current = {
                x: position.x,
                y: position.y,
                time: performance.now(),
            }
            velocity.current = { x: 0, y: 0 }

            if (momentumFrame.current) {
                cancelAnimationFrame(momentumFrame.current)
                momentumFrame.current = null
            }

            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
        },
        [position, onMouseMove, onMouseUp]
    )

    useEffect(() => {
        return () => {
            if (momentumFrame.current) {
                cancelAnimationFrame(momentumFrame.current)
            }
        }
    }, [])

    return (
        <div
            ref={elementRef}
            className={clsx(
                className,

                dragging ? 'shadow-lg' : 'shadow-md hover:shadow-lg',
                dragging ? 'scale-105 transition duration-300 ease-in-out':''
            )}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                transform: \`scale(\${scale})\`,
                transformOrigin: 'center',
                willChange: 'transform, left, top',
                ...style,
            }}
            onMouseDown={onMouseDown}
        >
            {children}
        </div>
    )
}


`,
            isLiveDemo: false,
        },
    ],
}
