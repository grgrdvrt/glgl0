glgl.Program = (function()
{
	function Program(glContext, vShaderSrc, fShaderSrc)
	{
		this.attributes = {};
		this.uniforms = {};
	
		var gl = this.glContext = glContext;
		this.glProgram = gl.createProgram();
	
		this._prepareShader(vShaderSrc, gl.VERTEX_SHADER);
		this._prepareShader(fShaderSrc, gl.FRAGMENT_SHADER);
	
		gl.linkProgram(this.glProgram);

		this._parseShader(vShaderSrc);
		this._parseShader(fShaderSrc);

	}
	
	Program.prototype = {

		_parseShader : function(src)
		{
			var lines = src.split("\n");
			console.log(lines);
			var n = lines.length;
			for(var i = 0; i < n; i++)
			{
				var line = lines[i].trim().split(" ");
				switch(line[0])
				{
					case "attribute" : this._initAttribute(line[2].replace(";", ""), line[1]); break;
					case "uniform" : this._initUniform(line[2].replace(";", ""), line[1]); break;
					default : continue; break;
				}
			}
		},
	
	
		_prepareShader : function(src, type)
		{
			var gl = this.glContext;
			var shader = gl.createShader(type);
			gl.shaderSource(shader, src);
			gl.compileShader(shader);
			gl.attachShader(this.glProgram, shader);
		},
	
	
		_initAttribute : function (name, type)
		{
			var gl = this.glContext;	
			var location = gl.getAttribLocation(this.glProgram, name);
			gl.enableVertexAttribArray(location);
			this.attributes[name] = {location:location, type:type};
		},
	
	
		_initUniform : function(name, type)
		{
			var location = this.glContext.getUniformLocation(this.glProgram, name);
			this.uniforms[name] = {location:location, toGl:uniformsTypes[type]};
		}
	}


	uniformsTypes = {

		float : function (gl, l, data) { gl.uniform1f(l, data); },
		vec2 : function (gl, l, data) { gl.uniform2fv(l, data.data); },
		vec3 : function (gl, l, data) { gl.uniform3fv(l, data.data); },
		vec4 : function (gl, l, data) { gl.uniform4fv(l, data.data); },

		int : function (gl, l, data) { gl.uniform1i(l, data); },
		ivec2 : function (gl, l, data) { gl.uniform2iv(l, data.data); },
		ivec3 : function (gl, l, data) { gl.uniform3iv(l, data.data); },
		ivec4 : function (gl, l, data) { gl.uniform4iv(l, data.data); },
	
		mat2 : function (gl, l, data) { gl.uniformMatrix2fv(l, false, data.data); },
		mat3 : function (gl, l, data) { gl.uniformMatrix3fv(l, false, data.data); },
		mat4 : function (gl, l, data) { gl.uniformMatrix4fv(l, false, data.data); },

	}
	return Program;
})();
