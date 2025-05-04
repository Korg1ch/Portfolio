// Code for cursor blinking and typing effect
function typewriterEffect() {
    const phrases = ["developer", "designer", "engineer"];
    const baseText = "> Hello, World! I'm *Korg!ch, ";
    const textElement = document.querySelector(".text2");
    // const cursor = document.getElementById('cursor'); // No longer needed here
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    // Function for printing and erasing text
    function type() {
      const currentPhrase = phrases[phraseIndex];
  
      // Wait before start erasing
      if (isWaiting) {
        setTimeout(() => {
          isWaiting = false;
          isDeleting = true;
          type();
        }, 2000); // 2 second pause before erasing
        return;
      }
  
      // Typing/erasing speed
      const speed = isDeleting ? 100 : 150;
  
      if (isDeleting) {
        // Erase text
        letterIndex--;
        if (letterIndex < 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next word
        }
      } else {
        // Type text
        letterIndex++;
        if (letterIndex > currentPhrase.length) {
          isWaiting = true;
        }
      }
  
      // Update text and ADD cursor element. CSS will make it blink.
      textElement.innerHTML = baseText + currentPhrase.substring(0, letterIndex) + '<span id="cursor">|</span>';
  
      if (!isWaiting) {
        setTimeout(type, speed);
      } else {
        type(); // Call immediately to start waiting
      }
    }
  
    // Start typing effect
    type();
  }
  
  // Launch the effect when page loads
  document.addEventListener('DOMContentLoaded', () => {
    typewriterEffect();
  
    // If there is a discord element for copying
    const discordOpenButton = document.querySelector('.buttonD');
    if (discordOpenButton) {
      discordOpenButton.addEventListener('click', () => {
        navigator.clipboard.writeText('korg1ch')
          .then(() => {
            const discordText = document.getElementById('discord-open-text');
            const discordBack = document.getElementById('discord-open-back');
            const tooltip = document.querySelector('.discord-tooltip');
  
            if (discordText) discordText.innerText = 'Copied!';
            if (discordBack) discordBack.style.backgroundColor = '#4caf50';
            if (tooltip) {
              tooltip.textContent = 'Copied!';
              tooltip.classList.add('copy-success');
            }
  
            setTimeout(() => {
              if (discordText) discordText.innerText = 'Open';
              if (discordBack) discordBack.style.backgroundColor = '';
              if (tooltip) {
                tooltip.textContent = 'Click to copy ID';
                tooltip.classList.remove('copy-success');
              }
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy:', err);
          });
      });
    }

    // Add handlers for all buttons and links
    const allButtons = document.querySelectorAll('.rectangle-21, .rectangle-212, .rectangle-213, .b-back, .b-back2, .b-back3, .b-back4');
    
    allButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        // Add class to activate effect
        button.classList.add('hover-active');
      });
      
      button.addEventListener('mouseleave', () => {
        // Remove class when mouse leaves
        button.classList.remove('hover-active');
      });
    });
  });

// Cursor animation already handled by CSS animation

// Discord ID copy functionality
document.addEventListener('DOMContentLoaded', function() {
  const discordButton = document.querySelector('.buttonD');
  const discordOpenText = document.getElementById('discord-open-text');
  const discordOpenBack = document.getElementById('discord-open-back');
  
  if (discordButton) {
    discordButton.addEventListener('click', function() {
      const discordId = 'korg1ch';
      navigator.clipboard.writeText(discordId).then(() => {
        discordOpenText.textContent = 'Copied!';
        
        // Return to original state after 2 seconds
        setTimeout(() => {
          discordOpenText.textContent = 'Open';
        }, 2000);
      }).catch(err => {
        console.error('Could not copy Discord ID: ', err);
      });
    });
  }
});