<template>
<div class="truncate w-full h-full bg-gray-950 universe flex justify-center items-center">

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


</div>
</template>

<script setup>

</script>

<style scoped>
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