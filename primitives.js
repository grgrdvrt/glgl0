glgl.primitives = (function(){

	function Plane(nx, ny)
	{
		this.nVertices = nx * ny;
		this.vertices = new Float32Array(3 * this.nVertices);
		for(var i = 0; i < this.nVertices; i++)
		{
			var vId = 3 * i;
			this.vertices[vId] = (i % nx) / (nx - 1);

			this.vertices[vId + 1] = Math.floor(i / nx) / (ny - 1);
			this.vertices[vId + 2] = 0;
		}

		var nSquares = (nx - 1) * (ny - 1);
		this.indices = new Uint16Array(6 * nSquares);
		for(var i = 0 ; i < nSquares; i++)
		{
			var id = i * 6;
			/*var refId = i % (nx - 1) + Math.floor(i / (nx - 1)) * nx;
			this.indices[id] = refId;
			this.indices[id + 1] = refId + 1;
			this.indices[id + 2] = refId + nx + 1;

			this.indices[id + 3] = refId;
			this.indices[id + 4] = refId + nx + 1;
			this.indices[id + 5] = refId + nx;*/

			this.indices[id] = i % (nx - 1) + Math.floor(i / (nx - 1)) * nx;
			this.indices[id + 1] = this.indices[id] + 1;
			this.indices[id + 2] = this.indices[id] + nx + 1;

			this.indices[id + 3] = this.indices[id];
			this.indices[id + 4] = this.indices[id + 2];
			this.indices[id + 5] = this.indices[id] + nx;
		}
	}

	function TetraHedron()
	{

	}

	function Cube()
	{
		this.nVertices = 24;
		this.vertices = new Float32Array([-1, -1, -1, 	 1, -1, -1, 	-1, -1,  1, 	 1, -1,  1,
										  -1,  1, -1, 	 1,  1, -1, 	-1, -1, -1, 	 1, -1, -1,
										  -1, -1,  1, 	 1, -1,  1, 	-1,  1,  1, 	 1,  1,  1,
										  -1,  1, -1, 	-1, -1, -1, 	-1,  1,  1,		-1, -1,  1,
										   1, -1, -1, 	 1,  1, -1, 	 1, -1,  1, 	 1,  1,  1,
										  -1,  1, -1, 	 1,  1, -1, 	-1,  1,  1, 	 1,  1,  1])
	}


	return {Plane:Plane,
			TetraHedron:TetraHedron,
			Cube:Cube}
})();