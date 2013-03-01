geom.Matrix4 = (function()
{
	function Matrix4()
	{
		this.data = new Float32Array(16);
		this.identity();
	}


	Matrix4.prototype = {

		identity : function()
		{
			var t = this.data;
			t[0] = t[5] = t[10] = t[15] = 1;
			t[1] = t[2] = t[3] = t[4] = t[6] = t[7] = t[8] = t[9] = t[11] = t[2] = t[3] = t[14] = 0;
		},

		transformVector : function(v)
		{
			var t = this.data;
			v.x = t[0] * v.x + t[1] * v.y + t[2] * v.z + t[3] * v.w;
			v.y = t[4] * v.x + t[5] * v.y + t[6] * v.z + t[7] * v.w;
			v.z = t[8] * v.x + t[9] * v.y + t[10] * v.z + t[11] * v.w;
			v.t = t[12] * v.x + t[13] * v.y + t[14] * v.z + t[15] * v.w;
		},

		appendTransform : function(m)
		{
			var t = m.data;
			this._appendTransform(t[0], t[1], t[2], t[3],
								  t[4], t[5], t[6], t[7],
								  t[8], t[9], t[10], t[11],
								  t[12], t[13], t[14], t[15]);
		},

		scale : function(sx, sy, sz)
		{
			var t = this.data;
			t[0] *= sx; t[1] *= sy; t[2] *= sz;
			t[4] *= sx; t[5] *= sy; t[6] *= sy;
			t[8] *= sx; t[9] *= sz; t[10] *= sz;
			t[12] *= sx; t[13] *= sy; t[14] *= sz;
		},

		translate : function(tx, ty, tz)
		{
			this._appendTransform(1, 0, 0, 0,
								  0, 1, 0, 0,
								  0, 0, 1, 0,
								  tx, ty, tz, 1);
		},

		//http://jeux.developpez.com/faq/math/?page=quaternions
		rotate : function(x, y, z, angle)
		{
			angle *= 0.5;
			var sin = Math.sin(angle);

			x *= sin; y *= sin; z *= sin;
			w = Math.cos(angle);

			var len2 = x * x + y * y + z * z + w * w;
			if(len2 == 0) X = len2 = 1;
			var r = 1 / len2;

			var xx = x * x * r, xy = x * y * r;
			var xz = x * z * r, xw = x * w * r;
			var yy = y * y * r, yz = y * z * r;
			var yw = y * w * r;
			var zz = z * z * r, zw = z * w * r;

			var a = 1 - 2 * (yy + zz), b = 2 * (xy + zw), c = 2 * (xz - yw);
			var e = 2 * (xy - zw), f = 1 - 2 * (xx + zz), g = 2 * (yz + xw);
			var i = 2 * (xz + yw), j = 2 * (yz - xw), k = 1 - 2 * (xx + yy);

			var t = this.data;
			var d0 = t[0], d1 = t[1], d2 = t[2], d3 = t[3];
			var d4 = t[4], d5 = t[5], d6 = t[6], d7 = t[7];
			var d8 = t[8], d9 = t[9], d10 = t[10], d11 = t[11];
			var d12 = t[12], d13 = t[13], d14 = t[14], d15 = t[15];


			t[0] = a * d0 + e * d1 + i * d2;
			t[1] = b * d0 + f * d1 + j * d2;
			t[2] = c * d0 + g * d1 + k * d2;

			t[4] = a * d4 + e * d5 + i * d6;
			t[5] = b * d4 + f * d5 + j * d6;
			t[6] = c * d4 + g * d5 + k * d6;

			t[8] = a * d8 + e * d9 + i * d10;
			t[9] = b * d8 + f * d9 + j * d10;
			t[10] = c * d8 + g * d9 + k * d10;

			t[12] = a * d12 + e * d13 + i * d14;
			t[13] = b * d12 + f * d13 + j * d14;
			t[14] = c * d12 + g * d13 + k * d14;
		},

		_appendTransform : function (a, b, c, d, e, f, g, h, i, j , k, l, m, n, o, p)
		{
			var t = this.data;
			var t0 = t[0], t1 = t[1], t2 = t[2], t3 = t[3];
			var t4 = t[4], t5 = t[5], t6 = t[6], t7 = t[7];
			var t8 = t[8], t9 = t[9], t10 = t[10], t11 = t[11];
			var t12 = t[12], t13 = t[13], t14 = t[14], t15 = t[15];


			t[0] = a * t0 + e * t1 + i * t2 + m * t3;
			t[1] = b * t0 + f * t1 + j * t2 + n * t3;
			t[2] = c * t0 + g * t1 + k * t2 + o * t3;
			t[3] = d * t0 + h * t1 + l * t2 + p * t3;

			t[4] = a * t4 + e * t5 + i * t6 + m * t7;
			t[5] = b * t4 + f * t5 + j * t6 + n * t7;
			t[6] = c * t4 + g * t5 + k * t6 + o * t7;
			t[7] = d * t4 + h * t5 + l * t6 + p * t7;

			t[8] = a * t8 + e * t9 + i * t10 + m * t11;
			t[9] = b * t8 + f * t9 + j * t10 + n * t11;
			t[10] = c * t8 + g * t9 + k * t10 + o * t11;
			t[11] = d * t8 + h * t9 + l * t10 + p * t11;

			t[12] = a * t12 + e * t13 + i * t14 + m * t15;
			t[13] = b * t12 + f * t13 + j * t14 + n * t15;
			t[14] = c * t12 + g * t13 + k * t14 + o * t15;
			t[15] = d * t12 + h * t13 + l * t14 + p * t15;
		},

		clone : function()
		{
			var clone = new Matrix4();
			for(var i = 0; i < 16; i++)
				clone.data[i] = this.data[i];
		},
		
		toString : function()
		{
			var t = this.data;
			return String(t[0] + "," + t[1] + "," + t[2] + "," + t[3] + "\n" +
							t[4] + "," + t[5] + "," + t[6] + "," + t[7] + "\n" +
							t[8] + "," + t[9] + "," + t[10] + "," + t[11] + "\n" +
							t[12] + "," + t[13] + "," + t[14] + "," + t[15]);
		}
	}

	//http://www.songho.ca/opengl/gl_projectionmatrix.html
	Matrix4.projection = function(fov, aspect, near, far)
	{
		var proj = new Matrix4();
		var t = proj.data;
		
		var d = 1 / Math.tan(0.5 * fov);
		var inf = 1 / (near - far);
		t[0] = d / aspect;
		t[5] = d;
		t[10] = (near + far) * inf;
		t[11] = -1;
		t[14] = 2 * near * far * inf;
		return proj;
	}
	return Matrix4;
})();
