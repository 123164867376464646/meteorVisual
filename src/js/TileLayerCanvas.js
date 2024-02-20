/**
 * 颜色渐变图层
 */
export const TileLayerCanvas = L.Layer.extend({
    initialize: function (e) {
        L.Util.setOptions(this, e || {})
        this.targetPane = "tilePane"
        this._showCanvasOn = !0
        this.onInit()
    },
    addTo: function (e) {
        return this.failed = !1, e.addLayer(this), this
    },
    onAdd: function (e) {
        this._map = e;
        var t = e.getSize(), n = e.options.zoomAnimation && L.Browser.any3d;
        return this._canvas = L.DomUtil.create("canvas", "leaflet-canvas"), this.onResizeCanvas(t.x, t.y), L.DomUtil.addClass(this._canvas, "leaflet-layer leaflet-zoom-" + (n ? "animated" : "hide")), e.getPanes()[this.targetPane].appendChild(this._canvas), this.onCreateCanvas(this._canvas) ? (e.on("resize", this._resize, this), e.on("zoomanim", this._animateZoom, this), e.on("zoom", this._onZoom, this), e.on("zoomstart", this._onZoomStart, this), e.on("zoomend", this._onZoomEnd, this), this.options.disableAutoReset || e.on("moveend", this._moveEnd, this), this._reset(), this._redraw(), this) : (this.failed = !0, this.onCanvasFailed(), this)
    },
    onRemove: function (e) {
        var t;
        return this.onRemoveCanvas(null !== (t = this._canvas) && void 0 !== t ? t : void 0), e.getPanes()[this.targetPane].removeChild(this._canvas), e.off("resize", this._resize, this), e.off("zoomanim", this._animateZoom, this), e.off("zoom", this._onZoom, this), e.off("zoomstart", this._onZoomStart, this), e.off("zoomend", this._onZoomEnd, this), this.options.disableAutoReset || e.off("moveend", this._moveEnd, this), this._canvas = null, this
    },
    getCanvas: function () {
        return this._canvas
    },
    showCanvas: function (e) {
        this._showCanvasOn !== e && (this._showCanvasOn = e, this._canvas.style.display = this._showCanvasOn ? "block" : "none")
    },
    onResizeCanvas: function (e, t) {
        this._canvas.width = e, this._canvas.height = t
    },
    _resize: function (e) {
        this.onResizeCanvas(e.newSize.x, e.newSize.y)
    },
    _reset: function () {
        if (this._map && this._canvas) {
            var e = this._map.containerPointToLayerPoint([0, 0]);
            L.DomUtil.setPosition(this._canvas, e), this._center = this._map.getCenter(), this._zoom = this._map.getZoom(), this.onReset()
        }
    },
    reset: function () {
        this._reset()
    },
    onReset: function () {
    },
    _redraw: function () {
        this._frame = null
    },
    redraw: function () {
        return this._frame || (this._frame = L.Util.requestAnimFrame(this._redraw, this)), this
    },
    _moveEnd: function () {
        this._reset(), this.onMoveEnd()
    },
    _onZoomStart: function () {
        this.wasOnZoom = !1
    },
    _onZoomEnd: function () {
        this.canvasDisplay(!0)
    },
    canvasDisplay: function (e) {
        this._canvas && (this._canvas.style.display = e ? "block" : "none")
    },
    _animateZoom: function (e) {
        this.wasOnZoom && this.canvasDisplay(!1);
        var t = this._map.getZoomScale(e.zoom),
            n = this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), e.zoom, e.center).min;
        L.DomUtil.setTransform(this._canvas, n, t)
    },
    _onZoom: function () {
        this.wasOnZoom = !0, this._updateTransform(this._map.getCenter(), this._map.getZoom())
    },
    _updateTransform: function (e, t) {
        if (this._map && this._canvas && this._center) {
            var n = this._map.getZoomScale(t, this._zoom), i = this._canvas._leaflet_pos || new L.Point(0, 0),
                o = this._map.getSize().multiplyBy(.5 + (this.options.padding || 0)),
                r = this._map.project(this._center, t), a = this._map.project(e, t).subtract(r),
                s = o.multiplyBy(-n).add(i).add(o).subtract(a);
            L.DomUtil.setTransform(this._canvas, s, n)
        }
    },
    onInit: function () {
    },
    onCreateCanvas: function () {
        return !0
    },
    onCanvasFailed: function () {
    },
    onRemoveCanvas: function () {
    },
    onMoveEnd: function () {
    },
    onZoomEnd: function () {
    }
})


// export const MyTileLayerCanvas = TileLayerCanvas.extend({
//     onAdd: function (map) {
//         // 调用父类的 onAdd 方法
//         TileLayerCanvas.prototype.onAdd.call(this, map);
//
//         // 在地图上绘制颜色渐变
//         this.drawGradient();
//     },
//
//     drawGradient: function () {
//         const canvas = this.getCanvas();
//         const ctx = canvas.getContext('2d');
//
//         // 绘制颜色渐变
//         const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//         gradient.addColorStop(0, 'red');
//         gradient.addColorStop(1, 'blue');
//
//         ctx.fillStyle = gradient;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }
// });

export const MyTileLayerCanvas = TileLayerCanvas.extend({
    onAdd: function (map) {
        // 调用父类的 onAdd 方法
        TileLayerCanvas.prototype.onAdd.call(this, map);

        // 在地图上绘制颜色渐变
        this.drawGradient();
    },

    drawGradient: function () {
        const canvas = this.getCanvas();
        const ctx = canvas.getContext('2d');

        // 清除原有的渐变区域
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制新的颜色渐变
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1, 'blue');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    onRemove: function (map) {
        // 调用父类的 onRemove 方法
        TileLayerCanvas.prototype.onRemove.call(this, map);

        // 清除画布内容
        this.clearCanvas();
    },

    clearCanvas: function () {
        const canvas = this.getCanvas();
        const ctx = canvas.getContext('2d');

        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});
