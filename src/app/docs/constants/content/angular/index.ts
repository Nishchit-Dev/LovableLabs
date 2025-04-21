import { DocContent } from '../../types';

// Angular Get Started content
export const getStarted: DocContent = {
  title: 'Getting Started with Angular',
  description: 'Learn how to use Lovable UI with Angular',
  sections: [
    {
      title: 'Installation',
      content: `
## Installation

You can install Lovable UI for Angular using npm or yarn:

\`\`\`bash
npm install lovable-ui
# or
yarn add lovable-ui
\`\`\`

Then import the Lovable UI module in your app module:
      `,
      code: `
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LovableModule } from 'lovable-ui/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LovableModule // Import Lovable UI module
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
      `,
      isLiveDemo: false,
    },
    {
      title: 'Basic Usage',
      content: `
## Basic Usage

Lovable UI provides Angular directives for creating animations. Here's a basic example:
      `,
      code: `
// app.component.html
<div lovable-motion
  [initial]="{ opacity: 0, y: 50 }"
  [animate]="{ opacity: 1, y: 0 }"
  [transition]="{ duration: 0.5 }">
  Hello World!
</div>

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {}
      `,
      isLiveDemo: false,
    },
    {
      title: 'Next Steps',
      content: `
## Next Steps

Now that you have Lovable UI set up, explore the different animation capabilities:

- **Gesture animations**: Create hover, tap, and drag interactions
- **Scroll animations**: Trigger animations based on scroll position
- **Transitions**: Define custom transitions between states

Check out the Animation section for more details.
      `,
      isLiveDemo: false,
    }
  ]
};

// Animation Overview content
export const animationOverview: DocContent = {
  title: 'Animation Overview - Angular',
  description: 'Learn about the animation capabilities in Lovable UI with Angular',
  sections: [
    {
      title: 'Basic Animation',
      content: `
## Basic Animation

Lovable UI provides directives for creating animations in Angular. 

The core directive is \`lovable-motion\`, which lets you create smooth animations with a variety of options.
      `,
      code: `
<!-- app.component.html -->
<div lovable-motion
  [initial]="{ x: -100, opacity: 0 }"
  [animate]="{ x: 0, opacity: 1 }"
  [transition]="{ duration: 0.8 }">
  I'll animate in from the left!
</div>

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {}
      `,
      isLiveDemo: false,
    },
    {
      title: 'Animation Properties',
      content: `
## Animation Properties

Lovable UI supports a wide range of properties to animate:

- **Transform properties**: x, y, z, rotate, scale, etc.
- **CSS properties**: opacity, backgroundColor, width, etc.
- **SVG properties**: For animating SVG elements

You can animate multiple properties at once with different timings.
      `,
      code: `
<!-- app.component.html -->
<button lovable-motion
  [whileHover]="hoverState"
  [transition]="transitions">
  Hover me!
</button>

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  hoverState = {
    scale: 1.1,
    backgroundColor: '#666'
  };
  
  transitions = {
    scale: { duration: 0.2, ease: 'easeOut' },
    backgroundColor: { duration: 0.5, ease: 'linear' }
  };
}
      `,
      isLiveDemo: false,
    }
  ]
};

// Components Motion content
export const componentsMotion: DocContent = {
  title: 'Motion Component - Angular',
  description: 'Learn how to use the motion component in Lovable UI with Angular',
  sections: [
    {
      title: 'Basic Usage',
      content: `
## Basic Usage

The \`lovable-motion\` directive is the primary way to create animations in Angular:

      `,
      code: `
<!-- app.component.html -->
<div lovable-motion
  [initial]="{ opacity: 0 }"
  [animate]="{ opacity: 1 }"
  [exit]="{ opacity: 0 }"
  [transition]="{ duration: 0.5 }">
  Hello world!
</div>

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {}
      `,
      isLiveDemo: false,
    },
    {
      title: 'Animation Controls',
      content: `
## Animation Controls

You can control animations with the \`AnimationController\` service:

      `,
      code: `
// app.component.html
<div lovable-motion
  [animate]="controls"
  [initial]="initialState"
  style="width: 150px; height: 150px; background: red;">
</div>

<button (click)="startAnimation()">Start Animation</button>

// app.component.ts
import { Component } from '@angular/core';
import { AnimationController } from 'lovable-ui/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  controls = this.animationController.create();
  initialState = { x: 0, scale: 1, rotate: 0 };
  
  constructor(private animationController: AnimationController) {}
  
  startAnimation() {
    // Start a sequence of animations
    this.controls.start({
      x: 100,
      transition: { duration: 2 }
    }).then(() => {
      return this.controls.start({ scale: 1.5 });
    }).then(() => {
      return this.controls.start({ rotate: 180 });
    }).then(() => {
      return this.controls.start({ scale: 1 });
    });
  }
}
      `,
      isLiveDemo: false,
    }
  ]
};

// Angular Components Directives
export const componentsDirectives: DocContent = {
  title: 'Angular Directives',
  description: 'Learn about Angular-specific directives in Lovable UI',
  sections: [
    {
      title: 'lovable-motion',
      content: `
## lovable-motion Directive

The \`lovable-motion\` directive is the primary way to add animations to elements in Angular.
      `,
      code: `
<div lovable-motion
  [initial]="{ opacity: 0 }"
  [animate]="{ opacity: 1 }"
  [transition]="{ duration: 0.5 }">
  Content
</div>
      `,
      isLiveDemo: false,
    },
    {
      title: 'lovable-hover',
      content: `
## lovable-hover Directive

The \`lovable-hover\` directive adds hover animations to elements.
      `,
      code: `
<div lovable-hover
  [hover]="{ scale: 1.1 }"
  [transition]="{ duration: 0.2 }">
  Hover me
</div>
      `,
      isLiveDemo: false,
    },
    {
      title: 'lovable-scroll',
      content: `
## lovable-scroll Directive

The \`lovable-scroll\` directive creates scroll-triggered animations.
      `,
      code: `
<div lovable-scroll
  [scrollAnimate]="{ opacity: [0, 1], y: [100, 0] }"
  [threshold]="0.2">
  I'll animate when scrolled into view
</div>
      `,
      isLiveDemo: false,
    }
  ]
}; 