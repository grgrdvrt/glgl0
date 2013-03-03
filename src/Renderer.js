glgl.Renderer = (function()
{
	function Renderer(width, height)
	{
		this.canvas;
		this.glContext;
		this.width = width;
		this.height = height;
        this.currentTextureID = 0;
		this._initGL();

	}

    Renderer.prototype = {

		_initGL : function()
		{
			this.canvas = document.createElement("canvas");
			this.canvas.width = this.width;
			this.canvas.height = this.height;

			var body = document.getElementsByTagName('body')[0];
			body.appendChild(this.canvas);

			var gl = this.glContext = this.canvas.getContext("experimental-webgl");
			gl.viewport(0, 0, this.width, this.height);
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.enable(gl.DEPTH_TEST);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		},
	
	
		resize : function(width, height)
		{
			var gl = this.glContext;
			this.canvas.width = width;
			this.canvas.height = height;
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		},

        getTexture : function(src)
        {
            return new glgl.Texture(this.glContext, this.currentTextureID++, src);
        },


		render : function(mesh, uniforms)
		{
			
			var gl = this.glContext;

			gl.useProgram(mesh.program.glProgram);

			this._setUniforms(mesh.program, mesh.data);
			this._setUniforms(mesh.program, uniforms);

			this._setAttributes(mesh);


		    if(!mesh.indices)
		    {
				gl.drawArrays(mesh.drawMethod, 0, mesh.itemsCount);
				return;
		    }

			var cache = mesh._indicesCache;
			if(!cache) cache = mesh._indicesCache = new BufferCache(gl.createBuffer());

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cache.buffer);
			if(cache.isCleared)
			{
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
				cache.isCleared = false;
			}
	    	gl.drawElements(mesh.drawMethod, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
		},


		clear : function()
		{
			var gl = this.glContext;
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		},


		_setUniforms : function(program, data)
		{
			var gl = this.glContext;
			for(var name in program.uniforms)
			{
                if(!data[name]) continue;
				var uniform = program.uniforms[name];
				uniform.toGl(gl, uniform.location, data[name]);
			}
		},

		_setAttributes : function(mesh)
		{
			var gl = this.glContext;
			var program = mesh.program;
			var attributes = program.attributes;
			for(var name in attributes)
			{
				var attribute = mesh.data[name];
				var cache = mesh._cache[name];
				if(!cache)
				{
					cache = mesh._cache[name] = new BufferCache(gl.createBuffer());
					cache.itemSize = attribute.length / mesh.itemsCount;
				}
				gl.bindBuffer(gl.ARRAY_BUFFER, cache.buffer);
				if(cache.isCleared)
				{
					gl.bufferData(gl.ARRAY_BUFFER, attribute, gl.STATIC_DRAW);
					cache.isCleared = false;
				}
				gl.vertexAttribPointer(attributes[name].location, cache.itemSize, gl.FLOAT, false, 0, 0);
			}

		}
	}

	function BufferCache(buffer)
	{
		this.buffer = buffer;
		this.itemSize = 0;
		this.isCleared = true;
	}
	return Renderer;
})();
