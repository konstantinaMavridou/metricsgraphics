HTMLWidgets.widget({

  name: 'metricsgraphics',

  type: 'output',

  initialize: function(el, width, height) {

    return {  }

  },

  renderValue: function(el, params, instance) {

    // save params for reference from resize method
    instance.params = params;

    // draw the graphic
    this.drawGraphic(el, params, el.offsetWidth, el.offsetHeight);

  },

  drawGraphic: function(el, params, width, height) {

    // remove existing children
    while (el.firstChild)
      el.removeChild(el.firstChild);

    dbg = params

    wide = null;

    if (params.geom == "histogram") {
      wide = params.data;
    } else {
      wide = HTMLWidgets.dataframeToD3(params.data);
    }

    var xax_format = mjs_plain;

    if (params.xax_format == "date") {
      xax_format = mjs_date ;
      MG.convert.date(wide, params.x_accessor)
    }

    if (params.xax_format == "comma") xax_format = mjs_comma ;

    // convert date string to Date object
    MG.data_graphic({

        data: wide,
        target: '#' + el.id,
        xax_format: xax_format,

        x_axis: params.x_axis,
        y_axis: params.y_axis,

        interpolate: params.interpolate,
        decimals: params.decimals,
        format: params.format,

        color_type: params.color_type,
        color_range: params.color_range,
        point_size: params.point_size,
        size_range: params.size_range,

        markers: params.markers,
        baselines: params.baselines,

        show_rollover_text: params.show_rollover_text,

        y_scale_type: params.y_scale_type,

        chart_type: params.chart_type,
        x_accessor: params.x_accessor,
        y_accessor: params.y_accessor,
        color_accessor: params.color_accessor,
        size_accessor: params.size_accessor,

        show_rollover_text: params.show_rollover_text,

        bar_margin: params.bar_margin,
        binned: params.binned,
        bins: params.bins,

        height: height,
        width: width,
        bottom: params.bottom,
        top: params.top,
        right: params.right,
        left: params.left,
        buffer: params.buffer,

        area: params.area,
        animate_on_load: params.animate_on_load,
        y_rug: params.y_rug,
        x_rug: params.x_rug,

        min_x: params.min_x,
        max_x: params.max_x,
        min_y: params.min_y,
        max_y: params.max_y,

        yax_count: params.yax_count,
        xax_count: params.xax_count,

        least_squares: params.least_squares,

        x_label: params.x_label,
        y_label: params.y_label,
        title: params.title,
        description: params.description

    });

  },

  resize: function(el, width, height, instance) {
    if (instance.params)
      this.drawGraphic(el, instance.params, width, height);
  }

});

mjs_comma = function(d) {
  var df =  d3.format("0,000");
  return df(d);
}

mjs_date = function(d) {
  var df = d3.time.format('%b %d');
  return df(d);
}

mjs_plain = function(d) {
 return(d.toString());
}