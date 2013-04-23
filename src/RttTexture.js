glgl.RttTexture = function(glContext, width, height)
{
    var gl = this.glContext = glContext;

    this.glTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.frameBuffer = gl.createFramebuffer();
    this.frameBuffer.width = width;
    this.frameBuffer.height = height;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.glTexture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);




    /*var renderBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);*/
    //gl.bindRenderbuffer(gl.RENDERBUFFER, null);


}


glgl.RttTexture.prototype = {
    update : function()
    {
        var gl = this.glContext;
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}