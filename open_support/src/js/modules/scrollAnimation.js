import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initScrollAnimation() {
  // kv people: pop in with mirrored delay pattern (1&6 → 2&5 → 3&4)
  const peopleDelays = [0.3, 0.5, 0.7, 0.7, 0.5, 0.3]
  const peopleItems = document.querySelectorAll('.p-opensupport-kv-people__item')
  if (peopleItems.length) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.p-opensupport-kv-people',
        start: 'top 80%',
      },
    })
    peopleItems.forEach((item, i) => {
      tl.fromTo(
        item,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power4.out' },
        peopleDelays[i]
      )
    })
  }

  // internet workflow step circles: pop in with stagger
  const stepCircles = document.querySelectorAll('.p-opensupport-internet-card-step__icon')
  if (stepCircles.length) {
    gsap.fromTo(
      stepCircles,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.p-opensupport-internet-workflow-card',
          start: 'top 75%',
        },
      }
    )
  }

  // need items: slide up from bottom with stagger
  const needItems = document.querySelectorAll('.p-opensupport-need-content-point__item')
  if (needItems.length) {
    gsap.fromTo(
      needItems,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.p-opensupport-need-content-point',
          start: 'top 75%',
        },
      }
    )
  }
}
