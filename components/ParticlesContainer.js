import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import React, { useCallback, useState } from 'react';

const ParticlesContainer = () => {
  const [particleLimitReached, setParticleLimitReached] = useState(false);
  const [firstClick, setFirstClick] = useState(true); // State to track the first user click

  const particleLimit = 200;

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    const particlesCount = container.particles.count;
    if (particlesCount >= particleLimit) {
      setParticleLimitReached(true);
    }
  }, []);

  // Custom function to handle the first user click
  const handleFirstClick = () => {
    if (firstClick) {
      setFirstClick(false); // Update the state to reflect the first interaction
      // Perform any additional actions here if needed
    }
  };

  // Adjust options based on whether the particle limit has been reached
  const particleOptions = particleLimitReached ? {
    particles: {
      number: {
        value: 100, // Reset to the original configuration
      },
    },
    // Include other reset configurations here
  } : {
    fullScreen: { enable: false },
    background: {
      color: {
        value: '', // Example: Change background color after first click
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ['repulse', 'connect'],
        },
        onClick: {
          enable: true,
          mode: 'push',
          // Add the handler for the first click
        },
      },
      modes: {
        repulse: {
          distance: 150,
          duration: 0.4,
        },
        connect: {
          distance: 80,
          links: {
            opacity: 0.5,
          },
          radius: 20,
        },
        push: {
          quantity: 1,
          // Update to reflect changes after the first click
        },
      },
    },
    particles: {
      color: {
        value: firstClick ? '#ffffff' : '#ff0000', // Change color after the first click
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: true,
        speed: 1,
        straight: false,
        warp: true,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 0.5,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
        },
      },
      shape: {
        type: ['circle', 'triangle', 'star', 'square'],
      },
      size: {
        value: { min: 1, max: 5 },
        anim: {
          enable: true,
          speed: 7,
          size_min: 0.1,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    detectRetina: true,
  };

  React.useEffect(() => {
    const updateOnClick = () => {
      handleFirstClick();
    };

    if (firstClick) { // Only listen for the first click
      document.addEventListener('click', updateOnClick);
    }

    return () => {
      document.removeEventListener('click', updateOnClick);
    };
  }, [firstClick]); // Dependency array ensures this effect runs only when `firstClick` changes

  return (
    <Particles
      className='w-full h-full absolute translate-z-0'
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
    />
  );
};

export default ParticlesContainer;
