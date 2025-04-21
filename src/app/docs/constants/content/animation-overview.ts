import { DocContent } from '../types';

const animationOverviewContent: DocContent = {
  title: "Animation Overview",
  description: "Learn the basics of animation with our UI library",
  sections: [
    {
      title: "Basic Animation",
      content: "Animations are a powerful way to enhance user experience. With our library, you can create smooth animations with minimal effort.",
      code: `<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Hello World
</motion.div>`,
      isLiveDemo: false,
    },
    {
      title: "Animation Properties",
      content: "You can animate various properties including opacity, scale, rotation, and position.",
      code: `<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.5 }}
>
  I scale in!
</motion.div>`,
      isLiveDemo: false,
    },
  ],
};

export default animationOverviewContent; 