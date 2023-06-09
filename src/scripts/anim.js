import {gsap} from 'gsap';



// Intersection Observer Code for detecting the User's Focus to Apply Animations


const observer = new IntersectionObserver((entries) =>{
	entries.forEach((entry)=>{
		if(entry.isIntersecting){
			entry.target.classList.add('show');
            
		} else {
			entry.target.classList.remove('show');
		}
	});
});

const animateElements = document.querySelectorAll('.fadeleft');
animateElements.forEach((el)=> observer.observe(el));

const animateElements1 = document.querySelectorAll('.faderight');
animateElements1.forEach((el)=> observer.observe(el));




// Code for perk section image slider animations
const grid = document.querySelector('.gridPerk')
const items = document.querySelectorAll('.item')

items.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    gsap.to(grid, {
      '--track': '2fr',
      duration: 0.3,
    })
    gsap.to(item, {
      '--innerTrack': '1fr',
      duration: 0.3,
    })
  })

  item.addEventListener('mouseleave', () => {
    gsap.to(grid, {
      '--track': '1fr',
      duration: 0.3,
    })
    gsap.to(item, {
      '--innerTrack': '0fr',
      duration: 0.3,
    })
  })
})