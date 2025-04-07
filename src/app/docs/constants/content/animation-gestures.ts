import { DocContent } from '../types';

const animationGesturesContent: DocContent = {
  title: "Gesture Animations",
  description: "Create interactive animations triggered by user gestures",
  sections: [
    {
      title: "Hover Animations",
      content: "Make elements respond to user hover with smooth animations.",
      code: `<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  Hover Me
</motion.button>`,
    },
    {
      title: "Drag Gestures",
      content: "Enable draggable elements with built-in animation support.",
      code: `<motion.div
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  }}
>
  Drag me
</motion.div>`,
    },
  ],
};

export default animationGesturesContent; 