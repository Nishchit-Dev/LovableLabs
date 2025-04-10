import { DocContent } from '../../types';

// Animation Gestures content for Angular
export const animationGestures: DocContent = {
    title: 'Gesture Animations - Angular',
    description: 'Learn how to create gesture-based animations with Lovable UI in Angular',
    sections: [
        {
            title: 'Hover Animations',
            content: `
## Hover Animations

Create smooth hover animations with the \`lovable-hover\` directive or with \`lovable-motion\` and the \`[whileHover]\` property:
      `,
            code: `
<!-- app.component.html -->
<button lovable-motion
  [whileHover]="{ scale: 1.1, backgroundColor: '#0088ff' }"
  [transition]="{ duration: 0.2 }">
  Hover me
</button>

<!-- Or with the specialized hover directive -->
<button lovable-hover
  [hover]="{ scale: 1.1, backgroundColor: '#0088ff' }"
  [transition]="{ duration: 0.2 }">
  Hover me
</button>
      `
        },
        {
            title: 'Drag Gestures',
            content: `
## Drag Gestures

Enable drag interactions with the \`lovable-drag\` directive:
      `,
            code: `
<!-- app.component.html -->
<div lovable-drag
  [dragConstraints]="{ left: 0, top: 0, right: 500, bottom: 300 }"
  (dragStart)="onDragStart()"
  (dragEnd)="onDragEnd()"
  style="width: 100px; height: 100px; background: red;">
</div>

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  onDragStart() {
    console.log('Drag started');
  }
  
  onDragEnd() {
    console.log('Drag ended');
  }
}
      `
        },
        {
            title: 'Tap Gestures',
            content: `
## Tap Gestures

Create tap animations with the \`lovable-tap\` directive or with \`lovable-motion\` and the \`[whileTap]\` property:
      `,
            code: `
<!-- app.component.html -->
<button lovable-motion
  [whileTap]="{ scale: 0.95 }"
  [transition]="{ duration: 0.1 }">
  Tap me
</button>

<!-- Or with the specialized tap directive -->
<button lovable-tap
  [tap]="{ scale: 0.95 }"
  [transition]="{ duration: 0.1 }">
  Tap me
</button>
      `
        }
    ]
}; 