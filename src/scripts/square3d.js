function start() {
    const canvas = document.getElementById("my_canvas");
//Inicialize the GL contex
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    console.log("WebGL version: " + gl.getParameter(gl.VERSION));
    console.log("GLSL version: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    console.log("Vendor: " + gl.getParameter(gl.VENDOR));

    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();


//*****************pointer lock object forking for cross browser**********************
    canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock;
    canvas.onclick = function() {
        canvas.requestPointerLock();
    };
// Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            console.log('The pointer lock status is now locked');
            document.addEventListener("mousemove", ustaw_kamere_mysz, false);
        } else {
            console.log('The pointer lock status is now unlocked');
            document.removeEventListener("mousemove", ustaw_kamere_mysz, false);
        }
    }
//****************************************************************


    let yaw = -90; //obrót względem osi X
    let pitch= 0; //obrót względem osi Y

    function ustaw_kamere_mysz(e) {
        //Wyznaczyć zmianę pozycji myszy względem ostatniej klatki
        let xoffset = e.movementX;
        let yoffset = e.movementY;
        let sensitivity = 0.1;
        let cameraSpeed = 0.05 * elapsedTime;
        xoffset *= sensitivity;
        yoffset *= sensitivity;
        //Uaktualnić kąty
        yaw += xoffset * cameraSpeed;
        pitch -= yoffset * cameraSpeed;
        //Nałożyć ograniczenia co do ruchy kamery
        if (pitch > 89.0)
            pitch = 89.0;
        if (pitch < -89.0)
            pitch = -89.0;
        let front = glm.vec3(1,1,1);
        //Wyznaczenie wektora kierunku na podstawie kątów Eulera
        front.x = Math.cos(glm.radians(yaw))*Math.cos(glm.radians(pitch));
        front.y = Math.sin(glm.radians(pitch));
        front.z = Math.sin(glm.radians(yaw)) * Math.cos(glm.radians(pitch));
        cameraFront = glm.normalize(front);
    }

    // const vsSource =
    // 		`#version 300 es
    // 		precision highp float;
    // 		in vec2 position;
    // 		void main(void)
    // 		{
    // 		   gl_Position = vec4(position, 0.0, 1.0);
    // 		}
    // 		`;

    // 		const fsSource =
    // 		`#version 300 es
    // 	   precision highp float;
    // 	   out vec4 frag_color;
    // 	   void main(void)
    //    	{
    // 	      frag_color = vec4(1.0, 0.5, 0.25, 1.0);
    //    	}
    // 		`;

    const vsSource =
        `#version 300 es
	precision highp float;
	in vec3 position;
		in vec3 color;
		uniform mat4 model;
		uniform mat4 view;
		uniform mat4 proj;
		in vec2 aTexCoord;
        out vec2 TexCoord;
		out vec3 Color;

	void main(void)
	{
	TexCoord = aTexCoord;
		Color = color;
	   		gl_Position = proj * view * model * vec4(position, 1.0);
	}
	`;

    const fsSource =
        `#version 300 es
   precision highp float;
   in vec3 Color;

   out vec4 frag_color;
   in vec2 TexCoord;
       uniform sampler2D texture1;
       uniform sampler2D texture2;
       uniform sampler2D u_mask; 
       uniform vec3 blendFactor;
       
   void main(void)
   {
	  // frag_color = vec4(Color, 1.0);
	    frag_color = texture(texture1, TexCoord);
	  // frag_color = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), 0.5);
	  // frag_color = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), blendFactor.x);
   }`;


//compilation vs
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);
    if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(vs));
    }

//compilation fs
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);
    if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(fs));
    }


    gl.attachShader(program,vs);
    gl.attachShader(program,fs);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        alert(gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);

    var blendFactor_loc = gl.getUniformLocation(program, "blendFactor");
    const blendFactor = [1.0, 1.0, 1.0];
    blendFactor[0] = 0.1;
    gl.uniform3fv(blendFactor_loc, new Float32Array(blendFactor));

