



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
// entry.target.classList.toggle('show',entry.isIntersecting);
