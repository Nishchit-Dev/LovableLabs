import { DocContent } from '../types';

const animationScrollContent: DocContent = {
  title: "Scroll Animations",
  description: "Trigger animations as users scroll down the page",
  sections: [
    {
      title: "Scroll-triggered Animations",
      content: "Elements can animate into view as the user scrolls down the page.",
      code: `<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  I'll animate in when you scroll to me
</motion.div>`,
      isLiveDemo: false,
    },
  ],
};

export default animationScrollContent; 