// const vertices =
// [
// -0.5, -0.5,
// 0.0, 0.5,
// 0.5, -0.5
// ];

    function kostka() {

        let punkty_ = 36;

        var vertices = [
            -0.5, -0.5, -0.5,  0.0, 0.0, 0.0, 0.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 0.0, 1.0, 1.0, 0.0,
            0.5,  0.5, -0.5,  0.0, 1.0, 1.0, 1.0, 1.0,
            0.5,  0.5, -0.5,  0.0, 1.0, 1.0, 1.0, 1.0,
            -0.5,  0.5, -0.5,  0.0, 1.0, 0.0, 0.0, 1.0,
            -0.5, -0.5, -0.5,  0.0, 0.0, 0.0, 0.0, 0.0,

            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0, 0.0, 0.0,
            0.5, -0.5,  0.5,  1.0, 0.0, 1.0, 1.0, 0.0,
            0.5,  0.5,  0.5,  1.0, 1.0, 1.0, 1.0, 1.0,
            0.5,  0.5,  0.5,  1.0, 1.0, 1.0, 1.0, 1.0,
            -0.5,  0.5,  0.5,  0.0, 1.0, 0.0, 0.0, 1.0,
            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0, 0.0, 0.0,

            -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,  0.0, 0.0,
            -0.5,  0.5, -0.5,  1.0, 1.0, 1.0,  1.0, 0.0,
            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,  1.0, 1.0,
            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,  1.0, 1.0,
            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,  0.0, 1.0,
            -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,  0.0, 0.0,

            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,  0.0, 0.0,
            0.5,  0.5, -0.5,  1.0, 1.0, 1.0,  1.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 1.0, 0.0,  1.0, 1.0,
            0.5, -0.5, -0.5,  0.0, 1.0, 0.0,  1.0, 1.0,
            0.5, -0.5,  0.5,  0.0, 0.0, 0.0,  0.0, 1.0,
            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,  0.0, 0.0,

            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 0.0,
            0.5, -0.5, -0.5,  1.0, 1.0, 1.0,  1.0, 0.0,
            0.5, -0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 1.0,
            0.5, -0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 1.0,
            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,  0.0, 1.0,
            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 0.0,

            -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 0.0,
            0.5,  0.5, -0.5,  1.0, 1.0, 1.0,  1.0, 0.0,
            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 1.0,
            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 1.0,
            -0.5,  0.5,  0.5,  0.0, 0.0, 0.0,  0.0, 1.0,
            -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 0.0
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


        n_draw=punkty_;
    }

// kamera
    var pressedKey = {};
    window.onkeyup = function(e) { pressedKey[e.keyCode] = false; }
    window.onkeydown = function(e) { pressedKey[e.keyCode] = true; }

    let cameraPos = glm.vec3(0, 0, 10);
    let cameraFront = glm.vec3(0, 0, -1);
    let cameraUp = glm.vec3(0, 1, 0);

    function camera() {
        let cameraSpeed = 0.002 * elapsedTime;

        if (pressedKey["37"]) //Left
        {
            let cameraPos_tmp = glm.normalize(glm.cross(cameraFront, cameraUp));
            cameraPos.x-=cameraPos_tmp.x * cameraSpeed;
            cameraPos.y-=cameraPos_tmp.y * cameraSpeed;
            cameraPos.z-=cameraPos_tmp.z * cameraSpeed;
        }

        if (pressedKey["38"]) //Up
        {
            cameraPos.x+=cameraSpeed * cameraFront.x;
            cameraPos.y+=cameraSpeed * cameraFront.y;
            cameraPos.z+=cameraSpeed * cameraFront.z;
        }

        if (pressedKey["39"]) //Right
        {
            let cameraPos_tmp = glm.normalize(glm.cross(cameraFront, cameraUp));
            cameraPos.x+=cameraPos_tmp.x * cameraSpeed;
            cameraPos.y+=cameraPos_tmp.y * cameraSpeed;
            cameraPos.z+=cameraPos_tmp.z * cameraSpeed;
        }

        if (pressedKey["40"]) //Down
        {
            cameraPos.x-=cameraSpeed * cameraFront.x;
            cameraPos.y-=cameraSpeed * cameraFront.y;
            cameraPos.z-=cameraSpeed * cameraFront.z;
        }

        if (pressedKey["32"])
        {
            cameraPos.x+=cameraSpeed * cameraFront.x;
            cameraPos.y+=cameraSpeed * cameraFront.y;
            cameraPos.z+=cameraSpeed * cameraFront.z;
        }

        //wyślij macierz do karty
        let cameraFront_tmp = glm.vec3(1, 1, 1);

        cameraFront_tmp.x = cameraPos.x + cameraFront.x;
        cameraFront_tmp.y = cameraPos.y + cameraFront.y;
        cameraFront_tmp.z = cameraPos.z + cameraFront.z;

        mat4.lookAt(view, cameraPos, cameraFront_tmp, cameraUp)
        gl.uniformMatrix4fv(uniView, false, view);
    }

//texture1 *****************************************************************************
    const texture1 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);
    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,srcFormat, srcType, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    image.crossOrigin = "";
    image.src = "https://cdn.pixabay.com/photo/2013/09/22/19/14/brick-wall-185081_960_720.jpg";
