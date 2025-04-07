import { DocContent } from '../types';

const componentsMotionContent: DocContent = {
  title: "motion Component",
  description: "The core animation component that powers everything",
  sections: [
    {
      title: "Basic Usage",
      content: "The motion component is the foundation of our animation library. You can use it with any HTML or SVG element.",
      code: `<motion.div
  animate={{ 
    x: 100, 
    backgroundColor: "#ff0088",
    boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)"
  }}
>
  I'll animate my x position and color
</motion.div>`,
    },
  ],
};

export default componentsMotionContent; 