function start() {
    const canvas = document.getElementById("my_canvas");
    let x;
    let y;
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

    const vsSource =
        `#version 300 es
	precision highp float;
	in vec3 position;
		in vec3 color;
		uniform mat4 model;
		uniform mat4 view;
		uniform mat4 proj;
		out vec3 Color;

	void main(void)
	{
		Color = color;
	   		gl_Position = proj * view * model * vec4(position, 1.0);
	}
	`;

    const fsSource =
        `#version 300 es
   precision highp float;
   in vec3 Color;

   out vec4 frag_color;
   void main(void)
   {
	  frag_color = vec4(Color, 1.0);
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

    function kostka() {

        let punkty_ = 36;

        var vertices = [
            -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 0.0, 1.0,
            0.5,  0.5, -0.5,  0.0, 1.0, 1.0,
            0.5,  0.5, -0.5,  0.0, 1.0, 1.0,
            -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,
            -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,

            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
            0.5, -0.5,  0.5,  1.0, 0.0, 1.0,
            0.5,  0.5,  0.5,  1.0, 1.0, 1.0,
            0.5,  0.5,  0.5,  1.0, 1.0, 1.0,
            -0.5,  0.5,  0.5,  0.0, 1.0, 0.0,
            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,

            -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
            -0.5,  0.5, -0.5,  1.0, 1.0, 1.0,
            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
            -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,

            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
            0.5,  0.5, -0.5,  1.0, 1.0, 1.0,
            0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
            0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,

            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
            0.5, -0.5, -0.5,  1.0, 1.0, 1.0,
            0.5, -0.5,  0.5,  1.0, 0.0, 1.0,
            0.5, -0.5,  0.5,  1.0, 0.0, 1.0,
            -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,

            -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,
            0.5,  0.5, -0.5,  1.0, 1.0, 1.0,
            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
            0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
            -0.5,  0.5,  0.5,  0.0, 0.0, 0.0,
            -0.5,  0.5, -0.5,  0.0, 1.0, 0.0
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
    let turn = 0.0;

    function camera() {
        let cameraSpeed = 0.03;

        if (pressedKey["37"]) //Left
        {
            turn -= cameraSpeed;
            cameraFront.x = Math.sin(turn);
            cameraFront.z = -Math.cos(turn)
        }

        if (pressedKey["38"]) //Up
        {
            cameraPos.x+=cameraSpeed * cameraFront.x;
            cameraPos.y+=cameraSpeed * cameraFront.y;
            cameraPos.z+=cameraSpeed * cameraFront.z;
        }

        if (pressedKey["39"]) //Right
        {
            turn += cameraSpeed;
            cameraFront.x = Math.sin(turn);
            cameraFront.z = -Math.cos(turn)
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

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    var n_draw = 3;
    kostka();

    const positionAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 6 * 4, 0);
    // 6 * 4 bajty (6 - wierzchołki + kolory)


    const colorAttrib = gl.getAttribLocation(program, "color");
    gl.enableVertexAttribArray(colorAttrib);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 6 * 4, 3 * 4);


    function draw(){
        camera()
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.drawArrays(gl.TRIANGLES, 0, n_draw);
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


// Add the event listeners for mousedown, mousemove, and mouseup
    window.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
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
