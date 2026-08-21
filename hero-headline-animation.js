document.addEventListener('DOMContentLoaded', () => {
  const sequence = document.querySelector('[data-headline-sequence]');
  if (!sequence) return;

  const headlines = Array.from(sequence.querySelectorAll('.cip-hero__headline'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wordDelay = 220;
  const readingPause = 1800;
  const leavingDuration = 450;

  headlines.forEach((headline) => {
    const text = headline.textContent.replace(/\s+/g, ' ').trim();
    headline.setAttribute('aria-label', text);
    headline.textContent = '';

    text.split(' ').forEach((word, wordIndex, words) => {
      const wordElement = document.createElement('span');
      wordElement.className = 'cip-hero__headline-word';
      wordElement.setAttribute('aria-hidden', 'true');
      wordElement.textContent = word;
      if (wordIndex < words.length - 1) wordElement.style.marginRight = '0.28em';
      headline.appendChild(wordElement);
    });
  });

  if (reducedMotion) {
    headlines[0].classList.add('is-active');
    headlines[0].querySelectorAll('.cip-hero__headline-word').forEach((word) => {
      word.classList.add('is-visible');
    });
    return;
  }

  const wait = (duration) => new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });

  const nextFrame = () => new Promise((resolve) => {
    window.requestAnimationFrame(resolve);
  });

  const revealHeadline = async (headline) => {
    headline.classList.add('is-active');
    await nextFrame();

    const words = headline.querySelectorAll('.cip-hero__headline-word');
    for (const word of words) {
      word.classList.add('is-visible');
      await wait(wordDelay);
    }

    await wait(readingPause);
    headline.classList.add('is-leaving');
    await wait(leavingDuration);
    headline.classList.remove('is-active', 'is-leaving');
    words.forEach((word) => word.classList.remove('is-visible'));
  };

  const runSequence = async () => {
    while (true) {
      for (const headline of headlines) {
        await revealHeadline(headline);
      }
    }
  };

  runSequence();
});
