<template>
<div class="truncate w-full h-full bg-gray-950 universe flex justify-center items-center absolute">

  <div class="orbit first">
    <div class="planet neptune"></div>
    <div class="orbit neptune justify-center">

      <div class="planet uranus"></div>
      <div class="orbit uranus">

        <div class="planet saturn"></div>
        <div class="orbit saturn">

          <div class="planet jupiter"></div>
          <div class="orbit jupiter">

            <div class="planet mars"></div>
            <div class="orbit mars">

              <div class="planet earth"></div>
              <div class="orbit earth">

                <div class="planet venus"></div>
                <div class="orbit venus">

                  <div class="planet mercury"></div>
                  <div class="orbit mercury">

                    <div class="planet sun"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<div class="star star-1"></div>
<div class="star star-2"></div>
<div class="star star-3"></div>
<div class="star star-4"></div>
<div class="star star-5"></div>
<div class="star star-6"></div>
<div class="star star-4"></div>
<div class="star star-5"></div>
<div class="star star-6"></div>
</div>
</template>

<script setup>
let meta = document.querySelector('meta[name="viewport"]');
if (!meta) {
  meta = document.createElement('meta');
  meta.name = "viewport";
  document.head.appendChild(meta);
}

meta.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";

</script>

<style scoped>
.star {
  width: 1px;
  height: 1px;
  background: transparent;
  position: absolute;
}

.star-1 {
  animation: sparkle1 2s ease-in-out infinite;
  box-shadow:
      -12vw -4vh 0 0 rgba(255, 255, 255, 1),
      -20vw 10vh 2px 0 rgba(255, 255, 255, 1),
      -28vw 40vh 1px 0 rgba(255, 245, 200, 1),
      -36vw 15vh 1px 0 rgba(255, 255, 180, 1),
      -46vw -25vh 3px 0 rgba(255, 245, 200, 1),
      -60vw -15vh 1px 0 rgba(255, 220, 220, 1),
      -70vw 5vh 3px 0 rgba(255, 255, 255, 1),
      -72vw -5vh 1px 0 rgba(255, 245, 200, 1);
}

.star-2 {
  animation: sparkle2 2.5s ease-in-out infinite;
  box-shadow:
      -14vw -41vh 1px 0 rgba(255, 220, 220, 0.95),
      -22vw -20vh 1px 0 rgba(255, 200, 200, 0.95),
      -26vw -15vh 3px 0 rgba(255, 255, 255, 0.9),
      -34vw -50vh 2px 0 rgba(255, 200, 200, 0.9),
      -40vw -60vh 3px 0 rgba(255, 255, 255, 0.95),
      -48vw 20vh 1px 0 rgba(255, 255, 255, 0.9),
      -50vw -55vh 2px 0 rgba(255, 220, 220, 0.95),
      -54vw 40vh 1px 0 rgba(255, 200, 200, 0.95),
      -62vw 30vh 3px 0 rgba(255, 255, 255, 0.9),
      -64vw -45vh 2px 0 rgba(255, 245, 200, 0.95);
}

.star-3 {
  animation: sparkle3 3s ease-in-out infinite;
  box-shadow:
      -16vw -42vh 2px 0 rgba(255, 255, 180, 0.9),
      -18vw -30vh 1px 0 rgba(255, 245, 200, 0.9),
      -24vw 25vh 2px 0 rgba(255, 255, 180, 0.85),
      -30vw -10vh 2px 0 rgba(255, 220, 220, 0.85),
      -32vw -35vh 3px 0 rgba(255, 255, 255, 0.85),
      -38vw 5vh 2px 0 rgba(255, 245, 200, 0.9),
      -42vw 30vh 1px 0 rgba(255, 220, 220, 0.85),
      -44vw 50vh 2px 0 rgba(255, 255, 180, 0.9),
      -52vw -50vh 2px 0 rgba(255, 245, 200, 0.85),
      -56vw -35vh 3px 0 rgba(255, 255, 255, 0.85),
      -58vw -50vh 2px 0 rgba(255, 255, 180, 0.9),
      -66vw -10vh 1px 0 rgba(255, 255, 180, 0.85),
      -68vw -25vh 2px 0 rgba(255, 220, 220, 0.9),
      -74vw 20vh 2px 0 rgba(255, 255, 180, 0.85),
      -76vw -30vh 3px 0 rgba(255, 220, 220, 0.85),
      -78vw 50vh 2px 0 rgba(255, 255, 255, 0.9),
      -80vw -60vh 1px 0 rgba(255, 220, 220, 0.85),
      -82vw 15vh 3px 0 rgba(255, 255, 180, 0.9),
      -84vw 25vh 2px 0 rgba(255, 245, 200, 0.85),
      -86vw -20vh 1px 0 rgba(255, 200, 200, 0.9);
}

