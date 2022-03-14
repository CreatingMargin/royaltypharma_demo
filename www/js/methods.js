'use strict';

window.methods = {

    animateCSS (element, animation, prefix = 'animate__') {
        return new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = (isElement(element)) ? element : document.querySelector(element);
            if (!node) return;
            const classes = node.classList;

            if (animationName.includes('In')) {
                if (classes.contains('visible')) {
                    handleAnimationEnd();
                    return;
                }
                if (window.getComputedStyle(node).display === "none") {
                    node.style.display = "block";
                }
            } else if (animationName.includes('Out')) {
                if (classes.contains('hidden')) {
                    handleAnimationEnd();
                    return;
                }
            }

            node.classList.remove('hidden', 'noTrans');

            node.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
                if (animationName.includes('Out')) {
                    node.classList.add('hidden', 'noTrans');
                    node.classList.remove('visible');
                } else {
                    node.classList.add('visible');
                    node.classList.remove('hidden', 'noTrans');
                }
                if (event) event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }

            function isElement(element){
                return element instanceof Element || element instanceof HTMLDocument;
            }

            node.addEventListener('animationend', handleAnimationEnd, { once: true });
        });

    }

  };