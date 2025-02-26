import {onMounted, onUnmounted} from "vue";

export function useLife(body) {

    let walkInterval;

    onMounted(() => {
        console.log('Im alive!');
        console.log(body);
        walkInterval = setInterval(walk, 500);
    })

    function walk() {
        const direction = getRandomInt(4);
        const { right, top } = checkHorizon(direction)
        body.value.style.top = top + 'px';
        body.value.style.right = right + 'px';
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    function checkHorizon(direction) {
        let right = direction - 2;
        let top = direction - 2;
        const currentTop = body.value.style.top.split('px')[0]
        const currentRight = body.value.style.right.split('px')[0]

        if (currentTop && (currentTop + top < 0 || currentTop + top > 1200)) {
            top = -top;
        }

        if (currentRight && (currentRight + right < 0 || currentRight > 1200)) {
            right = -right;
        }

        top += Number(currentTop);
        right += Number(currentRight);

        return { right, top };

    }

    function killAnimal() {
        console.log('died');
        clearInterval(walkInterval);
    }

    onUnmounted(() => {
        killAnimal();
    })

    return {
        killAnimal
    }
}