.star-4 {
  animation: sparkle1 1.8s ease-in-out infinite;
  box-shadow:
      12vw -15vh 0 0 rgba(255, 255, 255, 1),
      18vw 25vh 1px 0 rgba(255, 245, 200, 1),
      25vw -35vh 2px 0 rgba(255, 220, 220, 1),
      32vw 45vh 1px 0 rgba(255, 255, 180, 1),
      38vw -25vh 3px 0 rgba(255, 255, 255, 0.9),
      45vw 15vh 1px 0 rgba(255, 245, 200, 1),
      52vw -45vh 2px 0 rgba(255, 220, 220, 0.95),
      58vw 35vh 1px 0 rgba(255, 255, 255, 1);
}

.star-5 {
  animation: sparkle2 2.2s ease-in-out infinite;
  box-shadow:
      15vw -8vh 1px 0 rgba(255, 200, 200, 0.9),
      22vw 18vh 2px 0 rgba(255, 255, 180, 0.85),
      28vw -38vh 1px 0 rgba(255, 245, 200, 0.9),
      35vw 28vh 3px 0 rgba(255, 255, 255, 0.8),
      42vw -18vh 2px 0 rgba(255, 220, 220, 0.9),
      48vw 38vh 1px 0 rgba(255, 255, 180, 0.85),
      55vw -28vh 2px 0 rgba(255, 245, 200, 0.9),
      62vw 8vh 3px 0 rgba(255, 255, 255, 0.85),
      68vw -48vh 1px 0 rgba(255, 200, 200, 0.8),
      75vw 48vh 2px 0 rgba(255, 220, 220, 0.9);
}

.star-6 {
  animation: sparkle3 2.8s ease-in-out infinite;
  box-shadow:
      10vw 12vh 1px 0 rgba(255, 255, 180, 0.7),
      16vw -22vh 2px 0 rgba(255, 245, 200, 0.75),
      23vw 32vh 1px 0 rgba(255, 220, 220, 0.8),
      29vw -12vh 3px 0 rgba(255, 255, 255, 0.7),
      36vw 22vh 2px 0 rgba(255, 200, 200, 0.75),
      43vw -32vh 1px 0 rgba(255, 255, 180, 0.8),
      49vw 42vh 2px 0 rgba(255, 245, 200, 0.75),
      56vw -2vh 3px 0 rgba(255, 255, 255, 0.8),
      63vw 52vh 1px 0 rgba(255, 220, 220, 0.7),
      69vw -42vh 2px 0 rgba(255, 200, 200, 0.8),
      76vw 2vh 1px 0 rgba(255, 255, 180, 0.75),
      83vw -52vh 3px 0 rgba(255, 245, 200, 0.8);
}

.star::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  box-shadow: inherit;
}