//****************************************************************
//texture2 *****************************************************************************
    const texture2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture2);

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);
    const image2 = new Image();
    image2.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture2);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,srcFormat, srcType, image2);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    image2.crossOrigin = "";
    image2.src = "https://cdn.pixabay.com/photo/2019/07/23/21/36/drought-4358669_1280.jpg";

//****************************************************************

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var n_draw = 3;
    kostka();

    const positionAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 8 * 4, 0);
    // 6 * 4 bajty (6 - wierzchołki + kolory)


    const colorAttrib = gl.getAttribLocation(program, "color");
    gl.enableVertexAttribArray(colorAttrib);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 8 * 4, 3 * 4);

    const texCoord = gl.getAttribLocation(program, "aTexCoord");
    gl.enableVertexAttribArray(texCoord);
    gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 8*4, 6*4);

    let startTime=0;
    let elapsedTime=0;
    let licznik = 0;
    const fpsElem = document.querySelector("#fps");

    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0);
    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 1);

    function draw(){
        elapsedTime = performance.now() - startTime;
        startTime = performance.now();
        licznik++;
        let fFps = 1000 / elapsedTime;
// ograniczenie częstotliwości odświeżania napisu do ok 1/s
        if(licznik > fFps) {
            fpsElem.textContent = fFps.toFixed(1);
            licznik = 0;
        }

        camera()
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        // textura na calej stukturze
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture2);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.drawArrays(gl.TRIANGLES, 0, 36);


        // gl.activeTexture(gl.TEXTURE0);
        // gl.bindTexture(gl.TEXTURE_2D, texture2);
        // gl.drawArrays(gl.TRIANGLES, 0, 12);
        // gl.activeTexture(gl.TEXTURE0);
        // gl.bindTexture(gl.TEXTURE_2D, texture1);
        // gl.drawArrays(gl.TRIANGLES, 12, 24);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture2);
        gl.drawArrays(gl.TRIANGLES, 0, 18);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.drawArrays(gl.TRIANGLES, 18, 18);

        //gl.drawArrays(gl.TRIANGLES, 0, n_draw);
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);

// Ustawienia macierzy

// Model
    const model = mat4.create();
    const kat_obrotu = 0 * Math.PI / 180; // in radians
    mat4.rotate(model, model, kat_obrotu, [0, 0, 1]);

// wysyłanie do szadera
    let uniModel = gl.getUniformLocation(program, 'model');
    gl.uniformMatrix4fv( uniModel, false, model);


// View
    const view = mat4.create();
    mat4.lookAt(view, [0, 0, 3], [0, 0, -1], [0, 1, 0])

// wysyłanie do szadera
    let uniView = gl.getUniformLocation(program, 'view');
    gl.uniformMatrix4fv( uniView, false, view);

// Proj
    const proj = mat4.create();
    mat4.perspective(proj, 60 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);

// wysyłanie do szadera
    let uniProj = gl.getUniformLocation(program, 'proj');
    gl.uniformMatrix4fv( uniProj, false, proj);


let x;
let y;

// Add the event listeners for mousedown, mousemove, and mouseup
    window.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        // alert("x ="+x);
        // alert("y ="+y);
    });



// Add the event listeners for keydown, keyup
    window.addEventListener('keydown', function(event) {
        // console.log(event.keyCode)
        switch (event.keyCode) {
            case 68: // D
                if (gl.isEnabled(gl.DEPTH_TEST))
                    gl.disable(gl.DEPTH_TEST);
                else
                    gl.enable(gl.DEPTH_TEST);
                break;

            case 27: // esc
                if (confirm('close?')) {
                    close()
                }
                break;
        }
    }, false);
}

export { start }
