import Splide from '@splidejs/splide'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initScrollAnimation } from './modules/scrollAnimation'
gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  console.log('sample')
  initScrollAnimation()
})