.planet.sun {
  background: radial-gradient(circle, #FDB813 0%, #FF8C00 50%, #FF4500 100%);
  box-shadow: 
    0 0 20px #FDB813,
    0 0 40px #FF8C00,
    0 0 60px rgba(255, 140, 0, 0.3);
  height: 12px;
  width: 12px;
}

.orbit {
  @apply rounded-full;
  border: 1px solid rgba(255, 255, 255, 0.05);
  align-self: center;
  display: flex;
  justify-content: center;
}

.orbit.first {
  border: none;
  animation-duration: 820s;
}

.planet {
  height: 5px;
  width: 5px;
  background-color: white;
  align-self: center;
  z-index: 10;
  @apply rounded-full;
}

.orbit.neptune {
  height: 63.6em;
  width: 63.6em;
  animation-duration: 620s;
}

.orbit.uranus {
  height: 40.4em;
  width: 40.4em;
  animation-duration: 145s;
}

.orbit.saturn {
  height: 22em;
  width: 22em;
  animation-duration: 55s;
}

.orbit.jupiter {
  height: 13.8em;
  width: 13.8em;
  animation-duration: 50s;
}

.orbit.mars {
  height: 6.76em;
  width: 6.76em;
  animation-duration: 25s;
}

.orbit.earth {
  height: 6em;
  width: 6em;
  animation-duration: 15s;
}

.orbit.venus {
  height: 5.4em;
  width: 5.4em;
  animation-duration: 5s;
}

.orbit.mercury {
  height: 4.6em;
  width: 4.6em;
}

.planet.mercury {
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #8C7853 0%, #A0917C 50%, #5C4E3A 100%);
  margin-right: -1.5px;
}
.orbit, .planet {
  animation: goAround linear infinite;
}

.planet {
  animation-duration: 15s;
}

.planet.neptune {
  width: 9px;
  height: 9px;
  background: radial-gradient(circle, #4169E1 0%, #0047AB 40%, #002FA7 70%, #001A5C 100%);
  box-shadow: 
    inset -2px -2px 3px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(65, 105, 225, 0.5);
  margin-right: -4.5px;
}

.planet.venus {
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #FFC649 0%, #FFB347 40%, #FF8C00 100%);
  box-shadow: 0 0 8px rgba(255, 198, 73, 0.6);
  margin-right: -3px;
}

.planet.earth {
  width: 7px;
  height: 7px;
  background: radial-gradient(circle, #6B93D6 0%, #4A7BC8 30%, #2E5984 60%, #1A472A 100%);
  box-shadow: 
    inset -2px -2px 4px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(107, 147, 214, 0.4);
  margin-right: -3.5px;
  animation-duration: 75s;
}

.planet.mars {
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, #CD5C5C 0%, #A0522D 40%, #8B4513 70%, #654321 100%);
  box-shadow: 
    inset -1px -1px 2px rgba(0, 0, 0, 0.4),
    0 0 6px rgba(205, 92, 92, 0.3);
  margin-right: -2.5px;
}

.planet.jupiter {
  width: 24px;
  height: 24px;
  background: radial-gradient(circle, #D8CA9D 0%, #FAD5A5 20%, #D2B48C 40%, #CD853F 70%, #A0522D 100%);
  box-shadow: 
    inset -3px -3px 6px rgba(0, 0, 0, 0.3),
    0 0 12px rgba(216, 202, 157, 0.4);
  margin-right: -12px;
}

.planet.saturn {
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #FFEAA7 0%, #DDB892 30%, #B8860B 60%, #8B7355 100%);
  box-shadow: 
    inset -2px -2px 4px rgba(0, 0, 0, 0.3),
    0 0 0 2px transparent,
    0 0 0 4px rgba(255, 234, 167, 0.3),
    0 0 0 6px transparent,
    0 0 0 8px rgba(255, 234, 167, 0.2),
    0 0 15px rgba(255, 234, 167, 0.4);
  margin-right: -10px;
}

.planet.uranus {
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #4FD0E7 0%, #3F8FBF 40%, #2E5984 70%, #1A365D 100%);
  box-shadow: 
    inset -2px -2px 3px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(79, 208, 231, 0.4);
  margin-right: -5px;
}

@keyframes goAround {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
}

@keyframes sparkle1 {
  0%, 100% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
}

@keyframes sparkle2 {
  0%, 100% {
    opacity: 0.7;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 0.8;
  }
}

@keyframes sparkle3 {
  0%, 100% {
    opacity: 0.6;
  }
  33% {
    opacity: 0.9;
  }
  66% {
    opacity: 1;
  }
}

</style>