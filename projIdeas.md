1. To all:
   * make a to-do list
    * consolidate some apps (e.g., "educational", "sims", etc)
    * tighten code
    * insert comments
    * convert for-loops to list comprehensions
    * make readme (including navigational links)
    * use local storage to allow user to remain logged in?
    * Figure out how to animate the gifs, for the READMEs.
    * Figure out whether to include photos (ie, AWS usage) into non-tennis projects

1. For net-assign and tennis projects, seed a 3rd tier of authorization ("isSysAdmin") for a user who has the authority to bestore "isGroupManager" status to a new user.

1. For tennis project, create a Groups table which is very analogous to the Courses table of net-assign.

1. Make react-fs template (w/out redux)

1. ASTEROID-FIELD GAME:  Take the largely passive asteroid-field simulation from my capstone, and convert it into a game by requiring the user to pilot a craft thru the field safely in the shortest amount of time.
    * This will require me to learn how to design click-and-drag controls for the user.
    * There would be a genuine purpose for a back-end for this project, namely to store high scores.

1. SELF-GUIDED TOUR OF SOLAR-SYSTEM OR GALAXY:
    * use an API which has coordinates of all heavenly bodies in solar system and/or galaxy
    * using techniques that I'll learn from previous project, allow user to navigate thru this system at superluminal speeds
    * I imagine that this project may need a back-end to store the bodies' coordinates.

1. COLLISIONS:
    * simulate idealized collisions between two or more objects
    * collisions will conserve momentum and (possibly) energy
    * 1 dimension (MVP) vs 2- and 3-dimensions (stretch)
    * allow for a tunable coefficient of restitution (*e*)
    * 1- and 2-d versions of this would be similar to PhET's ["Collision Lab"](https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_all.html)

1. [BENFORD'S LAW](https://en.wikipedia.org/wiki/Benford%27s_law) for the probabilistic distribution of leading digits
    * compile a list of datasets that the user may grab and compare this law
    * Note that this law received a bit of attention recently, when you-know-who used it as "evidence" of fraud in the [2020 presidential election](https://physicsworld.com/a/benfords-law-and-the-2020-us-presidential-election-nothing-out-of-the-ordinary/).

1. PLANETARY MOTION: Simulate the motion of planets in a solar system.
    * MVP: two-dimensional, model separate orbits independently (ie, no planet-planet coupling)
    * stretch #1: three-dimensional (like asteroids)
    * stretch #2: generate motion by solving differential equation (ie, allow planet-planet coupling), which would be much like PhET's ["My Solar System"](https://phet.colorado.edu/en/simulation/legacy/my-solar-system)) simulation.

1. VIBRATING STRING: one-dimensional version of drumhead (capstone)
    * closely related to PhET's [simulation](https://phet.colorado.edu/en/simulation/wave-on-a-string) by the same name

1. VIBRATING BEAM: solve the ["beam equation"](https://en.wikipedia.org/wiki/Euler%E2%80%93Bernoulli_beam_theory)
    * display either horizontally or vertically
    * choose which BC to zero: (1) y & y', (2) y & y'', etc
    * unforced oscillations: how to displace it initially (at end?)
    * forced oscillations: displacement at end, rotation at end, uniformly along length?, all w/damping?

1. ONE-DIMENSIONAL WAVE-EQUATION
    * interference of two counterpropagation pulses
    * tsunami in an ocean of varying depth

1. [TWO-DIMENSIONAL WAVE-EQUATION](https://en.wikipedia.org/wiki/Helmholtz_equation)
    * would require (fairly sophisticated) [boundary element method](https://www.sciencedirect.com/science/article/abs/pii/S0749603684711402) for finding the modes of a drumhead

1. 1-d Schroedinger equation.  Find bound states and wave functions for a potential drawn by user.

1. Fourier analysis.  Mouse-draw a curve, specify number of functions, and also specify whether to use cos, sin, or periodic BC.

1. Contour integration.  User types in analytic function as a string and draws the closed contour.  App (back-end?) calculates the integral and residue.  The user can try to find the pole(s) by making the contour successively smaller.

1. Constant-acceleration motion problems (including freefall?), done in the same manner as factoring quadratics.

1. Consolidate graphical-kinematics and quadratic-factorizer into a single app.

1. TypeScript resources:
https://www.typescriptlang.org/docs/handbook/intro.html
https://react-typescript-cheatsheet.netlify.app/docs/basic/setup
https://ts.chibicode.com/todo/
