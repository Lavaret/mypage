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

<div class="star"></div>
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
  box-shadow:
      -12vw -4vh 0 0 rgba(255, 255, 255, 0.8),
      -14vw -41vh 1px 0 rgba(255, 220, 220, 0.7),
      -16vw -42vh 2px 0 rgba(255, 255, 180, 0.6),
      -18vw -30vh 1px 0 rgba(255, 245, 200, 0.75),
      -20vw 10vh 2px 0 rgba(255, 255, 255, 0.9),
      -22vw -20vh 1px 0 rgba(255, 200, 200, 0.8),
      -24vw 25vh 2px 0 rgba(255, 255, 180, 0.6),
      -26vw -15vh 3px 0 rgba(255, 255, 255, 0.7),
      -28vw 40vh 1px 0 rgba(255, 245, 200, 0.85),
      -30vw -10vh 2px 0 rgba(255, 220, 220, 0.7),
      -32vw -35vh 3px 0 rgba(255, 255, 255, 0.6),
      -34vw -50vh 2px 0 rgba(255, 200, 200, 0.75),
      -36vw 15vh 1px 0 rgba(255, 255, 180, 0.9),
      -38vw 5vh 2px 0 rgba(255, 245, 200, 0.7),
      -40vw -60vh 3px 0 rgba(255, 255, 255, 0.8),
      -42vw 30vh 1px 0 rgba(255, 220, 220, 0.6),
      -44vw 50vh 2px 0 rgba(255, 255, 180, 0.7),
      -46vw -25vh 3px 0 rgba(255, 245, 200, 0.85),
      -48vw 20vh 1px 0 rgba(255, 255, 255, 0.75),
      -50vw -55vh 2px 0 rgba(255, 220, 220, 0.8),
      -52vw -50vh 2px 0 rgba(255, 245, 200, 0.7),
      -54vw 40vh 1px 0 rgba(255, 200, 200, 0.8),
      -56vw -35vh 3px 0 rgba(255, 255, 255, 0.6),
      -58vw -50vh 2px 0 rgba(255, 255, 180, 0.7),
      -60vw -15vh 1px 0 rgba(255, 220, 220, 0.9),
      -62vw 30vh 3px 0 rgba(255, 255, 255, 0.75),
      -64vw -45vh 2px 0 rgba(255, 245, 200, 0.8),
      -66vw -10vh 1px 0 rgba(255, 255, 180, 0.6),
      -68vw -25vh 2px 0 rgba(255, 220, 220, 0.7),
      -70vw 5vh 3px 0 rgba(255, 255, 255, 0.85),
      -72vw -5vh 1px 0 rgba(255, 245, 200, 0.9),
      -74vw 20vh 2px 0 rgba(255, 255, 180, 0.4),
      -76vw -30vh 3px 0 rgba(255, 220, 220, 0.55),
      -78vw 50vh 2px 0 rgba(255, 255, 255, 0.6),
      -80vw -60vh 1px 0 rgba(255, 220, 220, 0.5),
      -82vw 15vh 3px 0 rgba(255, 255, 180, 0.7),
      -84vw 25vh 2px 0 rgba(255, 245, 200, 0.55),
      -86vw -20vh 1px 0 rgba(255, 200, 200, 0.65);
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
  -webkit-box-shadow: 1px -1px 15px 2px rgba(255,255,255,0.75);
  -moz-box-shadow: 1px -1px 15px 2px rgba(255,255,255,0.75);
  box-shadow: 1px -1px 15px 2px rgba(255,255,255,0.75);
  height: 8px;
  width: 8px;
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
  width: 1px;
  height: 1px;
  background-color: darkkhaki;
  margin-right: -1px;
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
  background: linear-gradient(to bottom, deepskyblue, cornflowerblue);
  margin-right: -4.5px;
}

.planet.venus {
  width: 8px;
  height: 8px;
  background: linear-gradient(to bottom, darkseagreen, sandybrown);
  margin-right: -4px;
}

.planet.earth {
  width: 10px;
  height: 10px;
  background: linear-gradient(to bottom, darkslategrey, cornflowerblue);
  margin-right: -5px;
  animation-duration: 75s;
}

.planet.mars {
  width: 1px;
  height: 1px;
  background: linear-gradient(to bottom, darkorange, indianred);
  margin-right: -1px;
}

.planet.jupiter {
  width: 32px;
  height: 32px;
  background: linear-gradient(to bottom, bisque, rosybrown);
  margin-right: -16px;
}

.planet.saturn {
  width: 18px;
  height: 18px;
  background: linear-gradient(to bottom, saddlebrown, lightyellow);
  margin-right: -7px;
}

.planet.uranus {
  width: 7px;
  height: 7px;
  background: linear-gradient(to bottom, lightblue, lightyellow);
  margin-right: -3.5px;
}

@keyframes goAround {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
}

</style>