import { animate, style, transition, trigger } from '@angular/animations';

export const ScaleUp = trigger('scaleUp', [
  transition(':enter', [
    style({ transform: 'scale(0.3)', filter: 'blur(10px)' }),
    animate('.2s ease-in-out', style({ transform: 'scale(1.0)', filter: 'blur(0)' }))
  ])
]);

export const ScaleDown = trigger('scaleDown', [
  transition(':leave', [
    style({ transform: 'scale(1.0)' }),
    animate('.2s ease-in-out', style({ transform: 'scale(0.0)' }))
  ])
]);

export const FadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ filter: 'blur(100px)' }),
    animate('1s ease-out')
  ])
]);

export const FadeOut = trigger('fadeOut', [
  transition(':leave', [
    style({ filter: 'blur(0)' }),
    animate('1s ease-out', style({ filter: 'blur(100px)' }))
  ])
]);

export const SlideOutLeft = trigger('slideOutLeft', [
  transition(':leave', [
    style({ filter: 'blur(0)' }),
    animate('1s ease-out', style({ transform: 'translateX(-100%)' }))
  ])
]);
