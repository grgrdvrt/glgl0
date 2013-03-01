geom.Vector4 = (function()
{
	function Vector4(x, y, z, w)
	{
		this.data = new Float32Array();
		this.set(x, y, z, w);
	}

	Vector4.prototype = {

		set : function(x, y, z)
		{
			var t = this.data;
			t[0] = x || 0;
			t[1] = y || 0;
			t[2] = z || 0;
			t[3] = w || 0;
		},

		normalize : function()
		{
			var id = 1 / this.getLength();
			var t = this.data;
			t[0] *= id;
			t[1] *= id;
			t[2] *= id;
			t[3] *= id;
		},

		getLength : function() { return Math.sqrt(this.getLength2()); },
	
		getLength2 : function()
		{
			return this.x * this.x + this.y * this.y + this.z * this.z;
		}
	}
	return Vector4;
})();
