glgl.primitives = (function(){

	function Plane(nx, ny)
	{
		this.nVertices = nx * ny;
        this.vertices = new Float32Array(3 * this.nVertices);
        this.uvs = new Float32Array(2 * this.nVertices);

        var i;
		for(i = 0; i < this.nVertices; i++)
		{
            var vId = 3 * i;
            var uvID = 2 * i;
            this.uvs[uvID] = this.vertices[vId] = (i % nx) / (nx - 1);
            this.uvs[uvID + 1] = this.vertices[vId + 1] = Math.floor(i / nx) / (ny - 1);
            this.vertices[vId + 2] = 0;
		}

		var nSquares = (nx - 1) * (ny - 1);
		this.indices = new Uint16Array(6 * nSquares);
		for(i = 0 ; i < nSquares; i++)
		{
			var id = i * 6;

			this.indices[id] = i % (nx - 1) + Math.floor(i / (nx - 1)) * nx;
			this.indices[id + 1] = this.indices[id] + 1;
			this.indices[id + 2] = this.indices[id] + nx + 1;

			this.indices[id + 3] = this.indices[id];
			this.indices[id + 4] = this.indices[id + 2];
			this.indices[id + 5] = this.indices[id] + nx;
		}
	}

	function Tetrahedron()
	{

	}

	function Cube()
	{
		this.nVertices = 24;
		this.vertices = new Float32Array([-1, -1, -1, 	-1, -1,  1, 	-1,  1, -1, 	-1,  1,  1,
										  -1, -1,  1, 	 1, -1,  1, 	-1,  1,  1, 	 1,  1,  1,
										   1, -1,  1, 	 1, -1, -1, 	 1,  1,  1, 	 1,  1, -1,
										   1, -1, -1, 	-1, -1, -1, 	 1,  1, -1,		-1,  1, -1,
										  -1,  1,  1, 	 1,  1,  1, 	-1,  1, -1, 	 1,  1, -1,
										  -1, -1,  1, 	 1, -1,  1, 	-1, -1, -1, 	 1, -1, -1]);
        this.indices = new Uint16Array([0, 1, 3, 0, 3, 2,
                                        4, 5, 7, 4, 7, 6,
                                        8, 9, 11, 8, 11, 10,
                                        12, 13, 15, 12, 15, 14,
                                        16, 17, 19, 16, 19, 18,
                                        20, 21, 23, 20, 23, 22]);
        var uvData= [];
        for(var i = 0; i < 6; i++)
            uvData.push(0, 0, 1, 0, 0, 1, 1, 1);

        this.uvs = new Float32Array(uvData);
	}


    function Cylinder(nx, ny)
    {
        this.nVertices = nx * ny;
        this.vertices = new Float32Array(3 * this.nVertices);
        this.uvs = new Float32Array(2 * this.nVertices);

        var i, id, col, row;
        for(i = 0; i < this.nVertices; i++)
        {
            id = 3 * i;
            col = i % nx;
            row = Math.floor(i / nx);
            var angle = 2 * Math.PI * (col / (nx - 1));
            this.vertices[id] = Math.cos(angle);
            this.vertices[id + 1] = row / (ny - 1);
            this.vertices[id + 2] = Math.sin(angle);

            var uvID = 2 * i;
            this.uvs[uvID] = col / (nx - 1);
            this.uvs[uvID + 1] = row / (ny - 1);
        }

        var n = this.nVertices - nx;
        this.indices = new Uint16Array(6 * n);
        for(i = 0; i < n; i++)
        {
            id = 6 * i;
            col = i % nx;
            row = Math.floor(i / nx);
            if(col == nx - 1) continue;
            var nextVertexID = row * nx + ((col + 1) % nx);

            this.indices[id] = i;
            this.indices[id + 1] = nextVertexID;
            this.indices[id + 2] = nextVertexID + nx;

            this.indices[id + 3] = i;
            this.indices[id + 4] = nextVertexID + nx;
            this.indices[id + 5] = i + nx;
        }
    }



	return {Plane:Plane,
			Tetrahedron:Tetrahedron,
			Cube:Cube,
            Cylinder:Cylinder}
})();