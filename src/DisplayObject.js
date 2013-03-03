glgl.DisplayObject = function(data, program, itemsCount, indices)
{
	this.program = program;
	this.data = data;
	this.drawMethod = glgl.consts.TRIANGLES;
	this._cache = {};
	this._indicesCache;
	this.itemsCount = itemsCount;
	this.indices = indices;
}

glgl.DisplayObject.prototype = {
	clearCache : function()
	{
		for(var name in this._cache)
			this._cache[name].isCleared = true;
	}
}