geom.Vector2 = (function()
{
	function Vector2(x, y)
	{
		this.data = new Float32Array(2);
		this.set(x, y);
	}

	Vector2.prototype = {

		set : function(x, y)
		{
            this.data[0] = x || 0;
            this.data[1] = y || 0;
		},

		normalize : function()
		{
			var iLength = 1 / this.getLength();
            this.data[0] *= iLength;
            this.data[1] *= iLength;
		},

		getLength : function()
        {
            var x = this.data[0], y = this.data[1];
            return Math.sqrt(x * x + y * y);
        },
	
		getLength2 : function()
		{
            var x = this.data[0], y = this.data[1];
			return x * x + y * y;
		}
	}
	return Vector2;
})();
